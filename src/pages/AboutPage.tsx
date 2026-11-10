import { NextPage } from '../components/layout/NextPage'
import { About } from '../components/sections/About'
import { Process } from '../components/sections/Process'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { sectionMeta } from '../lib/seo'

export function AboutPage() {
  useDocumentMeta(sectionMeta.about.title, sectionMeta.about.description, { path: sectionMeta.about.path })
  return (
    <>
      <div className="pt-8 sm:pt-12">
        <About />
      </div>
      <Process />
      <NextPage current="/about" />
    </>
  )
}
