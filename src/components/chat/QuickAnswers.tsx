import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { fallbackAnswer, greeting, quickAnswers, quickGroups, suggestedIds, thanksReply } from '../../data/quickAnswers'
import type { AnswerAction, QuickAnswer } from '../../data/types'
import { contactLinks, resume } from '../../lib/contact'
import { createMatcher } from '../../lib/quickMatch'
import { Icon } from '../ui/Icon'

/**
 * "Quick answers": ready-made answers to the questions recruiters ask most, found by matching what
 * the visitor types (src/lib/quickMatch.ts). It is not an AI: answers are written in advance
 * (src/data/quickAnswers.ts), and nothing the visitor types leaves their browser.
 */

const matcher = createMatcher(quickAnswers)
const byId = new Map(quickAnswers.map((a) => [a.id, a]))
const suggested = suggestedIds.map((id) => byId.get(id)).filter((a): a is QuickAnswer => Boolean(a))
const MAX_LENGTH = 140

type Message =
  | { id: number; from: 'visitor'; text: string }
  | { id: number; from: 'helper'; text: string; actions: AnswerAction[]; related: QuickAnswer[]; relatedLabel?: string; closest?: string }

const normalise = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

const pill =
  'inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-surface px-3 py-1.5 text-[0.8125rem] font-medium text-ink transition-colors hover:border-ink'

function Action({ action, onNavigate }: { action: AnswerAction; onNavigate: () => void }) {
  switch (action.type) {
    case 'link':
      return (
        <Link to={action.href} onClick={onNavigate} className={pill}>
          {action.label}
          <Icon name="arrowRight" size={13} />
        </Link>
      )
    case 'resume':
      return (
        <a href={resume.href} download={resume.filename} className={`${pill} !border-ink !bg-ink !text-paper hover:!bg-accent-600 hover:!border-accent-600`}>
          Download resume
          <Icon name="download" size={13} />
        </a>
      )
    case 'email':
      return contactLinks.email.href ? (
        <a href={contactLinks.email.href} className={pill}>
          Email Abdul
          <Icon name="mail" size={13} />
        </a>
      ) : null
    case 'linkedin':
      return contactLinks.linkedin.href ? (
        <a href={contactLinks.linkedin.href} target="_blank" rel="noopener noreferrer" className={pill}>
          LinkedIn
          <Icon name="linkedin" size={13} />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      ) : null
  }
}

export function QuickAnswers() {
  const [open, setOpen] = useState(false)
  const [view, setView] = useState<'chat' | 'browse'>('chat')
  const [messages, setMessages] = useState<Message[]>([])
  const [text, setText] = useState('')
  const nextId = useRef(1)
  const panelId = useId()
  const inputId = useId()
  const launcherRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const logRef = useRef<HTMLDivElement>(null)

  const close = (returnFocus = true) => {
    setOpen(false)
    if (returnFocus) requestAnimationFrame(() => launcherRef.current?.focus())
  }

  useEffect(() => {
    if (open && view === 'chat') inputRef.current?.focus()
  }, [open, view])

  // While open the panel behaves as a modal: the page behind it can't scroll and can't be reached
  // by keyboard or screen reader, Tab stays inside, and Escape closes it.
  useEffect(() => {
    if (!open) return
    const root = document.getElementById('root')
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    root?.setAttribute('inert', '')

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
        return
      }
      if (e.key !== 'Tab') return
      const panel = document.getElementById(panelId)
      // Same order as on the page: the launcher button comes first, then the panel's controls.
      const items = [launcherRef.current, ...(panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled])') ?? [])].filter(
        // Skip anything not on screen (on very short screens the launcher is hidden while the panel is open).
        (el): el is HTMLElement => el !== null && el.getClientRects().length > 0,
      )
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      } else if (!items.includes(document.activeElement as HTMLElement)) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      root?.removeAttribute('inert')
    }
  }, [open, panelId])

  useEffect(() => {
    const el = logRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, view, open])

  function ask(question: string) {
    const q = question.trim().slice(0, MAX_LENGTH)
    if (!q) return
    const visitor: Message = { id: nextId.current++, from: 'visitor', text: q }
    const result = matcher.match(q)
    let helper: Message
    if (result.kind === 'match') {
      const exact = normalise(result.entry.question) === normalise(q)
      helper = {
        id: nextId.current++,
        from: 'helper',
        text: result.entry.answer,
        actions: result.entry.actions,
        related: result.related,
        closest: exact ? undefined : result.entry.question,
      }
    } else if (result.kind === 'greeting') {
      helper = { id: nextId.current++, from: 'helper', text: greeting, actions: [], related: suggested.slice(0, 3) }
    } else if (result.kind === 'thanks') {
      helper = { id: nextId.current++, from: 'helper', text: thanksReply, actions: [{ type: 'resume' }], related: [] }
    } else {
      const close = result.suggestions.length > 0
      helper = {
        id: nextId.current++,
        from: 'helper',
        text: fallbackAnswer.answer,
        actions: fallbackAnswer.actions,
        related: close ? result.suggestions : suggested.slice(0, 3),
        relatedLabel: close ? 'Did you mean' : 'You might also ask',
      }
    }
    setMessages((m) => [...m, visitor, helper])
    setText('')
    setView('chat')
    requestAnimationFrame(() => inputRef.current?.focus())
  }

  const started = messages.length > 0

  // Rendered into <body> (outside #root) so the launcher and panel stay usable while the page behind them is inert.
  return createPortal(
    <>
      <button
        ref={launcherRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className={`fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] z-[56] inline-flex h-12 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-paper shadow-lift transition-colors hover:bg-accent-600 sm:right-[max(1.5rem,env(safe-area-inset-right))] sm:bottom-[max(1.5rem,env(safe-area-inset-bottom))] ${open ? '[@media(max-height:30rem)]:hidden' : ''}`}
      >
        <Icon name={open ? 'close' : 'message'} size={18} />
        Quick answers
      </button>

      {open && (
        <div
          aria-hidden="true"
          onClick={() => close()}
          className="fixed inset-0 z-[55] bg-black/35 backdrop-blur-[3px]"
        />
      )}

      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label="Quick answers about Abdul"
          className="fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[calc(max(1rem,env(safe-area-inset-bottom))+4rem)] left-[max(1rem,env(safe-area-inset-left))] z-[56] flex flex-col overflow-hidden rounded-2xl border border-line bg-surface text-ink shadow-lift h-[min(36rem,calc(100dvh-7rem-env(safe-area-inset-bottom)))] sm:right-[max(1.5rem,env(safe-area-inset-right))] sm:bottom-[calc(max(1.5rem,env(safe-area-inset-bottom))+4rem)] sm:left-auto sm:w-[26rem] [@media(max-height:30rem)]:top-3 [@media(max-height:30rem)]:bottom-3 [@media(max-height:30rem)]:h-auto"
        >
          <header className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2 border-b border-line px-4 py-3.5">
            <div className="min-w-0">
              <h2 className="text-[0.9375rem] font-semibold tracking-tight">Quick answers</h2>
              <p className="mt-0.5 text-xs text-muted [@media(max-height:44rem)]:hidden">The questions recruiters ask most, answered from this site.</p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setView(view === 'browse' ? 'chat' : 'browse')}
                aria-pressed={view === 'browse'}
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line-strong px-3 text-xs font-medium transition-colors hover:border-ink aria-pressed:border-ink aria-pressed:bg-sunken max-[24rem]:w-9 max-[24rem]:justify-center max-[24rem]:px-0"
              >
                <Icon name="list" size={14} />
                <span className="max-[24rem]:sr-only">All questions</span>
              </button>
              {started && (
                <button
                  type="button"
                  onClick={() => {
                    setMessages([])
                    setView('chat')
                  }}
                  aria-label="Start over"
                  className="grid size-9 place-items-center rounded-full border border-line-strong transition-colors hover:border-ink"
                >
                  <Icon name="restart" size={14} />
                </button>
              )}
              <button
                type="button"
                onClick={() => close()}
                aria-label="Close quick answers"
                className="grid size-9 place-items-center rounded-full border border-line-strong transition-colors hover:border-ink"
              >
                <Icon name="close" size={15} />
              </button>
            </div>
          </header>

          {view === 'browse' ? (
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
              {quickGroups.map((group) => (
                <section key={group} aria-labelledby={`${panelId}-${group}`} className="mb-5 last:mb-0">
                  <h3 id={`${panelId}-${group}`} className="eyebrow text-muted">
                    {group}
                  </h3>
                  <ul className="mt-2 space-y-0.5">
                    {quickAnswers
                      .filter((a) => a.group === group)
                      .map((a) => (
                        <li key={a.id}>
                          <button
                            type="button"
                            onClick={() => ask(a.question)}
                            className="w-full rounded-lg px-2.5 py-2 text-left text-sm text-ink-soft transition-colors hover:bg-sunken hover:text-ink"
                          >
                            {a.question}
                          </button>
                        </li>
                      ))}
                  </ul>
                </section>
              ))}
            </div>
          ) : (
            <div ref={logRef} role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions" className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4">
              <div className="max-w-[92%] rounded-2xl rounded-bl-md bg-sunken px-3.5 py-2.5 text-sm leading-relaxed">{greeting}</div>

              {!started && (
                <ul className="flex flex-wrap gap-2" aria-label="Suggested questions">
                  {suggested.map((a) => (
                    <li key={a.id}>
                      <button type="button" onClick={() => ask(a.question)} className={pill}>
                        {a.question}
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {messages.map((m) =>
                m.from === 'visitor' ? (
                  <div key={m.id} className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-ink px-3.5 py-2.5 text-sm text-paper">
                    <span className="sr-only">You asked: </span>
                    {m.text}
                  </div>
                ) : (
                  <div key={m.id} className="max-w-[94%] space-y-2.5">
                    <div className="rounded-2xl rounded-bl-md bg-sunken px-3.5 py-3 text-sm leading-relaxed">
                      {m.closest && (
                        <p className="mb-1.5 text-xs text-muted">
                          Closest question: <span className="font-medium text-ink-soft">{m.closest}</span>
                        </p>
                      )}
                      <p>{m.text}</p>
                    </div>
                    {m.actions.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {m.actions.map((a, i) => (
                          <Action key={`${a.type}-${i}`} action={a} onNavigate={() => close(false)} />
                        ))}
                      </div>
                    )}
                    {m.related.length > 0 && (
                      <div>
                        <p className="text-xs text-muted">{m.relatedLabel ?? 'You might also ask'}</p>
                        <ul className="mt-1 space-y-0.5">
                          {m.related.map((r) => (
                            <li key={r.id}>
                              <button
                                type="button"
                                onClick={() => ask(r.question)}
                                className="rounded-md px-1.5 py-1 text-left text-[0.8125rem] text-accent-600 underline underline-offset-2 hover:no-underline"
                              >
                                {r.question}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ),
              )}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault()
              ask(text)
            }}
            className="border-t border-line px-4 pt-3 pb-3"
          >
            <div className="flex items-center gap-2">
              <label htmlFor={inputId} className="sr-only">
                Ask a question about Abdul
              </label>
              <input
                ref={inputRef}
                id={inputId}
                type="text"
                value={text}
                maxLength={MAX_LENGTH}
                onChange={(e) => setText(e.target.value)}
                placeholder="Ask about experience, skills, projects…"
                autoComplete="off"
                className="h-11 min-w-0 flex-1 rounded-full border border-field bg-paper px-4 text-sm text-ink placeholder:text-muted focus:border-ink"
              />
              <button
                type="submit"
                disabled={!text.trim()}
                aria-label="Send question"
                className="grid size-11 shrink-0 place-items-center rounded-full bg-ink text-paper transition-colors hover:bg-accent-600 disabled:opacity-40 disabled:hover:bg-ink"
              >
                <Icon name="send" size={17} />
              </button>
            </div>
            <p className="mt-2 text-xs leading-snug text-muted [@media(max-height:44rem)]:hidden">Ready-made answers, not a live assistant. What you type stays in your browser.</p>
          </form>
        </div>
      )}
    </>,
    document.body,
  )
}
