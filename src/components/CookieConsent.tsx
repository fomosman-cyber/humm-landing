import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  onOpenPrivacy: () => void
}

const STORAGE_KEY = 'humm-cookie-consent'

export default function CookieConsent({ onOpenPrivacy }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      const t = window.setTimeout(() => setVisible(true), 1200)
      return () => window.clearTimeout(t)
    }
  }, [])

  const decide = (choice: 'accepted' | 'declined') => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ choice, at: Date.now() }))
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-label="Cookie preferences"
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-2xl"
        >
          <div className="liquid-glass rounded-2xl p-4 sm:p-5 text-white/80 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
            <div className="flex-1 text-xs sm:text-sm leading-relaxed">
              We use strictly necessary cookies to run the site and anonymous analytics
              to learn what works.{' '}
              <button
                onClick={onOpenPrivacy}
                className="underline underline-offset-4 hover:text-white"
              >
                Read our privacy notice
              </button>
              .
            </div>
            <div className="flex items-center gap-2 self-stretch sm:self-auto">
              <button
                onClick={() => decide('declined')}
                className="text-xs sm:text-sm text-white/70 hover:text-white px-3 py-1.5 rounded-full border border-white/15 hover:border-white/30 transition-colors"
              >
                Decline
              </button>
              <button
                onClick={() => decide('accepted')}
                className="text-xs sm:text-sm bg-white text-black font-medium px-4 py-1.5 rounded-full hover:bg-white/90 transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
