import { motion } from 'framer-motion'

const categoryTags = ['Mountains', 'Beaches', 'City', 'Wildlife']

const pageLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'How It Works', href: '#howweplan' },
  { label: 'Escapes', href: '#escapes' },
  { label: 'Waitlist', href: '#waitlist' },
]

function InstagramIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

// The one section that stays on the dark charcoal theme even after the rest
// of the site moved to pastels — reads as a deliberate closing bookend.
function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="bg-charcoal px-6 py-14 sm:py-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_1fr_1fr] lg:gap-8">
          {/* Wordmark / tagline / quote / category pills */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <span className="font-display text-2xl font-bold leading-none tracking-tight text-white sm:text-3xl">
              Breaking{' '}
              <span className="whitespace-nowrap">
                <span className="font-normal text-white/50">No</span>
                <span className="font-black text-coral">MAD</span>
              </span>
            </span>

            <p className="mt-4 max-w-xs font-sans text-sm text-white/60">
              Small groups. Real destinations. Your job stays intact.
            </p>

            <p className="mt-4 max-w-xs font-display text-sm italic leading-snug text-white/40">
              &ldquo;You don&apos;t need a new life. You need three weeks in a different
              one.&rdquo;
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
              {categoryTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/20 px-3.5 py-1.5 font-sans text-[0.65rem] font-semibold uppercase tracking-wide text-white/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-wide text-white/40">
              Pages
            </h3>
            <nav className="mt-4 flex flex-col items-center gap-3 lg:items-start">
              {pageLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-sans text-sm text-white/70 transition-colors hover:text-coral"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-wide text-white/40">
              Contact
            </h3>
            <div className="mt-4 flex flex-col items-center gap-3 lg:items-start">
              <a
                href="mailto:the.breaking.nomad@gmail.com"
                className="font-sans text-sm text-white/70 transition-colors hover:text-coral"
              >
                the.breaking.nomad@gmail.com
              </a>
              <a
                href="https://instagram.com/the.breaking.nomad"
                target="_blank"
                rel="noreferrer"
                aria-label="Breaking Nomad on Instagram"
                className="flex items-center gap-2 font-sans text-sm text-white/70 transition-colors hover:text-coral"
              >
                <InstagramIcon className="h-4 w-4" />
                @the_breaking_nomad
              </a>
            </div>
          </div>
        </div>

        {/* Divider + copyright bar */}
        <div className="mt-12 flex flex-col items-center gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-xs text-white/40">
            © 2026 Breaking Nomad. All rights reserved.
          </p>
          <div className="flex items-center gap-6 font-sans text-xs text-white/40">
            <a href="#privacy-policy" className="transition-colors hover:text-white/70">
              Privacy Policy
            </a>
            <a href="#terms-of-service" className="transition-colors hover:text-white/70">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer
