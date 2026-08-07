import { useState } from 'react'
import { motion } from 'framer-motion'
import heroImage from '../assets/images/1-final.png'
import cityImage from '../assets/images/4-final.png'
import wildlifeImage from '../assets/images/5-final.png'
import PageNav from '../components/ui/PageNav'
import EscapeCard from '../components/ui/EscapeCard'
import { escapes } from '../data/escapes'

const EASE = [0.22, 1, 0.36, 1]

const pageContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

const gridVariant = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

const categories = ['All Escapes', ...new Set(escapes.map((escape) => escape.tag))]

// Placeholder for a future email/backend hookup — mirrors the same
// simulate-then-resolve shape as the waitlist form's submit function.
async function submitCustomRequest(destination) {
  await new Promise((resolve) => setTimeout(resolve, 600))
  return { data: { destination }, error: null }
}

function ArrowIcon(props) {
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
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  )
}

function CustomRequestCard() {
  const [destination, setDestination] = useState('')
  const [status, setStatus] = useState('idle') // idle | submitting | submitted

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!destination.trim()) return
    setStatus('submitting')
    try {
      await submitCustomRequest(destination)
      setStatus('submitted')
    } catch {
      setStatus('idle')
    }
  }

  return (
    <motion.div
      variants={fadeUp}
      className="mx-auto mt-20 flex max-w-4xl flex-col items-center gap-8 rounded-3xl border border-coral/20 bg-blush px-6 py-10 sm:flex-row sm:gap-10 sm:px-10 sm:py-12"
    >
      <div className="flex shrink-0 -space-x-8">
        <img
          src={cityImage}
          alt=""
          className="h-24 w-20 -rotate-6 rounded-xl border-4 border-white object-cover shadow-lg shadow-charcoal/15 sm:h-28 sm:w-24"
        />
        <img
          src={wildlifeImage}
          alt=""
          className="h-24 w-20 translate-y-3 rotate-6 rounded-xl border-4 border-white object-cover shadow-lg shadow-charcoal/15 sm:h-28 sm:w-24"
        />
      </div>

      <div className="flex-1 text-center sm:text-left">
        <h3 className="font-display text-2xl font-bold leading-tight text-charcoal sm:text-3xl">
          Can&apos;t Find What You&apos;re <span className="text-coral">Looking For?</span>
        </h3>
        <p className="mt-2 font-sans text-sm text-charcoal/60 sm:text-base">
          Tell us where you&apos;d like to go and we&apos;ll make it possible for you.
        </p>

        {status === 'submitted' ? (
          <p className="mt-5 font-sans text-sm font-semibold text-coral">
            Got it — we&apos;ll be in touch about {destination}.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <input
              type="text"
              required
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
              placeholder="Where do you want to go?"
              aria-label="Where do you want to go?"
              className="w-full rounded-full border border-charcoal/15 bg-white px-5 py-3 font-sans text-sm text-charcoal placeholder-charcoal/30 outline-none transition-colors focus:border-coral focus:ring-1 focus:ring-coral sm:flex-1"
            />
            <motion.button
              type="submit"
              disabled={status === 'submitting'}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-coral px-6 py-3 font-sans text-sm font-semibold tracking-wide text-cream transition-colors hover:bg-coral-dark disabled:opacity-60"
            >
              {status === 'submitting' ? 'Sending…' : 'Request It'}
              <ArrowIcon className="h-4 w-4" />
            </motion.button>
          </form>
        )}
      </div>
    </motion.div>
  )
}

function EscapesPage() {
  const [activeCategory, setActiveCategory] = useState('All Escapes')

  const filteredEscapes =
    activeCategory === 'All Escapes'
      ? escapes
      : escapes.filter((escape) => escape.tag === activeCategory)

  return (
    <main className="bg-cream">
      <PageNav />

      <section className="px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="relative mx-auto aspect-[16/9] w-full max-w-6xl overflow-hidden rounded-3xl border border-charcoal/10 shadow-lg shadow-charcoal/10 sm:aspect-[21/9]"
        >
          <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-charcoal/50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <h1 className="font-display text-3xl font-bold leading-tight text-white sm:text-5xl">
              Escapes <span className="text-coral">Crafted</span> for You
            </h1>
            <p className="mt-4 max-w-xl font-sans text-sm text-white/80 sm:text-base">
              From weekend resets to month-long stays — every escape is built around real
              work, not just a change of scenery.
            </p>
          </div>
        </motion.div>
      </section>

      <motion.div
        variants={pageContainer}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-20"
      >
        <motion.div variants={fadeUp} className="text-center">
          <span className="font-sans text-sm font-semibold uppercase tracking-wide text-charcoal/50">
            Filter by
          </span>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {categories.map((category) => {
              const selected = category === activeCategory
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={selected}
                  className={`rounded-full border px-4 py-2 font-sans text-sm font-medium tracking-wide transition-colors duration-200 ${
                    selected
                      ? 'border-charcoal bg-charcoal text-cream'
                      : 'border-charcoal/15 text-charcoal/60 hover:border-charcoal/30 hover:text-charcoal'
                  }`}
                >
                  {category}
                </button>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          key={activeCategory}
          variants={gridVariant}
          initial="hidden"
          animate="show"
          className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredEscapes.map((escape) => (
            <EscapeCard key={escape.slug} escape={escape} variants={cardVariant} />
          ))}
        </motion.div>

        <CustomRequestCard />
      </motion.div>
    </main>
  )
}

export default EscapesPage
