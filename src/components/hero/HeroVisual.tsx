/**
 * Decorative "product canvas": a problem moving through discovery,
 * definition, and delivery. Purely illustrative — hidden from assistive tech.
 */

const columns = [
  {
    label: 'Discover',
    cards: [
      { title: 'Stakeholder interviews', tag: 'Research' },
      { title: 'Current-state process', tag: 'Analysis' },
    ],
  },
  {
    label: 'Define',
    cards: [
      { title: 'User story + acceptance criteria', tag: 'Story', highlight: true },
      { title: 'Feature priorities', tag: 'Roadmap' },
    ],
  },
  {
    label: 'Deliver',
    cards: [
      { title: 'Sprint ready', tag: 'Jira' },
      { title: 'UAT sign-off', tag: 'QA' },
    ],
  },
]

export function HeroVisual() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[34rem] select-none">
      {/* Floating label: the intersection */}
      <div className="absolute -top-5 left-6 z-20 flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs text-ink-soft shadow-lift">
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
          <span className="eyebrow text-[0.625rem] text-muted">Problem → Product</span>
        </div>

        <div className="bg-dots relative grid grid-cols-3 gap-3 p-4 sm:gap-4 sm:p-5">
          {columns.map((col, ci) => (
            <div key={col.label} className="flex flex-col gap-2.5 sm:gap-3">
              <div className="flex items-center gap-2 px-0.5">
                <span
                  className={`size-1.5 rounded-full ${
                    ci === 1 ? 'pulse-dot bg-accent-500' : 'bg-line-strong'
                  }`}
                />
                <span className="text-[0.6875rem] font-medium tracking-wide text-muted uppercase">
                  {col.label}
                </span>
              </div>
              {col.cards.map((card) => (
                <div
                  key={card.title}
                  className={`rounded-xl border p-2.5 sm:p-3 ${
                    'highlight' in card && card.highlight
                      ? 'border-accent-500/40 bg-accent-50 shadow-card'
                      : 'border-line bg-paper'
                  }`}
                >
                  <p className="text-[0.6875rem] leading-snug font-medium text-ink sm:text-xs">
                    {card.title}
                  </p>
                  <div className="mt-2.5 flex items-center justify-between">
                    <span
                      className={`rounded px-1.5 py-0.5 font-mono text-[0.5625rem] tracking-wide uppercase ${
                        'highlight' in card && card.highlight
                          ? 'bg-accent-100 text-accent-700'
                          : 'bg-sunken text-muted'
                      }`}
                    >
                      {card.tag}
                    </span>
                    <span className="hidden gap-0.5 sm:flex">
                      <span className="size-1 rounded-full bg-line-strong" />
                      <span className="size-1 rounded-full bg-line-strong" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Flow: requirement → story → release */}
        <div className="border-t border-line px-5 py-4 sm:pr-56 lg:pr-5 xl:pr-48">
          <svg viewBox="0 0 400 36" className="h-9 w-full" fill="none">
            <line x1="22" y1="18" x2="378" y2="18" stroke="var(--color-line-strong)" strokeWidth="1.5" />
            <line
              x1="22"
              y1="18"
              x2="200"
              y2="18"
              className="flow-line"
              stroke="var(--color-accent-500)"
              strokeWidth="1.5"
            />
            {[22, 200, 378].map((x, i) => (
              <g key={x}>
                <circle
                  cx={x}
                  cy="18"
                  r="7"
                  fill={i < 2 ? 'var(--color-accent-500)' : 'var(--color-surface)'}
                  stroke={i < 2 ? 'var(--color-accent-500)' : 'var(--color-line-strong)'}
                  strokeWidth="1.5"
                />
                {i < 2 && (
                  <path
                    d={`M${x - 3} 18l2 2 4-4`}
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
              </g>
            ))}
          </svg>
          <div className="mt-1 flex justify-between text-[0.6875rem] text-muted">
            <span>Requirement</span>
            <span className="font-medium text-ink">User story</span>
            <span>Release</span>
          </div>
        </div>
      </div>

      {/* Floating note: a requirement being traced */}
      <div className="absolute -right-3 -bottom-8 z-20 hidden w-52 sm:block lg:hidden xl:block rounded-xl border border-line bg-surface p-3.5 shadow-lift xl:-right-8">
        <p className="eyebrow text-[0.5625rem] text-accent-600">Acceptance criteria</p>
        <ul className="mt-2 space-y-1.5">
          {['Given the user role', 'When the action is taken', 'Then the outcome is met'].map((t) => (
            <li key={t} className="flex items-center gap-2 text-[0.6875rem] text-ink-soft">
              <span className="grid size-3.5 place-items-center rounded-full bg-accent-50 text-accent-600">
                <svg viewBox="0 0 12 12" className="size-2" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
