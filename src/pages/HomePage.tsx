import { About } from '../components/sections/About'
import { Contact } from '../components/sections/Contact'
import { Experience } from '../components/sections/Experience'
import { Hero } from '../components/sections/Hero'
import { Process } from '../components/sections/Process'
import { Skills } from '../components/sections/Skills'
import { Toolkit } from '../components/sections/Toolkit'
import { Work } from '../components/sections/Work'
import { profile } from '../data/portfolio'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export function HomePage() {
  useDocumentMeta(
    `${profile.name} — ${profile.shortTitle}`,
    `${profile.name} is a Business Analyst and Associate Product Manager working across product strategy, requirements, backlog ownership, and delivery in Higher Education, EdTech, accessibility, and AI.`,
  )

  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Work />
      <Skills />
      <Process />
      <Toolkit />
      <Contact />
    </>
  )
}
