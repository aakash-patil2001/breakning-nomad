import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const defaultVariant = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

// Shared card used on the homepage teaser, the full escapes listing, and the
// "more escapes" section of each detail page — links through to that
// escape's own page at /escapes/:slug.
function EscapeCard({ escape, variants = defaultVariant }) {
  return (
    <motion.div
      variants={variants}
      className="overflow-hidden rounded-2xl border border-charcoal/10 bg-blush shadow-lg shadow-charcoal/10 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-charcoal/20"
    >
      <Link to={`/escapes/${escape.slug}`} className="block">
        <div className="relative aspect-[3/4]">
          <img src={escape.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <span className="absolute bottom-3 left-3 rounded-full bg-white px-3 py-1 font-sans text-xs font-semibold tracking-wide text-charcoal shadow-sm">
            {escape.tag}
          </span>
        </div>

        <div className="px-5 py-5 sm:px-6 sm:py-6">
          <h3 className="font-display text-xl font-bold leading-snug text-charcoal sm:text-2xl">
            {escape.name}
          </h3>
          <p className="mt-1.5 font-sans text-sm text-charcoal/50">{escape.description}</p>

          <div className="my-4 border-t border-dashed border-charcoal/20" />

          <div className="flex items-center justify-between">
            <p className="font-display text-2xl font-bold text-charcoal">
              ${escape.price}
              <span className="ml-1 font-sans text-sm font-normal text-charcoal/50">/person</span>
            </p>
            <span className="rounded-full bg-charcoal px-3.5 py-1.5 font-sans text-xs font-semibold text-cream">
              {escape.duration}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default EscapeCard
