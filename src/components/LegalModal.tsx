import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface Props {
  open: boolean
  onClose: () => void
  title: string
  body: React.ReactNode
}

export default function LegalModal({ open, onClose, title, body }: Props) {
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
          aria-labelledby="legal-title"
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="liquid-glass relative w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-3xl p-6 sm:p-8 md:p-10 text-white/80"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="sticky top-0 float-right ml-4 -mr-2 -mt-2 sm:-mt-4 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">
              HUMM Amsterdam
            </span>
            <h2
              id="legal-title"
              className="text-2xl sm:text-3xl text-white mt-2 leading-[1.05] tracking-tight"
            >
              {title}
            </h2>

            <div className="mt-6 text-sm text-white/70 leading-relaxed space-y-4 [&_h3]:text-white [&_h3]:text-base [&_h3]:font-medium [&_h3]:mt-6 [&_h3]:mb-1 [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-white">
              {body}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
