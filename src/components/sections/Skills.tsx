import { skillGroups } from '../../data/portfolio'
import type { SkillGroup } from '../../data/types'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

// Bento layout on a 6-column grid: two wide cards, then three.
const spans = ['lg:col-span-3', 'lg:col-span-3', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2']

function SkillCard({ group, featured }: { group: SkillGroup; featured: boolean }) {
  return (
    <article
      className={`group h-full rounded-2xl border p-6 transition-[border-color,box-shadow] duration-300 sm:p-7 ${
        featured
          ? 'on-dark border-ink bg-ink text-white'
          : 'border-line bg-surface shadow-card hover:border-line-strong hover:shadow-lift'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className={`grid size-10 place-items-center rounded-xl ${
              featured ? 'bg-white/10 text-accent-400' : 'bg-sunken text-ink group-hover:bg-accent-50 group-hover:text-accent-600'
            } transition-colors`}
          >
            <Icon name={group.icon} size={19} />
          </span>
          <h3 className="text-lg font-semibold tracking-tight">{group.title}</h3>
        </div>
        <span className={`font-mono text-xs ${featured ? 'text-white/50' : 'text-muted'}`}>
          {group.skills.length}
        </span>
      </div>
      <p className={`mt-4 text-[0.9375rem] ${featured ? 'text-white/65' : 'text-muted'}`}>{group.blurb}</p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <li
            key={skill}
            className={`rounded-lg border px-3 py-1.5 text-sm ${
              featured ? 'border-white/12 bg-white/5 text-white/85' : 'border-line bg-paper text-ink-soft'
            }`}
          >
            {skill}
          </li>
        ))}
      </ul>
    </article>
  )
}

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          id="skills-title"
          index="04"
          label="Skills"
          title="Skills & Expertise"
          description="Grouped by the kind of work they support — from shaping a product to delivering it, with pre-sales support as an added strength."
          align="split"
        />
        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {skillGroups.map((group, i) => (
            <Reveal
              as="li"
              key={group.title}
              delay={(i % 3) * 70}
              className={`${spans[i] ?? 'lg:col-span-2'} ${i === skillGroups.length - 1 ? 'sm:col-span-2 lg:col-span-2' : ''}`}
            >
              <SkillCard group={group} featured={i === skillGroups.length - 1} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
