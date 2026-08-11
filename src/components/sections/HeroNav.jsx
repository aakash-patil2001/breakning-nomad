import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'

const navLinks = [
  { label: 'Escapes', to: '/escapes' },
  { label: 'About', to: '/about' },
  { label: 'How It Works', href: '#howweplan' },
  { label: 'Join Waitlist', href: '#waitlist' },
]

function MenuIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
    </svg>
  )
}

function CloseIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

function SunIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.5v2.5M12 19v2.5M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M2.5 12h2.5M19 12h2.5M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
    </svg>
  )
}

function MoonIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a7 7 0 1 0 10.5 10.5Z" />
    </svg>
  )
}

// Compact wordmark + hamburger dropdown pinned to the top of the hero.
// Positioned absolute so it doesn't disturb the hero's own centered
// headline/tagline/CTA stack below it.
function HeroNav() {
  const [open, setOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const handleNavClick = (event, href) => {
    event.preventDefault()
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-5 sm:px-10 sm:py-6">
      <span className="font-display text-base font-bold tracking-tight text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)] sm:text-lg">
        THE BREAKING NOMAD
      </span>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition-colors hover:bg-neutral-800"
        >
          {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition-colors hover:bg-neutral-800"
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>

        <AnimatePresence>
          {open && (
            <>
              <motion.button
                type="button"
                aria-label="Close menu overlay"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-10 cursor-default"
              />
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute right-0 top-full z-20 mt-3 w-48 overflow-hidden rounded-2xl border border-charcoal/10 bg-white shadow-lg shadow-charcoal/20 dark:border-white/10 dark:bg-dark-card dark:shadow-black/40"
              >
                {navLinks.map((link) =>
                  link.to ? (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className="block px-5 py-3 font-sans text-sm font-medium text-charcoal transition-colors hover:bg-blush/60 dark:text-white dark:hover:bg-white/10"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(event) => handleNavClick(event, link.href)}
                      className="block px-5 py-3 font-sans text-sm font-medium text-charcoal transition-colors hover:bg-blush/60 dark:text-white dark:hover:bg-white/10"
                    >
                      {link.label}
                    </a>
                  )
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default HeroNav
