import { Link } from 'react-router-dom'
import { navLinks } from '../../data/portfolio'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'

/** Closing band that leads on to the next page in the header order. Renders nothing after the last page. */
export function NextPage({ current }: { current: (typeof navLinks)[number]['to'] }) {
  const index = navLinks.findIndex((l) => l.to === current)
  const next = navLinks[index + 1]
  if (!next) return null

  return (
    <nav aria-label="Next page" className="border-t border-line">
      <div className="container-page py-14 sm:py-16">
        <Reveal className="group relative flex items-end justify-between gap-6">
          <div className="min-w-0">
            <p className="eyebrow text-muted">
              <span className="text-accent-600">0{index + 2}</span> &nbsp;Next
            </p>
            <p className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl">
              {/* Stretched link: the whole band is clickable, but only one link is announced */}
              <Link to={next.to} className="after:absolute after:inset-0 after:content-['']">
                {next.label}
              </Link>
            </p>
            <p className="mt-3 max-w-md text-pretty text-muted">{next.blurb}</p>
          </div>
          <span
            aria-hidden="true"
            className="grid size-14 shrink-0 place-items-center rounded-full border border-line-strong bg-surface text-ink transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-paper"
          >
            <Icon name="arrowRight" size={20} />
          </span>
        </Reveal>
      </div>
    </nav>
  )
}
