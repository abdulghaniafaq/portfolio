import { processSteps } from '../../data/portfolio'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

function Arrow() {
  return (
    <span aria-hidden="true" className="font-sans font-normal text-accent-400">
      {' '}
      →{' '}
    </span>
  )
}

export function Process() {
  return (
    <section
      id="approach"
      aria-labelledby="approach-title"
      className="on-dark relative overflow-hidden bg-panel py-20 text-white sm:py-28"
    >
      <div
        aria-hidden="true"
        className="bg-dots-dark pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
      />
      <div className="container-page relative">
        <SectionHeading
          id="approach-title"
          index="05"
          label="How I Work"
          tone="dark"
          align="split"
          title={
            <>
              From Problem
              <Arrow />
              Product
              <Arrow />
              Execution
            </>
          }
          description="A consistent way of working that keeps every requirement traceable to a real problem — and every release traceable to a requirement."
        />

        <ol className="relative mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-5 lg:gap-0">
          {/* Connecting rail on large screens */}
          <span
            aria-hidden="true"
            className="absolute top-[1.625rem] right-[10%] left-[10%] hidden h-px bg-gradient-to-r from-accent-400/70 via-white/20 to-white/20 lg:block"
          />
          {processSteps.map((step, i) => (
            <Reveal as="li" key={step.number} delay={i * 80} className="group relative lg:px-3">
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-[background-color,border-color] duration-300 hover:border-accent-400/50 hover:bg-white/[0.06] lg:border-transparent lg:bg-transparent lg:p-0 lg:hover:bg-transparent">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 lg:flex-col lg:items-center lg:gap-6">
                  <span
                    className={`relative z-10 grid size-[3.25rem] shrink-0 place-items-center rounded-full border font-mono text-sm transition-colors duration-300 ${
                      i === 0
                        ? 'border-accent-400 bg-accent-400 text-ink-fixed'
                        : 'border-white/20 bg-panel text-white group-hover:border-accent-400 group-hover:text-accent-400'
                    }`}
                  >
                    {step.number}
                  </span>
                  <h3 className="text-xl font-semibold tracking-tight lg:text-center">{step.title}</h3>
                </div>
                <p className="mt-4 leading-relaxed text-white/65 lg:text-center">{step.body}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5 lg:justify-center">
                  {step.outputs.map((o) => (
                    <li key={o} className="rounded-md border border-white/10 px-2 py-1 font-mono text-xs text-white/60">
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
