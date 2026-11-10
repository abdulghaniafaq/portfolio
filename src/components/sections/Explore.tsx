import { Link } from 'react-router-dom'
import { navLinks } from '../../data/portfolio'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'

/** Home page index: one row per page, so a visitor can jump straight to what they came for. */
export function Explore() {
  return (
    <section aria-labelledby="explore-title" className="py-16 sm:py-20">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow text-muted">Explore</p>
          <h2 id="explore-title" className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl">
            Where would you like to start?
          </h2>
        </Reveal>

        <Reveal as="ul" delay={80} className="mt-10 border-t border-line">
          {navLinks.map((link, i) => (
            <li key={link.to} className="group relative border-b border-line transition-colors hover:bg-surface">
              <div className="flex items-center gap-4 py-6 sm:gap-8 sm:py-7">
                <span className="w-7 shrink-0 font-mono text-xs text-muted" aria-hidden="true">
                  0{i + 1}
                </span>
                <div className="grid min-w-0 flex-1 gap-1 md:grid-cols-[14rem_minmax(0,1fr)] md:items-baseline md:gap-8">
                  <h3 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                    {/* Stretched link: the whole row is clickable, but only one link is announced */}
                    <Link to={link.to} className="after:absolute after:inset-0 after:content-['']">
                      {link.label}
                    </Link>
                  </h3>
                  <p className="text-pretty text-muted">{link.blurb}</p>
                </div>
                <Icon
                  name="arrowUpRight"
                  size={20}
                  className="shrink-0 text-muted transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-600"
                />
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
