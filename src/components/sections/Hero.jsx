import { motion } from 'framer-motion'
import heroImage from '../../assets/images/1-final.png'
import Eyebrow from '../ui/Eyebrow'
import HeroNav from './HeroNav'

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white"
    >
      <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" />

      <HeroNav />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex max-w-4xl flex-col items-center px-6 text-center"
      >
        <motion.div variants={item}>
          <Eyebrow tone="hero">Not Just Another Trip</Eyebrow>
        </motion.div>

        <motion.h1
          variants={item}
          className="font-display text-[clamp(2.75rem,9vw,7rem)] font-black leading-[0.95] tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]"
        >
          Breaking Nomad
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 font-display text-sm font-bold uppercase tracking-[0.3em] text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)] sm:text-base"
        >
          Work Stays, Everything Else Changes
        </motion.p>

        <motion.div variants={item} className="mt-10">
          <motion.a
            href="#waitlist"
            whileHover={{ scale: 1.04, boxShadow: '0 12px 24px -8px rgba(42, 36, 32, 0.35)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="inline-flex items-center rounded-full bg-coral px-8 py-3.5 font-sans text-sm font-semibold tracking-wide text-cream transition-colors hover:bg-coral-dark"
          >
            Join the Waitlist
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
