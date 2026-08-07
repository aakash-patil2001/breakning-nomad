import { useState } from 'react'
import { motion } from 'framer-motion'
import Eyebrow from '../ui/Eyebrow'
import mountainsImage from '../../assets/images/2-final.png'
import beachesImage from '../../assets/images/3-final.png'
import cityImage from '../../assets/images/4-final.png'
import wildlifeImage from '../../assets/images/5-final.png'
import postcardImage1 from '../../assets/images/6-final.png'
import postcardImage2 from '../../assets/images/8-final.png'

const categories = [
  {
    name: 'Mountains',
    image: mountainsImage,
    teaser: "Altitude adjusted, deadlines intact — we're scouting basecamps.",
    Icon: (props) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M2 19 8 7l4 6 3-4 7 10H2Z" />
      </svg>
    ),
  },
  {
    name: 'Beaches',
    image: beachesImage,
    teaser: 'Trade your desk for the shoreline — spots dropping soon.',
    Icon: (props) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <circle cx="18" cy="6" r="2.2" />
        <path d="M2 14c1.8-2 3.6-2 5.4 0s3.6 2 5.4 0 3.6-2 5.4 0 3.6 2 5.4 0" />
        <path d="M2 19c1.8-2 3.6-2 5.4 0s3.6 2 5.4 0 3.6-2 5.4 0 3.6 2 5.4 0" />
      </svg>
    ),
  },
  {
    name: 'City',
    image: cityImage,
    teaser: 'Skyline views, standup calls — lining up the best stays.',
    Icon: (props) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <rect x="3" y="10" width="4" height="10" />
        <rect x="8" y="6" width="4" height="14" />
        <rect x="13" y="12" width="4" height="8" />
        <rect x="18" y="3" width="3" height="17" />
      </svg>
    ),
  },
  {
    name: 'Wildlife',
    image: wildlifeImage,
    teaser: 'Wild mornings, warm wifi — scouting the good spots.',
    Icon: (props) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <ellipse cx="12" cy="15" rx="4.5" ry="3.5" />
        <circle cx="6.5" cy="9" r="1.6" />
        <circle cx="10.3" cy="6.3" r="1.6" />
        <circle cx="13.7" cy="6.3" r="1.6" />
        <circle cx="17.5" cy="9" r="1.6" />
      </svg>
    ),
  },
]

const sectionContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
}

const headingVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

const carouselVariant = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

const OFFSET_PERCENT = 44
// How much further out the side cards shift, on top of OFFSET_PERCENT,
// while the center card is hovered — opens up room for its scale-up.
const HOVER_PUSH_PERCENT = 12

// Normalizes index distance from active into the range (-len/2, len/2],
// so exactly one card ends up "behind" (hidden) in a 4-item loop.
function getDiff(index, active, len) {
  let diff = index - active
  if (diff > len / 2) diff -= len
  if (diff < -len / 2) diff += len
  return diff
}

// Ambient postcard/postmark/luggage-tag accents scattered in the section's
// side margins — decorative only, hidden below lg where there's no spare
// margin beside the (tightened) carousel to place them without overlap.
function Postcard({ src, className, rotate }) {
  return (
    <div className={`pointer-events-none absolute hidden lg:block ${className}`}>
      <div
        className="rounded-lg border-2 border-dashed border-charcoal/25 bg-white p-2.5 shadow-md shadow-charcoal/10"
        style={{ transform: `rotate(${rotate}deg)` }}
      >
        <img src={src} alt="" className="h-32 w-44 rounded-sm object-cover opacity-80" />
      </div>
    </div>
  )
}

function Postmark({ className, rotate }) {
  return (
    <div className={`pointer-events-none absolute hidden lg:block ${className}`}>
      <div
        className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-dashed border-charcoal/25 opacity-70"
        style={{ transform: `rotate(${rotate}deg)` }}
      >
        <div className="flex h-24 w-24 items-center justify-center rounded-full border border-charcoal/20">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-9 w-9 text-charcoal/40"
          >
            <path d="M2 12l19-9-7 19-3-7-7-3Z" />
          </svg>
        </div>
      </div>
    </div>
  )
}

function LuggageTag({ className, rotate }) {
  return (
    <div className={`pointer-events-none absolute hidden lg:block ${className}`}>
      <div
        className="relative flex h-28 w-40 flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-charcoal/25 bg-white px-4 shadow-md shadow-charcoal/10"
        style={{ transform: `rotate(${rotate}deg)` }}
      >
        <div className="absolute -top-3 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-charcoal/25 bg-white" />
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-8 w-8 text-charcoal/40"
        >
          <path d="M2 12l19-9-7 19-3-7-7-3Z" />
        </svg>
        <span className="font-display text-xs font-bold uppercase tracking-wide text-charcoal/40">
          Bon Voyage
        </span>
      </div>
    </div>
  )
}

function CategoryCard({
  category,
  diff,
  isFlipped,
  setFlipped,
  onSelect,
  centerHovered,
  setCenterHovered,
}) {
  const isCenter = diff === 0
  const abs = Math.abs(diff)
  const { name, image, teaser, Icon } = category
  // Side cards shift further out while the center card is hovered, so its
  // scale-up has room to happen without colliding into them.
  const sideOffset = abs === 1 && centerHovered ? OFFSET_PERCENT + HOVER_PUSH_PERCENT : OFFSET_PERCENT

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{ zIndex: 30 - abs * 10, pointerEvents: abs <= 1 ? 'auto' : 'none' }}
      animate={{
        x: `${diff * sideOffset}%`,
        opacity: isCenter ? 1 : abs === 1 ? 0.75 : 0,
        filter: isCenter ? 'blur(0px)' : 'blur(1px)',
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-col items-center">
        {/* Scale lives on this wrapper (not the outer div) so it shrinks
            only the card art — the label below keeps its own font-size
            step instead of compounding with an inherited scale transform.
            Center + side scale/position now animate together off the same
            centerHovered flag, so the "make room" effect stays coordinated. */}
        <motion.div
          animate={{ scale: isCenter ? (centerHovered ? 1.08 : 1) : abs === 1 ? 0.72 : 0.55 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            type="button"
            className="relative h-96 w-72 appearance-none rounded-full border-0 bg-transparent p-0 sm:h-[27rem] sm:w-80 md:h-[30rem] md:w-96 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            style={{ perspective: 1200 }}
            onClick={isCenter ? () => setFlipped((f) => !f) : onSelect}
            onMouseEnter={
              isCenter
                ? () => {
                    setFlipped(true)
                    setCenterHovered(true)
                  }
                : undefined
            }
            onMouseLeave={
              isCenter
                ? () => {
                    setFlipped(false)
                    setCenterHovered(false)
                  }
                : undefined
            }
            aria-label={isCenter ? `${name} — flip for details` : `Show ${name}`}
          >
            <motion.div
              className="relative h-full w-full"
              style={{ transformStyle: 'preserve-3d' }}
              animate={{ rotateY: isCenter && isFlipped ? 180 : 0 }}
              transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
            >
              {/* Front */}
              <div
                className="absolute inset-0 overflow-hidden rounded-full shadow-lg shadow-charcoal/20"
                style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
              >
                <img src={image} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/25 via-transparent to-transparent" />
              </div>

              {/* Back */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-full border border-coral/30 bg-cream px-6 text-center shadow-lg shadow-charcoal/10"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                <Icon className="h-8 w-8 text-coral" />
                <p className="font-sans text-sm leading-snug text-charcoal/80">{teaser}</p>
              </div>
            </motion.div>
          </button>
        </motion.div>

        <span
          className={`mt-5 whitespace-nowrap font-display transition-all duration-300 ${
            isCenter
              ? 'text-2xl font-bold text-charcoal opacity-100 sm:text-3xl'
              : 'text-base font-semibold text-charcoal/45 sm:text-lg'
          }`}
        >
          {name}
        </span>
      </div>
    </motion.div>
  )
}

function Categories() {
  const [active, setActive] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [centerHovered, setCenterHovered] = useState(false)
  const len = categories.length

  const goTo = (index) => {
    setActive(((index % len) + len) % len)
    setFlipped(false)
  }

  const handleDragEnd = (_, info) => {
    const { x: offsetX } = info.offset
    const { x: velocityX } = info.velocity

    if (offsetX < -60 || velocityX < -400) {
      goTo(active + 1)
    } else if (offsetX > 60 || velocityX > 400) {
      goTo(active - 1)
    }
  }

  return (
    <section
      id="categories"
      className="relative overflow-hidden bg-white px-6 py-24 sm:py-28"
    >
      <Postcard src={postcardImage1} rotate={-8} className="left-2 top-24 xl:left-10" />
      <Postmark rotate={12} className="right-2 top-10 xl:right-14" />
      <Postcard src={postcardImage2} rotate={7} className="bottom-6 right-4 xl:right-20" />
      <LuggageTag rotate={-10} className="bottom-14 left-2 xl:left-8" />

      <motion.div
        variants={sectionContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-6xl"
      >
        <motion.div variants={headingVariant}>
          <Eyebrow tone="categories">Pick Your Poison</Eyebrow>
        </motion.div>

        <motion.h2
          variants={headingVariant}
          className="text-center font-display text-4xl font-bold leading-tight text-charcoal sm:text-5xl"
        >
          Discover <span className="text-coral">Adventures</span> That Suit You
        </motion.h2>

        <motion.div
          variants={carouselVariant}
          className="relative mx-auto mt-16 h-96 max-w-3xl touch-pan-y select-none sm:h-[27rem] md:h-[30rem]"
        >
          <motion.div
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
          >
            {categories.map((category, index) => (
              <CategoryCard
                key={category.name}
                category={category}
                diff={getDiff(index, active, len)}
                isFlipped={flipped}
                setFlipped={setFlipped}
                onSelect={() => goTo(index)}
                centerHovered={centerHovered}
                setCenterHovered={setCenterHovered}
              />
            ))}
          </motion.div>
        </motion.div>

        <div className="mt-20 flex items-center justify-center gap-3 sm:mt-24">
          {categories.map((category, index) => (
            <button
              key={category.name}
              type="button"
              aria-label={`Go to ${category.name}`}
              aria-current={index === active}
              onClick={() => goTo(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === active ? 'w-7 bg-coral' : 'w-2.5 bg-charcoal/20 hover:bg-charcoal/40'
              }`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Categories
