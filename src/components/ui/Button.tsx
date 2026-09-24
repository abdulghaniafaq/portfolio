import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Icon, type IconName } from './Icon'

type Variant = 'primary' | 'secondary' | 'ghost' | 'inverse'

const base =
  'group inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out active:translate-y-px'

const sizes = {
  md: 'h-11 px-5 text-[0.9375rem]',
  lg: 'h-12 px-6 text-base',
}

const variants: Record<Variant, string> = {
  primary: 'bg-ink text-white hover:bg-accent-600 shadow-card',
  secondary: 'border border-line-strong bg-surface text-ink hover:border-ink',
  ghost: 'text-ink hover:text-accent-600',
  inverse: 'bg-white text-ink hover:bg-accent-400 hover:text-ink',
}

interface ButtonLinkProps {
  to: string
  children: ReactNode
  variant?: Variant
  size?: keyof typeof sizes
  icon?: IconName
  external?: boolean
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
      <a href={to} className={classes}>
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
