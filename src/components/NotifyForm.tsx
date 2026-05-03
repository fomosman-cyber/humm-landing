import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'

const NOTIFY_EMAIL =
  import.meta.env.VITE_HUMM_CONTACT_EMAIL || 'info@humm-amsterdam.nl'
const NOTIFY_ENDPOINT = `https://formsubmit.co/ajax/${NOTIFY_EMAIL}`

export default function NotifyForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch(NOTIFY_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email,
          _subject: 'HUMM — Notify me when the drop opens',
          _template: 'table',
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && (data.success === 'true' || data.success === true)) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <motion.section
      id="notify"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="liquid-glass w-full max-w-3xl rounded-3xl px-6 sm:px-8 md:px-10 py-8 sm:py-10 md:py-12 text-center text-white/80 my-16 sm:my-24 scroll-mt-20"
      aria-labelledby="notify-title"
    >
      <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">
        Members First
      </span>
      <h2
        id="notify-title"
        className="text-2xl sm:text-3xl md:text-4xl text-white mt-3 leading-[1.05] tracking-tight"
      >
        Hear it before they do.
      </h2>
      <p className="text-sm text-white/60 mt-3 leading-relaxed max-w-md mx-auto">
        Drop an email and we'll write you the moment the next number is allocated. No
        algorithms. No noise. One message, then silence again.
      </p>

      {status === 'success' ? (
        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm text-white">
          <Check className="w-4 h-4" />
          You're on the list. We'll be in touch.
        </div>
      ) : (
        <form
          onSubmit={submit}
          className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-md mx-auto"
        >
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            disabled={status === 'loading'}
            className="flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="group inline-flex items-center justify-between gap-2 hover:gap-3 transition-all bg-white text-black font-medium text-sm rounded-full pl-5 pr-1.5 py-1.5 disabled:opacity-60"
          >
            <span>{status === 'loading' ? 'Sending…' : 'Notify me'}</span>
            <span className="bg-black rounded-full w-9 h-9 flex items-center justify-center transition-transform group-hover:scale-110">
              <ArrowRight className="w-4 h-4 text-white" />
            </span>
          </button>
        </form>
      )}

      {status === 'error' && (
        <p className="text-xs text-red-300/80 mt-3">
          Something went wrong. Email{' '}
          <a
            href={`mailto:${NOTIFY_EMAIL}`}
            className="underline underline-offset-4 hover:text-white"
          >
            {NOTIFY_EMAIL}
          </a>{' '}
          directly.
        </p>
      )}
    </motion.section>
  )
}
