import { isPlaceholder } from '../../lib/placeholder'

/** Renders a content value, visibly marking it when it is still a [placeholder]. */
export function Value({ children }: { children: string }) {
  // Split so partial placeholders such as "[Start Date] — Present" are marked too.
  const parts = children.split(/(\[[^\]]+\])/).filter(Boolean)
  return (
    <>
      {parts.map((part, i) =>
        isPlaceholder(part) ? (
          <span key={i} className="placeholder-value" title="Placeholder — replace in src/data/portfolio.ts">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  )
}
