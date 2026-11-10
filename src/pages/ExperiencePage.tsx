import { NextPage } from '../components/layout/NextPage'
import { Experience } from '../components/sections/Experience'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { sectionMeta } from '../lib/seo'

export function ExperiencePage() {
  useDocumentMeta(sectionMeta.experience.title, sectionMeta.experience.description, { path: sectionMeta.experience.path })
  return (
    <>
      <div className="pt-8 sm:pt-12">
        <Experience />
      </div>
      <NextPage current="/experience" />
    </>
  )
}
