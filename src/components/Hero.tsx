import { motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import WordsPullUp from './WordsPullUp'

const NAV_ITEMS: { label: string; href: string; external?: boolean }[] = [
  { label: 'About', href: '#about' },
  { label: 'The Drop', href: '#drop' },
  { label: 'Contact', href: 'https://instagram.com/humm.amsterdam', external: true },
  { label: 'Instagram', href: 'https://instagram.com/humm.amsterdam', external: true },
]

const easeOut = [0.16, 1, 0.3, 1] as const

export default function Hero() {
  return (
    <section className="relative w-full flex flex-col items-center pt-6 pb-20 sm:pb-32">
      <nav className="w-full max-w-7xl flex items-center justify-between px-2 mb-16 sm:mb-24">
        <span className="text-white text-sm sm:text-base font-medium tracking-tight">
          HUMM
        </span>
        <ul className="hidden md:flex items-center gap-8 lg:gap-12 text-xs">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noreferrer noopener' : undefined}
                className="text-white/70 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#"
          className="inline-flex items-center gap-2 text-white/80 hover:text-white text-xs"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Cart</span>
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

        <h1
          className="text-white font-medium leading-[0.85] tracking-[-0.05em] mt-4 text-[24vw] sm:text-[20vw] md:text-[18vw] lg:text-[16vw]"
        >
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
