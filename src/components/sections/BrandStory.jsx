import { motion } from 'framer-motion'

const chapters = [
  {
    number: '01',
    title: 'The Nomad in You',
    pullQuote: 'Not gone. Just waiting.',
    body: [
      'There is a version of you that exists outside your apartment.',
      'You have met them before — on the last morning of a trip, when the return flight felt like a mistake.',
      'They wake earlier. They talk to strangers. They notice light.',
      'Then Monday arrives, and the apartment wins, and that version of you goes quiet again.',
    ],
  },
  {
    number: '02',
    title: 'The Instinct Waiting',
    pullQuote: 'The instinct is patient.',
    body: [
      'People were not meant to spend every Monday in the same room.',
      'For most of human history we moved with seasons, with rivers, with reasons. The instinct never left — it just ran out of permission.',
      'You feel it in small ways. Checking flight prices you never book. Reading about towns you will never live in.',
      'It has been waiting for a way out that does not cost you everything.',
    ],
  },
  {
    number: '03',
    title: "The Excuse That's Gone",
    pullQuote: 'The obstacle was never the job. It was doing it alone.',
    body: [
      'For years, the answer was simple: work.',
      'Work needed a desk, and the desk needed a city, and the city needed you to stay. That excuse is gone now.',
      'Your work travels lighter than your luggage.',
      'What remains is harder to admit — going alone is lonely, planning is exhausting, and the wifi in that beautiful homestay was never actually tested.',
    ],
  },
  {
    number: '04',
    title: 'What Breaking Nomad Is',
    pullQuote: 'You keep your job. You keep your meetings. You change everything around them.',
    body: [
      'Breaking Nomad is a small group of people who take their work somewhere worth waking up in — together.',
      'We find the place, test the wifi, plan the stays, and gather the kind of people you would want at a long dinner table.',
      'Two to four weeks. One destination.',
      'A community that was never forced, because it never had to be.',
    ],
  },
]

function BrandStory() {
  return (
    <section className="bg-neutral-950">
      {chapters.map((chapter, index) => {
        const isLast = index === chapters.length - 1
        const isShaded = index % 2 === 1
        const isRight = index % 2 === 1

        return (
          <div
            key={chapter.number}
            className={`relative flex min-h-screen items-center overflow-hidden px-6 py-20 ${
              index > 0 ? 'border-t border-white/10' : ''
            } ${isLast ? 'bg-amber-400/5' : isShaded ? 'bg-neutral-900' : 'bg-neutral-950'}`}
          >
            {/* Giant decorative chapter numeral */}
            <div
              className={`pointer-events-none absolute inset-0 flex items-center justify-center px-6 ${
                isRight ? 'lg:justify-start lg:pl-8' : 'lg:justify-end lg:pr-8'
              }`}
              aria-hidden="true"
            >
              <span
                className={`select-none font-serif text-[9rem] font-bold leading-none sm:text-[13rem] lg:text-[17rem] ${
                  isLast ? 'text-amber-400/10' : 'text-white/[0.04]'
                }`}
              >
                {chapter.number}
              </span>
            </div>

            <div
              className={`relative z-10 mx-auto w-full max-w-xl text-left ${
                isRight ? 'lg:ml-auto lg:mr-0 lg:text-right' : 'lg:mr-auto lg:ml-0 lg:text-left'
              } ${
                isLast
                  ? 'rounded-3xl border border-amber-400/30 bg-neutral-900/60 px-6 py-10 shadow-lg shadow-black/30 sm:px-10 sm:py-12'
                  : ''
              }`}
            >
              {isLast && (
                <div
                  className={`mb-6 h-1 w-16 bg-amber-400 ${isRight ? 'lg:ml-auto' : ''}`}
                />
              )}

              <span className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-amber-400/70">
                {chapter.number} — {chapter.title}
              </span>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={`mt-5 font-serif text-3xl italic leading-[1.15] sm:text-4xl lg:text-5xl ${
                  isLast ? 'text-amber-400' : 'text-white'
                }`}
              >
                {chapter.pullQuote}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 space-y-4"
              >
                {chapter.body.map((paragraph, pIndex) => (
                  <p
                    key={pIndex}
                    className="font-sans text-base leading-relaxed text-white/60 sm:text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
              </motion.div>
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default BrandStory
