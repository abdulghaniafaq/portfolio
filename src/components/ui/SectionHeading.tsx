import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  index: string
  label: string
  title: ReactNode
  description?: ReactNode
  id?: string
  tone?: 'light' | 'dark'
  align?: 'left' | 'split'
}

export function SectionHeading({
  index,
  label,
  title,
  description,
  id,
  tone = 'light',
  align = 'left',
}: SectionHeadingProps) {
  const dark = tone === 'dark'
  return (
    <Reveal
      className={
        align === 'split'
          ? 'grid gap-6 md:grid-cols-12 md:items-end md:gap-10'
          : 'max-w-3xl'
      }
    >
      <div className={align === 'split' ? 'md:col-span-7' : ''}>
        <p className={`eyebrow flex items-center gap-3 ${dark ? 'text-white/60' : 'text-muted'}`}>
          <span className={dark ? 'text-accent-400' : 'text-accent-600'}>{index}</span>
          <span aria-hidden="true" className={`h-px w-8 ${dark ? 'bg-white/25' : 'bg-line-strong'}`} />
          {label}
        </p>
        <h2
          id={id}
          className={`mt-5 text-4xl font-semibold tracking-[-0.035em] text-balance sm:text-5xl lg:text-[3.5rem] lg:leading-[1.04] ${
            dark ? 'text-white' : 'text-ink'
          }`}
        >
          {title}
        </h2>
      </div>
      {description && (
        <p
          className={`text-lg leading-relaxed text-pretty ${
            align === 'split' ? 'md:col-span-5 md:pb-2' : 'mt-6'
          } ${dark ? 'text-white/70' : 'text-muted'}`}
        >
          {description}
        </p>
      )}
    </Reveal>
  )
}
