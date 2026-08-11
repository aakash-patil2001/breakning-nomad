import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Eyebrow from '../ui/Eyebrow'
import { supabase } from '../../lib/supabase'

const EASE = [0.22, 1, 0.36, 1]

const interestOptions = ['Mountains', 'Beaches', 'Wildlife', 'City']

const initialFormData = {
  name: '',
  email: '',
  city: '',
  role: '',
  interests: [],
}

const pageContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

const fieldsContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const fieldItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
}

function Waitlist() {
  const [count, setCount] = useState(null)
  const [formData, setFormData] = useState(initialFormData)
  const [status, setStatus] = useState('idle') // idle | submitting | submitted | error
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let interval
    // Guards against React StrictMode's dev-only double-invoke of this
    // effect: without it, the first invocation's async loadCount can still
    // resolve and start its own interval AFTER cleanup already ran (since
    // `interval` was still undefined when cleanup fired), leaking a second,
    // uncleaned interval that doubles the ticking rate.
    let cancelled = false

    async function loadCount() {
      const { data, error } = await supabase.rpc('get_waitlist_count')
      if (cancelled) return
      setCount(!error && typeof data === 'number' ? data : 0)
      // Subtle client-side ticker for visual polish, seeded from the real count.
      interval = setInterval(() => setCount((c) => c + 1), 6000)
    }

    loadCount()
    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [])

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const toggleInterest = (option) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(option)
        ? prev.interests.filter((item) => item !== option)
        : [...prev.interests, option],
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    const { error } = await supabase.from('waitlist').insert({
      name: formData.name,
      email: formData.email,
      city: formData.city,
      occupation: formData.role,
      interest: formData.interests.join(', '),
    })

    if (error) {
      setStatus('error')
      setErrorMessage(
        error.code === '23505'
          ? "That email's already on the list."
          : 'Something went wrong. Please try again.'
      )
      return
    }

    setStatus('submitted')
  }

  return (
    <section id="waitlist" className="bg-sage px-6 py-24 dark:bg-dark-sage sm:py-28">
      <motion.div
        variants={pageContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto max-w-3xl text-center"
      >
        <motion.div variants={fadeUp}>
          <Eyebrow tone="waitlist">Cohort Zero</Eyebrow>

          <h2 className="font-display text-3xl font-bold leading-tight text-charcoal dark:text-white sm:text-4xl">
            The Next <span className="font-accent italic text-coral">Cohort</span> Is Forming
          </h2>

          <div className="mt-10">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={count}
                initial={{ scale: 1.15, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="inline-block font-display text-6xl font-bold text-coral sm:text-7xl"
              >
                {count === null ? '—' : count.toLocaleString()}
              </motion.span>
            </AnimatePresence>
            <p className="mt-2 font-sans text-sm uppercase tracking-[0.25em] text-charcoal/50 dark:text-white/50">
              people have joined
            </p>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="mx-auto mt-14 max-w-xl text-left">
          <AnimatePresence>
            {status === 'submitted' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="rounded-2xl border border-coral/20 bg-cream px-8 py-12 text-center dark:border-coral/30 dark:bg-dark-card"
              >
                <h3 className="font-display text-2xl font-bold text-charcoal dark:text-white">
                  You&apos;re on the list.
                </h3>
                <p className="mt-3 font-sans text-charcoal/70 dark:text-white/70">
                  We&apos;ll be in touch as the next cohort takes shape.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="space-y-5"
              >
                <motion.div
                  variants={fieldsContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  className="space-y-5"
                >
                  <motion.div
                    variants={fieldsContainer}
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2"
                  >
                    <motion.div variants={fieldItem}>
                      <label
                        htmlFor="waitlist-name"
                        className="mb-2 block font-sans text-xs font-medium uppercase tracking-wide text-charcoal/50 dark:text-white/50"
                      >
                        Name
                      </label>
                      <input
                        id="waitlist-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange('name')}
                        placeholder="Your name"
                        className="w-full rounded-lg border border-charcoal/15 bg-cream px-4 py-3 font-sans text-charcoal placeholder-charcoal/30 outline-none transition-colors focus:border-coral focus:ring-1 focus:ring-coral dark:border-white/15 dark:bg-dark-card dark:text-white dark:placeholder-white/30"
                      />
                    </motion.div>

                    <motion.div variants={fieldItem}>
                      <label
                        htmlFor="waitlist-email"
                        className="mb-2 block font-sans text-xs font-medium uppercase tracking-wide text-charcoal/50 dark:text-white/50"
                      >
                        Email
                      </label>
                      <input
                        id="waitlist-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange('email')}
                        placeholder="you@example.com"
                        className="w-full rounded-lg border border-charcoal/15 bg-cream px-4 py-3 font-sans text-charcoal placeholder-charcoal/30 outline-none transition-colors focus:border-coral focus:ring-1 focus:ring-coral dark:border-white/15 dark:bg-dark-card dark:text-white dark:placeholder-white/30"
                      />
                    </motion.div>

                    <motion.div variants={fieldItem}>
                      <label
                        htmlFor="waitlist-city"
                        className="mb-2 block font-sans text-xs font-medium uppercase tracking-wide text-charcoal/50 dark:text-white/50"
                      >
                        City you work from
                      </label>
                      <input
                        id="waitlist-city"
                        type="text"
                        required
                        value={formData.city}
                        onChange={handleChange('city')}
                        placeholder="Mumbai, Bengaluru..."
                        className="w-full rounded-lg border border-charcoal/15 bg-cream px-4 py-3 font-sans text-charcoal placeholder-charcoal/30 outline-none transition-colors focus:border-coral focus:ring-1 focus:ring-coral dark:border-white/15 dark:bg-dark-card dark:text-white dark:placeholder-white/30"
                      />
                    </motion.div>

                    <motion.div variants={fieldItem}>
                      <label
                        htmlFor="waitlist-role"
                        className="mb-2 block font-sans text-xs font-medium uppercase tracking-wide text-charcoal/50 dark:text-white/50"
                      >
                        What do you do
                      </label>
                      <input
                        id="waitlist-role"
                        type="text"
                        required
                        value={formData.role}
                        onChange={handleChange('role')}
                        placeholder="Designer, engineer..."
                        className="w-full rounded-lg border border-charcoal/15 bg-cream px-4 py-3 font-sans text-charcoal placeholder-charcoal/30 outline-none transition-colors focus:border-coral focus:ring-1 focus:ring-coral dark:border-white/15 dark:bg-dark-card dark:text-white dark:placeholder-white/30"
                      />
                    </motion.div>
                  </motion.div>

                  <motion.div variants={fieldItem}>
                    <span className="mb-2 block font-sans text-xs font-medium uppercase tracking-wide text-charcoal/50">
                      What calls you
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {interestOptions.map((option) => {
                        const selected = formData.interests.includes(option)
                        return (
                          <motion.button
                            key={option}
                            type="button"
                            whileTap={{ scale: 0.95 }}
                            aria-pressed={selected}
                            onClick={() => toggleInterest(option)}
                            className={`rounded-full border px-4 py-2 font-sans text-sm font-medium tracking-wide transition-colors duration-200 ${
                              selected
                                ? 'border-coral bg-coral text-cream'
                                : 'border-charcoal/15 text-charcoal/60 hover:border-charcoal/30 hover:text-charcoal dark:border-white/15 dark:text-white/60 dark:hover:border-white/30 dark:hover:text-white'
                            }`}
                          >
                            {option}
                          </motion.button>
                        )
                      })}
                    </div>
                  </motion.div>

                  {status === 'error' && (
                    <motion.p
                      variants={fieldItem}
                      className="font-sans text-sm font-medium text-red-600 dark:text-red-400"
                    >
                      {errorMessage}
                    </motion.p>
                  )}

                  <motion.button
                    variants={fieldItem}
                    type="submit"
                    disabled={status === 'submitting'}
                    whileHover={{ scale: 1.03, boxShadow: '0 12px 24px -8px rgba(42, 36, 32, 0.3)' }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    className="mt-2 w-full rounded-full bg-coral px-8 py-3.5 font-sans text-sm font-semibold tracking-wide text-cream transition-colors hover:bg-coral-dark disabled:opacity-60 sm:w-auto"
                  >
                    {status === 'submitting' ? 'Joining…' : 'Join the Waitlist'}
                  </motion.button>
                </motion.div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Waitlist
