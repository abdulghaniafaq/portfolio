import { Fragment } from 'react'
import { isPlaceholder } from '../../lib/placeholder'

/** Lets long addresses (LinkedIn URLs, emails) wrap after "/" or "@" instead of in the middle of a word. */
function BreakAfterSlashes({ children }: { children: string }) {
  const pieces = children.split(/(?<=[/@])/)
  return (
    <>
      {pieces.map((piece, i) => (
        <Fragment key={i}>
          {i > 0 && <wbr />}
          {piece}
        </Fragment>
      ))}
    </>
  )
}

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
          <BreakAfterSlashes key={i}>{part}</BreakAfterSlashes>
        ),
      )}
    </>
  )
}
