import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { createServer, defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const isPlaceholderUrl = (url?: string) => !url || /your-domain\.com/.test(url)

/**
 * Public site URL used for canonical, Open Graph, sitemap and robots.txt.
 * Order: VITE_SITE_URL (env or .env) → Vercel's production domain → Vercel's deployment domain.
 */
function resolveSiteUrl(mode: string): string {
  const fromEnv = loadEnv(mode, process.cwd(), 'VITE_').VITE_SITE_URL
  if (!isPlaceholderUrl(fromEnv)) return fromEnv.replace(/\/$/, '')
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL
  return vercel ? `https://${vercel}` : 'http://localhost:4173'
}

const escapeAttr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/** Rewrites the head tags of the built index.html for one page. */
function withMeta(html: string, siteUrl: string, page: { path: string; title: string; description: string }) {
  const url = `${siteUrl}${page.path}`
  const title = escapeAttr(page.title)
  const desc = escapeAttr(page.description)
  const tag = (attr: string, name: string) => new RegExp(`(<meta\\s+${attr}="${name}"\\s+content=")[^"]*(")`)
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(tag('name', 'description'), `$1${desc}$2`)
    .replace(tag('property', 'og:title'), `$1${title}$2`)
    .replace(tag('property', 'og:description'), `$1${desc}$2`)
    .replace(tag('property', 'og:url'), `$1${url}$2`)
    .replace(tag('name', 'twitter:title'), `$1${title}$2`)
    .replace(tag('name', 'twitter:description'), `$1${desc}$2`)
    .replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/, `$1${url}$2`)
}

/**
 * After the build: writes sitemap.xml and robots.txt, and a copy of index.html with
 * page-specific title/description/canonical for each case study. Crawlers and link
 * previews that don't run JavaScript then see the right tags on /work/<slug>.
 */
function seoFiles(siteUrl: string): Plugin {
  let outDir = 'dist'
  return {
    name: 'seo-files',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    closeBundle: {
      order: 'post',
      async handler() {
        // Load the page list through Vite so the TypeScript data file is the single source of truth.
        const server = await createServer({
          configFile: false,
          appType: 'custom',
          logLevel: 'silent',
          server: { middlewareMode: true },
        })
        let pages: { path: string; title: string; description: string }[]
        try {
          pages = (await server.ssrLoadModule('/src/lib/seo.ts')).allPages
        } finally {
          await server.close()
        }

        const write = (file: string, content: string) => {
          const target = resolve(outDir, file)
          mkdirSync(dirname(target), { recursive: true })
          writeFileSync(target, content)
        }

        const indexHtml = readFileSync(resolve(outDir, 'index.html'), 'utf8')
        for (const page of pages) {
          if (page.path !== '/') write(`${page.path.slice(1)}/index.html`, withMeta(indexHtml, siteUrl, page))
        }

        const lastmod = new Date().toISOString().slice(0, 10)
        const urls = pages
          .map(
            (p) =>
              `  <url>\n    <loc>${siteUrl}${p.path === '/' ? '/' : p.path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${p.path === '/' ? '1.0' : '0.7'}</priority>\n  </url>`,
          )
          .join('\n')
        write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
        write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`)
      },
    },
  }
}

export default defineConfig(({ mode }) => {
  const siteUrl = resolveSiteUrl(mode)
  // Picked up by Vite for %VITE_SITE_URL% in index.html and import.meta.env in the app.
  process.env.VITE_SITE_URL = siteUrl
  return { plugins: [react(), tailwindcss(), seoFiles(siteUrl)] }
})
