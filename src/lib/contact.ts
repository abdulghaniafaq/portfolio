import { profile } from '../data/portfolio'
import { isPlaceholder } from './placeholder'

const { email, linkedin } = profile.contact

/** Résumé PDF served from /public. */
export const resume = {
  href: '/Abdul_Ghani_Afaq_Resume.pdf',
  filename: 'Abdul_Ghani_Afaq_Resume.pdf',
}

/** Resolved contact links. `href` is null while the value is still a placeholder. */
export const contactLinks = {
  email: {
    label: email,
    href: isPlaceholder(email) ? null : `mailto:${email}`,
  },
  linkedin: {
    label: linkedin.replace(/^https?:\/\/(www\.)?/, ''),
    href: isPlaceholder(linkedin)
      ? null
      : linkedin.startsWith('http')
        ? linkedin
        : `https://${linkedin}`,
  },
}
