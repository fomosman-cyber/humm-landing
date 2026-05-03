import { motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import WordsPullUp from './WordsPullUp'

interface Props {
  onOpenContact: () => void
}

const easeOut = [0.16, 1, 0.3, 1] as const

export default function Hero({ onOpenContact }: Props) {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    if (target.startsWith('#')) {
      e.preventDefault()
      const el = document.querySelector(target)
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="relative w-full flex flex-col items-center pt-6 pb-20 sm:pb-32">
      <nav className="w-full max-w-7xl flex items-center justify-between px-2 mb-16 sm:mb-24 text-white">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="text-sm sm:text-base font-medium tracking-tight"
        >
          HUMM
        </a>
        <ul className="hidden md:flex items-center gap-8 lg:gap-12 text-xs">
          <li>
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, '#about')}
              className="text-white/70 hover:text-white transition-colors"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#drop"
              onClick={(e) => handleNavClick(e, '#drop')}
              className="text-white/70 hover:text-white transition-colors"
            >
              The Drop
            </a>
          </li>
          <li>
            <button
              onClick={onOpenContact}
              className="text-white/70 hover:text-white transition-colors"
            >
              Contact
            </button>
          </li>
          <li>
            <a
              href="https://instagram.com/humm.amsterdam"
              target="_blank"
              rel="noreferrer noopener"
              className="text-white/70 hover:text-white transition-colors"
            >
              Instagram
            </a>
          </li>
        </ul>
        <a
          href="https://www.humm-amsterdam.nl/cart"
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-2 text-white/80 hover:text-white text-xs"
        >
          <ShoppingBag className="w-4 h-4" />
          <span className="hidden sm:inline">Cart</span>
        </a>
      </nav>

      <div className="w-full max-w-7xl flex flex-col items-center text-center px-4">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: easeOut }}
          className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-white/60"
        >
          The Golden 100 — Drop 2026
        </motion.span>

        <h1 className="text-white font-medium leading-[0.85] tracking-[-0.05em] mt-4 text-[24vw] sm:text-[20vw] md:text-[18vw] lg:text-[16vw]">
          <WordsPullUp text="HUMM" />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: easeOut }}
          className="text-white/70 text-sm sm:text-base max-w-md mt-6 leading-relaxed"
        >
          You heard it before they did. 100 hand-numbered tees, gold-embroidered,
          designed to be remembered.
        </motion.p>
      </div>
    </section>
  )
}
