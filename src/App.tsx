import { useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { CaseStudyPage } from './pages/CaseStudyPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'

/** Scrolls to `#section` links after navigation, or to the top on a new page. */
function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  // The very first render can land on a deep link (e.g. a shared "/#contact" URL
  // or a page refresh). Global `scroll-behavior: smooth` would otherwise animate
  // that initial jump across the entire page, which can take seconds. Only the
  // first scroll should be instant; later in-app nav clicks stay smooth.
  const isFirst = useRef(true)

  useEffect(() => {
    const behavior = isFirst.current ? 'instant' : 'smooth'
    isFirst.current = false

    if (!hash) {
      // Twice: the second call (next frame) also cancels any in-flight smooth scroll from the previous page.
      window.scrollTo({ top: 0, behavior: 'instant' })
      const frame = requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'instant' }))
      return () => cancelAnimationFrame(frame)
    }
    // Wait a frame so the target section has rendered after a route change.
    const id = requestAnimationFrame(() => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (!el) return
      el.scrollIntoView({ block: 'start', behavior })
      // Move focus for keyboard and screen-reader users without a second scroll.
      el.setAttribute('tabindex', '-1')
      el.focus({ preventScroll: true })
    })
    return () => cancelAnimationFrame(id)
  }, [pathname, hash, key])

  return null
}

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-ink px-4 py-2 text-sm text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <ScrollManager />
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work/:slug" element={<CaseStudyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
