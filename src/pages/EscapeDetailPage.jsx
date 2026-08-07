import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import PageNav from '../components/ui/PageNav'
import EscapeCard from '../components/ui/EscapeCard'
import { escapes } from '../data/escapes'

const EASE = [0.22, 1, 0.36, 1]

const pageContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

function ClockIcon(props) {
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
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  )
}

function PinIcon(props) {
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
      <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  )
}

function GroupIcon(props) {
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
      <circle cx="9" cy="8" r="3" />
      <path d="M2.5 19c0-3.3 2.9-5.5 6.5-5.5s6.5 2.2 6.5 5.5" />
      <path d="M16 8.5a2.75 2.75 0 1 1 0-5.5M21.5 19c0-2.8-2.1-4.8-5-5.3" />
    </svg>
  )
}

function CheckIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m5 13 4 4L19 7" />
    </svg>
  )
}

function CrossIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

function PlusIcon(props) {
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
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

function ItineraryDay({ day, isOpen, onToggle }) {
  return (
    <div className="border-b border-charcoal/10 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-display text-base font-bold text-charcoal sm:text-lg">
          {day.day} &mdash; {day.title}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-peach/60 text-charcoal"
        >
          <PlusIcon className="h-4 w-4" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pb-5 font-sans text-xs font-semibold uppercase tracking-wide text-coral">
              {day.location}
            </p>
            <p className="-mt-3 pb-5 pr-10 font-sans text-sm leading-relaxed text-charcoal/70">
              {day.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function EscapeDetailPage() {
  const { slug } = useParams()
  const escape = escapes.find((item) => item.slug === slug)
  const [openDay, setOpenDay] = useState(0)

  if (!escape) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-cream px-6 text-center">
        <h1 className="font-display text-2xl font-bold text-charcoal">Escape not found</h1>
        <Link
          to="/escapes"
          className="font-sans text-sm font-semibold text-coral hover:text-coral-dark"
        >
          &larr; Back to all escapes
        </Link>
      </main>
    )
  }

  const otherEscapes = escapes.filter((item) => item.slug !== escape.slug)

  return (
    <main className="bg-cream">
      <PageNav />

      <section className="px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="relative mx-auto aspect-[4/5] w-full max-w-6xl overflow-hidden rounded-3xl border border-charcoal/10 shadow-lg shadow-charcoal/10 sm:aspect-[16/9]"
        >
          <img src={escape.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent" />
          <span className="absolute left-6 top-6 rounded-full bg-white px-3.5 py-1.5 font-sans text-xs font-semibold tracking-wide text-charcoal shadow-sm sm:left-8 sm:top-8">
            {escape.tag}
          </span>
          <h1 className="absolute bottom-6 left-6 right-6 font-display text-3xl font-bold leading-tight text-white sm:bottom-10 sm:left-10 sm:text-5xl">
            {escape.name}
          </h1>
        </motion.div>
      </section>

      <motion.div
        variants={pageContainer}
        initial="hidden"
        animate="show"
        className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-16 sm:px-10 sm:py-20 lg:grid-cols-[1fr_360px] lg:items-start"
      >
        {/* Main column */}
        <motion.div variants={fadeUp}>
          <h2 className="font-display text-2xl font-bold leading-tight text-charcoal sm:text-3xl">
            {escape.tagline}
          </h2>
          <div className="my-5 border-t border-dashed border-charcoal/20" />
          {escape.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 font-sans text-sm leading-relaxed text-charcoal/70 sm:text-base">
              {paragraph}
            </p>
          ))}

          <h3 className="mt-12 font-display text-xl font-bold text-charcoal sm:text-2xl">
            Why This Journey
          </h3>
          <ul className="mt-5 space-y-3">
            {escape.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-3 font-sans text-sm text-charcoal/70 sm:text-base">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
                {highlight}
              </li>
            ))}
          </ul>

          <h3 className="mt-12 font-display text-xl font-bold text-charcoal sm:text-2xl">
            Full Itinerary
          </h3>
          <div className="mt-5 rounded-2xl border border-charcoal/10 bg-white px-5 shadow-sm sm:px-6">
            {escape.itinerary.map((day, index) => (
              <ItineraryDay
                key={day.day}
                day={day}
                isOpen={openDay === index}
                onToggle={() => setOpenDay((prev) => (prev === index ? null : index))}
              />
            ))}
          </div>

          <h3 className="mt-12 font-display text-xl font-bold text-charcoal sm:text-2xl">
            What&apos;s Covered
          </h3>
          <div className="mt-5 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <p className="font-sans text-xs font-semibold uppercase tracking-wide text-charcoal/50">
                Inclusions
              </p>
              <ul className="mt-3 space-y-2.5">
                {escape.inclusions.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 font-sans text-sm text-charcoal/70">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-sans text-xs font-semibold uppercase tracking-wide text-charcoal/50">
                Exclusions
              </p>
              <ul className="mt-3 space-y-2.5">
                {escape.exclusions.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 font-sans text-sm text-charcoal/70">
                    <CrossIcon className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-2">
            {escape.gallery.map((photo, index) => (
              <div key={index} className="aspect-[4/3] overflow-hidden rounded-2xl">
                <img src={photo} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div variants={fadeUp} className="lg:sticky lg:top-8">
          <div className="rounded-2xl bg-charcoal px-6 py-6 text-cream sm:px-8 sm:py-8">
            <p className="font-sans text-xs font-semibold uppercase tracking-wide text-cream/60">
              Starting from
            </p>
            <p className="mt-1 font-display text-4xl font-bold">
              ${escape.price}
              <span className="ml-1 font-sans text-base font-normal text-cream/60">/person</span>
            </p>
          </div>

          <div className="mt-4 space-y-4 rounded-2xl border border-charcoal/10 bg-white px-6 py-6 sm:px-8 sm:py-8">
            <div className="flex items-center justify-between font-sans text-sm">
              <span className="flex items-center gap-2 text-charcoal/50">
                <ClockIcon className="h-4 w-4" /> Duration
              </span>
              <span className="font-semibold text-charcoal">{escape.duration}</span>
            </div>
            <div className="flex items-center justify-between font-sans text-sm">
              <span className="flex items-center gap-2 text-charcoal/50">
                <PinIcon className="h-4 w-4" /> Destination
              </span>
              <span className="font-semibold text-charcoal">{escape.destination}</span>
            </div>
            <div className="flex items-center justify-between font-sans text-sm">
              <span className="flex items-center gap-2 text-charcoal/50">
                <GroupIcon className="h-4 w-4" /> Group size
              </span>
              <span className="font-semibold text-charcoal">{escape.groupSize}</span>
            </div>

            <a
              href="/#waitlist"
              className="mt-2 flex items-center justify-center rounded-full bg-coral px-6 py-3.5 font-sans text-sm font-semibold tracking-wide text-cream transition-colors hover:bg-coral-dark"
            >
              Join the Waitlist
            </a>

            <div className="border-t border-dashed border-charcoal/15 pt-4 text-center">
              <p className="font-sans text-xs text-charcoal/50">Need help deciding?</p>
              <a
                href="mailto:the.breaking.nomad@gmail.com"
                className="mt-1 inline-block font-sans text-sm font-semibold text-coral hover:text-coral-dark"
              >
                the.breaking.nomad@gmail.com
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {otherEscapes.length > 0 && (
        <div className="mx-auto max-w-6xl px-6 pb-20 sm:px-10">
          <div className="border-t border-charcoal/10 pt-16">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold leading-tight text-charcoal sm:text-3xl">
                More <span className="text-coral">Escapes</span>
              </h2>
              <Link
                to="/escapes"
                className="hidden font-sans text-sm font-semibold text-coral hover:text-coral-dark sm:inline-flex sm:items-center sm:gap-1"
              >
                View All <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {otherEscapes.map((item) => (
                <EscapeCard key={item.slug} escape={item} />
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default EscapeDetailPage
