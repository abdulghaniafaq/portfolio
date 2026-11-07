import type { IconName } from '../components/ui/Icon'

export interface Profile {
  name: string
  initials: string
  title: string
  shortTitle: string
  tagline: string
  hero: {
    eyebrow: string
    headline: string[]
    supporting: string
    intro: string
  }
  /** Short availability badge shown in the hero, e.g. "Immediately available". */
  availability: string
  /** Headline numbers shown under the hero. */
  stats: { value: string; suffix?: string; label: string }[]
  domains: string[]
  contact: {
    email: string
    linkedin: string
    location: string
  }
}

/** A button shown under a quick answer. */
export type AnswerAction =
  | { type: 'link'; label: string; href: string }
  | { type: 'resume' }
  | { type: 'email' }
  | { type: 'linkedin' }

/** One ready-made answer for the "Quick answers" panel (src/data/quickAnswers.ts). */
export interface QuickAnswer {
  id: string
  group: string
  /** The question as shown in the browse list and as the visitor's message when picked. */
  question: string
  /** Other ways of asking it. Used only for matching, never shown. */
  alsoAskedAs: string[]
  answer: string
  actions: AnswerAction[]
}

export interface Principle {
  icon: IconName
  title: string
  body: string
}

export interface ExperienceArea {
  icon: IconName
  title: string
  impact: string
  items: string[]
}

export interface Role {
  title: string
  subtitle?: string
  company: string
  period: string
  location: string
  current?: boolean
  summary: string
  domains: string[]
  areas: ExperienceArea[]
}

export type CoverVariant = 'network' | 'document' | 'stack' | 'grid'

export interface CaseStudy {
  slug: string
  name: string
  tagline: string
  domain: string
  role: string
  /** Optional; the Project Period row is hidden when omitted. */
  period?: string
  cover: CoverVariant
  summary: string
  focus: string[]
  problem: string
  contribution: string[]
  solution: string
  ecosystem: string[]
  outcomes: string[]
  deliverables: string[]
}

export interface SkillGroup {
  icon: IconName
  title: string
  blurb: string
  skills: string[]
}

export interface ProcessStep {
  number: string
  title: string
  body: string
  outputs: string[]
}

export interface Tool {
  name: string
  use: string
  icon: IconName
}
