import { motion } from 'framer-motion'
import workationPhoto from '../../../images/image-1.jpg'
import campingPhoto from '../../../images/image-2.jpg'
import flightPhoto from '../../../images/image-3.jpg'
import balconyPhoto from '../../../images/image-4.jpg'
import beachCafePhoto from '../../../images/image-5.jpg'
import skylinePhoto from '../../../images/image-6.jpg'
import restaurantPhoto from '../../../images/image-7.jpg'

// 8 slots, 7 source photos — the flight shot repeats once (slots 2 and 8,
// far enough apart in the looped track to never land next to itself) so
// the existing tilt sequence/spacing stays exactly as it was.
const photos = [
  {
    src: workationPhoto,
    rotate: -5,
  },
  {
    src: flightPhoto,
    rotate: 4,
  },
  {
    src: campingPhoto,
    rotate: -4,
  },
  {
    src: skylinePhoto,
    rotate: 6,
  },
  {
    src: beachCafePhoto,
    rotate: -6,
  },
  {
    src: balconyPhoto,
    rotate: 3,
  },
  {
    src: restaurantPhoto,
    rotate: -3,
  },
  {
    src: flightPhoto,
    rotate: 5,
  },
]

function Polaroid({ src, rotate }) {
  return (
    <div
      className="w-44 shrink-0 rounded-lg bg-white p-3 pb-8 shadow-lg shadow-charcoal/15 sm:w-52 md:w-60"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <img src={src} alt="" className="aspect-square w-full rounded-sm object-cover" />
    </div>
  )
}

function PhotoMarquee() {
  // Track renders the photo set twice back-to-back; translating by exactly
  // -50% of the track's own width lands on an identical copy, so the loop
  // has no visible seam regardless of actual rendered pixel width.
  const track = [...photos, ...photos]

  return (
    <section className="overflow-hidden bg-cream py-14 sm:py-16">
      <motion.div
        className="flex w-max items-center gap-8 sm:gap-10"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
      >
        {track.map((photo, index) => (
          <Polaroid key={`${photo.src}-${index}`} src={photo.src} rotate={photo.rotate} />
        ))}
      </motion.div>
    </section>
  )
}

export default PhotoMarquee
