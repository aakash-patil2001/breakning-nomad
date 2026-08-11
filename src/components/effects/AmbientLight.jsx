import { useMemo } from 'react'
import { motion } from 'framer-motion'

const DESKTOP_RAYS = 3
const MOBILE_RAYS = 2
const DESKTOP_MOTES = 25
const MOBILE_MOTES = 12

function randomBetween(min, max) {
  return min + Math.random() * (max - min)
}

function createRayConfig(i) {
  return {
    id: i,
    // Upper portion of the viewport so rays read as emanating from around
    // the Hero's forest canopy, while the fixed layer still lets them show
    // through faintly as you scroll into later sections.
    topPct: randomBetween(-5, 35),
    leftPct: randomBetween(-10, 60),
    length: randomBetween(70, 130),
    thickness: randomBetween(60, 140),
    angle: randomBetween(20, 45) * (Math.random() < 0.5 ? 1 : -1),
    baseOpacity: randomBetween(0.05, 0.11),
    duration: randomBetween(10, 20),
    delay: randomBetween(0, 4),
  }
}

function createMoteConfig(i) {
  return {
    id: i,
    leftPct: randomBetween(0, 100),
    size: randomBetween(2, 5),
    duration: randomBetween(14, 26),
    delay: randomBetween(0, 22),
    maxOpacity: randomBetween(0.3, 0.7),
    swayRange: randomBetween(10, 30),
    swayDuration: randomBetween(4, 8),
  }
}

function LightRay({ config }) {
  return (
    <motion.div
      aria-hidden="true"
      className="absolute will-change-transform"
      style={{
        top: `${config.topPct}%`,
        left: `${config.leftPct}%`,
        width: `${config.length}vmax`,
        height: `${config.thickness}px`,
        background:
          'linear-gradient(90deg, rgba(255,250,235,0.55) 0%, rgba(255,246,225,0.18) 45%, transparent 80%)',
        transform: `rotate(${config.angle}deg)`,
        transformOrigin: 'left top',
        filter: 'blur(6px)',
      }}
      animate={{
        opacity: [config.baseOpacity * 0.5, config.baseOpacity, config.baseOpacity * 0.5],
        rotate: [config.angle - 1.5, config.angle + 1.5, config.angle - 1.5],
      }}
      transition={{
        duration: config.duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: config.delay,
      }}
    />
  )
}

function DustMote({ config }) {
  return (
    <motion.div
      aria-hidden="true"
      className="absolute rounded-full will-change-transform"
      style={{
        left: `${config.leftPct}%`,
        width: config.size,
        height: config.size,
        background:
          'radial-gradient(circle, rgba(255,250,240,0.95) 0%, rgba(255,250,240,0.35) 60%, transparent 100%)',
        filter: 'blur(0.5px)',
      }}
      initial={{ y: '100vh', opacity: 0 }}
      animate={{
        y: '-10vh',
        x: [0, config.swayRange, 0, -config.swayRange, 0],
        opacity: [0, config.maxOpacity, config.maxOpacity, config.maxOpacity, 0],
      }}
      transition={{
        y: { duration: config.duration, repeat: Infinity, ease: 'linear', delay: config.delay },
        x: {
          duration: config.swayDuration,
          repeat: Infinity,
          ease: 'easeInOut',
        },
        opacity: {
          duration: config.duration,
          repeat: Infinity,
          ease: 'linear',
          delay: config.delay,
          times: [0, 0.12, 0.5, 0.88, 1],
        },
      }}
    />
  )
}

// Light-mode ambient layer: a few soft diagonal light streaks near the top
// (pairing with the Hero photo) plus a slow field of upward-drifting dust
// motes across the full viewport. Both stay very low-opacity by design —
// "felt more than seen" — so they never compete with page content.
function AmbientLight({ isMobile }) {
  const rayCount = isMobile ? MOBILE_RAYS : DESKTOP_RAYS
  const moteCount = isMobile ? MOBILE_MOTES : DESKTOP_MOTES

  const rays = useMemo(() => Array.from({ length: rayCount }, (_, i) => createRayConfig(i)), [rayCount])
  const motes = useMemo(() => Array.from({ length: moteCount }, (_, i) => createMoteConfig(i)), [moteCount])

  return (
    <>
      {rays.map((config) => (
        <LightRay key={config.id} config={config} />
      ))}
      {motes.map((config) => (
        <DustMote key={config.id} config={config} />
      ))}
    </>
  )
}

export default AmbientLight
