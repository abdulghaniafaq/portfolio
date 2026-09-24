import type { JSX } from 'react'
import type { CoverVariant } from '../../data/types'

/**
 * Abstract, per-project illustrations. Each one hints at the kind of
 * thinking involved rather than showing a screenshot.
 */

const INK = 'var(--color-ink)'
const LINE = 'var(--color-line-strong)'
const ACCENT = 'var(--color-accent-500)'
const SURFACE = 'var(--color-surface)'

function Network() {
  // AI product: connected capabilities around a core
  const nodes = [
    [80, 60], [150, 40], [230, 70], [60, 140], [250, 150], [110, 190], [200, 200],
  ]
  return (
    <>
      {nodes.map(([x, y]) => (
        <line key={`l${x}${y}`} x1={160} y1={120} x2={x} y2={y} stroke={LINE} strokeWidth="1.2" />
      ))}
      <path d="M80 60 L150 40 L230 70 M60 140 L110 190 L200 200 L250 150" stroke={LINE} strokeWidth="1.2" fill="none" strokeDasharray="3 4" />
      {nodes.map(([x, y], i) => (
        <circle key={`n${x}${y}`} cx={x} cy={y} r={i % 3 === 0 ? 7 : 5} fill={SURFACE} stroke={INK} strokeWidth="1.4" />
      ))}
      <circle cx="160" cy="120" r="30" fill={ACCENT} fillOpacity="0.12" />
      <circle cx="160" cy="120" r="16" fill={ACCENT} />
      <path d="M154 120h12M160 114v12" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
    </>
  )
}

function Document() {
  // Accessibility review: a document with checks against requirements
  const rows = [70, 96, 122, 148, 174]
  return (
    <>
      <rect x="70" y="36" width="130" height="170" rx="8" fill={SURFACE} stroke={INK} strokeWidth="1.4" />
      <rect x="86" y="50" width="60" height="8" rx="2" fill={INK} />
      {rows.map((y, i) => (
        <g key={y}>
          <rect x="86" y={y} width={i % 2 ? 70 : 92} height="5" rx="2" fill={LINE} />
          <rect x="86" y={y + 10} width={i % 2 ? 50 : 64} height="5" rx="2" fill={LINE} opacity="0.6" />
        </g>
      ))}
      {rows.map((y, i) => (
        <g key={`c${y}`} transform={`translate(222 ${y - 2})`}>
          <circle cx="8" cy="8" r="8" fill={i === 2 ? SURFACE : ACCENT} stroke={i === 2 ? INK : ACCENT} strokeWidth="1.4" strokeDasharray={i === 2 ? '2 2' : undefined} />
          {i !== 2 && <path d="M4.5 8l2.3 2.3L11.5 5.6" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
          <line x1="-18" y1="8" x2="-2" y2="8" stroke={LINE} strokeWidth="1.2" strokeDasharray="2 3" />
        </g>
      ))}
    </>
  )
}

function Stack() {
  // RFP: solicitation pages mapped into a requirements matrix
  return (
    <>
      <rect x="56" y="66" width="86" height="116" rx="6" fill={SURFACE} stroke={LINE} strokeWidth="1.2" />
      <rect x="48" y="58" width="86" height="116" rx="6" fill={SURFACE} stroke={LINE} strokeWidth="1.2" />
      <rect x="40" y="50" width="86" height="116" rx="6" fill={SURFACE} stroke={INK} strokeWidth="1.4" />
      {[70, 86, 102, 118, 134].map((y, i) => (
        <rect key={y} x="52" y={y} width={i === 2 ? 40 : 60} height="5" rx="2" fill={i === 1 || i === 3 ? ACCENT : LINE} />
      ))}
      <path d="M116 89 C160 89 160 82 190 82" stroke={ACCENT} strokeWidth="1.4" fill="none" />
      <path d="M116 121 C160 121 160 142 190 142" stroke={ACCENT} strokeWidth="1.4" fill="none" />
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2].map((c) => (
          <rect
            key={`${r}${c}`}
            x={190 + c * 28}
            y={68 + r * 30}
            width="24"
            height="24"
            rx="4"
            fill={(r === 0 && c === 0) || (r === 2 && c === 0) ? ACCENT : (r + c) % 2 ? SURFACE : 'var(--color-sunken)'}
            stroke={LINE}
            strokeWidth="1"
          />
        )),
      )}
    </>
  )
}

function Grid() {
  // Research: an opportunity / positioning map
  const dots = [
    [104, 78, 5], [128, 150, 4], [196, 92, 6], [222, 170, 4], [92, 176, 4], [178, 136, 5],
  ]
  return (
    <>
      <rect x="60" y="36" width="200" height="170" rx="8" fill={SURFACE} stroke={INK} strokeWidth="1.4" />
      <line x1="160" y1="46" x2="160" y2="196" stroke={LINE} strokeWidth="1.2" />
      <line x1="70" y1="121" x2="250" y2="121" stroke={LINE} strokeWidth="1.2" />
      <rect x="164" y="50" width="90" height="67" rx="4" fill={ACCENT} fillOpacity="0.1" />
      {dots.map(([x, y, r]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r={r} fill={INK} fillOpacity="0.75" />
      ))}
      <circle cx="220" cy="74" r="9" fill={ACCENT} />
      <circle cx="220" cy="74" r="16" fill="none" stroke={ACCENT} strokeOpacity="0.4" strokeWidth="1.2" />
    </>
  )
}

const variants: Record<CoverVariant, () => JSX.Element> = {
  network: Network,
  document: Document,
  stack: Stack,
  grid: Grid,
}

export function CaseCover({ variant, className = '' }: { variant: CoverVariant; className?: string }) {
  const Art = variants[variant]
  return (
    <div aria-hidden="true" className={`bg-dots relative overflow-hidden bg-paper ${className}`}>
      <svg viewBox="0 0 320 240" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
        <Art />
      </svg>
    </div>
  )
}
