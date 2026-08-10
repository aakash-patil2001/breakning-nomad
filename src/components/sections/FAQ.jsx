import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Eyebrow from '../ui/Eyebrow'

const EASE = [0.22, 1, 0.36, 1]

const sectionContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
}

const headingVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

const faqs = [
  {
    question: 'How do the trips actually work?',
    answer:
      "Each cohort travels together to one destination for 2-4 weeks. Weekdays are for work — from a dedicated shared workspace on your own schedule — and evenings and weekends are for group adventures, day trips, and exploring the destination together.",
  },
  {
    question: 'Do I need to be fully remote to join?',
    answer:
      "You need a job that lets you work location-independently for the trip's dates — fully remote roles are the easiest fit. If you're hybrid, you'll need to sort out time off or an exception with your employer before applying.",
  },
  {
    question: 'How big are the groups?',
    answer:
      'Cohorts run 12-20 travelers. Small enough that you actually get to know everyone, big enough that there\'s always someone up for whatever you\'re in the mood for that day.',
  },
  {
    question: "What's included, and what isn't?",
    answer:
      "Accommodation, a dedicated workspace with reliable high-speed wifi, and a handful of group meals and activities are all included. Flights, personal spending, travel insurance, and visas are on you.",
  },
  {
    question: 'How do applications and cohorts work?',
    answer:
      'Join the waitlist and fill out a short application. We run cohorts a few times a year to different destinations — once you\'re matched to one, you\'ll get the dates and details well ahead of departure.',
  },
  {
    question: 'What does it cost, and how do I pay?',
    answer:
      'Pricing covers your stay, workspace, and included activities, and varies by destination and trip length. You can pay upfront or in installments — full pricing is shared as soon as a cohort opens up.',
  },
]

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

function EmailIcon(props) {
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
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  )
}

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

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-charcoal/10 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 py-6 text-left"
      >
        <span className="font-display text-base font-semibold text-charcoal sm:text-lg">
          {item.question}
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
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-12 font-sans text-sm leading-relaxed text-charcoal/70 sm:text-base">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="bg-sky px-6 py-24 sm:py-28">
      <motion.div
        variants={sectionContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-3xl"
      >
        <motion.div variants={headingVariant}>
          <Eyebrow tone="faq">Questions, Answered</Eyebrow>
        </motion.div>

        <motion.h2
          variants={headingVariant}
          className="text-center font-display text-3xl font-bold leading-tight text-charcoal sm:text-4xl"
        >
          Common <span className="font-accent italic text-coral">Questions</span>
        </motion.h2>

        <motion.div
          variants={headingVariant}
          className="mx-auto mt-12 rounded-3xl border border-charcoal/10 bg-white px-6 shadow-lg shadow-charcoal/10 sm:px-10"
        >
          {faqs.map((item, index) => (
            <FAQItem
              key={item.question}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex((prev) => (prev === index ? null : index))}
            />
          ))}
        </motion.div>

        <motion.div variants={headingVariant} className="mt-14 text-center">
          <p className="font-sans text-sm font-semibold uppercase tracking-[0.2em] text-charcoal/50">
            Still have questions?
          </p>

          <div className="mt-5 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
            <a
              href="mailto:the.breaking.nomad@gmail.com"
              className="flex items-center gap-2 font-sans text-sm font-medium text-charcoal transition-colors hover:text-coral"
            >
              <EmailIcon className="h-5 w-5 shrink-0" />
              the.breaking.nomad@gmail.com
            </a>

            <a
              href="https://instagram.com/the_breaking_nomad"
              target="_blank"
              rel="noreferrer"
              aria-label="Breaking Nomad on Instagram"
              className="flex items-center gap-2 font-sans text-sm font-medium text-charcoal transition-colors hover:text-coral"
            >
              <InstagramIcon className="h-5 w-5 shrink-0" />
              @the_breaking_nomad
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default FAQ
