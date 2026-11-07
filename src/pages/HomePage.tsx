import { lazy, Suspense } from 'react'
import { QuietBoundary } from '../components/chat/QuietBoundary'
import { About } from '../components/sections/About'
import { Contact } from '../components/sections/Contact'
import { Experience } from '../components/sections/Experience'
import { Hero } from '../components/sections/Hero'
import { Process } from '../components/sections/Process'
import { Skills } from '../components/sections/Skills'
import { Toolkit } from '../components/sections/Toolkit'
import { Work } from '../components/sections/Work'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { homeMeta } from '../lib/seo'

// The quick-answers panel and its answers load after the page, so they never delay first paint.
const QuickAnswers = lazy(() => import('../components/chat/QuickAnswers').then((m) => ({ default: m.QuickAnswers })))

export function HomePage() {
  useDocumentMeta(homeMeta.title, homeMeta.description, { path: homeMeta.path })

  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Work />
      <Skills />
      <Process />
      <Toolkit />
      <Contact />
      <QuietBoundary>
        <Suspense fallback={null}>
          <QuickAnswers />
        </Suspense>
      </QuietBoundary>
    </>
  )
}
