/**
 * ─────────────────────────────────────────────────────────────
 *  QUICK ANSWERS — the ready-made answers behind the chat panel
 * ─────────────────────────────────────────────────────────────
 *  Each entry is one question a recruiter might ask. The panel
 *  matches what a visitor types to the closest entry and shows
 *  its `answer`. Nothing is generated or sent anywhere.
 *
 *  - `alsoAskedAs` lists other ways of asking the same thing. It
 *    is only used for matching, so add phrasings freely.
 *  - Keep answers factual and consistent with the rest of the
 *    site. If a fact on the site changes, update it here too.
 *  - `actions` are the buttons shown under the answer.
 * ─────────────────────────────────────────────────────────────
 */
import type { AnswerAction, QuickAnswer } from './types'

const experience: AnswerAction = { type: 'link', label: 'See experience', href: '/#experience' }
const contactSection: AnswerAction = { type: 'link', label: 'Go to contact', href: '/#contact' }
const skillsSection: AnswerAction = { type: 'link', label: 'See skills', href: '/#skills' }
const toolsSection: AnswerAction = { type: 'link', label: 'See tools', href: '/#toolkit' }
const aboutSection: AnswerAction = { type: 'link', label: 'Read about Abdul', href: '/#about' }
const reachOut: AnswerAction[] = [{ type: 'email' }, { type: 'linkedin' }]
const resumeAndContact: AnswerAction[] = [{ type: 'resume' }, ...reachOut]

export const quickAnswers: QuickAnswer[] = [
  /* ── Overview ─────────────────────────────────────────── */
  {
    id: 'experience-summary',
    group: 'Overview',
    question: 'Can you summarize his work experience?',
    alsoAskedAs: [
      'tell me about his background',
      'what is his work history',
      'overview of his career',
      'where has he worked',
      'what has he done so far',
      'walk me through his experience',
      'experience summary',
      'what jobs has he had',
    ],
    answer:
      'Abdul has more than three years of experience in business analysis, product management and project operations. He has been an Associate Product Manager at ABM Technologies since June 2026, where he owns requirements, backlogs and the roadmap for two higher-education SaaS products, KORA AI and EDRO. Earlier, he held pre-sales and operations roles at ABM, worked as a Business Analyst and Project Coordinator at InnovationM (HR tech), and as a PMO Analyst and Business Analyst at SYMB Technologies.',
    actions: [experience],
  },
  {
    id: 'years',
    group: 'Overview',
    question: 'How many years of experience does he have?',
    alsoAskedAs: [
      'how long has he worked',
      'total experience',
      'years in product',
      'years as a business analyst',
      'how experienced is he',
      'how senior is he',
    ],
    answer:
      'Abdul has more than three years of experience across business analysis, product and project roles, and has contributed to at least four product launches for global clients.',
    actions: [experience],
  },
  {
    id: 'who',
    group: 'Overview',
    question: 'Who is Abdul?',
    alsoAskedAs: ['tell me about him', 'introduce him', 'short bio', 'what does he do', 'who are you talking about', 'about abdul'],
    answer:
      'Abdul Ghani Afaq is a Business Analyst and Associate Product Manager based in Uttar Pradesh, India. He works on product strategy, requirements, backlog ownership and delivery, mostly in higher education, EdTech, accessibility and AI. He is available to join immediately and is open to remote or onsite roles, including relocation within India.',
    actions: [aboutSection],
  },
  {
    id: 'roles-sought',
    group: 'Overview',
    question: 'What kind of roles is he looking for?',
    alsoAskedAs: [
      'is he looking for BA or PM roles',
      'what positions is he open to',
      'what is he targeting',
      'is he more BA or PM',
      'what job is he looking for',
      'which roles suit him',
      'what is he applying for',
    ],
    answer:
      'Abdul is open to Business Analyst and Product Manager roles, especially in EdTech, higher education, AI and accessibility. He can join immediately and is open to remote or onsite work, including relocation within India.',
    actions: [contactSection],
  },
  {
    id: 'strengths',
    group: 'Overview',
    question: 'What are his key strengths?',
    alsoAskedAs: ['what does he bring', 'what does he do best', 'what are his strengths', 'his best qualities', 'what is he strongest at', 'top strengths'],
    answer:
      'Abdul points to four strengths. The first is a business perspective: understanding an organization’s goals, its users and its requirements. The second is product thinking, which means turning problems into clear opportunities and practical roadmaps. The third is execution, working with engineering, QA, design, marketing and stakeholders to get ideas delivered. The fourth is strategic research, covering market research, competitive analysis and user research.',
    actions: [aboutSection],
  },
  {
    id: 'why-hire',
    group: 'Overview',
    question: 'Why should we hire him?',
    alsoAskedAs: [
      'what makes him different',
      'why is he a good fit',
      'what value does he add',
      'why choose him',
      'what sets him apart',
      'sell me on him',
      'what would he bring to the team',
      'what would he add to our team',
    ],
    answer:
      'Abdul combines business analysis with hands-on product ownership. He has run product work end to end on two higher-education SaaS products, and he also brings pre-sales and RFP experience, including an Employee of the Month award for bid management. To talk about fit, the best next step is to email him or message him on LinkedIn.',
    actions: [experience, ...reachOut],
  },
  {
    id: 'ba-to-pm',
    group: 'Overview',
    question: 'How did he move from Business Analyst to Product Manager?',
    alsoAskedAs: [
      'career path',
      'career progression',
      'is he transitioning to product',
      'how did he get into product management',
      'how did he become a product manager',
      'his journey into product',
      'did he start as a BA',
      'did he start his career as a business analyst',
    ],
    answer:
      'Abdul started as a Business Analyst at SYMB Technologies in 2023. He then worked as a PMO Analyst there and as a Business Analyst and Project Coordinator at InnovationM. At ABM he took on pre-sales and operations roles before becoming an Associate Product Manager in June 2026.',
    actions: [experience],
  },

  /* ── Current role ─────────────────────────────────────── */
  {
    id: 'current-role',
    group: 'Current role',
    question: 'What is his current role?',
    alsoAskedAs: [
      'where does he work now',
      'what does he do at ABM',
      'current job',
      'present position',
      'current company',
      'what is his job title',
      'who is his current employer',
    ],
    answer:
      'Abdul is an Associate Product Manager at ABM Technologies & Consultancy Inc, a role he has held since June 2026. He manages the product lifecycle for two higher-education SaaS products, KORA AI (an AI chatbot platform) and EDRO (a digital accessibility compliance platform), working alongside engineering, UX/UI design and QA.',
    actions: [experience],
  },
  {
    id: 'day-to-day',
    group: 'Current role',
    question: 'What does he do day to day as a product manager?',
    alsoAskedAs: [
      'what are his responsibilities',
      'what does he own',
      'describe his duties',
      'what does his typical day look like',
      'what is he responsible for',
    ],
    answer:
      'He writes user stories, acceptance criteria and technical tasks in Jira, manages the backlogs for both products from first ticket to production, and runs the Agile/Scrum ceremonies. He also maintains a 12-month roadmap with engineering and aligns priorities with client and C-suite stakeholders.',
    actions: [experience],
  },
  {
    id: 'abm-progression',
    group: 'Current role',
    question: 'How has he progressed at ABM?',
    alsoAskedAs: [
      'was he promoted',
      'his roles at ABM',
      'how long has he been at ABM',
      'how long has he been with the company',
      'what positions has he held at ABM',
      'his journey at ABM',
      'how has he grown at ABM',
    ],
    answer:
      'At ABM, Abdul began as a Consultant in Pre-Sales (October to December 2025), became Manager, Pre-Sales & Operations (January to May 2026), and has been an Associate Product Manager since June 2026.',
    actions: [experience],
  },
  {
    id: 'roadmap',
    group: 'Current role',
    question: 'Does he have experience with roadmaps and prioritization?',
    alsoAskedAs: [
      'roadmapping',
      'how does he prioritize',
      'backlog prioritization',
      'product strategy',
      'has he built a product roadmap',
      'how does he decide what to build first',
    ],
    answer:
      'At ABM, he maintains a 12-month product roadmap with engineering and prioritizes work sprint by sprint. At InnovationM, he used MoSCoW prioritization while turning more than 40 gathered requirements into FRDs and user stories.',
    actions: [experience],
  },
  {
    id: 'stakeholders',
    group: 'Current role',
    question: 'How does he work with stakeholders and leadership?',
    alsoAskedAs: [
      'stakeholder management',
      'executive communication',
      'client handling',
      'does he talk to clients',
      'does he work with senior leadership',
      'client facing experience',
    ],
    answer:
      'At ABM, he aligns business goals with C-suite and client stakeholders and has surfaced 7 strategic decisions for executive leadership. At SYMB, he held more than 50 stakeholder calls over 14 months to gather requirements for three products. At InnovationM, he ran stakeholder interviews and workshops.',
    actions: [experience],
  },
  {
    id: 'market-research',
    group: 'Current role',
    question: 'Has he done market research or go-to-market work?',
    alsoAskedAs: [
      'competitor analysis',
      'market sizing',
      'vendor evaluation',
      'pitch decks',
      'market research',
      'competitive research',
      'go to market',
    ],
    answer:
      'In his accessibility product work at ABM, Abdul researched the market and its competitors, evaluated vendors (Allyant, Equidox, Rev, Verbit, Kaltura, 3Play and Amara), sized the opportunity at about $250M TAM, and produced competitor analysis and pitch decks.',
    actions: [{ type: 'link', label: 'Read the EDRO case study', href: '/work/edro' }],
  },
  {
    id: 'cross-functional',
    group: 'Current role',
    question: 'Does he work with engineering and cross-functional teams?',
    alsoAskedAs: [
      'how does he work with developers',
      'cross-functional experience',
      'does he work with design and QA',
      'does he collaborate with engineers',
      'team collaboration',
      'does he work with developers',
    ],
    answer:
      'Yes. At ABM, he works with engineering, UX/UI design and QA teams. At InnovationM, he coordinated a 10-member cross-functional team across at least six concurrent sprints.',
    actions: [experience],
  },

  /* ── Past roles ───────────────────────────────────────── */
  {
    id: 'innovationm',
    group: 'Past roles',
    question: 'What did he do at InnovationM?',
    alsoAskedAs: [
      'InnovationM experience',
      'his HR tech work',
      'Business Analyst and Project Coordinator',
      'what was his role at InnovationM',
      'candidate assessment platform',
      'his HR tech job',
    ],
    answer:
      'At InnovationM (October 2024 to April 2025), Abdul worked as a Business Analyst and Project Coordinator on AI-driven HR-tech platforms for candidate assessment. He facilitated Scrum for a 10-member cross-functional team across at least six concurrent sprints, turned more than 40 gathered requirements into FRDs and user stories for two products, and coordinated UAT and regression testing while keeping stakeholders updated through live dashboards.',
    actions: [experience],
  },
  {
    id: 'symb-ba',
    group: 'Past roles',
    question: 'What did he do at SYMB Technologies as a Business Analyst?',
    alsoAskedAs: [
      'SYMB experience',
      'his first job',
      'insurance project',
      'e-learning project',
      'what was his first role',
      'where did he start his career',
      'his work at SYMB',
    ],
    answer:
      'At SYMB (May 2023 to July 2024), Abdul was a Business Analyst on insurance (Nigerian market) and e-learning products. Over 14 months he held more than 50 stakeholder calls to gather requirements for three products at once, wrote technical specifications and user stories, and kept status reporting 95% on time. He also validated UI wireframes with stakeholders in Figma, which led to 30% fewer revision cycles.',
    actions: [experience],
  },
  {
    id: 'pmo',
    group: 'Past roles',
    question: 'What was his PMO Analyst role?',
    alsoAskedAs: [
      'PMO experience',
      'project tracking',
      'project management office',
      'does he have project management experience',
      'project management background',
      'program management',
    ],
    answer:
      'As a PMO Analyst at SYMB (August to September 2024), Abdul tracked timelines, resource use and performance metrics across at least five concurrent projects. He also analyzed budget variances and flagged at-risk milestones so that priorities could be reset.',
    actions: [experience],
  },
  {
    id: 'presales',
    group: 'Past roles',
    question: 'Does he have pre-sales or RFP experience?',
    alsoAskedAs: [
      'RFP experience',
      'proposals',
      'bid management',
      'RFQ',
      'pre-sales',
      'presales experience',
      'has he written proposals',
    ],
    answer:
      'Yes, at ABM. As a Consultant, he owned the full pre-sales cycle, from qualifying opportunities to submitting RFPs and RFQs on time. As Manager, he oversaw RFP and RFQ cycles from start to finish, with a pipeline efficiency gain of about 10% month over month and shortlisting in 2 competitive RFPs.',
    actions: [experience],
  },
  {
    id: 'recognition',
    group: 'Past roles',
    question: 'Has he received any recognition or awards?',
    alsoAskedAs: ['awards', 'achievements at work', 'Employee of the Month', 'any recognition', 'has he won anything', 'honors'],
    answer: 'Abdul was named Employee of the Month at ABM for his bid management work.',
    actions: [experience],
  },

  /* ── Projects and domains ─────────────────────────────── */
  {
    id: 'kora',
    group: 'Projects',
    question: 'Tell me about KORA.',
    alsoAskedAs: ['KORA project', 'AI chatbot project', 'what is KORA', 'his work on KORA', 'KORA AI', 'chatbot platform'],
    answer:
      'KORA is an AI chatbot platform for higher education, and Abdul has worked on it as Associate Product Manager since June 2026. He analyzes the product for enhancement opportunities and gaps, turns discovery work into requirements, user stories and acceptance criteria, grooms the Jira backlog, keeps messaging in line with marketing, and supports product demos.',
    actions: [{ type: 'link', label: 'Read the KORA case study', href: '/work/kora' }],
  },
  {
    id: 'kora-outcomes',
    group: 'Projects',
    question: 'What were the outcomes of the KORA project?',
    alsoAskedAs: ['KORA results', 'KORA impact', 'what changed because of his work', 'what did KORA achieve', 'KORA outcomes'],
    answer:
      'The work produced clearer, better-defined backlog items going into sprint planning, a shared view of priorities across product, engineering and marketing, product messaging based on what the product can actually do today, and documented enhancement opportunities ready for roadmap decisions.',
    actions: [{ type: 'link', label: 'Read the KORA case study', href: '/work/kora' }],
  },
  {
    id: 'edro',
    group: 'Projects',
    question: 'Tell me about EDRO.',
    alsoAskedAs: ['EDRO project', 'accessibility platform', 'what is EDRO', 'his work on EDRO', 'accessibility compliance platform'],
    answer:
      'EDRO is a digital accessibility compliance platform that includes PDF accessibility. Abdul researched the accessibility market and its competitors, ran a feature-gap analysis, analyzed product questionnaires, evaluated vendors, tested the product hands-on and recommended where the platform should go next.',
    actions: [{ type: 'link', label: 'Read the EDRO case study', href: '/work/edro' }],
  },
  {
    id: 'ai-research',
    group: 'Projects',
    question: 'What is the AI & EdTech research project?',
    alsoAskedAs: [
      'AI research',
      'his research on AI in education',
      'RAG research',
      'AI assistants',
      'what did he research',
      'AI in learning',
    ],
    answer:
      'Abdul researched how AI is changing digital learning, covering LMS and CMS platforms (including Open edX and WordPress), AI assistants, RAG solutions and accessibility. He summarized the findings into opportunities to inform product direction.',
    actions: [{ type: 'link', label: 'Read the research case study', href: '/work/ai-edtech-research' }],
  },
  {
    id: 'projects',
    group: 'Projects',
    question: 'What projects has he worked on?',
    alsoAskedAs: ['his portfolio', 'case studies', 'selected work', 'show me his work', 'list of projects', 'what has he built', 'what has he worked on', 'what is he working on', 'work samples'],
    answer:
      'His selected work includes KORA, an AI chatbot platform for higher education; EDRO, a digital accessibility compliance platform; and an AI and EdTech product research project. Each one has its own case study page.',
    actions: [{ type: 'link', label: 'See selected work', href: '/#work' }],
  },
  {
    id: 'accessibility',
    group: 'Projects',
    question: 'Does he have accessibility experience?',
    alsoAskedAs: ['WCAG', 'ADA', 'digital accessibility', 'PDF accessibility', 'accessibility compliance', 'a11y'],
    answer:
      'Yes. Abdul works on EDRO, a digital accessibility compliance platform. He defined requirements and screen flows for its PDF remediation workspace and mapped a 10-gate accessibility pipeline aligned with ADA and WCAG standards. WCAG is also listed among his skills.',
    actions: [{ type: 'link', label: 'Read the EDRO case study', href: '/work/edro' }],
  },
  {
    id: 'ai-experience',
    group: 'Projects',
    question: 'Does he have AI experience?',
    alsoAskedAs: [
      'generative AI',
      'chatbot experience',
      'RAG',
      'LLM experience',
      'AI product management',
      'artificial intelligence',
      'machine learning',
    ],
    answer:
      'Yes. Abdul works on KORA, an AI chatbot platform for higher education, and has researched AI-powered learning, AI assistants and RAG solutions. AI / Generative AI and RAG are both listed among his skills.',
    actions: [{ type: 'link', label: 'Read the KORA case study', href: '/work/kora' }],
  },
  {
    id: 'higher-ed',
    group: 'Projects',
    question: 'Does he have higher education or EdTech experience?',
    alsoAskedAs: [
      'education domain',
      'EdTech background',
      'university products',
      'e-learning',
      'edtech experience',
      'education sector',
    ],
    answer:
      'Yes, it is his main domain. He currently works on two higher-education SaaS products, KORA AI and EDRO, has researched AI in digital learning, and earlier worked on e-learning products at SYMB.',
    actions: [aboutSection],
  },
  {
    id: 'lms-cms',
    group: 'Projects',
    question: 'Does he have LMS or CMS experience?',
    alsoAskedAs: [
      'Open edX',
      'WordPress',
      'learning management system',
      'content management',
      'LMS',
      'CMS',
      'does he know WordPress',
    ],
    answer:
      'Yes. At ABM, he worked on RFPs and RFQs for LMS, CMS and web development products, and he has researched platforms such as Open edX and WordPress. LMS, CMS, WordPress and Open edX are all listed among his skills.',
    actions: [skillsSection],
  },
  {
    id: 'industries',
    group: 'Projects',
    question: 'Which industries has he worked in?',
    alsoAskedAs: [
      'domains',
      'sectors',
      'industry background',
      'HR tech experience',
      'insurance experience',
      'what domains does he know',
      'which verticals',
    ],
    answer:
      'Most recently, he has worked in higher education, EdTech, LMS and CMS platforms, accessibility and AI. Earlier, he worked in HR tech (AI-driven candidate assessment at InnovationM) and in insurance and e-learning at SYMB.',
    actions: [experience],
  },
  {
    id: 'achievements',
    group: 'Projects',
    question: 'What are his biggest achievements, and are there any numbers?',
    alsoAskedAs: [
      'results',
      'impact',
      'metrics',
      'accomplishments',
      'key numbers',
      'what has he achieved',
      'biggest wins',
      'proof of impact',
    ],
    answer:
      'Highlights include more than three years of experience, at least four product launches for global clients, more than 50 stakeholder calls to elicit requirements, and 7 strategic decisions surfaced for executive leadership. Other results: about a 10% month-over-month gain in RFP pipeline efficiency, 30% fewer wireframe revision cycles and 95% on-time status reporting at SYMB, and 100% acceptance-criteria alignment at InnovationM.',
    actions: [experience],
  },

  /* ── Skills and tools ─────────────────────────────────── */
  {
    id: 'key-skills',
    group: 'Skills & tools',
    question: 'What are his key skills?',
    alsoAskedAs: ['skills', 'expertise', 'what is he good at technically', 'skill set', 'core competencies', 'what can he do', 'what skills does he have', 'list of his skills', 'what are his main skills', 'what is his skill set'],
    answer:
      'His skills fall into a few main areas. Product: roadmapping, backlog management, user stories, acceptance criteria, product strategy, and market and competitive research. Business analysis: requirements gathering, gap analysis, BRD and FRD writing, and user journey mapping. Project operations: Agile, Scrum, sprint planning, Jira and UAT. Technology domains: LMS, CMS, AI and accessibility, including WCAG.',
    actions: [skillsSection],
  },
  {
    id: 'ba-skills',
    group: 'Skills & tools',
    question: 'What business analysis skills does he have?',
    alsoAskedAs: ['BA skills', 'requirements gathering', 'gap analysis', 'use cases', 'business analysis experience', 'business analysis techniques', 'process analysis'],
    answer:
      'His business analysis skills include requirements gathering, business process analysis, gap analysis, use cases, functional requirements, stakeholder analysis, BRD and FRD writing, and user journey mapping.',
    actions: [skillsSection],
  },
  {
    id: 'pm-skills',
    group: 'Skills & tools',
    question: 'What product management skills does he have?',
    alsoAskedAs: ['PM skills', 'product skills', 'product discovery', 'feature definition', 'product management experience', 'product ownership'],
    answer:
      'His product skills include product management and ownership, discovery and strategy, roadmapping, feature definition, backlog management, user stories, acceptance criteria, product documentation, market research and competitive analysis.',
    actions: [skillsSection],
  },
  {
    id: 'tools',
    group: 'Skills & tools',
    question: 'Which tools does he use?',
    alsoAskedAs: [
      'tech stack',
      'software',
      'tools and platforms',
      'what tools is he familiar with',
      'what software does he use',
      'which applications',
    ],
    answer:
      'He works with Jira, Confluence, Figma, Google Workspace and Microsoft Office, along with WordPress, Open edX and other LMS and CMS platforms. He also uses AI tools for research and drafting, and analytics and research tools for market insight.',
    actions: [toolsSection],
  },
  {
    id: 'jira',
    group: 'Skills & tools',
    question: 'Does he know Jira?',
    alsoAskedAs: ['Jira experience', 'backlog tools', 'Confluence', 'agile tools', 'does he use Jira', 'project tracking tools', 'does he use Jira for backlog management', 'is he good with Jira', 'how well does he know Jira'],
    answer:
      'Yes, Jira is central to his work. He manages the KORA and EDRO backlogs there from first ticket to production, writes stories and technical tasks across epics, and grooms and prioritizes the backlog. Confluence is also on his tools list.',
    actions: [toolsSection],
  },
  {
    id: 'figma',
    group: 'Skills & tools',
    question: 'Does he use Figma or work with designers?',
    alsoAskedAs: ['Figma', 'wireframes', 'design collaboration', 'UX', 'does he work with UX designers', 'wireframing'],
    answer:
      'Figma is on his tools list for design collaboration. At SYMB, he validated UI wireframes with stakeholders in Figma, which led to 30% fewer revision cycles, and at ABM he works with UX/UI design teams.',
    actions: [toolsSection],
  },
  {
    id: 'agile',
    group: 'Skills & tools',
    question: 'Does he have Agile or Scrum experience?',
    alsoAskedAs: ['Scrum master', 'sprint planning', 'agile methodology', 'sprints', 'agile experience', 'does he know scrum', 'kanban'],
    answer:
      'Yes. At InnovationM, he ran daily stand-ups and sprint ceremonies for a 10-member cross-functional team across at least six active sprints. At ABM, he runs Agile/Scrum ceremonies for KORA AI and EDRO and manages both backlogs in Jira.',
    actions: [experience],
  },
  {
    id: 'documentation',
    group: 'Skills & tools',
    question: 'What documentation does he write?',
    alsoAskedAs: [
      'BRD',
      'FRD',
      'user stories',
      'acceptance criteria',
      'release notes',
      'product documentation',
      'does he write requirements documents',
      'technical writing',
    ],
    answer:
      'He writes BRDs, FRDs, user stories with acceptance criteria, technical tasks and release notes. At InnovationM, he turned more than 40 gathered requirements into FRDs and user stories for two products.',
    actions: [skillsSection],
  },
  {
    id: 'uat',
    group: 'Skills & tools',
    question: 'Does he handle UAT and testing?',
    alsoAskedAs: ['QA coordination', 'regression testing', 'acceptance testing', 'test coordination', 'user acceptance testing', 'quality assurance'],
    answer:
      'Yes. He coordinates UAT and regression testing with QA. At InnovationM, he reached 100% acceptance-criteria alignment, and on EDRO he tested the product hands-on.',
    actions: [experience],
  },
  {
    id: 'process',
    group: 'Skills & tools',
    question: 'How does he approach a new product or problem?',
    alsoAskedAs: [
      'his process',
      'how does he work',
      'methodology',
      'how does he gather requirements',
      'what is his approach',
      'how does he work with a new project',
    ],
    answer:
      'Abdul starts with the business problem, the users and the stakeholders, then analyzes requirements, workflows and gaps. From there he defines requirements, user stories, features and priorities, works with engineering, design, QA and marketing, and supports delivery and improvement afterwards. Typical outputs are stakeholder maps, process flows, gap analyses, user stories and prioritized backlogs.',
    actions: [{ type: 'link', label: 'See how he works', href: '/#approach' }],
  },
  {
    id: 'analytics',
    group: 'Skills & tools',
    question: 'Does he have data or analytics skills?',
    alsoAskedAs: ['analytics', 'data analysis', 'reporting', 'dashboards', 'SQL', 'excel', 'tableau', 'power bi', 'python'],
    answer:
      'The website lists analytics and research tools used for market insight, and at InnovationM he used live status dashboards to keep stakeholders informed. It doesn’t go into specific data skills, so his resume is the best place to check.',
    actions: resumeAndContact,
  },

  /* ── Logistics and everything else ────────────────────── */
  {
    id: 'availability',
    group: 'Logistics',
    question: 'When can he start? What is his notice period?',
    alsoAskedAs: [
      'availability',
      'is he available',
      'can he join immediately',
      'is he looking for a job',
      'when can he join',
      'notice period',
      'how soon can he start',
      'is he open to work',
      'is he open to new opportunities',
    ],
    answer: 'Abdul is available to join immediately and is open to Business Analyst and Product Manager roles.',
    actions: [contactSection],
  },
  {
    id: 'location',
    group: 'Logistics',
    question: 'Where is he based? Does he work remotely?',
    alsoAskedAs: ['location', 'remote work', 'where does he live', 'is he open to remote', 'which city', 'can he work remotely', 'hybrid or onsite', 'remote or onsite', 'is he open to working onsite', 'does he work from the office', 'which state is he in'],
    answer: 'Abdul is based in Uttar Pradesh, India. He is open to both remote and onsite work, and to relocating within India.',
    actions: [contactSection],
  },
  {
    id: 'contact',
    group: 'Logistics',
    question: 'How can I contact him?',
    alsoAskedAs: ['email', 'LinkedIn', 'reach him', 'get in touch', 'schedule a call', 'contact details', 'how do I reach abdul', 'arrange an interview'],
    answer: 'You can email Abdul at ghaniabdul712@gmail.com or message him on LinkedIn at linkedin.com/in/abdulghaniafaq.',
    actions: [...reachOut, contactSection],
  },
  {
    id: 'resume',
    group: 'Logistics',
    question: 'Can I get his resume?',
    alsoAskedAs: ['CV', 'download resume', 'send resume', 'resume PDF', 'curriculum vitae', 'can I see his resume'],
    answer: 'Yes. Use the Download Resume button on this site to get a copy.',
    actions: [{ type: 'resume' }],
  },
  {
    id: 'people-management',
    group: 'Logistics',
    question: 'Does he have people-management experience?',
    alsoAskedAs: ['has he managed a team', 'team lead experience', 'direct reports', 'leadership', 'team management', 'has he led people'],
    answer:
      'The site describes cross-functional leadership and a Manager title at ABM, but it doesn’t mention team size or direct reports. For specifics, please ask Abdul directly.',
    actions: reachOut,
  },
  {
    id: 'relocation',
    group: 'Logistics',
    question: 'Is he open to relocating?',
    alsoAskedAs: ['relocation', 'willing to relocate', 'open to move', 'can he move', 'would he relocate', 'open to moving abroad', 'will he relocate to another city', 'is he open to relocation within the country'],
    answer: 'Yes, Abdul is open to relocating within India. For relocation outside India, please email him or message him on LinkedIn.',
    actions: [contactSection],
  },
  {
    id: 'salary',
    group: 'Logistics',
    question: 'What is his salary expectation?',
    alsoAskedAs: ['expected CTC', 'compensation', 'pay expectations', 'salary', 'what does he expect to be paid', 'current CTC', 'rate', 'package'],
    answer: 'Compensation is best discussed with Abdul directly. Please email him or message him on LinkedIn.',
    actions: [contactSection],
  },
  {
    id: 'visa',
    group: 'Logistics',
    question: 'Does he need visa sponsorship, or what is his work authorization?',
    alsoAskedAs: ['visa', 'work permit', 'work authorization', 'sponsorship', 'right to work', 'is he authorized to work', 'citizenship'],
    answer: 'Work authorization is best confirmed with Abdul directly. Please email him or message him on LinkedIn.',
    actions: [contactSection],
  },
  {
    id: 'education',
    group: 'Logistics',
    question: 'What is his education? Does he have certifications?',
    alsoAskedAs: [
      'degree',
      'university',
      'qualifications',
      'certifications',
      'where did he study',
      'CSPO',
      'Scrum certification',
      'is he certified',
      'btech',
      'college',
      'academic background',
    ],
    answer:
      'Abdul holds a B.Tech in Computer Science and Engineering from Jamia Hamdard University, New Delhi. He is currently working towards becoming a Certified Scrum Product Owner (CSPO). His resume has the full details.',
    actions: resumeAndContact,
  },
  {
    id: 'references',
    group: 'Logistics',
    question: 'Can he provide references?',
    alsoAskedAs: ['references', 'referrals', 'reference check', 'who can vouch for him', 'previous managers contact'],
    answer: 'References aren’t listed on the site. Please email Abdul to request them.',
    actions: [contactSection],
  },
  {
    id: 'phone',
    group: 'Logistics',
    question: 'What is his phone number?',
    alsoAskedAs: ['phone', 'mobile number', 'call him', 'WhatsApp', 'telephone', 'contact number', 'can I call him'],
    answer: 'His phone number isn’t listed on the site. Please email Abdul or message him on LinkedIn, and he can share it.',
    actions: [contactSection],
  },
  {
    id: 'languages',
    group: 'Logistics',
    question: 'What languages does he speak?',
    alsoAskedAs: ['languages', 'spoken languages', 'communication skills', 'does he speak english', 'language proficiency'],
    answer: 'Languages aren’t listed on the site. For anything not covered here, his resume or an email to Abdul is the best next step.',
    actions: resumeAndContact,
  },
  {
    id: 'leaving',
    group: 'Logistics',
    question: 'Why did he leave his previous roles?',
    alsoAskedAs: [
      'reason for leaving',
      'why did he change jobs',
      'job changes',
      'why is he looking for a new role',
      'why did he leave his last company',
      'why is he leaving',
      'why the switch',
    ],
    answer:
      'Abdul moved on in search of growth and better career opportunities, which were limited at his previous organization. His roles and dates are in the Experience section, and he is happy to talk it through. You can reach him by email or on LinkedIn.',
    actions: [experience, ...reachOut],
  },
]

/** Shown when nothing matches well enough. Never guesses. */
export const fallbackAnswer = {
  answer:
    'I couldn’t find that on Abdul’s website. His resume has fuller details, so you can download it below or reach out to him directly.',
  actions: resumeAndContact,
}

export const greeting =
  'Hi! Here are quick answers to the questions recruiters ask most about Abdul. Pick one below or type your own.'

export const thanksReply = 'You’re welcome! Ask anything else about Abdul, or download his resume if you’d like the full picture.'

/** Question ids shown as buttons when the panel first opens. */
export const suggestedIds = ['experience-summary', 'current-role', 'key-skills', 'kora', 'availability', 'contact']

/** Groups in the order shown in the "browse all questions" list. */
export const quickGroups = ['Overview', 'Current role', 'Past roles', 'Projects', 'Skills & tools', 'Logistics']
