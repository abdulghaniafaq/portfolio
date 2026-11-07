import { useEffect, useRef, useState } from 'react'
import { Icon } from '../ui/Icon'

/**
 * "Product canvas": a work item moving through discovery, definition, and delivery.
 * It loops on its own — cards get picked up and completed, acceptance criteria tick
 * off, and the requirement → story → release line fills — then resets.
 *
 * The canvas is decorative and hidden from assistive tech. Because it moves on its own,
 * a pause button (outside the hidden region) is provided, the loop also pauses when the
 * canvas is off-screen or the tab is hidden, and `prefers-reduced-motion` gets a still frame.
 */

type CardId = 'interviews' | 'process' | 'story' | 'priorities' | 'sprint' | 'uat'

const columns: { label: string; cards: { id: CardId; title: string; tag: string }[] }[] = [
  {
    label: 'Discover',
    cards: [
      { id: 'interviews', title: 'Stakeholder interviews', tag: 'Research' },
      { id: 'process', title: 'Current-state process', tag: 'Analysis' },
    ],
  },
  {
    label: 'Define',
    cards: [
      { id: 'story', title: 'User story + acceptance criteria', tag: 'Story' },
      { id: 'priorities', title: 'Feature priorities', tag: 'Roadmap' },
    ],
  },
  {
    label: 'Deliver',
    cards: [
      { id: 'sprint', title: 'Sprint ready', tag: 'Jira' },
      { id: 'uat', title: 'UAT sign-off', tag: 'QA' },
    ],
  },
]

const order: CardId[] = ['interviews', 'process', 'story', 'priorities', 'sprint', 'uat']
const criteria = ['Given the user role', 'When the action is taken', 'Then the outcome is met']

/** One entry per animation tick. `active` is an index into `order`; `order.length` means "released". */
interface Tick {
  active: number
  checked: number
  progress: number
  ms: number
}
const STEP = 1100
const timeline: Tick[] = [
  { active: 0, checked: 0, progress: 0.06, ms: STEP },
  { active: 1, checked: 0, progress: 0.2, ms: STEP },
  { active: 2, checked: 0, progress: 0.5, ms: STEP },
  { active: 2, checked: 1, progress: 0.5, ms: STEP },
  { active: 2, checked: 2, progress: 0.5, ms: STEP },
  { active: 2, checked: 3, progress: 0.5, ms: STEP },
  { active: 3, checked: 3, progress: 0.62, ms: STEP },
  { active: 4, checked: 3, progress: 0.8, ms: STEP },
  { active: 5, checked: 3, progress: 0.92, ms: STEP },
  { active: 6, checked: 3, progress: 1, ms: 2600 },
]
/** The frame shown when motion is reduced or paused before the first tick: it mirrors the original still design. */
const STILL = 5

/** How long (ms) each card spends active, so its progress bar fills in exactly that time. */
const fillMs = order.map((_, i) => timeline.filter((t) => t.active === i).reduce((sum, t) => sum + t.ms, 0))

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMatches(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return matches
}

function useInView<T extends Element>() {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(true)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.15 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return [ref, inView] as const
}

function usePageVisible() {
  const [visible, setVisible] = useState(() => !document.hidden)
  useEffect(() => {
    const onChange = () => setVisible(!document.hidden)
    document.addEventListener('visibilitychange', onChange)
    return () => document.removeEventListener('visibilitychange', onChange)
  }, [])
  return visible
}

const Check = ({ className = 'size-2' }: { className?: string }) => (
  <svg viewBox="0 0 12 12" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M3 6l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export function HeroVisual() {
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const [userPaused, setUserPaused] = useState(false)
  const [ref, inView] = useInView<HTMLDivElement>()
  const pageVisible = usePageVisible()
  const [step, setStep] = useState(0)

  const running = !reduceMotion && !userPaused && inView && pageVisible

  useEffect(() => {
    if (!running) return
    const id = setTimeout(() => setStep((s) => (s + 1) % timeline.length), timeline[step].ms)
    return () => clearTimeout(id)
  }, [running, step])

  const tick = reduceMotion ? timeline[STILL] : timeline[step]
  const released = tick.active >= order.length
  const stage = tick.active < 2 ? 0 : tick.active < 4 ? 1 : 2
  const paused = !running

  return (
    <div ref={ref} data-paused={paused} className="relative mx-auto w-full max-w-[34rem] select-none">
      <div aria-hidden="true">
        {/* Floating label: the intersection */}
        <div className="absolute -top-5 left-6 z-20 flex max-w-[calc(100%-2rem)] flex-wrap items-center gap-x-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs text-ink-soft shadow-lift">
          <span className="font-medium text-ink">Business</span>
          <span className="text-accent-600">×</span>
          <span className="font-medium text-ink">Product</span>
          <span className="text-accent-600">×</span>
          <span className="font-medium text-ink">Technology</span>
        </div>

        {/* Canvas */}
        <div className="relative overflow-hidden rounded-2xl border border-line bg-surface shadow-lift">
          <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
            <div className="flex items-center gap-2.5">
              <span className="grid size-6 place-items-center rounded-md bg-accent-50 text-accent-600">
                <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M2 4h5M2 8h8M2 12h4M11 3l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-[0.8125rem] font-medium text-ink">Product canvas</span>
            </div>
            <span
              className={`eyebrow flex items-center gap-1.5 text-[0.625rem] transition-colors duration-300 ${
                released ? 'text-accent-600' : 'text-muted'
              }`}
            >
              {released ? (
                <>
                  Shipped <Check className="size-2.5" />
                </>
              ) : (
                'Problem → Product'
              )}
            </span>
          </div>

          <div className="bg-dots relative grid grid-cols-3 gap-3 p-4 sm:gap-4 sm:p-5">
            {columns.map((col) => {
              const idxs = col.cards.map((c) => order.indexOf(c.id))
              const colActive = idxs.includes(tick.active)
              const colDone = idxs.every((i) => i < tick.active)
              return (
                <div key={col.label} className="flex flex-col gap-2.5 sm:gap-3">
                  <div className="flex items-center gap-2 px-0.5">
                    <span
                      className={`size-1.5 rounded-full transition-colors duration-300 ${
                        colActive ? 'pulse-dot bg-accent-500' : colDone ? 'bg-accent-500' : 'bg-line-strong'
                      }`}
                    />
                    <span className="text-[0.6875rem] font-medium tracking-wide text-muted uppercase">
                      {col.label}
                    </span>
                  </div>
                  {col.cards.map((card) => {
                    const i = order.indexOf(card.id)
                    const active = i === tick.active
                    const done = i < tick.active
                    return (
                      <div
                        key={card.id}
                        className={`relative overflow-hidden rounded-xl border p-2.5 transition-[transform,background-color,border-color,box-shadow] duration-500 sm:p-3 ${
                          active
                            ? '-translate-y-0.5 border-accent-500/40 bg-accent-50 shadow-lift'
                            : 'border-line bg-paper'
                        }`}
                      >
                        <p
                          className={`text-[0.6875rem] leading-snug font-medium transition-colors duration-300 sm:text-xs ${
                            done ? 'text-muted' : 'text-ink'
                          }`}
                        >
                          {card.title}
                        </p>
                        <div className="mt-2.5 flex items-center justify-between">
                          <span
                            className={`rounded px-1.5 py-0.5 font-mono text-[0.5625rem] tracking-wide uppercase transition-colors duration-300 ${
                              active ? 'bg-accent-100 text-accent-700' : 'bg-sunken text-muted'
                            }`}
                          >
                            {card.tag}
                          </span>
                          <span className="relative grid size-3.5 place-items-center">
                            <span
                              className={`absolute hidden gap-0.5 transition-opacity duration-300 sm:flex ${
                                done ? 'opacity-0' : 'opacity-100'
                              }`}
                            >
                              <span className="size-1 rounded-full bg-line-strong" />
                              <span className="size-1 rounded-full bg-line-strong" />
                            </span>
                            <span
                              className={`absolute grid size-3.5 place-items-center rounded-full bg-accent-500 text-white transition-[opacity,transform] duration-300 ${
                                done ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                              }`}
                            >
                              <Check className="size-2" />
                            </span>
                          </span>
                        </div>
                        {active && !reduceMotion && (
                          <span
                            key={`${card.id}-fill`}
                            className="card-fill absolute inset-x-0 bottom-0 h-0.5 bg-accent-500"
                            style={{ ['--fill-ms' as string]: `${fillMs[i]}ms` }}
                          />
                        )}
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>

          {/* Flow: requirement → story → release */}
          <div className="border-t border-line px-5 py-4 sm:pr-56 lg:pr-5 xl:pr-48">
            <svg viewBox="0 0 400 36" className="h-9 w-full" fill="none">
              <line x1="22" y1="18" x2="378" y2="18" stroke="var(--color-line-strong)" strokeWidth="1.5" />
              <line
                x1="22"
                y1="18"
                x2="378"
                y2="18"
                className="flow-line"
                stroke="var(--color-accent-500)"
                strokeWidth="1.5"
                style={{
                  transform: `scaleX(${tick.progress})`,
                  transformOrigin: 'left',
                  transformBox: 'fill-box',
                  transition: 'transform 900ms var(--ease-out-soft)',
                }}
              />
              {[
                { x: 22, on: true },
                { x: 200, on: tick.active >= 2 },
                { x: 378, on: released },
              ].map(({ x, on }) => (
                <g key={x}>
                  <circle
                    cx={x}
                    cy="18"
                    r="7"
                    strokeWidth="1.5"
                    style={{
                      fill: on ? 'var(--color-accent-500)' : 'var(--color-surface)',
                      stroke: on ? 'var(--color-accent-500)' : 'var(--color-line-strong)',
                      transition: 'fill 300ms, stroke 300ms',
                    }}
                  />
                  <path
                    d={`M${x - 3} 18l2 2 4-4`}
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ opacity: on ? 1 : 0, transition: 'opacity 300ms' }}
                  />
                </g>
              ))}
            </svg>
            <div className="mt-1 flex justify-between text-[0.6875rem] text-muted">
              {['Requirement', 'User story', 'Release'].map((label, i) => (
                <span
                  key={label}
                  className={`transition-colors duration-300 ${stage === i ? 'font-medium text-ink' : ''}`}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Floating note: a requirement being traced */}
        <div className="absolute -right-3 -bottom-8 z-20 hidden w-52 rounded-xl border border-line bg-surface p-3.5 shadow-lift sm:block lg:hidden xl:-right-8 xl:block">
          <p className="eyebrow text-[0.5625rem] text-accent-600">Acceptance criteria</p>
          <ul className="mt-2 space-y-1.5">
            {criteria.map((t, i) => {
              const on = i < tick.checked
              return (
                <li key={t} className="flex items-center gap-2 text-[0.6875rem] text-ink-soft">
                  <span
                    className={`grid size-3.5 place-items-center rounded-full border transition-[background-color,border-color,color,transform] duration-300 ${
                      on
                        ? 'scale-100 border-transparent bg-accent-50 text-accent-600'
                        : 'scale-90 border-line-strong bg-surface text-transparent'
                    }`}
                  >
                    <Check />
                  </span>
                  {t}
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      {!reduceMotion && (
        <button
          type="button"
          onClick={() => setUserPaused((p) => !p)}
          aria-label={userPaused ? 'Play hero animation' : 'Pause hero animation'}
          className="absolute -bottom-12 left-0 grid size-9 place-items-center rounded-full border border-line-strong bg-surface text-ink-soft transition-colors hover:border-ink hover:text-ink sm:-bottom-10"
        >
          <Icon name={userPaused ? 'play' : 'pause'} size={14} />
        </button>
      )}
    </div>
  )
}
