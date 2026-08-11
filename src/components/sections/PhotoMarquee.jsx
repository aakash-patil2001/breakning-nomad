import { useEffect, useRef, useState } from 'react'
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion'
import mahabaleshwar1 from '../../../images/mahabaleshwar-1.png'
import mahabaleshwar2 from '../../../images/mahabaleshwar-2.png'
import mahabaleshwar3 from '../../../images/mahabaleshwar-3.png'
import mahabaleshwar4 from '../../../images/mahabaleshwar-4.png'
import mahabaleshwar5 from '../../../images/mahabaleshwar-5.png'
import tarkarli1 from '../../../images/tarkarli-1.png'
import tarkarli2 from '../../../images/tarkarli-2.png'
import tarkarli3 from '../../../images/tarkarli-3.png'
import tarkarli4 from '../../../images/tarkarli-4.png'
import tarkarli5 from '../../../images/tarkarli-5.png'
import pune1 from '../../../images/pune-1.png'
import pune2 from '../../../images/pune-2.png'
import pune3 from '../../../images/pune-3.png'
import pune4 from '../../../images/pune-4.png'
import pune5 from '../../../images/pune-5.png'

// Same tilt cadence as the old 8-slot version, just cycled across all 15
// real destination photos.
const ROTATIONS = [-5, 4, -4, 6, -6, 3, -3]

const photos = [
  mahabaleshwar1,
  mahabaleshwar2,
  mahabaleshwar3,
  mahabaleshwar4,
  mahabaleshwar5,
  tarkarli1,
  tarkarli2,
  tarkarli3,
  tarkarli4,
  tarkarli5,
  pune1,
  pune2,
  pune3,
  pune4,
  pune5,
].map((src, index) => ({ src, rotate: ROTATIONS[index % ROTATIONS.length] }))

// One full loop of `photos` plays over this many seconds while idle —
// matches the original marquee's speed.
const LOOP_DURATION = 45
// Rendered back-to-back this many times so a single drag gesture (in either
// direction) never runs past the duplicated content before it wraps.
const REPEATS = 3

function Polaroid({ src, rotate }) {
  return (
    <div
      className="w-44 shrink-0 rounded-lg bg-white p-3 pb-8 shadow-lg shadow-charcoal/15 dark:bg-dark-card dark:shadow-black/30 sm:w-52 md:w-60"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <img src={src} alt="" className="aspect-square w-full rounded-sm object-cover" />
    </div>
  )
}

function PhotoMarquee() {
  const trackRef = useRef(null)
  const isDragging = useRef(false)
  const [setWidth, setSetWidth] = useState(0)
  const x = useMotionValue(0)

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return
      const width = trackRef.current.scrollWidth / REPEATS
      setSetWidth(width)
      // Start centered in the repeated track so a drag has equal room to
      // travel either direction before reaching an edge copy.
      x.set(-width)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [x])

  useAnimationFrame((_, delta) => {
    if (isDragging.current || !setWidth) return
    const speed = setWidth / LOOP_DURATION
    let next = x.get() - (speed * delta) / 1000
    // One full `setWidth` further than the centered start — wrap back by
    // exactly one copy, which is pixel-identical, so the loop is seamless.
    if (next <= -setWidth * 2) next += setWidth
    x.set(next)
  })

  const track = Array.from({ length: REPEATS }, () => photos).flat()

  return (
    <section className="overflow-hidden bg-cream py-14 dark:bg-dark-base sm:py-16">
      <motion.div
        ref={trackRef}
        className="flex w-max cursor-grab items-center gap-8 active:cursor-grabbing sm:gap-10"
        style={{ x }}
        drag="x"
        dragMomentum={false}
        onDragStart={() => {
          isDragging.current = true
        }}
        onDragEnd={() => {
          isDragging.current = false
          if (!setWidth) return
          // Fold back into the same centered range the auto-scroll uses —
          // an exact multiple of `setWidth` away is pixel-identical, so the
          // auto-scroll resumes from exactly where the drag left off.
          let wrapped = x.get() % setWidth
          if (wrapped > 0) wrapped -= setWidth
          x.set(wrapped - setWidth)
        }}
      >
        {track.map((photo, index) => (
          <Polaroid key={`${photo.src}-${index}`} src={photo.src} rotate={photo.rotate} />
        ))}
      </motion.div>
    </section>
  )
}

export default PhotoMarquee
