// Shows how the matcher scores a question:  node scripts/quick-answers-debug.mjs "does he know jira"
import { createServer } from 'vite'
const server = await createServer({ configFile: false, appType: 'custom', logLevel: 'silent', server: { middlewareMode: true } })
try {
  const { quickAnswers } = await server.ssrLoadModule('/src/data/quickAnswers.ts')
  const { createMatcher } = await server.ssrLoadModule('/src/lib/quickMatch.ts')
  const m = createMatcher(quickAnswers)
  for (const q of process.argv.slice(2)) {
    const r = m.match(q)
    console.log(`\n"${q}" → ${r.kind === 'match' ? r.entry.id : r.kind}`, m.debug(q).map((d) => `\n     ${d.id} ${d.score}  via "${d.via}"`).join(''))
  }
} finally {
  await server.close()
}
