import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { caseStudies, profile } from '../data/portfolio'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { ButtonLink } from '../components/ui/Button'
import { Chip } from '../components/ui/Chip'
import { Icon } from '../components/ui/Icon'
import { Reveal } from '../components/ui/Reveal'
import { Value } from '../components/ui/Value'
import { CaseCover } from '../components/work/CaseCover'
import { NotFoundPage } from './NotFoundPage'

function Block({ index, title, children }: { index: string; title: string; children: ReactNode }) {
  return (
    <Reveal as="section" className="grid gap-4 border-t border-line py-12 md:grid-cols-12 md:gap-10">
      <div className="md:col-span-4">
        <p className="font-mono text-xs text-accent-600">{index}</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink">{title}</h2>
      </div>
      <div className="md:col-span-8">{children}</div>
    </Reveal>
  )
}

export function CaseStudyPage() {
  const { slug } = useParams()
  const index = caseStudies.findIndex((c) => c.slug === slug)
  const study = caseStudies[index]

  useDocumentMeta(
    study ? `${study.name} — Case Study · ${profile.name}` : `Not found · ${profile.name}`,
    study?.summary,
  )

  if (!study) return <NotFoundPage />

  const next = caseStudies[(index + 1) % caseStudies.length]

  return (
    <article className="pt-24 sm:pt-28">
      {/* Header */}
      <header className="container-page">
        <Reveal>
          <Link
            to="/#work"
            className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
          >
            <Icon name="arrowRight" size={15} className="rotate-180 transition-transform group-hover:-translate-x-0.5" />
            All work
          </Link>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal delay={60} className="lg:col-span-8">
            <p className="eyebrow text-accent-600">Case study · {study.tagline}</p>
            <h1 className="mt-4 text-5xl leading-[1] font-semibold tracking-[-0.045em] text-ink sm:text-7xl">
              {study.name}
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-pretty text-ink-soft">{study.summary}</p>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-4">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 rounded-2xl border border-line bg-surface p-6 text-sm shadow-card lg:grid-cols-1">
              {[
                { label: 'Domain', value: study.domain },
                { label: 'My role', value: study.role },
                { label: 'Period', value: study.period },
                { label: 'Ecosystem', value: study.ecosystem.slice(0, 3).join(', ') },
              ].map((row) => (
                <div key={row.label}>
                  <dt className="text-muted">{row.label}</dt>
                  <dd className="mt-1 font-medium text-ink">
                    <Value>{row.value}</Value>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={160} className="mt-14 overflow-hidden rounded-2xl border border-line shadow-card">
          <CaseCover variant={study.cover} className="aspect-[16/9] sm:aspect-[21/9]" />
        </Reveal>
      </header>

      {/* Body */}
      <div className="container-page mt-16">
        <Block index="01" title="Focus areas">
          <ul className="flex flex-wrap gap-2">
            {study.focus.map((f) => (
              <li key={f}>
                <Chip>{f}</Chip>
              </li>
            ))}
          </ul>
        </Block>

        <Block index="02" title="The problem">
          <p className="text-lg leading-relaxed text-pretty text-ink-soft">{study.problem}</p>
        </Block>

        <Block index="03" title="My contribution">
          <ol className="space-y-4">
            {study.contribution.map((c, i) => (
              <li key={c} className="flex gap-4">
                <span className="mt-0.5 font-mono text-xs leading-6 text-muted">{String(i + 1).padStart(2, '0')}</span>
                <span className="leading-relaxed text-ink-soft">{c}</span>
              </li>
            ))}
          </ol>
        </Block>

        <Block index="04" title="The solution">
          <p className="text-lg leading-relaxed text-pretty text-ink-soft">{study.solution}</p>
          <h3 className="eyebrow mt-8 text-muted">Key deliverables</h3>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {study.deliverables.map((d) => (
              <li key={d} className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 text-[0.9375rem] text-ink">
                <Icon name="fileText" size={16} className="text-accent-600" />
                {d}
              </li>
            ))}
          </ul>
        </Block>

        <Block index="05" title="Technologies & ecosystem">
          <ul className="flex flex-wrap gap-2">
            {study.ecosystem.map((e) => (
              <li key={e}>
                <Chip tone="accent">{e}</Chip>
              </li>
            ))}
          </ul>
        </Block>

        <Block index="06" title="Outcome & impact">
          <ul className="grid gap-3 sm:grid-cols-2">
            {study.outcomes.map((o) => (
              <li key={o} className="flex gap-3 rounded-xl bg-sunken/70 p-4 leading-relaxed text-ink-soft">
                <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-500" />
                {o}
              </li>
            ))}
          </ul>
        </Block>
      </div>

      {/* Next + CTA */}
      <div className="container-page mt-8 pb-24">
        <Reveal>
          <Link
            to={`/work/${next.slug}`}
            className="group flex flex-col gap-6 rounded-2xl bg-ink p-8 text-white transition-colors hover:bg-ink-soft sm:flex-row sm:items-center sm:justify-between sm:p-10"
          >
            <div>
              <p className="eyebrow text-white/50">Next case study</p>
              <p className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{next.name}</p>
              <p className="mt-1 text-white/65">{next.tagline}</p>
            </div>
            <span className="grid size-14 shrink-0 place-items-center rounded-full bg-white text-ink transition-colors group-hover:bg-accent-400">
              <Icon name="arrowRight" size={22} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </Reveal>
        <Reveal delay={80} className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-lg text-ink-soft">Working on something similar?</p>
          <ButtonLink to="/#contact" variant="secondary" icon="arrowUpRight">
            Let’s Work Together
          </ButtonLink>
        </Reveal>
      </div>
    </article>
  )
}
