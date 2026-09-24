import { about, principles } from '../../data/portfolio'
import { Chip } from '../ui/Chip'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

function IntersectionDiagram() {
  const circles = [
    { cx: 150, cy: 118, label: 'Business', lx: 150, ly: 62 },
    { cx: 104, cy: 196, label: 'Product', lx: 68, ly: 236 },
    { cx: 196, cy: 196, label: 'Technology', lx: 232, ly: 236 },
  ]
  return (
    <figure className="rounded-2xl border border-line bg-surface p-6 shadow-card sm:p-8">
      <svg
        viewBox="0 0 300 300"
        className="mx-auto w-full max-w-[20rem]"
        role="img"
        aria-labelledby="venn-title"
      >
        <title id="venn-title">Business, Product and Technology overlap; my work sits in the center.</title>
        {circles.map((c) => (
          <circle
            key={c.label}
            cx={c.cx}
            cy={c.cy}
            r="78"
            fill="var(--color-ink)"
            fillOpacity="0.035"
            stroke="var(--color-line-strong)"
            strokeWidth="1.25"
          />
        ))}
        {circles.map((c) => (
          <text
            key={`${c.label}-t`}
            x={c.lx}
            y={c.ly}
            textAnchor="middle"
            className="fill-ink text-[13px] font-medium"
          >
            {c.label}
          </text>
        ))}
        <circle cx="150" cy="170" r="20" fill="var(--color-accent-500)" fillOpacity="0.14" />
        <circle cx="150" cy="170" r="6" fill="var(--color-accent-600)" />
      </svg>
      <figcaption className="mt-4 text-center text-sm text-muted">
        <span className="font-medium text-ink">Business × Product × Technology</span>
        <br />
        The space where requirements become products.
      </figcaption>
    </figure>
  )
}

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading id="about-title" index="01" label="About" title="About Me" />

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <IntersectionDiagram />
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-2xl leading-snug font-medium tracking-[-0.02em] text-balance text-ink sm:text-[1.75rem]">
                {about.lead}
              </p>
            </Reveal>
            <Reveal delay={80} className="mt-6 space-y-4 text-[1.0625rem] leading-relaxed text-muted">
              {about.paragraphs.map((p) => (
                <p key={p.slice(0, 24)} className="text-pretty">
                  {p}
                </p>
              ))}
            </Reveal>
            <Reveal delay={140} className="mt-9">
              <h3 className="eyebrow text-muted">Focus areas</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {about.focusAreas.map((area) => (
                  <li key={area}>
                    <Chip>{area}</Chip>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        {/* What I bring */}
        <div className="mt-24">
          <Reveal>
            <h3 className="text-2xl font-semibold tracking-tight text-ink">What I Bring</h3>
          </Reveal>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 70}>
                <article className="group h-full rounded-2xl border border-line bg-surface p-6 shadow-card transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-lift">
                  <div className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-xl bg-sunken text-ink transition-colors group-hover:bg-accent-50 group-hover:text-accent-600">
                      <Icon name={p.icon} size={20} />
                    </span>
                    <span className="font-mono text-xs text-muted">0{i + 1}</span>
                  </div>
                  <h4 className="mt-8 text-lg font-semibold tracking-tight text-ink">{p.title}</h4>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{p.body}</p>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
