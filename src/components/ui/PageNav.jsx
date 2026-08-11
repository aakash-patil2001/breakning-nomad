import { Link } from 'react-router-dom'

// Minimal top nav for pages outside the homepage (escapes listing + detail
// pages) — the homepage has its own full nav (HeroNav) overlaid on the hero
// photo, which doesn't fit these lighter-background inner pages.
function PageNav() {
  return (
    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 sm:px-10">
      <Link
        to="/"
        className="font-display text-lg font-bold tracking-tight text-charcoal dark:text-white sm:text-xl"
      >
        The Breaking <span className="text-coral">Nomad</span>
      </Link>
      <Link
        to="/"
        className="font-sans text-sm font-medium text-charcoal/60 transition-colors hover:text-coral dark:text-white/60"
      >
        &larr; Back Home
      </Link>
    </div>
  )
}

export default PageNav
