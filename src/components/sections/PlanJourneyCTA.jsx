import { motion } from 'framer-motion'
import Eyebrow from '../ui/Eyebrow'

const MAILTO_HREF = `mailto:hello@breakingnomad.com?subject=${encodeURIComponent(
  'Planning my next trip with Breaking Nomad',
)}`

const stackedPhotos = [
  {
    src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=200&q=80',
    rotate: -6,
  },
  {
    src: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=200&q=80',
    rotate: 4,
  },
  {
    src: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=200&q=80',
    rotate: -3,
  },
  {
    src: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=200&q=80',
    rotate: 5,
  },
]

function PlanJourneyCTA() {
  return (
    <section className="bg-white px-6 py-16 dark:bg-dark-base sm:py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-4xl rounded-3xl border border-coral/20 bg-blush px-8 py-12 text-center shadow-lg shadow-charcoal/10 dark:border-coral/30 dark:bg-dark-blush dark:shadow-black/30 sm:px-12 sm:py-16"
      >
        <div className="mb-8 flex items-center justify-center -space-x-6 sm:-space-x-8">
          {stackedPhotos.map((photo, index) => (
            <img
              key={photo.src}
              src={photo.src}
              alt=""
              className="h-24 w-24 rounded-full border-4 border-cream object-cover shadow-md dark:border-dark-blush sm:h-28 sm:w-28"
              style={{ transform: `rotate(${photo.rotate}deg)`, zIndex: stackedPhotos.length - index }}
            />
          ))}
        </div>

        <Eyebrow tone="plan">No Forms, Just Vibes</Eyebrow>

        <h2 className="font-display text-3xl font-bold leading-tight text-charcoal dark:text-white sm:text-4xl">
          Ready to Plan Your{' '}
          <span className="font-accent italic text-coral">Dream Journey</span>?
        </h2>

        <p className="mx-auto mt-4 max-w-md font-sans text-charcoal/70 dark:text-white/70">
          Tell us where you want to work from next, and we&apos;ll take it from
          there.
        </p>

        <motion.a
          href={MAILTO_HREF}
          whileHover={{ scale: 1.04, boxShadow: '0 12px 24px -8px rgba(42, 36, 32, 0.3)' }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-coral px-8 py-3.5 font-sans text-sm font-semibold tracking-wide text-cream transition-colors hover:bg-coral-dark"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M21 3 3 10.5l7.5 3L14 21l7-18Z" />
            <path d="M10.5 13.5 21 3" />
          </svg>
          Send us a Message
        </motion.a>
      </motion.div>
    </section>
  )
}

export default PlanJourneyCTA
