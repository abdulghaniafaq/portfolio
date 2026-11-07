import { Component, type ReactNode } from 'react'

/**
 * Keeps an optional widget from taking the page down with it. If the Quick answers code cannot be
 * downloaded (offline blip, or a deploy happened while the page was open) or throws, the widget is
 * simply not shown and the rest of the site carries on.
 */
export class QuietBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: unknown) {
    console.warn('Quick answers is unavailable:', error)
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}
