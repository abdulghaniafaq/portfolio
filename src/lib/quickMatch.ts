import type { QuickAnswer } from '../data/types'

/**
 * Matches a visitor's question to the closest ready-made answer (src/data/quickAnswers.ts).
 * Runs in the browser; nothing is sent anywhere.
 *
 * Every entry has a question plus other ways of asking it ("phrasings"). The visitor's text is
 * compared with each phrasing as a whole (idf-weighted cosine similarity, with synonyms and
 * typo tolerance), and an entry scores as its best phrasing. A weak best score returns `none`,
 * and the panel shows the resume fallback instead of a wrong answer.
 */

export type MatchResult =
  | { kind: 'match'; entry: QuickAnswer; related: QuickAnswer[] }
  | { kind: 'greeting' }
  | { kind: 'thanks' }
  /** Nothing matched well. `suggestions` are the closest questions ("Did you mean..."), possibly empty. */
  | { kind: 'none'; suggestions: QuickAnswer[] }

/** Minimum similarity (0 to 1) between the visitor's text and an entry's closest phrasing. */
export const MIN_COVERAGE = 0.45

/** Minimum share of the visitor's wording (importance-weighted) that a phrasing must account for. */
export const MIN_SHARE = 0.5

/** Closest questions below the match threshold are still offered as "Did you mean" from this similarity. */
export const SUGGEST_FROM = 0.22

/** Function words and filler question words. Meaning is carried by content words and by the concept tags below. */
const STOP = new Set(
  `a an the and or but if then of to in on at by for with from as is are was were be been being do does did doing have has had having
   i me my you your he him his she her it its we our they them their this that these those can could would should will shall may might
   also any some there here so than too very just into over under out up down not no yes ok okay please s mr sir madam abdul abduls ghani afaq
   what how when where why who which whom tell about show give list explain describe know like want need get got let us tried try see look view check points point interested interest right go goes went kind type sort short far bit little quick quickly done made moment best way things stuff`.split(/\s+/),
)

/** Query-side synonyms. Keys are what visitors type; values are words that appear in the entries. */
const SYN: Record<string, string[]> = {
  ctc: ['salary'], compensation: ['salary'], pay: ['salary'], paid: ['salary'], package: ['salary'], remuneration: ['salary'],
  earn: ['salary'], earning: ['salary'], earnings: ['salary'], income: ['salary'], wage: ['salary'], lpa: ['salary'], rate: ['salary'],
  sponsorship: ['visa'], permit: ['visa'], authorization: ['visa'], authorisation: ['visa'], citizenship: ['visa'], immigration: ['visa'], citizen: ['visa'],
  notice: ['availability', 'join', 'start'], available: ['availability', 'join'], availability: ['available', 'join'], 
  immediate: ['immediately', 'join'], immediately: ['join', 'availability'], openings: ['available'],
  relocate: ['relocation'], relocating: ['relocation'], move: ['relocation'], moving: ['relocation'], abroad: ['relocation'], overseas: ['relocation'],
  remote: ['remote', 'location'], onsite: ['remote', 'location'], hybrid: ['remote', 'location'], wfh: ['remote'], city: ['location', 'based'], country: ['location', 'based'],
  live: ['location', 'based'], lives: ['location', 'based'], located: ['location', 'based'], based: ['location'],
  degree: ['education'], college: ['education'], university: ['education'], school: ['education'], graduate: ['education'], graduation: ['education'],
  btech: ['education'], qualification: ['education'], qualifications: ['education'], studied: ['education'], study: ['education'], academic: ['education'],
  certified: ['certification'], certificate: ['certification'], certifications: ['certification'], cspo: ['certification', 'education'], csm: ['certification'],
  reference: ['references'], referee: ['references'], referees: ['references'], vouch: ['references'], recommendation: ['references'], recommendations: ['references'],
  telephone: ['phone'], mobile: ['phone'], call: ['phone', 'contact'], whatsapp: ['phone'], cell: ['phone'],
  email: ['contact'], mail: ['contact'], reach: ['contact'], linkedin: ['contact'], connect: ['contact'], interview: ['contact'], schedule: ['contact'], message: ['contact'],
  cv: ['resume'], curriculum: ['resume'], vitae: ['resume'],
  experienced: ['experience'], employment: ['experience'], employer: ['experience', 'company'], employers: ['experience', 'company'], background: ['experience'],
  history: ['experience'], career: ['experience'], worked: ['experience'], jobs: ['experience'], companies: ['experience', 'company'],
  skill: ['skills'], skillset: ['skills'], competencies: ['skills'], competency: ['skills'], abilities: ['skills'], capabilities: ['skills'], expertise: ['skills'],
  tool: ['tools'], tooling: ['tools'], software: ['tools'], stack: ['tools'], applications: ['tools'], apps: ['tools'], platforms: ['tools'],
  scrum: ['agile'], kanban: ['agile'], sprint: ['agile'], sprints: ['agile'], standups: ['agile'],
  portfolio: ['projects'], project: ['projects'], samples: ['projects'],
  achievement: ['achievements'], accomplishment: ['achievements'], accomplishments: ['achievements'], wins: ['achievements'], proof: ['achievements'],
  award: ['recognition'], awards: ['recognition'], honors: ['recognition'], honours: ['recognition'], prize: ['recognition'],
  left: ['leaving'], leave: ['leaving'], leaving: ['leaving'], quit: ['leaving'], resign: ['leaving'], resigned: ['leaving'], switch: ['leaving'], switching: ['leaving'],
    genai: ['ai', 'generative'], llm: ['ai'], chatbot: ['ai'], ml: ['ai'],
  a11y: ['accessibility'], wcag: ['accessibility'], ada: ['accessibility'],
  proposals: ['presales'], rfp: ['presales'], rfq: ['presales'], bid: ['presales'], bids: ['presales'],
  strengths: ['strengths'], strength: ['strengths'], weaknesses: ['strengths'],
  hire: ['hire', 'fit'], hiring: ['hire', 'fit'],
  introduce: ['who'], bio: ['who'], intro: ['who'],
  responsibilities: ['day', 'own'], duties: ['day', 'own'], responsible: ['day', 'own'],
  promoted: ['progressed'], promotion: ['progressed'], progression: ['progressed'],
  kpis: ['achievements'], kpi: ['achievements'], numbers: ['achievements'], metrics: ['achievements'], results: ['achievements'], impact: ['achievements'],
}

/** Words that mean the same thing for matching. Applied to the phrasings and to the visitor's text. */
const CANON_GROUPS: Record<string, string[]> = {
  summarize: ['summarise', 'summary', 'overview', 'rundown', 'outline', 'recap', 'nutshell', 'brief', 'briefly', 'gist', 'snapshot', 'overall', 'general', 'generally', 'entire', 'whole', 'complete', 'full', 'everything', 'comprehensive', 'picture', 'highlights'],
  experience: ['experienced', 'career', 'background', 'history', 'journey', 'worked', 'employment'],
  skill: ['skilled', 'skillful', 'skills', 'skillset', 'competency', 'competencies', 'abilities', 'ability', 'capabilities', 'capability', 'expertise', 'proficiency', 'proficient'],
  tool: ['tools', 'tooling', 'toolset', 'software', 'stack', 'applications', 'apps'],
  salary: ['ctc', 'compensation', 'pay', 'paid', 'package', 'remuneration', 'earn', 'earning', 'earnings', 'income', 'wage', 'lpa', 'salaries'],
  visa: ['sponsorship', 'permit', 'authorization', 'authorisation', 'citizenship', 'immigration', 'citizen'],
  education: ['degree', 'college', 'university', 'school', 'graduate', 'graduation', 'btech', 'qualification', 'qualifications', 'studied', 'study', 'academic'],
  certification: ['certified', 'certificate', 'certifications', 'cspo', 'csm', 'certify'],
  reference: ['references', 'referee', 'referees', 'vouch', 'recommendation', 'recommendations'],
  phone: ['telephone', 'mobile', 'whatsapp', 'cell'],
  resume: ['cv', 'curriculum', 'vitae'],
  relocation: ['relocate', 'relocating', 'relocated'],
  achievement: ['achievements', 'accomplishment', 'accomplishments', 'results', 'result', 'impact', 'metrics', 'metric', 'numbers', 'wins', 'proof', 'delivered', 'outcomes', 'outcome', 'kpi', 'kpis', 'success', 'achieved', 'accomplished'],
  award: ['awards', 'appreciated', 'rewarded', 'reward', 'rewards', 'appreciation', 'acknowledged', 'acknowledgement', 'recognition', 'recognised', 'recognized', 'honors', 'honours', 'prize'],
  project: ['projects', 'portfolio', 'samples', 'examples', 'example', 'sample'],
  competitor: ['competitors', 'competitive', 'competition', 'benchmarking', 'benchmark', 'benchmarks'],
  roadmap: ['roadmaps', 'roadmapping'],
  stakeholder: ['stakeholders', 'executives', 'executive', 'csuite', 'client', 'clients'],
  agile: ['scrum', 'kanban', 'sprint', 'sprints', 'ceremonies', 'standups'],
  accessibility: ['a11y', 'wcag', 'ada'],
  ai: ['genai', 'llm', 'ml', 'chatbot', 'chatbots'],
  proposal: ['proposals', 'rfp', 'rfps', 'rfq', 'rfqs', 'bid', 'bids', 'presales'],
  position: ['positions', 'role', 'roles', 'titles', 'title', 'designation', 'opening', 'openings'],
  candidate: ['candidates', 'applicant', 'hire', 'hiring', 'hires'],
  contact: ['email', 'mail', 'reach', 'linkedin', 'connect', 'message'],
  process: ['approach', 'method', 'methodology', 'framework', 'workflow', 'procedure'],
  document: ['documents', 'documentation', 'docs'],
  dashboard: ['dashboards', 'reporting', 'reports'],
  company: ['organization', 'organisation', 'firm', 'org', 'employer', 'employers'],
  key: ['main', 'core', 'primary', 'top', 'major', 'chief'],
  seek: ['looking', 'targeting', 'seeking', 'pursuing', 'aiming', 'hoping', 'wants'],
  strength: ['strengths', 'strongest', 'shine', 'shines', 'talent', 'talents', 'forte', 'superpower'],
  job: ['jobs'],
  previous: ['last', 'former', 'past', 'earlier', 'prior', 'old'],
  leave: ['left', 'leaving', 'quit', 'quitting', 'resign', 'resigned', 'resigning', 'switch', 'switched', 'switching', 'departing'],
  lead: ['led', 'leads', 'leading', 'supervised', 'supervise', 'supervising', 'mentored', 'mentoring', 'oversaw', 'oversee', 'overseeing', 'managed'],
  analysis: ['analyst', 'analysts', 'analyses', 'analyze', 'analyzed', 'analysing', 'analyzing', 'analytical'],
  day: ['daily', 'tasks', 'task', 'everyday'],
  progress: ['progressed', 'progression', 'promoted', 'promotion', 'grow', 'grew', 'grown', 'growth', 'growing', 'advance', 'advanced', 'climbed'],
  collaborate: ['collaborates', 'collaboration', 'collaborating', 'coordinate', 'coordinates', 'coordination', 'coordinating', 'coordinated', 'coordinator'],
  handle: ['manage', 'manages', 'managing', 'management', 'handling', 'handles', 'deal', 'deals', 'dealing'],
}
/** Generic words: they appear in many questions without saying what the question is about. */
const ENTITIES = new Set(['innovationm', 'symb', 'abm', 'kora', 'edro', 'jira', 'figma', 'confluence', 'wordpress', 'edx', 'wcag', 'ada', 'cspo', 'btech'])
const WEAK = new Set(
  ['good', 'great', 'well', 'familiar', 'comfortable', 'skilled', 'capable', 'use', 'used', 'using', 'work', 'working', 'daily', 'often', 'really', 'much', 'many', 'long', 'recent', 'recently', 'new', 'expectation', 'expect', 'open', 'handle', 'experience', 'sure', 'person', 'people', 'build', 'built', 'create', 'created', 'speak', 'speaks', 'write', 'writes', 'written', 'take', 'make', 'makes', 'won', 'win', 'senior', 'time', 'today', 'tomorrow', 'key', 'job', 'join', 'joined', 'joining', 'start', 'started', 'market', 'learn', 'learning'],
)
const CANON: Record<string, string> = {}
for (const [head, members] of Object.entries(CANON_GROUPS)) for (const m of members) CANON[m] = head

/**
 * Concept tags: a few clear intents that are phrased in many different ways. A tag is added to the
 * phrasings and to the visitor's text whenever its pattern matches, so "can he work from home" and
 * "is he open to remote" meet on the same tag. Order matters: a tag in `excludes` blocks another.
 */
const CONCEPTS: { tag: string; test: RegExp; unless?: RegExp }[] = [
  { tag: 'zeducation', test: /\b(his|abdul s) (studies|education|degree|schooling)\b|where (did|does) (he|abdul) (study|graduate)|what did (he|abdul) (study|major)|\bstudied\b/ },
  { tag: 'zrelocate', test: /\b(move|shift|relocat)\w*\b.{0,25}\b(city|country|abroad|overseas|another|different|new)\b|willing to (move|shift)|open to (move|moving|shifting)|can (he|abdul) (move|relocate)/ },
  { tag: 'zexec', test: /senior (management|leadership|stakeholders|people|executives)|top management|higher[- ]?ups|c[- ]?level|\bexecutives?\b|leadership team|\bboard\b|senior leaders?/ },
  { tag: 'zroadmap', test: /(plan|planning|decide|set|define|shape|own)\b.{0,15}\b(product )?(direction|roadmap|vision|strategy)|\bproduct (direction|vision|strategy|roadmap)\b|how (does|do) (he|abdul) (prioriti[sz]e|decide what)/ },
  { tag: 'zroles', test: /what (sort|kind|type)s? of (job|role|position|work)s? (is|does|would) (he|abdul)|which (job|role|position)s? (is|does|would) (he|abdul)|what (job|role|position)s? (is|does|would) (he|abdul)|(interested in|looking for|applying (for|to)|wants?|seeking|targeting)\b.{0,20}\b(jobs?|roles?|positions?|openings?)\b/ },
  { tag: 'zvisa', test: /right to work|authori[sz]ed to work|eligible to work|legally (allowed|able)|work (in|within) the (us|usa|uk|country)|work visa|green card|h1b|h-1b/ },
  { tag: 'zleaving', test: /\bwhy\b.{0,35}\b(leave|left|leaving|quit|resign|resigned|switch|switching|chang(e|ed|ing)|moving on)\b|reason for (leaving|(a )?(job|career) change|chang(e|ing) (jobs?|compan)|the switch|switching)|looking for a (new|another)/ },
  { tag: 'zoutcome', test: /came out of|what came of|what changed|what happened (as|after)|resulted (in|from)|\bresults? of\b|end result|pay.?off/ },
  { tag: 'zavailable', test: /notice period|\b(can|could|when (can|could|will|would|is|does)|how soon|how quickly|how fast|how early)\b.{0,18}\b(start|join|joining|begin|onboard)\b|\bavailab|\bimmediate|\b(is|are)\b.{0,20}\b(looking|open) (for|to)\b.{0,12}\b(work|job|jobs|opportunit|opportunities|role|roles|position|positions|employment)\b|currently looking/, unless: /\bwhy\b/ },
  { tag: 'zlocation', test: /where\b.{0,15}\b(live|lives|stay|based|located)\b|\bbased\b|\bremote|work(ing)? from home|\bwfh\b|\bhybrid\b|\bon.?site\b|\b(what|which) (city|country)\b|which (part|state|region|area)\b.{0,15}\b(he|abdul|india)\b|where (is|does) (he|abdul) (from|come from)|hometown|native place|from the office|work(ing)? from (the )?office/ },
  { tag: 'zwho', test: /^\s*(who is|who s|tell me about|about|introduce|intro to|bio of)\s+(abdul|him|he|this|the|a)\s*(bit\s+)?(candidate|person|applicant|abdul|him)?\s*$|^\s*(who is|who s) (abdul|he|this (person|candidate))|what (does|do) (he|abdul) do( for a living)?\s*$|\bintro(duction)? to (abdul|him)\b|know who (he|abdul) is|tell me (a bit )?about (this|the) (candidate|person|applicant)|who (abdul|he) is\b|\b(profile|snapshot|bio|introduction|intro)\b.{0,20}\b(abdul|him|his|candidate|person)\b|\b(abdul s|his|the candidate s)\s+(profile|bio)\b|\b(tell|give|share|say|show)\b.{0,12}\b(something|a bit|a little|anything|more)\b.{0,12}\babout\b.{0,12}\b(abdul|him|the candidate|this person)\b/ },
  { tag: 'zhire', test: /stand(s)? out|stands apart|\bapart\b|different from|reason to hire|right (candidate|fit|person)|good fit|best fit|bring to (our|the|a) team|value (he|abdul|does)|why\b.{0,15}\b(hire|choose|pick|select)|hire (him|abdul)|sell me|why should|why would we|\brecommend (him|abdul)|case for hiring|^\s*why (him|abdul)\s*$|\bconvince me\b|strong candidate/ },
  { tag: 'zstrength', test: /strength|strong points?|\bbest at\b|do(es)? (he|abdul) do best|\bstrong suits?\b/ },
  { tag: 'zcontactinfo', test: /get in touch|\bemail address\b|e-?mail id|best way to (reach|contact)|how (do|can|should) i (reach|contact|email|message)|contact (details|info|information)|speak (to|with)|talk to|\bschedule (a|an|the)\b|book (a|an|the) (call|meeting|interview|slot)|set up (a|an|the) (call|meeting|interview|chat)|(arrange|organi[sz]e) (a|an|the) (call|meeting|interview|chat)|(call|chat|meeting) with (him|abdul)|catch up|reach out|give me (his|abdul s) (email|e-?mail)/ },
  { tag: 'zskillsgeneral', test: /(is|are) (he|abdul|his) good at|what can (he|abdul) do|what skills|list (of )?(his )?skills|skills (does|do) (he|abdul)|main skills|skill set/ },
  { tag: 'zsummary', test: /\b(tell|talk|speak|walk|give|explain|describe|share|brief|show|take|fill)\b.{0,30}\b(experience|background|career|history|journey|work life|professional)\b|\b(overall|entire|whole|complete|full|general|big picture)\b.{0,20}\b(experience|background|career|history|work|picture)\b|\bexperience in general\b|\b(experience|background|career|history|journey)\b.{0,12}\b(overall|in general|so far)\b|what (has|have) (he|abdul) (done|been doing)|brief me|bring me up to speed/, unless: /\b(experience|background|history|career)\s+(with|in|at|on|of|as|using)\b|\b(innovationm|symb|abm|kora|edro|jira|figma|agile|scrum|ai|accessibility|pmo|rfp)\b/ },
  { tag: 'zyears', test: /how (many )?years|years of|how (long|experienced|senior)|how much experience|total experience|how many yrs/ },
  { tag: 'zprocess', test: /how (does|do|did) (he|abdul) (work|operate|go about|gather|elicit|collect|capture|approach|tackle|plan|start)|(he|abdul) works\b|working (style|method)|way of working|ways? of working/ },
  { tag: 'zshowwork', test: /(show|see|view|share) (me )?(his|abdul s) (work|projects)|examples? of (his|abdul s) work|work samples?|what (has|did|have) (he|abdul) (worked on|work on|built|done)|(is|was) (he|abdul) working on|work (he|abdul) (has|have|did|had) (done|worked|built)|products? (he|abdul) (has |have |had )?(worked on|built|managed|shipped|launched)/, unless: /\b(at|on|for|with|in)\s+(innovationm|symb|abm|kora|edro)\b/ },
  { tag: 'zcurrent', test: /at the moment|right now|\bcurrently\b|\bpresent\b|\bnow\b|\bcurrent\b|\blatest\b|these days|\btoday\b|nowadays/, unless: /looking for|open to|availab|notice|\bjoin/ },
  { tag: 'zdaily', test: /day to day|daily|every day|typical day|day.?to.?day|responsibilit|\bduties\b|what does he own/ },
]

const conceptsOf = (text: string): string[] => {
  const t = text.toLowerCase().replace(/[’']/g, ' ').replace(/\s+/g, ' ')
  const tags: string[] = []
  for (const c of CONCEPTS) if (c.test.test(t) && !(c.unless && c.unless.test(t))) tags.push(c.tag)
  return tags
}

const stem = (w: string) =>
  w.length > 4 && w.endsWith('ies')
    ? `${w.slice(0, -3)}y`
    : w.length > 5 && w.endsWith('ing')
      ? w.slice(0, -3)
      : w.length > 3 && w.endsWith('s') && !w.endsWith('ss') && !w.endsWith('us') && !w.endsWith('is')
        ? w.slice(0, -1)
        : w

const words = (s: string): string[] =>
  s
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/b\.?\s?tech/g, 'btech')
    .replace(/\bapm\b/g, 'associate product manager')
    .replace(/\bpm\b/g, 'product manager')
    .replace(/\bba\b/g, 'business analyst')
    .replace(/\bc[- ]suite\b/g, 'executives')
    .replace(/\be[- ]?learning\b/g, 'elearning')
    .replace(/\bhr[- ]tech\b/g, 'hrtech')
    .replace(/\bpre[- ]?sales\b/g, 'presales')
    .replace(/\beducation(al)? technolog(y|ies)\b/g, 'edtech')
    .replace(/[^a-z0-9+#\s-]/g, ' ')
    .replace(/(\w)-(?=\w)/g, '$1 ')
    .split(/\s+/)
    .map((w) => w.replace(/^[+#-]+|[+#-]+$/g, ''))
    .filter((w) => w.length > 1)

const GREETING = /^\s*(hi+|hello+|hey+|good (morning|afternoon|evening)|namaste|hola)\b[\s!.,?]*$/i
const THANKS = /^\s*(thanks?( you)?|thx|ty|cheers|great|ok(ay)?|got it|perfect)\b[\s!.,?]*$/i

/** Edit distance, capped: returns max+1 as soon as it exceeds `max`. */
function distance(a: string, b: string, max: number): number {
  if (Math.abs(a.length - b.length) > max) return max + 1
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    const cur = [i]
    let best = i
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
      best = Math.min(best, cur[j])
    }
    if (best > max) return max + 1
    prev = cur
  }
  return prev[b.length]
}

interface Group {
  terms: string[]
  weight: number
  /** True for an inferred intent (concept tag), false for a word the visitor typed. */
  tag: boolean
}

interface Phrase {
  entry: QuickAnswer
  tokens: Set<string>
  /** Sum of idf over the phrase's tokens (its length, importance-weighted). */
  norm: number
  /** The exact normalised text, to recognise a picked suggestion. */
  text: string
}

export interface Matcher {
  match(query: string, exclude?: string): MatchResult
  /** Developer aid: the best-scoring entries for a text. */
  debug(query: string): { id: string; score: number; via: string }[]
}

const tokensOf = (text: string): string[] => [
  ...words(text)
    .filter((w) => !STOP.has(w))
    .map((w) => stem(CANON[w] ?? w)),
  ...conceptsOf(text),
]

export function createMatcher(entries: QuickAnswer[]): Matcher {
  const raw: { entry: QuickAnswer; text: string; tokens: string[] }[] = []
  for (const entry of entries) {
    for (const text of [entry.question, ...entry.alsoAskedAs]) raw.push({ entry, text, tokens: tokensOf(text) })
  }

  const df = new Map<string, number>()
  for (const r of raw) for (const t of new Set(r.tokens)) df.set(t, (df.get(t) ?? 0) + 1)
  const N = raw.length
  const idf = (t: string) => {
    const n = df.get(t) ?? 0
    return Math.log(1 + (N - n + 0.5) / (n + 0.5)) * (WEAK.has(t) ? 0.35 : 1) * (ENTITIES.has(t) ? 1.5 : 1)
  }
  const UNKNOWN = 1.4
  const vocab = [...df.keys()]

  // Visitors often combine ideas that the entry covers in separate phrasings ("user stories and
  // acceptance criteria"). One extra phrasing per entry holds all its words so those still match.
  for (const entry of entries) {
    const bag = raw.filter((r) => r.entry === entry).flatMap((r) => r.tokens)
    if (bag.length) raw.push({ entry, text: '', tokens: bag })
  }

  const phrases: Phrase[] = raw
    .filter((r) => r.tokens.length > 0)
    .map((r) => {
      const tokens = new Set(r.tokens)
      return { entry: r.entry, tokens, norm: [...tokens].reduce((n, t) => n + idf(t), 0), text: words(r.text).join(' ') }
    })
  const questionText = new Map(entries.map((e) => [words(e.question).join(' '), e]))

  /** One group per word the visitor typed: the word itself plus its synonyms. */
  function groupsFor(query: string): Group[] {
    const groups: Group[] = []
    const addGroup = (terms: Set<string>, tag = false) => {
      if (terms.size === 0) return
      const known = [...terms].filter((t) => df.has(t))
      // A word we have never seen counts as one ordinary word, not as a rare one.
      const weight = (known.length ? Math.max(...known.map(idf)) : UNKNOWN) * (tag ? 0.7 : 1)
      groups.push({ terms: known.length ? known : [...terms], weight, tag })
    }
    for (const w of words(query)) {
      const terms = new Set<string>()
      if (!STOP.has(w)) terms.add(stem(CANON[w] ?? w))
      for (const syn of SYN[w] ?? []) terms.add(stem(CANON[syn] ?? syn))
      if (terms.size === 0) continue
      // Typo tolerance: an unseen word within one edit (two for long words) of a known term.
      if (![...terms].some((t) => df.has(t)) && w.length >= 7) {
        const limit = w.length >= 10 ? 2 : 1
        let best: string | undefined
        let bestD = limit + 1
        for (const v of vocab) {
          const d = distance(stem(w), v, limit)
          if (d < bestD) {
            bestD = d
            best = v
          }
        }
        if (best) terms.add(best)
      }
      addGroup(terms)
    }
    for (const tag of conceptsOf(query)) addGroup(new Set([tag]), true)
    return groups
  }

  /** Similarity of the visitor's text to each entry: its best phrasing, in 0..1. */
  const bestPhrase = new Map<QuickAnswer, string>()

  /** Best similarity per entry (and, for debugging, which phrasing produced it). */
  function scores(groups: Group[], loose = false): Map<QuickAnswer, number> {
    const qNorm = groups.reduce((n, g) => n + g.weight, 0)
    const best = new Map<QuickAnswer, number>()
    bestPhrase.clear()
    if (qNorm === 0) return best
    // The most specific word the visitor used (among words we know) must be honoured:
    // "experience with UAT" is about UAT, not about experience in general.
    const known = groups.filter((g) => g.terms.some((t) => df.has(t)))
    const rarest = known.length ? known.reduce((a, b) => (b.weight > a.weight ? b : a)) : undefined
    for (const p of phrases) {
      let overlap = 0
      let covered = 0
      let wordHit = false
      for (const g of groups) {
        const hit = g.terms.filter((t) => p.tokens.has(t))
        if (hit.length) {
          overlap += Math.max(...hit.map(idf))
          covered += g.weight
          if (!g.tag) wordHit = true
        }
      }
      if (overlap === 0) continue
      // A suggestion needs at least one of the visitor's own words to match, not only an inferred intent.
      if (loose && !wordHit) continue
      // Matching only a small part of what was asked (one shared word in a long question) isn't a match.
      if (!loose && covered / qNorm < MIN_SHARE) continue
      // Covering the visitor's words matters more than the phrase being short.
      let sim = overlap / (Math.pow(qNorm, 0.65) * Math.pow(p.norm, 0.35))
      if (rarest && !rarest.terms.some((t) => p.tokens.has(t))) sim *= 0.6
      if (sim > (best.get(p.entry) ?? 0)) {
        best.set(p.entry, sim)
        bestPhrase.set(p.entry, p.text || '(all phrasings combined)')
      }
    }
    return best
  }

  return {
    debug(query) {
      return [...scores(groupsFor(query)).entries()].sort((a, b) => b[1] - a[1]).slice(0, 4).map(([e, sc]) => ({ id: e.id, score: Math.round(sc * 100) / 100, via: bestPhrase.get(e) ?? '' }))
    },
    match(query, exclude) {
      const q = query.trim()
      if (!q) return { kind: 'none', suggestions: [] }
      if (GREETING.test(q)) return { kind: 'greeting' }
      if (THANKS.test(q)) return { kind: 'thanks' }

      const norm = words(q).join(' ')
      const picked = questionText.get(norm)
      const groups = groupsFor(q)
      if (!picked && groups.length === 0) return { kind: 'none', suggestions: [] }

      const ranked = [...scores(groups).entries()]
        .filter(([entry]) => entry.id !== exclude)
        .sort((a, b) => b[1] - a[1])
      const top = ranked[0]
      const entry = picked ?? (top && top[1] >= MIN_COVERAGE ? top[0] : undefined)
      if (!entry) {
        // Not sure what was meant: offer the closest questions instead of a dead end.
        const suggestions = [...scores(groups, true).entries()]
          .filter(([e, sim]) => e.id !== exclude && sim >= SUGGEST_FROM)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([e]) => e)
        return { kind: 'none', suggestions }
      }

      const related = ranked
        .filter(([e, sim]) => e.id !== entry.id && sim >= 0.3)
        .slice(0, 2)
        .map(([e]) => e)
      // Not enough close matches: suggest neighbours from the same topic so there is always somewhere to go next.
      const start = entries.indexOf(entry)
      for (let i = 1; i < entries.length && related.length < 2; i++) {
        const e = entries[(start + i) % entries.length]
        if (e.group === entry.group && !related.includes(e)) related.push(e)
      }
      return { kind: 'match', entry, related }
    },
  }
}
