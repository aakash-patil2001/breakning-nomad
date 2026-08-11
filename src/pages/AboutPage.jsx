import { motion } from 'framer-motion'
import PageNav from '../components/ui/PageNav'
import Eyebrow from '../components/ui/Eyebrow'

const EASE = [0.22, 1, 0.36, 1]

const sectionContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

const frictionParagraphs = [
  "There is a version of you that exists outside your apartment. You've met them before — on the last morning of a trip, when the return flight felt like a mistake, when Monday felt like the wrong place to be.",
  "The instinct never left. For most of human history we moved with seasons, with rivers, with reasons — it just ran out of permission somewhere along the way. You feel it in the flight prices you never book, the towns you read about and never visit.",
  "For years, work was the excuse. A desk needed a city, and the city needed you to stay. That excuse is gone now — your work fits in a bag. What's left is harder to admit: going alone is lonely, planning is exhausting, and no one tells you if the wifi actually works until you're already there.",
]

const modelStats = ['12–20 People', '2–4 Weeks', '1 Destination', 'Wifi Tested First']

function StatPill({ label }) {
  return (
    <span className="rounded-full border border-dashed border-charcoal/25 bg-white px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-wide text-charcoal/60 shadow-sm dark:border-white/20 dark:bg-dark-card dark:text-white/60">
      {label}
    </span>
  )
}

function CompassIcon(props) {
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
      <path d="m14.5 9.5-2 5-3-1.5 2-5 3 1.5Z" />
    </svg>
  )
}

function ChecklistIcon(props) {
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
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="m8 12 2.5 2.5L16 9" />
    </svg>
  )
}

function AboutPage() {
  return (
    <main className="bg-cream dark:bg-dark-base">
      <PageNav />

      {/* 1. Hero-style intro */}
      <section className="px-6 pb-16 pt-6 text-center sm:pb-20 sm:pt-8">
        <motion.div
          initial="hidden"
          animate="show"
          variants={sectionContainer}
          className="mx-auto max-w-3xl"
        >
          <motion.div variants={fadeUp}>
            <Eyebrow tone="hero">Our Story</Eyebrow>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl font-bold leading-tight text-charcoal dark:text-white sm:text-6xl"
          >
            The <span className="font-accent italic text-coral">Nomad</span> in Everyone
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-xl font-sans text-base text-charcoal/70 dark:text-white/70 sm:text-lg"
          >
            Why we built Breaking Nomad — and who it's actually for.
          </motion.p>
        </motion.div>
      </section>

      {/* 2. The Friction */}
      <section className="bg-white px-6 py-20 dark:bg-dark-base sm:py-24">
        <motion.div
          variants={sectionContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div variants={fadeUp}>
            <Eyebrow tone="friction">Before Breaking Nomad</Eyebrow>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl font-bold leading-tight text-charcoal dark:text-white sm:text-4xl"
          >
            The <span className="font-accent italic text-coral">Friction</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="mt-8 space-y-5 text-left">
            {frictionParagraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="font-sans text-sm leading-relaxed text-charcoal/70 dark:text-white/70 sm:text-base"
              >
                {paragraph}
              </p>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* 3. What Breaking Nomad Is */}
      <section className="bg-blush px-6 py-20 dark:bg-dark-blush sm:py-24">
        <motion.div
          variants={sectionContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div variants={fadeUp}>
            <Eyebrow tone="escapes">The Model</Eyebrow>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl font-bold leading-tight text-charcoal dark:text-white sm:text-4xl"
          >
            Small Groups. One <span className="font-accent italic text-coral">Destination</span>.
            Everything Handled.
          </motion.h2>

          <motion.div variants={fadeUp} className="mx-auto mt-8 max-w-lg space-y-4 text-left">
            <p className="font-sans text-sm leading-relaxed text-charcoal/70 dark:text-white/70 sm:text-base">
              Breaking Nomad brings together a small group of remote workers and takes them
              to one destination for two to four weeks.
            </p>
            <p className="font-sans text-sm leading-relaxed text-charcoal/70 dark:text-white/70 sm:text-base">
              You keep your job. You keep your meetings and your deadlines. What changes is
              where you're doing all of it from.
            </p>
            <p className="font-sans text-sm leading-relaxed text-charcoal/70 dark:text-white/70 sm:text-base">
              We handle the stays, the workspace, the wifi — tested before anyone arrives —
              and the people, carefully put together so you're never doing any of this
              alone.
            </p>
            <p className="font-sans text-sm leading-relaxed text-charcoal/70 dark:text-white/70 sm:text-base">
              One flight in, one flight out. Everything in between is already sorted.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            {modelStats.map((stat) => (
              <StatPill key={stat} label={stat} />
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* 4. Our Vision & Mission */}
      <section className="bg-sky px-6 py-20 dark:bg-dark-sky sm:py-24">
        <motion.div
          variants={sectionContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-5xl"
        >
          <div className="text-center">
            <motion.div variants={fadeUp}>
              <Eyebrow tone="vision">Vision &amp; Mission</Eyebrow>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl font-bold leading-tight text-charcoal dark:text-white sm:text-4xl"
            >
              Our Vision &amp; <span className="font-accent italic text-coral">Mission</span>
            </motion.h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <motion.div
              variants={fadeUp}
              className="rounded-3xl border border-charcoal/10 bg-white px-7 py-8 shadow-lg shadow-charcoal/10 dark:border-white/10 dark:bg-dark-card dark:shadow-black/30 sm:px-9 sm:py-10"
            >
              <CompassIcon className="h-8 w-8 text-plum" />
              <p className="mt-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/40 dark:text-white/40">
                Vision
              </p>
              <h3 className="mt-2 font-display text-xl font-bold leading-snug text-charcoal dark:text-white sm:text-2xl">
                A world where work doesn't decide where you live.
              </h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-charcoal/70 dark:text-white/70 sm:text-base">
                We imagine a future where remote work isn't a perk you negotiate for — it's
                simply how work is, and where you do it from becomes a choice again, not a
                constraint.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="rounded-3xl border border-coral/20 bg-butter px-7 py-8 shadow-lg shadow-charcoal/10 dark:border-coral/30 dark:bg-dark-butter dark:shadow-black/30 sm:px-9 sm:py-10"
            >
              <ChecklistIcon className="h-8 w-8 text-coral" />
              <p className="mt-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/40 dark:text-white/40">
                Mission
              </p>
              <h3 className="mt-2 font-display text-xl font-bold leading-snug text-charcoal dark:text-white sm:text-2xl">
                Small trips. Real logistics. No planning fatigue.
              </h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-charcoal/70 dark:text-white/70 sm:text-base">
                Today, that means running small-group trips that handle every logistic
                between you and a change of scenery — so trying this out costs you a
                decision, not a spreadsheet.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 5. Closing CTA */}
      <section className="bg-cream px-6 py-16 dark:bg-dark-base sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mx-auto max-w-4xl rounded-3xl border border-coral/20 bg-butter px-8 py-12 text-center shadow-lg shadow-charcoal/10 dark:border-coral/30 dark:bg-dark-butter dark:shadow-black/30 sm:px-12 sm:py-16"
        >
          <Eyebrow tone="waitlist">Ready When You Are</Eyebrow>

          <h2 className="font-display text-3xl font-bold leading-tight text-charcoal dark:text-white sm:text-4xl">
            Come Be the <span className="font-accent italic text-coral">Nomad</span> Again
          </h2>

          <p className="mx-auto mt-4 max-w-md font-sans text-charcoal/70 dark:text-white/70">
            Cohort Zero is forming now. Join the waitlist to hear when applications open.
          </p>

          <motion.a
            href="/#waitlist"
            whileHover={{ scale: 1.04, boxShadow: '0 12px 24px -8px rgba(42, 36, 32, 0.3)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="mt-8 inline-flex items-center rounded-full bg-coral px-8 py-3.5 font-sans text-sm font-semibold tracking-wide text-cream transition-colors hover:bg-coral-dark"
          >
            Join the Waitlist
          </motion.a>
        </motion.div>
      </section>
    </main>
  )
}

export default AboutPage
