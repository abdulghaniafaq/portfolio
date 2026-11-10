import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'
const PAGE_COLOR: Record<Theme, string> = { light: '#f7f6f2', dark: '#0d0f12' }

const read = (): Theme => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')

const systemTheme = (): Theme => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

let releaseTimer: number | undefined

function apply(theme: Theme) {
  const root = document.documentElement
  // Freeze colour transitions for a moment so the whole page flips at once. Otherwise the elements that have a
  // colour transition (header, buttons, cards) fade while the page background switches instantly.
  root.classList.add('theme-switching')
  root.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', PAGE_COLOR[theme])
  window.clearTimeout(releaseTimer)
  releaseTimer = window.setTimeout(() => root.classList.remove('theme-switching'), 100)
}

function readSaved(): Theme | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === 'light' || saved === 'dark' ? saved : null
  } catch {
    return null // storage blocked: follow the system
  }
}

/**
 * Light/dark theme. The initial value is set before first paint by the inline script in
 * index.html (saved choice, else the system preference). Until the visitor picks a theme
 * themselves, it keeps following the system setting; once they do, other open tabs follow too.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(read)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const sync = (next: Theme) => {
      apply(next)
      setTheme(next)
    }
    const onSystemChange = () => {
      if (readSaved()) return // the visitor chose; the system no longer decides
      sync(systemTheme())
    }
    // The choice was made (or cleared) in another tab of this site.
    const onStorage = (e: StorageEvent) => {
      if (e.key !== null && e.key !== STORAGE_KEY) return
      sync(readSaved() ?? systemTheme())
    }
    mq.addEventListener('change', onSystemChange)
    window.addEventListener('storage', onStorage)
    return () => {
      mq.removeEventListener('change', onSystemChange)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  const toggle = useCallback(() => {
    const next: Theme = read() === 'dark' ? 'light' : 'dark'
    apply(next)
    setTheme(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* storage blocked: the choice lasts for this visit only */
    }
  }, [])

  return { theme, toggle }
}
