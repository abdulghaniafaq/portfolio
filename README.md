# Abdul Ghani Afaq — Portfolio

React + TypeScript + Tailwind CSS v4 + Vite, with React Router for case study pages (`/work/:slug`).

## Run
Requires Node.js 20+ (https://nodejs.org).

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # serve the build
```

## Editing content
All copy lives in **`src/data/portfolio.ts`**: profile, contact, about, experience, case studies, skills, process, tools.

- Values in `[square brackets]` are placeholders. They show a dashed underline, and links built from them stay disabled until you replace them.
- Before sharing, replace: email, LinkedIn, location, company, dates, and project periods.
- Set your domain in `.env` (`VITE_SITE_URL`) for canonical / Open Graph URLs.
- To add an earlier role, append to `roles`. To add a project, append to `caseStudies`; its page is created automatically.

## Structure
```
src/
  data/          portfolio.ts (content), types.ts
  components/
    layout/      Navbar, Footer
    sections/    Hero, About, Experience, Work, Skills, Process, Toolkit, Contact
    work/        CaseStudyCard, CaseCover
    hero/        HeroVisual
    ui/          Button, Chip, Icon, Reveal, SectionHeading, Value
  pages/         HomePage, CaseStudyPage, NotFoundPage
public/          favicon, og-image.png, robots.txt, manifest
```

## Deploy
Static build (`dist/`). SPA fallbacks included for Vercel (`vercel.json`) and Netlify (`public/_redirects`).
