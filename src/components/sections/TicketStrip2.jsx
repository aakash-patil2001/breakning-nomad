import { motion } from 'framer-motion'

// Notch color (#ffffff) is painted to match the section's bg-white,
// simulating a punched-out perforation rather than true masking.
const scallopStyle = {
  backgroundImage:
    'radial-gradient(circle at 12px 0px, #ffffff 10px, transparent 10.5px), ' +
    'radial-gradient(circle at 12px 24px, #ffffff 10px, transparent 10.5px)',
  backgroundSize: '24px 24px, 24px 24px',
  backgroundPosition: 'top left, bottom left',
  backgroundRepeat: 'repeat-x, repeat-x',
}

// One "set" of repeats, wide enough to always overflow the viewport; the
// track renders the set twice back-to-back and animates by exactly -50% of
// its own width, so it loops from a full set back to an identical one with
// no visible seam, regardless of actual rendered text width.
const phrase = 'SAME WORK. NEW SKYLINES.'
const phraseSet = Array.from({ length: 6 }, () => phrase)
const track = [...phraseSet, ...phraseSet]

function TicketStrip2() {
  return (
    <section className="overflow-hidden bg-white py-16 sm:py-24">
      {/* x/rotate are driven by framer here (not Tailwind's translate/rotate
          utilities) so the resting transform and the entrance animation don't
          fight over the same CSS property. Rotated opposite to TicketStrip
          (+3 instead of -3) so the two strips visually counterbalance each
          other as you scroll past both. */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, x: '-50%', rotate: 3 }}
        whileInView={{ opacity: 1, scale: 1, x: '-50%', rotate: 3 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative left-1/2 w-[180%] overflow-hidden bg-plum py-8 sm:py-10 md:py-14"
        style={scallopStyle}
      >
        <motion.div
          className="flex w-max items-center"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        >
          {track.map((text, index) => (
            <span
              key={index}
              className="shrink-0 whitespace-nowrap px-6 font-display text-4xl font-bold tracking-wide text-cream sm:text-6xl md:text-7xl lg:text-8xl"
            >
              {text}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default TicketStrip2
