import { tools } from '../../data/portfolio'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'

export function Toolkit() {
  return (
    <section id="toolkit" aria-labelledby="toolkit-title" className="py-20 sm:py-24">
      <div className="container-page">
        <Reveal className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-muted">
              <span className="text-accent-600">04</span> &nbsp;Professional Toolkit
            </p>
            <h2 id="toolkit-title" className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl">
              Tools & Platforms
            </h2>
          </div>
          <p className="max-w-sm text-muted">Tools and platforms I use across analysis, delivery, documentation, and research.</p>
        </Reveal>

        <Reveal as="ul" delay={80} className="mt-10 grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-line gap-px sm:grid-cols-3 lg:grid-cols-4">
          {tools.map((tool) => (
            <li key={tool.name} className="group flex items-center gap-3.5 bg-surface p-4 transition-colors hover:bg-paper sm:p-5">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-sunken text-ink-soft transition-colors group-hover:bg-accent-50 group-hover:text-accent-600">
                <Icon name={tool.icon} size={17} />
              </span>
              <span className="min-w-0">
                <span className="block text-[0.9375rem] leading-tight font-medium text-ink">{tool.name}</span>
                <span className="mt-0.5 block text-xs text-muted">{tool.use}</span>
              </span>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
