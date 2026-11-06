import { useEffect } from 'react'

const siteUrl = (import.meta.env.VITE_SITE_URL ?? '').replace(/\/$/, '')

function upsert(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector<HTMLElement>(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

const metaTag = (key: 'name' | 'property', name: string) => () => {
  const el = document.createElement('meta')
  el.setAttribute(key, name)
  return el
}

/**
 * Keeps the document title, description, canonical URL and social tags in sync
 * with the current route. `noindex` is for pages that should stay out of search (404).
 */
export function useDocumentMeta(
  title: string,
  description?: string,
  options: { path?: string; noindex?: boolean } = {},
) {
  const { path, noindex } = options

  useEffect(() => {
    document.title = title
    upsert('meta[property="og:title"]', metaTag('property', 'og:title'), 'content', title)
    upsert('meta[name="twitter:title"]', metaTag('name', 'twitter:title'), 'content', title)

    if (description) {
      upsert('meta[name="description"]', metaTag('name', 'description'), 'content', description)
      upsert('meta[property="og:description"]', metaTag('property', 'og:description'), 'content', description)
      upsert('meta[name="twitter:description"]', metaTag('name', 'twitter:description'), 'content', description)
    }

    if (path !== undefined && siteUrl) {
      const url = `${siteUrl}${path}`
      upsert(
        'link[rel="canonical"]',
        () => Object.assign(document.createElement('link'), { rel: 'canonical' }),
        'href',
        url,
      )
      upsert('meta[property="og:url"]', metaTag('property', 'og:url'), 'content', url)
    }

    let robots: HTMLMetaElement | null = null
    if (noindex && !document.head.querySelector('meta[name="robots"]')) {
      robots = document.createElement('meta')
      robots.name = 'robots'
      robots.content = 'noindex'
      document.head.appendChild(robots)
    }
    return () => robots?.remove()
  }, [title, description, path, noindex])
}
