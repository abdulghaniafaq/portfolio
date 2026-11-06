import type { Role } from '../data/types'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** Months since year 0, so spans are simple subtraction. */
const monthIndex = (year: number, month: number) => year * 12 + month

function parseMonth(text: string, now: Date): number {
  if (/present/i.test(text)) return monthIndex(now.getFullYear(), now.getMonth())
  const [mon, year] = text.trim().split(/\s+/)
  const m = MONTHS.indexOf(mon)
  if (m < 0 || !/^\d{4}$/.test(year)) throw new Error(`Unrecognised period "${text}" (expected "Mon YYYY — Mon YYYY" or "… — Present")`)
  return monthIndex(Number(year), m)
}

export interface TimelineSegment {
  label: string
  /** Inclusive start / end month indexes. */
  start: number
  end: number
  current: boolean
}

export interface TimelineCompany {
  name: string
  start: number
  end: number
  segments: TimelineSegment[]
}

export interface Timeline {
  /** First and last month shown (inclusive). */
  from: number
  to: number
  companies: TimelineCompany[]
  /** Year boundaries that fall inside the range, as month indexes of 1 January. */
  years: { year: number; at: number }[]
}

const shortCompany = (name: string) => name.replace(/\s+(&\s+Consultancy\s+Inc|Pvt\s+Ltd\.?)$/i, '')
const shortRole = (title: string) => title.split(/\s+[–—-]\s+/)[0]

/** Groups roles by employer for a "career at a glance" chart. Order: most recent employer first. */
export function buildTimeline(roles: Role[], now = new Date()): Timeline {
  const byCompany = new Map<string, TimelineCompany>()
  for (const role of roles) {
    const [startText, endText] = role.period.split(/\s+[—–-]\s+/)
    const start = parseMonth(startText, now)
    const end = parseMonth(endText, now)
    const name = shortCompany(role.company)
    const company = byCompany.get(name) ?? { name, start, end, segments: [] }
    company.start = Math.min(company.start, start)
    company.end = Math.max(company.end, end)
    company.segments.push({ label: shortRole(role.title), start, end, current: Boolean(role.current) })
    byCompany.set(name, company)
  }

  const companies = [...byCompany.values()]
    .map((c) => ({ ...c, segments: c.segments.sort((a, b) => a.start - b.start) }))
    .sort((a, b) => b.end - a.end || b.start - a.start)

  const from = Math.min(...companies.map((c) => c.start))
  const to = Math.max(...companies.map((c) => c.end))
  const years: Timeline['years'] = []
  for (let y = Math.floor(from / 12) + 1; monthIndex(y, 0) <= to; y++) years.push({ year: y, at: monthIndex(y, 0) })
  return { from, to, companies, years }
}

export const formatMonth = (index: number) => `${MONTHS[index % 12]} ${Math.floor(index / 12)}`

export function formatDuration(months: number): string {
  const y = Math.floor(months / 12)
  const m = months % 12
  return [y && `${y} yr${y > 1 ? 's' : ''}`, m && `${m} mo${m > 1 ? 's' : ''}`].filter(Boolean).join(' ') || '1 mo'
}
