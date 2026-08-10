import { motion } from 'framer-motion'

function JoinWaitlistBanner() {
  return (
    <section className="bg-cream px-6 py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-4xl rounded-3xl border border-coral/20 bg-butter px-8 py-12 text-center shadow-lg shadow-charcoal/10 sm:px-12 sm:py-16"
      >
        <h2 className="font-display text-3xl font-bold leading-tight text-charcoal sm:text-4xl">
          Don&apos;t Miss the{' '}
          <span className="font-accent italic text-coral">First Cohort</span>
        </h2>

        <p className="mx-auto mt-4 max-w-md font-sans text-charcoal/70">
          Be the first to know when applications open.
        </p>

        <motion.a
          href="#waitlist"
          whileHover={{ scale: 1.04, boxShadow: '0 12px 24px -8px rgba(42, 36, 32, 0.3)' }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          className="mt-8 inline-flex items-center rounded-full bg-coral px-8 py-3.5 font-sans text-sm font-semibold tracking-wide text-cream transition-colors hover:bg-coral-dark"
        >
          Join Now
        </motion.a>
      </motion.div>
    </section>
  )
}

export default JoinWaitlistBanner
