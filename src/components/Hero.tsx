import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import WordsPullUp from './WordsPullUp'

const NAV_ITEMS: { label: string; href: string; external?: boolean }[] = [
  { label: 'About', href: '#about' },
  { label: 'The Drop', href: '#drop' },
  { label: 'Contact', href: 'https://instagram.com/humm.amsterdam', external: true },
  { label: 'Instagram', href: 'https://instagram.com/humm.amsterdam', external: true },
  { label: 'Cart', href: '#' },
]

const HERO_IMAGE =
  'https://www.humm-amsterdam.nl/cdn/shop/files/model-deep-in-thought.jpg?v=1771355823&width=2730'

const easeOut = [0.16, 1, 0.3, 1] as const

export default function Hero() {
  return (
    <section className="h-screen w-full p-4 md:p-6">
      <div className="relative h-full w-full rounded-2xl md:rounded-[2rem] overflow-hidden">
        <motion.img
          src={HERO_IMAGE}
          alt="HUMM Amsterdam — The Golden 100"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: easeOut }}
        />

        <div className="absolute inset-0 noise-overlay opacity-[0.7] mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />

        <nav className="absolute top-0 left-1/2 -translate-x-1/2 z-20 bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8">
          <ul className="flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14 text-[10px] sm:text-xs md:text-sm">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noreferrer noopener' : undefined}
                  className="transition-colors"
                  style={{ color: 'rgba(225, 224, 204, 0.8)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#E1E0CC')}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = 'rgba(225, 224, 204, 0.8)')
                  }
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 md:px-10 pb-4 sm:pb-6 md:pb-8 z-10">
          <div className="grid grid-cols-12 gap-4 md:gap-6 items-end">
            <div className="col-span-12 lg:col-span-8">
              <h1
                className="font-medium leading-[0.85] tracking-[-0.07em] text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw]"
                style={{ color: '#E1E0CC' }}
              >
                <WordsPullUp text="HUMM" />
              </h1>
            </div>

            <div className="col-span-12 lg:col-span-4 flex flex-col gap-5 sm:gap-6 lg:pb-6">
              <motion.p
                className="text-primary/70 text-xs sm:text-sm md:text-base"
                style={{ lineHeight: 1.2 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.5, ease: easeOut }}
              >
                Every movement starts with a small group who heard it first. The
                Golden 100 — gold-embroidered, hand-numbered 001 to 100, in
                crème, olive and black. No algorithms. No hype. No bots. Just
                members first.
              </motion.p>

              <motion.button
                className="group inline-flex items-center gap-2 hover:gap-3 transition-all bg-primary text-black font-medium text-sm sm:text-base rounded-full pl-5 pr-1.5 py-1.5 self-start"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.7, ease: easeOut }}
              >
                <span>Claim your number</span>
                <span className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform group-hover:scale-110">
                  <ArrowRight className="w-4 h-4 sm:w-[18px] sm:h-[18px]" style={{ color: '#E1E0CC' }} />
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
