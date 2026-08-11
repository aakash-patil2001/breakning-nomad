import { motion } from 'framer-motion'
import Eyebrow from '../ui/Eyebrow'

const sectionContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
}

const headingVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

const cardsContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

function CalendarIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M8 3v4M16 3v4M3.5 10h17" />
      <path
        d="m12 13.3.9 1.8 2 .3-1.45 1.4.35 2-1.8-.95-1.8.95.35-2-1.45-1.4 2-.3.9-1.8Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  )
}

function PeopleIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
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

function PinIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  )
}

function WifiIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2 8.5c5.5-5 14.5-5 20 0" />
      <path d="M5.5 12.5c3.8-3.3 9.2-3.3 13 0" />
      <path d="M9 16.5c1.9-1.6 4.1-1.6 6 0" />
      <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

// Each card gets a distinct corner-emphasis (diagonal, opposite diagonal,
// top dome, bottom dome) instead of uniform rounding, echoing the varied
// organic-shape language used by the StoryTeaser badges — without resorting
// to full elliptical blob radii, which risk clipping card text unpredictably
// at different content heights.
const benefits = [
  {
    title: 'No Leave Required',
    description:
      'Trips timed around long weekends, so you show up without touching a single leave day.',
    Icon: CalendarIcon,
    bg: 'bg-peach dark:bg-dark-peach',
    shape: 'rounded-tl-[2.5rem] rounded-tr-lg rounded-br-[2.5rem] rounded-bl-lg',
  },
  {
    title: 'Company That Matters',
    description:
      "Small, curated cohorts — the kind of people you'd actually want at a long dinner table.",
    Icon: PeopleIcon,
    bg: 'bg-blush dark:bg-dark-blush',
    shape: 'rounded-tr-[2.5rem] rounded-tl-lg rounded-bl-[2.5rem] rounded-br-lg',
  },
  {
    title: 'Never Alone, Never Lost',
    description:
      'A local guide and round-the-clock support on the ground, whenever you need a hand.',
    Icon: PinIcon,
    bg: 'bg-sky dark:bg-dark-sky',
    shape: 'rounded-t-[2.5rem] rounded-b-lg',
  },
  {
    title: 'Work Never Stops',
    description:
      'Every stay is wifi-tested before you arrive, so your job travels as smoothly as you do.',
    Icon: WifiIcon,
    bg: 'bg-sage dark:bg-dark-sage',
    shape: 'rounded-b-[2.5rem] rounded-t-lg',
  },
]

function BenefitCard({ title, description, Icon, bg, shape }) {
  return (
    <motion.div
      variants={cardVariant}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`${bg} ${shape} border border-charcoal/10 px-7 py-8 shadow-lg shadow-charcoal/10 transition-shadow duration-300 hover:shadow-xl hover:shadow-charcoal/20 dark:border-white/10 dark:shadow-black/30 dark:hover:shadow-black/50 sm:px-8 sm:py-9`}
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/70 shadow-sm">
        <Icon className="h-6 w-6 text-charcoal" />
      </span>
      <h3 className="mt-5 font-display text-lg font-bold leading-snug text-charcoal dark:text-white sm:text-xl">
        {title}
      </h3>
      <p className="mt-2 font-sans text-sm leading-relaxed text-charcoal/70 dark:text-white/70 sm:text-base">
        {description}
      </p>
    </motion.div>
  )
}

function WhyUs() {
  return (
    <section className="bg-white px-6 py-24 dark:bg-dark-base sm:py-28">
      <motion.div
        variants={sectionContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-6xl"
      >
        <motion.div variants={headingVariant}>
          <Eyebrow tone="whyus">Why It Works</Eyebrow>
        </motion.div>

        <motion.h2
          variants={headingVariant}
          className="text-center font-display text-3xl font-bold leading-tight text-charcoal dark:text-white sm:text-4xl"
        >
          Everything You Need, <span className="font-accent italic text-coral">Nothing</span> You
          Don&apos;t
        </motion.h2>

        <motion.div
          variants={cardsContainer}
          className="mx-auto mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7"
        >
          {benefits.map((benefit) => (
            <BenefitCard key={benefit.title} {...benefit} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default WhyUs
