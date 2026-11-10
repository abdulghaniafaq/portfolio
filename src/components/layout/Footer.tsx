import { Link } from 'react-router-dom'
import { navLinks, profile } from '../../data/portfolio'
import { contactLinks } from '../../lib/contact'
import { Icon, type IconName } from '../ui/Icon'
import { Value } from '../ui/Value'

function SocialLink({ icon, label, href }: { icon: IconName; label: string; href: string | null }) {
  const inner = (
    <>
      <Icon name={icon} size={16} className="shrink-0" />
      <span className="min-w-0 [overflow-wrap:anywhere]">
        <Value>{label}</Value>
      </span>
    </>
  )
  const cls = 'flex min-h-9 w-full min-w-0 items-center gap-2.5 py-1 text-sm'
  return href ? (
    <a href={href} className={`${cls} text-white/75 transition-colors hover:text-white`}>
      {inner}
    </a>
  ) : (
    <span className={`${cls} text-white/55`}>{inner}</span>
  )
}

export function Footer() {
  return (
    <footer className="on-dark bg-panel text-white">
      {/* Extra bottom space: the fixed "Quick answers" button rests here when the page is scrolled to the end, instead of covering "Back to top". */}
      <div className="container-page pt-16 pb-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-12 lg:col-span-5">
            <p className="text-xl font-semibold tracking-tight">{profile.name}</p>
            <p className="mt-1 text-sm text-white/60">{profile.shortTitle}</p>
            <p className="mt-6 max-w-sm font-serif text-2xl leading-snug text-white/90 italic">
              “{profile.tagline}”
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-6 lg:col-span-3">
            <p className="eyebrow text-white/50">Navigate</p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="inline-flex min-h-9 items-center py-1 text-sm text-white/75 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0 md:col-span-6 lg:col-span-4">
            <p className="eyebrow text-white/50">Connect</p>
            <ul className="mt-4 space-y-3">
              <li>
                <SocialLink icon="linkedin" {...contactLinks.linkedin} />
              </li>
              <li>
                <SocialLink icon="mail" {...contactLinks.email} />
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright © 2026 {profile.name}</p>
          <a href="#main" className="inline-flex min-h-9 items-center gap-1.5 py-1 transition-colors hover:text-white">
            Back to top
            <Icon name="arrowUpRight" size={14} className="-rotate-45" />
          </a>
        </div>
      </div>
    </footer>
  )
}
