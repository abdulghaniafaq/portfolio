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
  data/          portfolio.ts (content), quickAnswers.ts (Quick answers), types.ts
  components/
    layout/      Navbar, Footer, NextPage
    sections/    Hero, Explore, About, Experience, CareerTimeline, Work, Skills, Process, Toolkit, Contact
    work/        CaseStudyCard, CaseCover
    hero/        HeroVisual
    chat/        QuickAnswers (no-AI recruiter panel), QuietBoundary
    ui/          Button, Chip, Icon, Reveal, SectionHeading, ThemeToggle, Value
  hooks/         useTheme, useDocumentMeta, useReveal
  lib/           seo (per-page metadata), contact, hash, placeholder, quickMatch, timeline
  pages/         HomePage, AboutPage, ExperiencePage, WorkPage, SkillsPage, ContactPage, CaseStudyPage, NotFoundPage
public/          favicon, og-image-v2.png, resume PDF, manifest
scripts/         quick-answers-test.mjs
```

## Pages
`/`, `/about`, `/experience`, `/work`, `/work/:slug`, `/skills`, `/contact`. Each page sets its own title, description and canonical URL (`src/lib/seo.ts`).
At build time the same metadata is written into a prerendered `<path>/index.html` for every page, plus `sitemap.xml` and `robots.txt`, so link previews and crawlers see the right tags without running JavaScript.
Old single-page links (`/#about`, `/#toolkit` …) are forwarded to the matching page. Back/Forward and reload return to the same scroll position (`ScrollManager` in `src/App.tsx`).

## Light and dark theme
Colours are defined once as tokens in `src/index.css` (`@theme`) and overridden under `:root[data-theme='dark']`. Components only use tokens (`bg-paper`, `text-ink`, `border-line` …), so a new component needs no dark variant.
The theme is set before first paint by an inline script in `index.html` (saved choice, else the system setting), so dark-mode visitors never see a white flash. `useTheme` handles the toggle, remembers the choice, follows the system until the visitor picks one, and keeps other open tabs in sync.
Panels that stay dark in both themes (footer, process band, featured skill card) use `bg-panel` with white text on purpose.

## Checks
```bash
npm run typecheck      # tsc -b
npm run test:answers   # Quick answers: matching, answers and every link they offer
```

## Deploy
Static build (`dist/`). `vercel.json` rewrites unknown paths to `index.html` (the SPA fallback); files with an extension are served as they are.
On Vercel the canonical, sitemap and robots URLs come from `VITE_SITE_URL`, or else from the project's own domain.
