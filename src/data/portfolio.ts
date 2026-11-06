/**
 * ─────────────────────────────────────────────────────────────
 *  PORTFOLIO CONTENT — single source of truth
 * ─────────────────────────────────────────────────────────────
 *  Edit this file to update anything on the site.
 *
 *  Placeholders: any value wrapped in square brackets, e.g. "[Company Name]",
 *  is treated as a placeholder. It renders with a dashed outline so it is
 *  easy to spot, and links built from placeholder values are disabled.
 *  Replace the whole value (including the brackets) with real content.
 * ─────────────────────────────────────────────────────────────
 */
import type {
  CaseStudy,
  Principle,
  ProcessStep,
  Profile,
  Role,
  SkillGroup,
  Tool,
} from './types'

export const profile: Profile = {
  name: 'Abdul Ghani Afaq',
  initials: 'AG',
  title: 'Business Analyst | Product Owner | Pre-Sales & Product Operations',
  shortTitle: 'Business Analyst | Product Owner',
  tagline: 'Turning business problems into actionable products.',

  hero: {
    eyebrow: 'Business Analyst · Product Owner · Pre-Sales & Product Operations',
    headline: ['Business Analyst.', 'Product Owner.', 'Problem Solver.'],
    supporting:
      'I bridge business needs, user requirements, and technology execution to turn complex problems into practical digital products.',
    intro:
      'I’m Abdul Ghani Afaq, a Business Analyst and Product Owner working across product strategy, requirements, pre-sales, RFPs, project operations, and digital product development.',
  },

  domains: ['Higher Education', 'EdTech', 'LMS', 'CMS', 'Accessibility', 'AI'],

  contact: {
    email: 'ghaniabdul712@gmail.com',
    linkedin: 'https://www.linkedin.com/in/abdulghaniafaq/',
    location: 'Delhi, India · Open to remote work globally',
  },
}

export const navLinks = [
  { label: 'About', href: 'about' },
  { label: 'Experience', href: 'experience' },
  { label: 'Work', href: 'work' },
  { label: 'Skills', href: 'skills' },
  { label: 'Contact', href: 'contact' },
] as const

/* ── About ─────────────────────────────────────────────────── */

export const about = {
  lead: 'I turn business needs into clear requirements and products that teams can build and users adopt.',
  paragraphs: [
    'My role is to understand the business problem first: who it affects, what the organization is trying to achieve, and what is getting in the way. From there I gather and analyze requirements and translate them into clear, actionable product requirements that design and engineering teams can build from.',
    'I stay involved from concept through execution: shaping features, writing user stories and acceptance criteria, managing the backlog, coordinating with QA, and supporting pre-sales and RFP work where a product has to be explained, positioned, and mapped to what a client actually needs.',
  ],
  focusAreas: [
    'Business Analysis',
    'Product Ownership',
    'Product Discovery',
    'Requirements Gathering',
    'Product Strategy',
    'RFP & Pre-Sales',
    'Stakeholder Management',
    'Project Operations',
    'Agile / Scrum',
    'User Stories & Acceptance Criteria',
    'Market & Competitive Research',
    'Product Documentation',
    'Jira & Backlog Management',
    'EdTech & Higher Education Technology',
    'AI-powered Products',
    'Accessibility',
  ],
}

export const principles: Principle[] = [
  {
    icon: 'briefcase',
    title: 'Business Perspective',
    body: 'Understanding organizational goals, users, challenges, and business requirements.',
  },
  {
    icon: 'lightbulb',
    title: 'Product Thinking',
    body: 'Turning problems and requirements into clear product opportunities and actionable roadmaps.',
  },
  {
    icon: 'workflow',
    title: 'Execution',
    body: 'Working with engineering, QA, design, marketing, and stakeholders to move ideas into execution.',
  },
  {
    icon: 'search',
    title: 'Strategic Research',
    body: 'Market research, competitive analysis, RFP analysis, and identifying product opportunities.',
  },
]

/* ── Experience ────────────────────────────────────────────── */
/*  Add earlier roles by appending objects to this array.       */

export const roles: Role[] = [
  {
    title: 'Associate Product Manager',
    company: 'ABM Technologies',
    period: 'Jun 2026 — Present',
    location: 'Delaware, United States · Remote',
    current: true,
    domains: ['Product Management', 'Accessibility'],
    summary:
      'End-to-end product management with direct client handling — bridging business requirements, accessibility considerations, and delivery for LMS, CMS, and web development products.',
    areas: [
      {
        icon: 'layers',
        title: 'Product Management & Client Handling',
        impact: 'Owning end-to-end product management with direct client handling from requirements through delivery.',
        items: ['Product Management', 'Client handling', 'End-to-end delivery ownership', 'Backlog management'],
      },
      {
        icon: 'workflow',
        title: 'Accessibility & Cross-Functional Delivery',
        impact:
          'Validating product feasibility and accessibility with technical, design, and delivery teams.',
        items: ['Accessibility', 'Requirement documentation', 'Feasibility validation', 'Cross-functional coordination'],
      },
    ],
  },
  {
    title: 'Manager - Project Operations',
    company: 'ABM Technologies',
    period: 'Dec 2025 — May 2026',
    location: 'Delaware, United States · Remote',
    domains: ['RFP', 'RFQ', 'Project Operations'],
    summary:
      'Managed project operations end-to-end for LMS, CMS, and web development products — driving RFP and RFQ processes alongside cross-functional delivery coordination.',
    areas: [
      {
        icon: 'file',
        title: 'RFP & RFQ Management',
        impact: 'Owning RFP and RFQ processes across the pre-sales-to-delivery pipeline.',
        items: [
          'Request for Proposal (RFP)',
          'Request for Quotation (RFQ)',
          'Pipeline tracking',
          '~10% MoM pipeline efficiency gain',
          'Shortlisted in 2 competitive RFPs',
        ],
      },
      {
        icon: 'kanban',
        title: 'Project Operations',
        impact: 'Coordinating cross-functional project operations to keep delivery on track.',
        items: ['Project operations', 'Cross-functional coordination', 'Solution scope definition'],
      },
    ],
  },
  {
    title: 'Consultant - Project Operations',
    company: 'ABM Technologies',
    period: 'Aug 2025 — Dec 2025',
    location: 'Delaware, United States · Remote',
    domains: ['RFP', 'RFP Design'],
    summary:
      'Supported project operations with a focus on RFP design and proposal development — from opportunity qualification through on-time submission.',
    areas: [
      {
        icon: 'search',
        title: 'RFP Design & Proposals',
        impact: 'Designing and developing RFP responses, from opportunity qualification to solution structuring.',
        items: ['Request for Proposal (RFP)', 'RFP Design', 'Opportunity qualification', 'Solution structuring'],
      },
      {
        icon: 'pen',
        title: 'Project Operations Support',
        impact: 'Writing and submitting proposals while supporting project operations across the client engagement lifecycle.',
        items: [
          'Proposal writing',
          'On-time RFP/RFQ submissions',
          'Client engagement',
          'Employee of the Month — bid management',
        ],
      },
    ],
  },
  {
    title: 'Business Analyst & Project Coordinator',
    subtitle: 'HR Tech · AI-Driven Candidate Assessment Platforms',
    company: 'InnovationM',
    period: 'Oct 2024 — Apr 2025',
    location: 'India',
    domains: ['HR Tech', 'AI-Driven Platforms'],
    summary:
      'Facilitated Scrum delivery and requirements analysis for AI-driven HR tech platforms — coordinating a 10-member cross-functional team across 6+ concurrent sprints.',
    areas: [
      {
        icon: 'workflow',
        title: 'Scrum Facilitation & Delivery',
        impact: 'Running daily stand-ups and sprint ceremonies for a 10-member cross-functional development team.',
        items: ['Daily stand-ups', 'Sprint ceremonies', '6+ active sprints tracked', 'Consistent on-time delivery'],
      },
      {
        icon: 'clipboard',
        title: 'Requirements & Documentation',
        impact: 'Turning 40+ gathered requirements into FRDs and user stories for two concurrent products.',
        items: ['Stakeholder interviews', 'Workshops', 'FRDs', 'User stories', 'MoSCoW prioritization'],
      },
      {
        icon: 'chart',
        title: 'QA Coordination & Reporting',
        impact: 'Coordinating UAT and regression testing while keeping stakeholders informed with live dashboards.',
        items: [
          'UAT coordination',
          'Regression testing',
          '100% acceptance-criteria alignment',
          'Status dashboards & roadmaps',
        ],
      },
    ],
  },
  {
    title: 'PMO Analyst',
    company: 'SYMB Technologies Pvt Ltd.',
    period: 'Aug 2024 — Sep 2024',
    location: 'India',
    domains: ['Project Management'],
    summary:
      'Tracked timelines, resource utilization, and performance metrics across 5+ concurrent projects, flagging at-risk milestones for strategic re-prioritization.',
    areas: [
      {
        icon: 'chart',
        title: 'Project Monitoring & Reporting',
        impact: 'Tracking progress and performance metrics across 5+ concurrent projects to ensure on-time delivery.',
        items: ['Timeline tracking', 'Resource utilization', 'Performance metrics', 'Budget variance analysis'],
      },
      {
        icon: 'users',
        title: 'Cross-Functional Coordination',
        impact: 'Working with project leads to keep deliverables aligned with quality benchmarks and client expectations.',
        items: ['Cross-functional alignment', 'Risk flagging', 'Milestone re-prioritization'],
      },
    ],
  },
  {
    title: 'Business Analyst',
    subtitle: 'Insurance (Nigeria Market) · E-Learning · RPA Automation',
    company: 'SYMB Technologies Pvt Ltd.',
    period: 'May 2023 — Jul 2024',
    location: 'India',
    domains: ['Insurance', 'E-Learning', 'RPA'],
    summary:
      'Elicited and documented requirements across three simultaneous products, and led business analysis for an RPA initiative automating AP invoice processing for a financial services client.',
    areas: [
      {
        icon: 'clipboard',
        title: 'Requirements & Documentation',
        impact: 'Conducting 50+ stakeholder calls across 14 months to elicit requirements for three simultaneous products.',
        items: [
          'Stakeholder calls',
          'Technical specifications',
          'User stories',
          '95% on-time status reporting',
        ],
      },
      {
        icon: 'cpu',
        title: 'RPA Business Analysis',
        impact:
          'Leading analysis for a UiPath RPA initiative automating AP invoice processing for a mid-sized financial services client.',
        items: [
          'UiPath (RPA)',
          '500+ monthly transactions automated',
          '20% reduction in manual processing steps',
        ],
      },
      {
        icon: 'layout',
        title: 'UX & Process Validation',
        impact: 'Validating UI wireframes with stakeholders in Figma to cut revision cycles.',
        items: ['Figma wireframe validation', '30% fewer revision cycles', 'Process improvement'],
      },
    ],
  },
]

/* ── Case studies ──────────────────────────────────────────── */
/*  Review the narrative for each project and refine it with    */
/*  specifics you can share. No metrics are claimed here.       */

export const caseStudies: CaseStudy[] = [
  {
    slug: 'kora',
    name: 'KORA',
    tagline: 'AI-Powered Higher Education Product',
    domain: 'Higher Education · AI',
    role: 'Business Analyst / Product Owner',
    period: '[Project Period]',
    cover: 'network',
    summary:
      'Analyzing and shaping an AI-powered product for higher education — from feature discovery to a groomed, demo-ready backlog.',
    focus: [
      'Product analysis',
      'Product requirements',
      'Feature discovery',
      'Enhancement analysis',
      'Marketing / product alignment',
      'Jira backlog grooming',
      'Product demos',
      'Cross-functional collaboration',
    ],
    problem:
      'An AI product for higher education has to serve several audiences at once — institutions, faculty, and learners — while the technology underneath keeps evolving. The team needed a clear, shared view of which features and enhancements mattered most, requirements specific enough to build from, and a consistent story between what the product does and how it is presented to the market.',
    contribution: [
      'Analyzed the existing product to identify enhancement opportunities and gaps in the current feature set.',
      'Worked through feature discovery and translated findings into product requirements, user stories, and acceptance criteria.',
      'Groomed and prioritized the Jira backlog so work entering sprints was clear and ready to build.',
      'Worked with marketing to keep product messaging aligned with actual capabilities and roadmap direction.',
      'Prepared and supported product demos for internal and external audiences.',
      'Coordinated across engineering, design, QA, and marketing to keep priorities and decisions visible.',
    ],
    solution:
      'A structured requirements and backlog practice around the product: enhancement ideas were captured, analyzed against user and business value, written up as well-defined stories, and prioritized in Jira — with product and marketing working from the same understanding of what the product does.',
    ecosystem: ['AI / Generative AI', 'Higher Education', 'Jira', 'Agile / Scrum', 'Product demos'],
    outcomes: [
      'Clearer, better-defined backlog items entering sprint planning.',
      'A shared understanding of priorities across product, engineering, and marketing.',
      'Product messaging grounded in real, current capabilities.',
      'Enhancement opportunities documented and ready for roadmap decisions.',
    ],
    deliverables: [
      'Product requirements',
      'User stories & acceptance criteria',
      'Enhancement analysis',
      'Groomed Jira backlog',
      'Demo narratives',
    ],
  },
  {
    slug: 'edro',
    name: 'EDRO',
    tagline: 'Digital Accessibility & PDF Accessibility Platform',
    domain: 'Digital Accessibility',
    role: 'Business Analyst',
    period: '[Project Period]',
    cover: 'document',
    summary:
      'Researching the accessibility market and product landscape to identify feature gaps, evaluate vendors, and recommend where the platform should go next.',
    focus: [
      'Competitive analysis',
      'Accessibility market research',
      'Product questionnaire analysis',
      'Feature gap analysis',
      'Enhancement recommendations',
      'Vendor evaluation',
      'Product-market fit analysis',
      'QA / product testing',
    ],
    problem:
      'Digital and PDF accessibility is a crowded, standards-driven space. To compete, the platform needed an objective picture of how it compared to alternatives, where its features fell short of what buyers and accessibility requirements expect, and which improvements would matter most to the market.',
    contribution: [
      'Researched the digital and PDF accessibility market and the competitors operating in it.',
      'Built competitive comparisons across capabilities, positioning, and approach.',
      'Analyzed product questionnaires to understand buyer and compliance expectations.',
      'Ran feature gap analysis against competitors and accessibility requirements.',
      'Evaluated vendors and alternative solutions against defined criteria.',
      'Tested the product hands-on to validate behavior and inform recommendations.',
    ],
    solution:
      'An evidence-based view of the product’s position: a competitive landscape, a feature gap analysis, and a prioritized set of enhancement recommendations tied to market expectations and accessibility requirements such as WCAG.',
    ecosystem: ['PDF accessibility', 'WCAG', 'Accessibility standards', 'Competitive research', 'QA testing'],
    outcomes: [
      'A clear picture of competitive position and differentiation.',
      'Documented feature gaps against competitors and requirements.',
      'Prioritized enhancement recommendations for product decisions.',
      'Product-market fit considerations captured for the team.',
    ],
    deliverables: [
      'Competitive analysis',
      'Feature gap matrix',
      'Questionnaire analysis',
      'Vendor evaluation',
      'Enhancement recommendations',
    ],
  },
  {
    slug: 'rfp-pre-sales',
    name: 'RFP & Pre-Sales Portfolio',
    tagline: 'Higher Education & Government Technology Opportunities',
    domain: 'Higher Education · Government',
    role: 'Pre-Sales / Business Analyst',
    period: '[Ongoing / Project Period]',
    cover: 'stack',
    summary:
      'Finding, analyzing, and responding to technology solicitations — turning long RFP documents into clear requirements, solution maps, and proposals.',
    focus: [
      'RFP research',
      'Solicitation analysis',
      'Requirement extraction',
      'Technical approach development',
      'Proposal documentation',
      'Solution mapping',
      'Compliance requirements',
      'Competitive positioning',
    ],
    problem:
      'Public-sector and higher-education solicitations are long, detailed, and strict. Responding well means finding the right opportunities, extracting every requirement, understanding compliance obligations, and presenting a solution that maps clearly to what the buyer asked for — usually on a tight deadline.',
    contribution: [
      'Researched and identified relevant RFP opportunities in higher education and government technology.',
      'Analyzed solicitations and extracted functional, technical, and compliance requirements.',
      'Mapped requirements to solution capabilities to show coverage and highlight gaps.',
      'Developed technical approach sections and supporting proposal documentation.',
      'Researched clients and competitors to inform positioning.',
      'Developed case studies to support proposals with relevant experience.',
    ],
    solution:
      'A repeatable pre-sales approach: structured requirement extraction, a requirements-to-solution map, and proposal content — technical approach, positioning, and supporting case studies — built directly from what each solicitation asked for.',
    ecosystem: ['RFP / procurement platforms', 'Higher Education', 'Government technology', 'Proposal documentation'],
    outcomes: [
      'Requirements captured systematically instead of read ad hoc.',
      'Proposals structured around the buyer’s own requirements and evaluation criteria.',
      'Reusable technical approach and case-study content for future bids.',
      'Earlier visibility into compliance requirements and solution gaps.',
    ],
    deliverables: [
      'Requirements matrix',
      'Solution map',
      'Technical approach',
      'Proposal documentation',
      'Case studies',
    ],
  },
  {
    slug: 'ai-edtech-research',
    name: 'AI & EdTech Product Research',
    tagline: 'Learning Platforms, AI Assistants & Accessibility',
    domain: 'EdTech · AI',
    role: 'Business Analyst / Product Research',
    period: '[Project Period]',
    cover: 'grid',
    summary:
      'Researching how AI is reshaping digital learning — across LMS and CMS platforms, AI assistants, RAG solutions, and accessibility.',
    focus: [
      'AI-powered learning',
      'LMS',
      'CMS',
      'Higher Education technology',
      'Accessibility',
      'AI assistants',
      'RAG / AI solutions',
      'Digital learning platforms',
    ],
    problem:
      'AI is changing how learning platforms are built and used, and the landscape moves quickly. Product and business decisions need a grounded view of what is actually possible, where platforms such as LMS and CMS are heading, and how AI capabilities could fit real higher-education needs — including accessibility.',
    contribution: [
      'Researched AI-powered learning products and AI assistant use cases in education.',
      'Explored LMS and CMS platforms, including Open edX and WordPress-based ecosystems.',
      'Studied RAG and related AI solution patterns and how they apply to learning content.',
      'Considered accessibility requirements as part of product and platform evaluation.',
      'Summarized findings into opportunities and considerations for product direction.',
    ],
    solution:
      'A research base that connects AI capabilities to concrete education use cases — helping frame where AI assistants, retrieval-based solutions, and platform integrations could add value, and what to consider before building.',
    ecosystem: ['LMS', 'CMS', 'Open edX', 'WordPress', 'AI / Generative AI', 'RAG', 'Accessibility'],
    outcomes: [
      'A clearer map of AI opportunities in higher-education technology.',
      'Platform considerations documented for LMS and CMS contexts.',
      'Research that informs product discussions and early solution thinking.',
    ],
    deliverables: [
      'Market & product research',
      'Platform comparison notes',
      'AI use-case mapping',
      'Opportunity summaries',
    ],
  },
]

/* ── Skills ────────────────────────────────────────────────── */

export const skillGroups: SkillGroup[] = [
  {
    icon: 'layers',
    title: 'Product',
    blurb: 'Deciding what to build, and making it buildable.',
    skills: [
      'Product Ownership',
      'Product Discovery',
      'Product Strategy',
      'Roadmapping',
      'Feature Definition',
      'Backlog Management',
      'User Stories',
      'Acceptance Criteria',
      'Product Documentation',
    ],
  },
  {
    icon: 'clipboard',
    title: 'Business Analysis',
    blurb: 'Understanding the problem before solving it.',
    skills: [
      'Requirements Gathering',
      'Business Process Analysis',
      'Gap Analysis',
      'Use Cases',
      'Functional Requirements',
      'Stakeholder Analysis',
      'BRD / FRD',
      'User Journey Mapping',
    ],
  },
  {
    icon: 'file',
    title: 'Pre-Sales',
    blurb: 'Mapping client needs to credible solutions.',
    skills: [
      'RFP Analysis',
      'Proposal Development',
      'Solution Mapping',
      'Technical Approach',
      'Market Research',
      'Competitive Analysis',
      'Client Research',
    ],
  },
  {
    icon: 'kanban',
    title: 'Project Operations',
    blurb: 'Keeping delivery visible, aligned, and moving.',
    skills: [
      'Agile',
      'Scrum',
      'Sprint Planning',
      'Jira',
      'Backlog Grooming',
      'UAT',
      'QA Coordination',
      'Risk & Dependency Tracking',
    ],
  },
  {
    icon: 'cpu',
    title: 'Technology Domains',
    blurb: 'The platforms and problem spaces I work in.',
    skills: [
      'LMS',
      'CMS',
      'WordPress',
      'Open edX',
      'AI / Generative AI',
      'RAG',
      'Accessibility',
      'WCAG',
      'Web Applications',
      'Cloud Platforms',
    ],
  },
]

/* ── Process ───────────────────────────────────────────────── */

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Understand',
    body: 'Understand the business problem, users, stakeholders, and objectives.',
    outputs: ['Stakeholder map', 'Problem statement'],
  },
  {
    number: '02',
    title: 'Analyze',
    body: 'Break down requirements, workflows, pain points, and opportunities.',
    outputs: ['Process flows', 'Gap analysis'],
  },
  {
    number: '03',
    title: 'Define',
    body: 'Convert insights into requirements, user stories, features, and product priorities.',
    outputs: ['User stories', 'Prioritized backlog'],
  },
  {
    number: '04',
    title: 'Collaborate',
    body: 'Work with engineering, design, QA, marketing, and stakeholders.',
    outputs: ['Sprint plans', 'Shared decisions'],
  },
  {
    number: '05',
    title: 'Execute & Improve',
    body: 'Support implementation, validate outcomes, analyze gaps, and continuously improve the product.',
    outputs: ['UAT sign-off', 'Improvement backlog'],
  },
]

/* ── Tools & platforms ─────────────────────────────────────── */

export const tools: Tool[] = [
  { name: 'Jira', use: 'Backlog & delivery', icon: 'kanban' },
  { name: 'Confluence', use: 'Documentation', icon: 'book' },
  { name: 'Figma', use: 'Design collaboration', icon: 'pen' },
  { name: 'WordPress', use: 'CMS', icon: 'globe' },
  { name: 'Open edX', use: 'LMS', icon: 'graduation' },
  { name: 'LMS Platforms', use: 'Learning systems', icon: 'school' },
  { name: 'CMS Platforms', use: 'Content systems', icon: 'layout' },
  { name: 'Google Workspace', use: 'Collaboration', icon: 'users' },
  { name: 'Microsoft Office', use: 'Documents & analysis', icon: 'fileText' },
  { name: 'AI Tools', use: 'Research & drafting', icon: 'sparkles' },
  { name: 'RFP / Procurement Platforms', use: 'Opportunity research', icon: 'landmark' },
  { name: 'Analytics & Research Tools', use: 'Market insight', icon: 'chart' },
]
