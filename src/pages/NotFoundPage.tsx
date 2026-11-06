import { ButtonLink } from '../components/ui/Button'
import { profile } from '../data/portfolio'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export const notFoundTitle = `Page not found | ${profile.name}`

export function NotFoundPage() {
  useDocumentMeta(notFoundTitle, undefined, { noindex: true })
  return (
    <section className="container-page flex min-h-[70vh] flex-col items-start justify-center pt-24">
      <p className="eyebrow text-accent-600">404</p>
      <h1 className="mt-4 text-5xl font-semibold tracking-[-0.04em] text-ink sm:text-6xl">
        This page doesn’t exist.
      </h1>
      <p className="mt-5 max-w-md text-lg text-muted">The link may be outdated, or the page may have moved.</p>
      <div className="mt-8">
        <ButtonLink to="/">Back to home</ButtonLink>
      </div>
    </section>
  )
}
