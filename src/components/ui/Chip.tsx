import type { ReactNode } from 'react'

interface ChipProps {
  children: ReactNode
  tone?: 'default' | 'accent' | 'dark'
  className?: string
}

const tones = {
  default: 'border-line bg-surface text-ink-soft',
  accent: 'border-accent-100 bg-accent-50 text-accent-700',
  dark: 'border-white/15 bg-white/5 text-white/80',
}

export function Chip({ children, tone = 'default', className = '' }: ChipProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[0.8125rem] leading-5 ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}
