import { Navigate, useLocation } from 'react-router-dom'
import { Explore } from '../components/sections/Explore'
import { Hero } from '../components/sections/Hero'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { sectionIdFromHash } from '../lib/hash'
import { homeMeta } from '../lib/seo'

// Before the site was split into pages, sections were reached with "/#about" and similar.
// Shared or bookmarked links of that form are forwarded to the matching page.
const legacySections = new Map([
  ['about', '/about'],
  ['experience', '/experience'],
  ['work', '/work'],
  ['skills', '/skills'],
  ['toolkit', '/skills#toolkit'],
  ['approach', '/about#approach'],
  ['contact', '/contact'],
])

export function HomePage() {
  useDocumentMeta(homeMeta.title, homeMeta.description, { path: homeMeta.path })
  const { hash } = useLocation()
  const forward = legacySections.get(sectionIdFromHash(hash))
  if (forward) return <Navigate to={forward} replace />

  return (
    <>
      <Hero />
      <Explore />
    </>
  )
}
