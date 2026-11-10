import { useMemo } from 'react'
import { roles } from '../../data/portfolio'
import { buildTimeline, formatDuration, formatMonth } from '../../lib/timeline'
import { Reveal } from '../ui/Reveal'

/** Gantt-style "career at a glance": one row per employer, one segment per role. Derived from `roles`. */
export function CareerTimeline() {
  const t = useMemo(() => buildTimeline(roles), [])
  const span = t.to - t.from + 1
  const left = (month: number) => `${((month - t.from) / span) * 100}%`
  const width = (start: number, end: number) => `${((end - start + 1) / span) * 100}%`
  const cols = 'sm:grid-cols-[13.5rem_minmax(0,1fr)] sm:gap-8'

  return (
    <Reveal className="mt-14 rounded-2xl border border-line bg-surface p-6 shadow-card sm:p-8">
      <h2 className="eyebrow text-muted">Career at a glance</h2>

      <ol className="mt-6 space-y-6">
        {t.companies.map((company) => {
          const current = company.segments.some((s) => s.current)
          const months = company.end - company.start + 1
          return (
            <li key={company.name} className={`grid gap-3 sm:items-center ${cols}`}>
              <div>
                <p className="font-medium text-ink">{company.name}</p>
                <p className="mt-0.5 text-sm text-muted">
                  {formatMonth(company.start)} — {current ? 'Present' : formatMonth(company.end)}
                  <span aria-hidden="true"> · </span>
                  <span className="sr-only">, </span>
                  {formatDuration(months)}
                </p>
                <p className="mt-0.5 text-sm text-ink-soft">
                  {company.segments.map((s) => s.label).join(' → ')}
                </p>
              </div>

              {/* Visual only: the same information is in the text beside it */}
              <div aria-hidden="true" className="relative h-3 rounded-full bg-sunken">
                {t.years.map((y) => (
                  <span key={y.year} className="absolute inset-y-0 w-px bg-line-strong/70" style={{ left: left(y.at) }} />
                ))}
                {company.segments.map((s) => (
                  <span
                    key={`${s.label}-${s.start}`}
                    title={`${s.label}: ${formatMonth(s.start)} — ${s.current ? 'Present' : formatMonth(s.end)}`}
                    className={`absolute inset-y-0 rounded-full shadow-[0_0_0_1.5px_var(--color-surface)] ${
                      s.current ? 'bg-accent-500' : 'bg-ink/40'
                    }`}
                    style={{ left: left(s.start), width: width(s.start, s.end) }}
                  />
                ))}
              </div>
            </li>
          )
        })}
      </ol>

      <div aria-hidden="true" className={`mt-4 grid ${cols}`}>
        <span className="hidden sm:block" />
        <div className="relative h-5 font-mono text-xs text-muted">
          <span className="absolute left-0">{Math.floor(t.from / 12)}</span>
          {t.years.map((y) => (
            <span key={y.year} className="absolute -translate-x-1/2" style={{ left: left(y.at) }}>
              {y.year}
            </span>
          ))}
          <span className="absolute right-0">Now</span>
        </div>
      </div>
    </Reveal>
  )
}
