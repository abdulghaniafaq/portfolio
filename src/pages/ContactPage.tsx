import { Contact } from '../components/sections/Contact'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { sectionMeta } from '../lib/seo'

export function ContactPage() {
  useDocumentMeta(sectionMeta.contact.title, sectionMeta.contact.description, { path: sectionMeta.contact.path })
  return (
    <div className="pt-8 sm:pt-12">
      <Contact />
    </div>
  )
}
