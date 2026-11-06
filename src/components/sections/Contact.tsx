import { profile } from '../../data/portfolio'
import { contactLinks, resume } from '../../lib/contact'
import { ButtonLink } from '../ui/Button'
import { Icon, type IconName } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'
import { Value } from '../ui/Value'

interface DetailProps {
  icon: IconName
  label: string
  value: string
  href: string | null
}

function Detail({ icon, label, value, href }: DetailProps) {
  const body = (
    <>
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-sunken text-ink transition-colors group-hover:bg-accent-50 group-hover:text-accent-600">
        <Icon name={icon} size={18} />
      </span>
      <span className="min-w-0">
        <span className="block text-xs text-muted">{label}</span>
        <span className="mt-0.5 block truncate font-medium text-ink">
          <Value>{value}</Value>
        </span>
      </span>
      {href && (
        <Icon
          name="arrowUpRight"
          size={16}
          className="ml-auto shrink-0 text-muted transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-600"
        />
      )}
    </>
  )
  const cls =
    'group flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 shadow-card transition-[border-color,box-shadow] duration-300'
  return href ? (
    <a href={href} className={`${cls} hover:border-line-strong hover:shadow-lift`}>
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  )
}

export function Contact() {
  const { email, linkedin } = contactLinks

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="bg-dots pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_20%_40%,black,transparent)]"
      />
      <div className="container-page relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow flex items-center gap-3 text-muted">
              <span className="text-accent-600">07</span>
              <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
              Contact
            </p>
            <h2
              id="contact-title"
              className="mt-6 text-5xl leading-[1] font-semibold tracking-[-0.045em] text-balance text-ink sm:text-6xl lg:text-7xl"
            >
              Hiring for a BA or PM role? <span className="font-serif font-normal tracking-[-0.02em] text-accent-600 italic">Let’s talk.</span>
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-pretty text-muted">
              I’m open to Business Analyst and Product Manager roles, especially in EdTech, higher
              education, AI, and accessibility. Send me a note or grab my resume, and I’ll get back to you.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink
                to={email.href ?? '#contact-details'}
                external
                size="lg"
                icon="arrowUpRight"
              >
                Get In Touch
              </ButtonLink>
              <ButtonLink
                to={resume.href}
                download={resume.filename}
                external
                size="lg"
                variant="secondary"
                icon="download"
              >
                Download Resume
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5 lg:pt-16">
            <div id="contact-details" className="space-y-3">
              <Detail icon="mail" label="Email" value={email.label} href={email.href} />
              <Detail icon="linkedin" label="LinkedIn" value={linkedin.label} href={linkedin.href} />
              <Detail icon="mapPin" label="Location" value={profile.contact.location} href={null} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
