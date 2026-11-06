import { caseStudies, profile } from '../data/portfolio'
import type { CaseStudy } from '../data/types'

/** Per-page SEO metadata. Shared by the runtime hook and the build-time prerender in vite.config.ts. */
export interface PageMeta {
  path: string
  title: string
  description: string
}

export const homeMeta: PageMeta = {
  path: '/',
  title: `${profile.name} — ${profile.shortTitle}`,
  description: `${profile.name} is a Business Analyst and Associate Product Manager working across product strategy, requirements, backlog ownership, and delivery in Higher Education, EdTech, accessibility, and AI.`,
}

export const caseStudyMeta = (study: CaseStudy): PageMeta => ({
  path: `/work/${study.slug}`,
  title: `${study.name} — Case Study | ${profile.name}`,
  description: study.summary,
})

export const allPages: PageMeta[] = [homeMeta, ...caseStudies.map(caseStudyMeta)]
