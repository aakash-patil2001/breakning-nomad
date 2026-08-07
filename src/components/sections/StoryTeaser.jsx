import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Eyebrow from '../ui/Eyebrow'

const lineContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.25, delayChildren: 0.1 },
  },
}

const lineItem = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

// Smooth, fully-rounded shapes only — same overlapping-circle and
// border-radius techniques throughout, no straight-edge polygons, so
// nothing ever reads as sharp or jagged.
const BLOB_RADIUS = '63% 37% 54% 46% / 43% 37% 63% 57%'
const PEBBLE_RADIUS = '42% 58% 65% 35% / 55% 40% 60% 45%'

// 8 same-color overlapping circles around a center circle — a reliable
// way to render an organic flower/scallop silhouette without curve math.
function FlowerShape({ className }) {
  const petals = [0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
    const rad = (deg * Math.PI) / 180
    return { cx: 50 + 26 * Math.cos(rad), cy: 50 + 26 * Math.sin(rad) }
  })

  return (
    <svg viewBox="0 0 100 100" className={`absolute inset-0 h-full w-full ${className}`}>
      <circle cx={50} cy={50} r={22} fill="currentColor" />
      {petals.map((p) => (
        <circle key={`${p.cx}-${p.cy}`} cx={p.cx} cy={p.cy} r={20} fill="currentColor" />
      ))}
    </svg>
  )
}

// Same technique as FlowerShape, but fewer/larger/more-separated petals —
// reads as a soft rounded sparkle burst rather than a dense flower.
function SparkleShape({ className }) {
  const petals = [0, 60, 120, 180, 240, 300].map((deg) => {
    const rad = (deg * Math.PI) / 180
    return { cx: 50 + 30 * Math.cos(rad), cy: 50 + 30 * Math.sin(rad) }
  })

  return (
    <svg viewBox="0 0 100 100" className={`absolute inset-0 h-full w-full ${className}`}>
      <circle cx={50} cy={50} r={16} fill="currentColor" />
      {petals.map((p) => (
        <circle key={`${p.cx}-${p.cy}`} cx={p.cx} cy={p.cy} r={17} fill="currentColor" />
      ))}
    </svg>
  )
}

function WifiIcon(props) {
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
      <path d="M2 8.5c5.5-5 14.5-5 20 0" />
      <path d="M5.5 12.5c3.8-3.3 9.2-3.3 13 0" />
      <path d="M9 16.5c1.9-1.6 4.1-1.6 6 0" />
      <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function PeopleIcon(props) {
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
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 20c0-3.5 2.5-6 5.5-6s5.5 2.5 5.5 6" />
      <circle cx="17.5" cy="9" r="2.3" />
      <path d="M15 20c.2-2.6 2-4.6 4-4.6" />
    </svg>
  )
}

function LaptopIcon(props) {
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
      <rect x="4" y="5" width="16" height="10" rx="1" />
      <path d="M2 18h20l-1.5-3h-17L2 18Z" />
    </svg>
  )
}

function MapPinIcon(props) {
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
      <path d="M12 21s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12Z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  )
}

// Asymmetric, overlapping placement — deliberately not mirrored corner-to-
// corner, with varied rotation so the set reads as scattered, not aligned.
// Rotation is applied only to the shape layer (see Badge below), never to
// the text, so labels always read horizontally.
const badges = [
  {
    key: 'tested',
    shape: 'flower',
    colorClass: 'text-butter',
    Icon: WifiIcon,
    label: 'Tested Before You Arrive',
    position: 'top-0 left-[2%] sm:left-[6%] sm:top-2',
    rotate: -9,
  },
  {
    key: 'group',
    shape: 'sparkle',
    colorClass: 'text-blush',
    Icon: PeopleIcon,
    label: 'Small Group, Real Connection',
    position: 'top-24 right-[1%] sm:right-[5%] sm:top-12',
    rotate: 11,
  },
  {
    key: 'remote',
    shape: 'blob',
    colorClass: 'text-peach',
    Icon: LaptopIcon,
    label: 'Work Fully Remote',
    position: 'bottom-24 left-[0%] sm:left-[4%] sm:bottom-14',
    rotate: 6,
  },
  {
    key: 'destination',
    shape: 'pebble',
    colorClass: 'text-sky',
    Icon: MapPinIcon,
    label: 'One Destination, No Planning',
    position: 'bottom-0 right-[3%] sm:right-[7%] sm:bottom-2',
    rotate: -12,
  },
]

function Badge({ shape, colorClass, Icon, label, position, rotate }) {
  return (
    <div className={`absolute z-[5] h-52 w-52 sm:h-72 sm:w-72 md:h-80 md:w-80 ${position}`}>
      {/* Shape layer — this is the only part that rotates */}
      <div className="absolute inset-0" style={{ transform: `rotate(${rotate}deg)` }}>
        {shape === 'flower' && <FlowerShape className={colorClass} />}
        {shape === 'sparkle' && <SparkleShape className={colorClass} />}
        {(shape === 'blob' || shape === 'pebble') && (
          <div
            className={`absolute inset-0 ${colorClass}`}
            style={{
              backgroundColor: 'currentColor',
              borderRadius: shape === 'blob' ? BLOB_RADIUS : PEBBLE_RADIUS,
            }}
          />
        )}
      </div>

      {/* Content layer — never rotated, text always reads horizontally */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-2.5 px-10 text-center sm:px-12">
        <Icon className="h-9 w-9 text-charcoal sm:h-10 sm:w-10" />
        <span className="font-display text-sm font-bold leading-tight text-charcoal sm:text-base">
          {label}
        </span>
      </div>
    </div>
  )
}

function StoryTeaser() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Gentle parallax drift for the first two lines while the section is
  // pinned — different magnitudes per line so they don't move in lockstep.
  const line1Y = useTransform(scrollYProgress, [0, 1], [0, -18])
  const line2Y = useTransform(scrollYProgress, [0, 1], [0, -34])

  // Decorative flight-path accent: draws itself in as the section scrolls.
  const pathDraw = useTransform(scrollYProgress, [0, 0.55], [0, 1], { clamp: true })

  // Closing line: left-to-right mask-wipe reveal ("painted on"), tied to the
  // same plateau pattern as before so it locks in place once fully revealed
  // and never reverses on continued scroll.
  const wipeProgress = useTransform(scrollYProgress, [0.3, 0.5, 1], [0, 100, 100], {
    clamp: true,
  })
  const closingClip = useTransform(wipeProgress, (v) => `inset(0 ${100 - v}% 0 0)`)
  const closingY = useTransform(scrollYProgress, [0.3, 0.5, 1], [12, 0, 0], { clamp: true })

  return (
    <section
      ref={sectionRef}
      className="relative h-[250vh] bg-[radial-gradient(ellipse_60%_60%_at_50%_40%,#ffffff_0%,#f2f1ec_100%)]"
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
        {/* Decorative flight-path accent, sits behind the text */}
        <svg
          viewBox="0 0 1000 500"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full text-coral/25"
          aria-hidden="true"
        >
          <motion.path
            d="M -50 420 C 220 140, 480 480, 740 190 S 1060 70, 1060 70"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            style={{ pathLength: pathDraw }}
          />
        </svg>

        {badges.map((badge) => (
          <Badge key={badge.key} {...badge} />
        ))}

        <motion.div
          variants={lineContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="relative z-10 max-w-2xl"
        >
          <motion.div variants={lineItem}>
            <Eyebrow tone="story">The Truth About Mondays</Eyebrow>
          </motion.div>

          <motion.div style={{ y: line1Y }}>
            <motion.p
              variants={lineItem}
              className="font-display text-[clamp(1.25rem,3.6vw,2.4rem)] font-semibold leading-snug text-charcoal"
            >
              There is a version of you that exists outside your apartment.
            </motion.p>
          </motion.div>
          <motion.div style={{ y: line2Y }} className="mt-3">
            <motion.p
              variants={lineItem}
              className="font-display text-[clamp(1.25rem,3.6vw,2.4rem)] font-semibold leading-snug text-charcoal/60"
            >
              You have met them before — on the last morning of a trip, when the
              return flight felt like a mistake.
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.p
          style={{ clipPath: closingClip, y: closingY }}
          className="relative z-10 mt-16 max-w-2xl font-display text-[clamp(1.5rem,4.4vw,3rem)] font-bold leading-snug text-coral drop-shadow-[0_4px_24px_rgba(217,112,74,0.35)] sm:mt-20"
        >
          That version is within you, waiting to be unleashed.
        </motion.p>
      </div>
    </section>
  )
}

export default StoryTeaser
