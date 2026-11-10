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
  description: `${profile.name} is a Business Analyst and Associate Product Manager in Higher Education, EdTech, accessibility and AI: requirements, backlog ownership, delivery.`,
}

const page = (path: string, label: string, description: string): PageMeta => ({
  path,
  title: `${label} | ${profile.name}`,
  description,
})

/** Section pages, in navigation order. */
export const sectionMeta = {
  about: page(
    '/about',
    'About',
    `How ${profile.name}, a Business Analyst and Associate Product Manager, turns business needs into clear requirements and products teams can build.`,
  ),
  experience: page(
    '/experience',
    'Experience',
    `Career timeline of ${profile.name}: Associate Product Manager at ABM Technologies & Consultancy Inc, after business analysis, pre-sales and operations roles.`,
  ),
  work: page(
    '/work',
    'Work & Case Studies',
    `Case studies by ${profile.name}: products analyzed, shaped and brought to delivery in higher education, EdTech and AI.`,
  ),
  skills: page(
    '/skills',
    'Skills & Tools',
    `Skills, tools and platforms of ${profile.name}, grouped by the work they support: product, business analysis, project operations and technology domains.`,
  ),
  contact: page(
    '/contact',
    'Contact',
    `Contact ${profile.name} about Business Analyst and Product Manager roles. Email, LinkedIn and a downloadable resume.`,
  ),
}

export const caseStudyMeta = (study: CaseStudy): PageMeta => ({
  path: `/work/${study.slug}`,
  title: `${study.name} — Case Study | ${profile.name}`,
  description: study.summary,
})

export const allPages: PageMeta[] = [homeMeta, ...Object.values(sectionMeta), ...caseStudies.map(caseStudyMeta)]
