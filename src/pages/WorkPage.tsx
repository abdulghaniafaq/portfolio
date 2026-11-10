import { NextPage } from '../components/layout/NextPage'
import { Work } from '../components/sections/Work'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { sectionMeta } from '../lib/seo'

export function WorkPage() {
  useDocumentMeta(sectionMeta.work.title, sectionMeta.work.description, { path: sectionMeta.work.path })
  return (
    <>
      <div className="pt-8 sm:pt-12">
        <Work />
      </div>
      <NextPage current="/work" />
    </>
  )
}
