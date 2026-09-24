import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navLinks, profile } from '../../data/portfolio'
import { useActiveSection } from '../../hooks/useActiveSection'
import { Icon } from '../ui/Icon'

const sectionIds = navLinks.map((l) => l.href)

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-3 ${className}`}
      aria-label={`${profile.name} — home`}
    >
      <span
        aria-hidden="true"
        className="relative grid size-9 place-items-center rounded-[10px] bg-ink text-[0.8125rem] font-semibold tracking-tight text-white transition-colors group-hover:bg-accent-600"
      >
        {profile.initials}
        <span className="absolute -right-0.5 -bottom-0.5 size-2 rounded-full bg-accent-500 ring-2 ring-paper group-hover:bg-ink" />
      </span>
      <span className="text-[0.9375rem] font-semibold tracking-tight text-ink">{profile.name}</span>
    </Link>
  )
}

export function Navbar() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const active = useActiveSection(sectionIds, isHome)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu whenever the route or hash changes.
  const location = useLocation()
  useEffect(() => setOpen(false), [location.key])

  // Mobile menu: lock scroll, focus first link, close on Escape, keep focus inside.
  useEffect(() => {
    if (!open) return
    const panel = panelRef.current
    const focusables = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>('a, button') ?? [])
    document.body.style.overflow = 'hidden'
    focusables()[0]?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
      if (e.key === 'Tab') {
        const items = [toggleRef.current!, ...focusables()]
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const solid = scrolled || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        solid
          ? 'border-b border-line/80 bg-paper/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav aria-label="Primary" className="container-page flex h-16 items-center justify-between gap-6">
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href
            return (
              <li key={link.href}>
                <Link
                  to={`/#${link.href}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative rounded-full px-3.5 py-2 text-sm transition-colors ${
                    isActive ? 'text-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-accent-600 transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            to="/#contact"
            className="group hidden h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-medium text-white transition-colors hover:bg-accent-600 sm:inline-flex"
          >
            Let’s Work Together
            <Icon name="arrowUpRight" size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          <button
            ref={toggleRef}
            type="button"
            className="relative grid size-10 place-items-center rounded-full border border-line-strong bg-surface lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true" className="relative block h-3 w-4">
              <span
                className={`absolute left-0 h-[1.5px] w-4 bg-ink transition-transform duration-300 ${
                  open ? 'top-1.25 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 h-[1.5px] w-4 bg-ink transition-transform duration-300 ${
                  open ? 'top-1.25 -rotate-45' : 'top-2.5'
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-paper lg:hidden"
      >
        <div className="container-page flex h-full flex-col py-8">
          <ul className="flex flex-col">
            {navLinks.map((link, i) => (
              <li key={link.href} className="border-b border-line">
                <Link
                  to={`/#${link.href}`}
                  className="flex items-baseline justify-between py-5 text-3xl font-semibold tracking-tight text-ink"
                >
                  {link.label}
                  <span className="font-mono text-xs text-muted">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-10">
            <Link
              to="/#contact"
              className="flex h-12 items-center justify-center gap-2 rounded-full bg-ink font-medium text-white"
            >
              Let’s Work Together
              <Icon name="arrowUpRight" size={17} />
            </Link>
            <p className="mt-4 text-center text-sm text-muted">{profile.shortTitle}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
