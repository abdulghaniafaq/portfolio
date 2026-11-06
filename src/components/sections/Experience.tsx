import { roles } from '../../data/portfolio'
import type { ExperienceArea, Role } from '../../data/types'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { Value } from '../ui/Value'

function RoleCard({ role }: { role: Role }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-6 shadow-card sm:p-7">
      {role.current && (
        <p className="eyebrow inline-flex items-center gap-2 text-accent-600">
          <span className="pulse-dot size-1.5 rounded-full bg-accent-500" aria-hidden="true" />
          Current
        </p>
      )}
      <h3 className="mt-4 text-2xl leading-tight font-semibold tracking-tight text-ink">{role.title}</h3>
      {role.subtitle && <p className="mt-1 text-lg text-ink-soft">{role.subtitle}</p>}

      <dl className="mt-6 space-y-2.5 border-t border-line pt-5 text-sm">
        {[
          { icon: 'briefcase' as const, label: 'Company', value: role.company },
          { icon: 'calendar' as const, label: 'Period', value: role.period },
          { icon: 'mapPin' as const, label: 'Location', value: role.location },
        ].map((row) => (
          <div key={row.label} className="flex items-center gap-3">
            <dt className="flex w-24 shrink-0 items-center gap-2 text-muted">
              <Icon name={row.icon} size={15} />
              {row.label}
            </dt>
            <dd className="text-ink">
              <Value>{row.value}</Value>
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-6 text-[0.9375rem] leading-relaxed text-muted">{role.summary}</p>

      <div className="mt-6 flex flex-wrap gap-1.5">
        {role.domains.map((d) => (
          <span key={d} className="rounded-md bg-sunken px-2 py-1 text-xs text-ink-soft">
            {d}
          </span>
        ))}
      </div>
    </div>
  )
}

function AreaNode({ area, index, isLast }: { area: ExperienceArea; index: number; isLast: boolean }) {
  return (
    <Reveal as="li" delay={index * 60} className="group relative grid grid-cols-[2.75rem_1fr] gap-5 sm:gap-7">
      {/* Rail */}
      <div className="relative flex flex-col items-center">
        <span className="relative z-10 grid size-11 place-items-center rounded-full border border-line-strong bg-paper text-ink transition-colors group-hover:border-accent-500 group-hover:text-accent-600">
          <Icon name={area.icon} size={19} />
        </span>
        {!isLast && <span aria-hidden="true" className="w-px flex-1 bg-line-strong" />}
      </div>

      <article className={isLast ? '' : 'pb-12'}>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 pt-2">
          <span className="font-mono text-xs text-accent-600">{String(index + 1).padStart(2, '0')}</span>
          <h4 className="text-xl font-semibold tracking-tight text-ink">{area.title}</h4>
        </div>
        <p className="mt-2 max-w-xl leading-relaxed text-pretty text-muted">{area.impact}</p>
        <ul className="mt-5 grid gap-x-6 gap-y-2 sm:grid-cols-2">
          {area.items.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[0.9375rem] text-ink-soft">
              <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-accent-500" />
              {item}
            </li>
          ))}
        </ul>
      </article>
    </Reveal>
  )
}

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="border-y border-line bg-sunken/60 py-20 sm:py-28"
    >
      <div className="container-page">
        <SectionHeading
          id="experience-title"
          index="02"
          label="Experience"
          title="Experience"
          description="Three years across business analysis, product management, and project operations — from requirements and RPA automation to Scrum delivery, with pre-sales and RFP support along the way."
          align="split"
        />

        {roles.map((role) => (
          <div key={`${role.title}-${role.period}`} className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal className="lg:sticky lg:top-24">
                <RoleCard role={role} />
              </Reveal>
            </div>
            <ol className="lg:col-span-7" aria-label={`${role.title} — areas of responsibility`}>
              {role.areas.map((area, i) => (
                <AreaNode key={area.title} area={area} index={i} isLast={i === role.areas.length - 1} />
              ))}
            </ol>
          </div>
        ))}
      </div>
    </section>
  )
}
