import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Icon, type IconName } from './Icon'

type Variant = 'primary' | 'secondary' | 'ghost' | 'inverse'

const base =
  'group inline-flex max-w-full items-center justify-center gap-2 rounded-full text-center font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out active:translate-y-px'

const sizes = {
  md: 'min-h-11 px-[min(1.25rem,5vw)] py-2 text-[0.9375rem]',
  lg: 'min-h-12 px-[min(1.5rem,5vw)] py-2.5 text-base',
}

const variants: Record<Variant, string> = {
  primary: 'bg-ink text-paper hover:bg-accent-600 shadow-card forced-colors:border',
  secondary: 'border border-line-strong bg-surface text-ink hover:border-ink',
  ghost: 'text-ink hover:text-accent-600',
  inverse: 'bg-white text-ink-fixed hover:bg-accent-400 forced-colors:border',
}

interface ButtonLinkProps {
  to: string
  children: ReactNode
  variant?: Variant
  size?: keyof typeof sizes
  icon?: IconName
  external?: boolean
  /** Suggested filename; makes the browser download the file instead of navigating. */
  download?: string
  className?: string
}

/** Pill-shaped link. Internal routes use react-router; `external` renders a plain anchor. */
export function ButtonLink({
  to,
  children,
  variant = 'primary',
  size = 'md',
  icon = 'arrowRight',
  external,
  download,
  className = '',
}: ButtonLinkProps) {
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`
  const content = (
    <>
      {children}
      <Icon
        name={icon}
        size={17}
        className="transition-transform duration-200 group-hover:translate-x-0.5"
      />
    </>
  )
  if (external) {
    return (
      <a href={to} download={download} className={classes}>
        {content}
      </a>
    )
  }
  return (
    <Link to={to} className={classes}>
      {content}
    </Link>
  )
}
