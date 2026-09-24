/** A value wrapped in [square brackets] is an unfilled placeholder. */
export const isPlaceholder = (value: string) => /^\[.*\]$/.test(value.trim())
