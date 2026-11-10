/** Reads a URL hash ("#contact") as a section id. A malformed one such as "#%E0%A4%A" is returned as typed instead of throwing. */
export function sectionIdFromHash(hash: string): string {
  const raw = hash.replace(/^#/, '')
  try {
    return decodeURIComponent(raw)
  } catch {
    return raw
  }
}
