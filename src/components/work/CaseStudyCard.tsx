import { Link } from 'react-router-dom'
import type { CaseStudy } from '../../data/types'
import { Icon } from '../ui/Icon'
import { CaseCover } from './CaseCover'

export function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-1 hover:border-line-strong hover:shadow-lift">
      <div className="relative border-b border-line">
        <CaseCover
          variant={study.cover}
          className="aspect-[16/9] transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />
        <span className="absolute top-4 left-4 rounded-full border border-line bg-surface/90 px-2.5 py-1 font-mono text-[0.6875rem] text-muted backdrop-blur">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="absolute top-4 right-4 rounded-full border border-line bg-surface/90 px-2.5 py-1 text-xs text-ink-soft backdrop-blur">
          {study.domain}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-sm text-accent-600">{study.tagline}</p>
        <h3 className="mt-1.5 text-2xl font-semibold tracking-tight text-ink">
          {/* Stretched link: the whole card is clickable, but only one link is announced */}
          <Link to={`/work/${study.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {study.name}
          </Link>
        </h3>
        <p className="mt-3 leading-relaxed text-pretty text-muted">{study.summary}</p>

        <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 border-t border-line pt-5 text-sm">
          <dt className="text-muted">Role</dt>
          <dd className="text-ink">{study.role}</dd>
          <dt className="text-muted">Focus</dt>
          <dd className="text-ink">{study.focus.slice(0, 3).join(' · ')}</dd>
        </dl>

        <div className="mt-auto flex items-center justify-between pt-7">
          <span className="text-sm font-medium text-ink transition-colors group-hover:text-accent-600">
            View Case Study
          </span>
          <span className="grid size-9 place-items-center rounded-full border border-line-strong text-ink transition-all duration-300 group-hover:border-accent-600 group-hover:bg-accent-600 group-hover:text-white">
            <Icon name="arrowUpRight" size={16} />
          </span>
        </div>
      </div>
    </article>
  )
}
