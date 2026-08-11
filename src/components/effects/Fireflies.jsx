import { useMemo } from 'react'
import { motion } from 'framer-motion'

// Kept deliberately sparse — an occasional glimmer, not a scattering.
const DESKTOP_COUNT = 10
const MOBILE_COUNT = 6

function randomBetween(min, max) {
  return min + Math.random() * (max - min)
}

// Builds a loose, irregular wander loop (5-7 waypoints around a random home
// point, returning to the start) rather than a straight line or a clean
// ellipse — combined with x/y running on different durations below, this
// keeps each firefly's path reading as organic instead of mechanical.
function buildWanderKeyframes(range) {
  const pointCount = 5 + Math.floor(Math.random() * 3)
  const points = [0]
  for (let i = 0; i < pointCount; i++) {
    points.push(randomBetween(-range, range))
  }
  points.push(0)
  return points
}

function createFireflyConfig(id) {
  return {
    id,
    leftPct: randomBetween(2, 96),
    topPct: randomBetween(6, 92),
    xKeyframes: buildWanderKeyframes(randomBetween(40, 90)),
    yKeyframes: buildWanderKeyframes(randomBetween(40, 90)),
    xDuration: randomBetween(16, 30),
    yDuration: randomBetween(18, 34),
    opacityDuration: randomBetween(1.8, 4),
    delay: randomBetween(0, 12),
    size: randomBetween(2.5, 5.5),
    glowSize: randomBetween(12, 26),
    glowAlpha: randomBetween(0.55, 0.95),
  }
}

function Firefly({ config }) {
  return (
    <motion.div
      aria-hidden="true"
      className="absolute rounded-full will-change-transform"
      style={{
        left: `${config.leftPct}%`,
        top: `${config.topPct}%`,
        width: config.size,
        height: config.size,
        background:
          'radial-gradient(circle, rgba(255,230,170,1) 0%, rgba(255,181,88,0.9) 45%, rgba(255,181,88,0) 75%)',
        boxShadow: `0 0 ${config.glowSize}px ${config.glowSize / 2}px rgba(255,196,110,${config.glowAlpha})`,
      }}
      animate={{
        x: config.xKeyframes,
        y: config.yKeyframes,
        opacity: [0.35, 0.95, 0.4, 1, 0.35],
      }}
      transition={{
        x: { duration: config.xDuration, repeat: Infinity, ease: 'easeInOut', delay: config.delay },
        y: { duration: config.yDuration, repeat: Infinity, ease: 'easeInOut', delay: config.delay },
        opacity: {
          duration: config.opacityDuration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: config.delay * 0.5,
        },
      }}
    />
  )
}

// Dark-mode ambient layer: drifting glowing motes, purely decorative — no
// interaction with surrounding content.
function Fireflies({ isMobile }) {
  const count = isMobile ? MOBILE_COUNT : DESKTOP_COUNT
  const configs = useMemo(() => Array.from({ length: count }, (_, i) => createFireflyConfig(i)), [count])

  return (
    <>
      {configs.map((config) => (
        <Firefly key={config.id} config={config} />
      ))}
    </>
  )
}

export default Fireflies
