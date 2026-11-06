import { Link } from 'react-router-dom'
import { caseStudies, profile } from '../../data/portfolio'
import { HeroVisual } from '../hero/HeroVisual'
import { resume } from '../../lib/contact'
import { ButtonLink } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'

export function Hero() {
  const { hero, domains } = profile
  const [first, second, last] = hero.headline

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-28 pb-8 sm:pt-36 lg:pb-12">
      {/* Background: faded dot grid */}
      <div
        aria-hidden="true"
        className="bg-dots pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_70%_30%,black,transparent)]"
      />

      <div className="container-page relative">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 px-3.5 py-1.5 text-[0.6875rem] text-muted">
                <span className="size-1.5 shrink-0 rounded-full bg-accent-500" aria-hidden="true" />
                <span className="hidden sm:inline">{hero.eyebrow}</span>
                <span className="sm:hidden">{profile.shortTitle.replace(' | ', ' · ')}</span>
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h1
                id="hero-title"
                className="mt-7 text-[2.75rem] leading-[1.02] font-semibold tracking-[-0.045em] text-ink sm:text-6xl lg:text-[3.6rem] xl:text-[4.5rem]"
              >
                <span className="block">{first}</span>
                <span className="block">{second}</span>
                <span className="block font-serif font-normal tracking-[-0.02em] text-accent-600 italic">
                  {last}
                </span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-7 max-w-xl text-xl leading-relaxed text-pretty text-ink-soft">
                {hero.supporting}
              </p>
              <p className="mt-4 max-w-xl leading-relaxed text-pretty text-muted">{hero.intro}</p>
            </Reveal>

            <Reveal delay={240} className="mt-9 flex flex-wrap gap-3">
              <ButtonLink to="/#work" size="lg">
                View My Work
              </ButtonLink>
              <ButtonLink to={resume.href} download={resume.filename} external size="lg" variant="secondary" icon="download">
                Download Resume
              </ButtonLink>
              <ButtonLink to="/#contact" size="lg" variant="ghost" icon="arrowUpRight">
                Let’s Connect
              </ButtonLink>
            </Reveal>
          </div>

          <Reveal delay={200} className="lg:col-span-5">
            <HeroVisual />
          </Reveal>
        </div>

        {/* At-a-glance strip: domains + selected work */}
        <Reveal
          delay={300}
          className="mt-20 grid gap-6 border-t border-line pt-8 md:grid-cols-12 md:gap-10 lg:mt-24"
        >
          <div className="md:col-span-5">
            <p className="eyebrow text-muted">Domains</p>
            <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-1 text-[0.9375rem] text-ink">
              {domains.map((d, i) => (
                <li key={d} className="flex items-center gap-2">
                  {d}
                  {i < domains.length - 1 && (
                    <span aria-hidden="true" className="text-line-strong">
                      /
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-7">
            <p className="eyebrow text-muted">Selected work</p>
            <ul className="mt-3 grid gap-x-6 gap-y-1 sm:grid-cols-2">
              {caseStudies.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={`/work/${c.slug}`}
                    className="group flex items-center justify-between gap-3 border-b border-transparent py-1 text-[0.9375rem] text-ink transition-colors hover:border-line hover:text-accent-600"
                  >
                    <span>
                      <span className="font-medium">{c.name}</span>
                      <span className="text-muted"> — {c.domain}</span>
                    </span>
                    <Icon
                      name="arrowUpRight"
                      size={15}
                      className="shrink-0 text-muted transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-600"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
