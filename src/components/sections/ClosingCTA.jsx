import { motion } from 'framer-motion'
import Eyebrow from '../ui/Eyebrow'
import closingImage from '../../assets/images/9-final.png'

const EASE = [0.22, 1, 0.36, 1]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

function ClosingCTA() {
  return (
    <section className="relative overflow-hidden px-6 py-28 text-center sm:py-36 lg:py-44">
      <img
        src={closingImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Dark overlay so white text stays legible over the photo */}
      <div className="absolute inset-0 bg-charcoal/60" />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="relative z-10 mx-auto max-w-4xl"
      >
        <motion.div variants={item}>
          <Eyebrow tone="closing">Future You Says Thanks</Eyebrow>
        </motion.div>

        <motion.h2
          variants={item}
          className="font-display text-[clamp(1.75rem,5vw,3.5rem)] leading-tight text-white"
        >
          One day you&apos;ll answer a Monday meeting from{' '}
          <span className="font-bold text-coral">
            somewhere that doesn&apos;t feel like work
          </span>
          .
        </motion.h2>

        <motion.p variants={item} className="mt-6 font-sans text-base text-white/80 sm:text-lg">
          We hope Breaking Nomad was the reason.
        </motion.p>

        <motion.div variants={item} className="mt-10">
          <motion.a
            href="#waitlist"
            whileHover={{ scale: 1.04, boxShadow: '0 12px 24px -8px rgba(0, 0, 0, 0.4)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="inline-flex items-center rounded-full bg-coral px-8 py-3.5 font-sans text-sm font-semibold tracking-wide text-cream transition-colors hover:bg-coral-dark"
          >
            Join the Waitlist
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default ClosingCTA
