import { lazy, Suspense, useEffect, useLayoutEffect, useRef } from 'react'
import { Route, Routes, useLocation, useNavigationType } from 'react-router-dom'
import { QuietBoundary } from './components/chat/QuietBoundary'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { AboutPage } from './pages/AboutPage'
import { sectionIdFromHash } from './lib/hash'
import { CaseStudyPage } from './pages/CaseStudyPage'
import { ContactPage } from './pages/ContactPage'
import { ExperiencePage } from './pages/ExperiencePage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { SkillsPage } from './pages/SkillsPage'
import { WorkPage } from './pages/WorkPage'

// The quick-answers panel and its answers load after the page, so they never delay first paint.
const QuickAnswers = lazy(() => import('./components/chat/QuickAnswers').then((m) => ({ default: m.QuickAnswers })))

const SCROLL_STORE = 'scroll-positions'
const MAX_REMEMBERED = 60

type Remembered = Record<string, { path: string; y: number }>

/** Scroll position of each history entry this tab has visited, so Back/Forward (and a reload) return to the same spot. */
const remembered: Remembered = (() => {
  try {
    return JSON.parse(sessionStorage.getItem(SCROLL_STORE) ?? '{}') as Remembered
  } catch {
    return {}
  }
})()

function persistRemembered() {
  const keys = Object.keys(remembered)
  for (const k of keys.slice(0, Math.max(0, keys.length - MAX_REMEMBERED))) delete remembered[k]
  try {
    sessionStorage.setItem(SCROLL_STORE, JSON.stringify(remembered))
  } catch {
    /* storage blocked: positions are still remembered while the tab stays open */
  }
}

/**
 * Scroll handling between pages:
 *  - a new page (link click) opens at its top and moves focus to its content;
 *  - Back/Forward and reload return to where the visitor was on that page;
 *  - `#section` links scroll to the section.
 */
function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  const navType = useNavigationType()
  // The very first render can land on a deep link (e.g. a shared "/skills#toolkit" URL
  // or a page refresh). Global `scroll-behavior: smooth` would otherwise animate
  // that initial jump across the entire page, which can take seconds. Only the
  // first scroll should be instant; later in-app nav clicks stay smooth.
  const isFirst = useRef(true)
  const lastPath = useRef(pathname)
  const current = useRef({ key, pathname })

  // Which history entry the scroll events below belong to. Updated in the commit, before the browser can report
  // the scroll that a shorter new page causes, so the page being left keeps the position it was left at.
  useLayoutEffect(() => {
    current.current = { key, pathname }
  }, [key, pathname])

  useEffect(() => {
    // The browser would restore scroll on Back before the new page has rendered; this component does it after.
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    const onScroll = () => {
      const { key: k, pathname: p } = current.current
      remembered[k] = { path: p, y: window.scrollY }
    }
    const onHide = () => persistRemembered()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pagehide', onHide)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pagehide', onHide)
    }
  }, [])

  useEffect(() => {
    const behavior = isFirst.current ? 'instant' : 'smooth'
    isFirst.current = false

    if (!hash) {
      const saved = navType === 'POP' ? remembered[key] : undefined
      const top = saved && saved.path === pathname ? saved.y : 0
      // Twice: the second call (next frame) also cancels any in-flight smooth scroll from the previous page.
      window.scrollTo({ top, behavior: 'instant' })
      const frame = requestAnimationFrame(() => {
        window.scrollTo({ top, behavior: 'instant' })
        // A new page: move focus to its content so keyboard and screen-reader users start there, not on the link they used.
        if (lastPath.current !== pathname) document.getElementById('main')?.focus({ preventScroll: true })
        lastPath.current = pathname
      })
      return () => cancelAnimationFrame(frame)
    }
    // Wait a frame so the target section has rendered after a route change.
    const id = requestAnimationFrame(() => {
      const el = document.getElementById(sectionIdFromHash(hash))
      if (!el) return
      el.scrollIntoView({ block: 'start', behavior })
      // Move focus for keyboard and screen-reader users without a second scroll.
      el.setAttribute('tabindex', '-1')
      el.focus({ preventScroll: true })
    })
    return () => cancelAnimationFrame(id)
  }, [pathname, hash, key, navType])

  return null
}

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-ink text-sm text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:px-4 focus:py-2.5"
      >
        Skip to content
      </a>
      <ScrollManager />
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:slug" element={<CaseStudyPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <QuietBoundary>
        <Suspense fallback={null}>
          <QuickAnswers />
        </Suspense>
      </QuietBoundary>
    </>
  )
}
