import { NextPage } from '../components/layout/NextPage'
import { Skills } from '../components/sections/Skills'
import { Toolkit } from '../components/sections/Toolkit'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { sectionMeta } from '../lib/seo'

export function SkillsPage() {
  useDocumentMeta(sectionMeta.skills.title, sectionMeta.skills.description, { path: sectionMeta.skills.path })
  return (
    <>
      <div className="pt-8 sm:pt-12">
        <Skills />
      </div>
      <Toolkit />
      <NextPage current="/skills" />
    </>
  )
}
