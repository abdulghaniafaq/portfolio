import { caseStudies } from '../../data/portfolio'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { CaseStudyCard } from '../work/CaseStudyCard'

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          as="h1"
          id="work-title"
          index="03"
          label="Work"
          title="Selected Work"
          description="Problems I’ve analyzed, products I’ve helped shape, and solutions I’ve helped bring to execution."
          align="split"
        />
        <ul
          className={`mt-16 grid gap-6 md:grid-cols-2 ${caseStudies.length % 3 === 0 ? 'lg:grid-cols-3' : ''}`}
        >
          {caseStudies.map((study, i) => (
            <Reveal as="li" key={study.slug} delay={(i % 3) * 80}>
              <CaseStudyCard study={study} index={i} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
