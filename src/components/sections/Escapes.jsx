import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Eyebrow from '../ui/Eyebrow'
import EscapeCard from '../ui/EscapeCard'
import { escapes } from '../../data/escapes'

const sectionContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
}

const headingVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

const gridVariant = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

function Escapes() {
  return (
    <section id="escapes" className="bg-white px-6 py-24 sm:py-28">
      <motion.div
        variants={sectionContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-6xl"
      >
        <motion.div variants={headingVariant}>
          <Eyebrow tone="escapes">First Stops, Not Last</Eyebrow>
        </motion.div>

        <motion.h2
          variants={headingVariant}
          className="text-center font-display text-4xl font-bold leading-tight text-charcoal sm:text-5xl"
        >
          Our First <span className="font-accent italic text-coral">Escapes</span>
        </motion.h2>

        <motion.div
          variants={gridVariant}
          className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {escapes.map((escape) => (
            <EscapeCard key={escape.slug} escape={escape} variants={cardVariant} />
          ))}
        </motion.div>

        <motion.div variants={headingVariant} className="mt-12 text-center">
          <Link
            to="/escapes"
            className="inline-flex items-center gap-2 font-sans text-sm font-semibold tracking-wide text-coral transition-colors hover:text-coral-dark"
          >
            View All Escapes
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Escapes
