import { profile } from '../../data/portfolio'
import { HeroVisual } from '../hero/HeroVisual'
import { resume } from '../../lib/contact'
import { ButtonLink } from '../ui/Button'
import { Reveal } from '../ui/Reveal'

export function Hero() {
  const { hero, stats, availability } = profile
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
            <Reveal className="flex flex-wrap items-center gap-2">
              <p className="eyebrow inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 px-3.5 py-1.5 text-xs text-muted">
                <span className="size-1.5 shrink-0 rounded-full bg-accent-500" aria-hidden="true" />
                <span className="hidden sm:inline">{hero.eyebrow}</span>
                <span className="sm:hidden">{profile.shortTitle.replace(' | ', ' · ')}</span>
              </p>
              <p className="eyebrow inline-flex items-center gap-2 rounded-full border border-success/35 bg-success/10 px-3.5 py-1.5 text-xs font-medium text-success">
                <span className="pulse-dot size-1.5 shrink-0 rounded-full bg-success" aria-hidden="true" />
                {availability}
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

        {/* Proof points: numbers are what recruiters scan for first */}
        <Reveal delay={300} className="mt-20 border-t border-line pt-8 lg:mt-24">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 md:gap-x-10">
            {stats.map((stat) => (
              <div key={stat.label} className="grid grid-rows-[auto_1fr]">
                {/* Label comes first in the DOM (term, then value); the grid shows the number above it */}
                <dt className="row-start-2 mt-2 max-w-[16rem] text-sm leading-snug text-muted">{stat.label}</dt>
                <dd className="row-start-1 text-4xl leading-none font-semibold tracking-[-0.045em] text-ink sm:text-5xl">
                  {stat.value}
                  {stat.suffix && (
                    <span className="font-serif font-normal tracking-normal text-accent-600 italic">{stat.suffix}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
