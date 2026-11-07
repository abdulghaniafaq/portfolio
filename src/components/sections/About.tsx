import { about, principles } from '../../data/portfolio'
import { Chip } from '../ui/Chip'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

/* Three circles of radius R on an equilateral triangle; markers sit in each pair-only lens. */
const R = 88
const circles = [
  { name: 'Business', cx: 160, cy: 100, fill: 'var(--color-ink)', opacity: 0.045, from: '0px, -28px', label: [160, 66] },
  { name: 'Product', cx: 112, cy: 183, fill: 'var(--color-accent-500)', opacity: 0.1, from: '-28px, 18px', label: [80, 210] },
  { name: 'Technology', cx: 208, cy: 183, fill: 'var(--color-ink)', opacity: 0.045, from: '28px, 18px', label: [240, 210] },
] as const

const overlaps = [
  { n: 1, x: 124, y: 135, pair: 'Business × Product', text: 'Problems turned into a prioritized roadmap' },
  { n: 2, x: 196, y: 135, pair: 'Business × Technology', text: 'Feasibility, process, and platform fit' },
  { n: 3, x: 160, y: 197, pair: 'Product × Technology', text: 'User stories, backlog, and delivery' },
]

function IntersectionDiagram() {
  return (
    <figure className="rounded-2xl border border-line bg-surface p-6 shadow-card sm:p-8">
      <svg
        viewBox="0 0 320 290"
        className="mx-auto w-full max-w-[22rem]"
        role="img"
        aria-labelledby="venn-title venn-desc"
      >
        <title id="venn-title">Business, Product and Technology overlap; my work sits in the center.</title>
        <desc id="venn-desc">
          A Venn diagram of three overlapping circles. Numbered markers 1 to 3 sit where two circles overlap and are
          explained in the list below. The center, where all three overlap, is where requirements become products.
        </desc>

        {circles.map((c) => (
          <circle
            key={c.name}
            className="venn-circle"
            cx={c.cx}
            cy={c.cy}
            r={R}
            fill={c.fill}
            fillOpacity={c.opacity}
            stroke="var(--color-line-strong)"
            strokeWidth="1.25"
            style={{ ['--from' as string]: c.from }}
          />
        ))}

        {circles.map((c) => (
          <text
            key={`${c.name}-t`}
            className="venn-marker fill-ink text-[13px] font-medium"
            x={c.label[0]}
            y={c.label[1]}
            textAnchor="middle"
          >
            {c.name}
          </text>
        ))}

        {overlaps.map((o) => (
          <g key={o.n} className="venn-marker">
            <circle cx={o.x} cy={o.y} r="9.5" fill="var(--color-surface)" stroke="var(--color-line-strong)" strokeWidth="1.25" />
            <text x={o.x} y={o.y + 3.6} textAnchor="middle" className="fill-ink font-mono text-[10px] font-medium">
              {o.n}
            </text>
          </g>
        ))}

        {/* Center: all three */}
        <g className="venn-marker">
          <circle className="venn-ping" cx="160" cy="155" r="13" fill="var(--color-accent-500)" />
          <circle cx="160" cy="155" r="13" fill="var(--color-accent-500)" fillOpacity="0.16" />
          <circle cx="160" cy="155" r="6" fill="var(--color-accent-600)" />
        </g>
      </svg>

      <figcaption className="mt-6">
        <p className="text-center text-sm font-medium text-ink">Business × Product × Technology</p>
        <ol className="mt-5 space-y-3 border-t border-line pt-5">
          {overlaps.map((o) => (
            <li key={o.n} className="flex items-start gap-3 text-sm">
              <span
                aria-hidden="true"
                className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-line-strong font-mono text-[0.6875rem] font-medium text-ink"
              >
                {o.n}
              </span>
              <span className="min-w-0 text-muted [overflow-wrap:anywhere]">
                <span className="font-medium text-ink">{o.pair}</span>
                <span aria-hidden="true"> · </span>
                <span className="sr-only">: </span>
                {o.text}
              </span>
            </li>
          ))}
          <li className="flex items-start gap-3 text-sm">
            <span aria-hidden="true" className="mt-0.5 grid size-5 shrink-0 place-items-center">
              <span className="size-3 rounded-full bg-accent-600 ring-4 ring-accent-500/20" />
            </span>
            <span className="min-w-0 text-muted [overflow-wrap:anywhere]">
              <span className="font-medium text-ink">All three</span>
              <span aria-hidden="true"> · </span>
              <span className="sr-only">: </span>
              Where requirements become shipped products
            </span>
          </li>
        </ol>
      </figcaption>
    </figure>
  )
}

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading id="about-title" index="01" label="About" title="From business problem to shipped product" />

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
