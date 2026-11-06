import { useTheme } from '../../hooks/useTheme'
import { Icon } from './Icon'

/** Sun/moon button that switches between light and dark. `className` sizes it. */
export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle } = useTheme()
  const dark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-line-strong bg-surface text-ink transition-colors hover:border-ink ${className}`}
    >
      <Icon name={dark ? 'sun' : 'moon'} size={16} />
    </button>
  )
}
