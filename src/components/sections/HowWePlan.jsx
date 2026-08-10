import { Fragment } from 'react'
import { motion } from 'framer-motion'
import Eyebrow from '../ui/Eyebrow'
import planningImage from '../../assets/images/9-final.png'

const sectionContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
}

const headingVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

const stepsContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

const stepVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

const steps = [
  {
    number: '01',
    title: 'Tell Us Your Dream',
    description:
      'Share where you want to go, what moves you, and how you like to work. No form, just a conversation.',
  },
  {
    number: '02',
    title: 'We Scout It First',
    description:
      'Every stay, every workspace, every wifi connection tested before you arrive.',
  },
  {
    number: '03',
    title: 'You Show Up, We Handle the Rest',
    description: 'Flights, stays, workspace, community — sorted before day one.',
  },
  {
    number: '04',
    title: 'You Never Travel Alone',
    description:
      'A small group of people doing the same thing you are, at the same time, in the same place.',
  },
]

function ArrowConnector() {
  return (
    <div className="hidden items-center justify-center lg:flex">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 text-coral/60"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </div>
  )
}

function HowWePlan() {
  return (
    <section id="howweplan" className="bg-blush px-6 py-24 sm:py-28">
      <motion.div
        variants={sectionContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-6xl"
      >
        <motion.div variants={headingVariant}>
          <Eyebrow tone="howweplan">The Boring Part, Handled</Eyebrow>
        </motion.div>

        <motion.h2
          variants={headingVariant}
          className="text-center font-display text-3xl font-bold leading-tight text-charcoal sm:text-4xl"
        >
          How We Plan Your <span className="font-accent italic text-coral">Journey</span>
        </motion.h2>

        <motion.div
          variants={headingVariant}
          className="mx-auto mt-10 aspect-[21/9] w-full max-w-4xl overflow-hidden rounded-3xl border border-coral/20 shadow-lg shadow-charcoal/10"
        >
          <img src={planningImage} alt="" className="h-full w-full object-cover" />
        </motion.div>

        <motion.div
          variants={stepsContainer}
          className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-16 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-start lg:gap-x-4 lg:gap-y-0"
        >
          {steps.map((step, index) => (
            <Fragment key={step.number}>
              <motion.div variants={stepVariant} className="relative">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-6 left-0 select-none font-display text-7xl font-bold leading-none text-coral/15 sm:text-8xl"
                >
                  {step.number}
                </span>
                <div className="relative z-10 pt-12 sm:pt-14">
                  <h3 className="font-sans text-xl font-bold text-charcoal sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-[18rem] font-sans text-sm leading-relaxed text-charcoal/60 sm:text-base">
                    {step.description}
                  </p>
                </div>
              </motion.div>

              {index < steps.length - 1 && <ArrowConnector />}
            </Fragment>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HowWePlan
