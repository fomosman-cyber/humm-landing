import { useEffect, useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, X } from 'lucide-react'

interface Props {
  open: boolean
  onClose: () => void
  defaultSubject?: string
}

const CONTACT_EMAIL =
  import.meta.env.VITE_HUMM_CONTACT_EMAIL || 'info@humm-amsterdam.nl'

export default function ContactModal({ open, onClose, defaultSubject = 'HUMM — Inquiry' }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`
    const url = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      defaultSubject,
    )}&body=${encodeURIComponent(body)}`
    window.location.href = url
    setSent(true)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-title"
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="liquid-glass relative w-full max-w-lg rounded-3xl p-6 sm:p-8 md:p-10 text-white/80"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">
              Concierge
            </span>
            <h2
              id="contact-title"
              className="text-2xl sm:text-3xl text-white mt-2 leading-[1.05] tracking-tight"
            >
              Get in touch.
            </h2>
            <p className="text-sm text-white/60 mt-2 leading-relaxed">
              Questions, allocations, or press — drop a note. We answer everyone who heard
              it first.
            </p>

            {sent ? (
              <div className="mt-8 rounded-2xl bg-white/5 border border-white/10 p-5 text-sm text-white/80">
                Your email app should be opening now with the message ready to send. If
                nothing happens, write us directly at{' '}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="underline underline-offset-4 hover:text-white"
                >
                  {CONTACT_EMAIL}
                </a>
                .
              </div>
            ) : (
              <form onSubmit={submit} className="mt-8 flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-[0.25em] text-white/50">
                    Name
                  </label>
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="Your full name"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-[0.25em] text-white/50">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="you@email.com"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-[0.25em] text-white/50">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors resize-none"
                    placeholder="Tell us what you'd like to know."
                  />
                </div>

                <button
                  type="submit"
                  className="group inline-flex items-center justify-between gap-2 hover:gap-3 transition-all bg-white text-black font-medium text-sm rounded-full pl-5 pr-1.5 py-1.5 mt-2"
                >
                  <span>Send message</span>
                  <span className="bg-black rounded-full w-9 h-9 flex items-center justify-center transition-transform group-hover:scale-110">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </span>
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
