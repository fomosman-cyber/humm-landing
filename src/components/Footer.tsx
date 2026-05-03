import { motion } from 'framer-motion'
import { Facebook, Instagram, Music2, Twitter, Youtube, type LucideIcon } from 'lucide-react'

const LINK_COLUMNS: { heading: string; items: string[] }[] = [
  {
    heading: 'The Drop',
    items: ['The Golden 100', 'Lookbook', 'Numbering 001–100', 'Materials & Care', 'Future Drops'],
  },
  {
    heading: 'The Story',
    items: ['Origin', 'The Collective', 'Press', 'Join the Team'],
  },
  {
    heading: 'Concierge',
    items: ['Get in Touch', 'Privacy', 'Terms of Sale', 'Report a Concern'],
  },
]

const SOCIALS: { Icon: LucideIcon; href: string; label: string }[] = [
  { Icon: Music2, href: '#', label: 'TikTok' },
  { Icon: Facebook, href: '#', label: 'Facebook' },
  { Icon: Twitter, href: '#', label: 'X / Twitter' },
  { Icon: Youtube, href: '#', label: 'YouTube' },
  { Icon: Instagram, href: 'https://instagram.com/humm.amsterdam', label: 'Instagram' },
]

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
      className="liquid-glass w-full max-w-7xl rounded-3xl p-6 md:p-10 text-white/70 mt-24 md:mt-40 mb-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-10">
        <div className="md:col-span-5 flex flex-col gap-4">
          <div className="flex items-center gap-3 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 256 256"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M 4.688 136 C 68.373 136 120 187.627 120 251.312 C 120 252.883 119.967 254.445 119.905 256 L 0 256 L 0 136.096 C 1.555 136.034 3.117 136 4.688 136 Z M 251.312 136 C 252.883 136 254.445 136.034 256 136.096 L 256 256 L 136.095 256 C 136.032 254.438 136.001 252.875 136 251.312 C 136 187.627 187.627 136 251.312 136 Z M 119.905 0 C 119.967 1.555 120 3.117 120 4.688 C 120 68.373 68.373 120 4.687 120 C 3.117 120 1.555 119.967 0 119.905 L 0 0 Z M 256 119.905 C 254.445 119.967 252.883 120 251.312 120 C 187.627 120 136 68.373 136 4.687 C 136 3.117 136.033 1.555 136.095 0 L 256 0 Z" />
            </svg>
            <span className="text-xl font-medium tracking-tight">HUMM</span>
          </div>
          <p className="text-sm leading-relaxed max-w-sm">
            HUMM is not fashion. Fashion fades. HUMM is recognition — gold-embroidered,
            hand-numbered, designed to be remembered. Made in Amsterdam, given first to
            those who heard it.
          </p>
        </div>

        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {LINK_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm uppercase tracking-wider text-white font-medium mb-4">
                {col.heading}
              </h3>
              <ul className="text-xs space-y-2">
                {col.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
        <p className="text-[10px] uppercase tracking-widest opacity-50">
          Curated by @humm.amsterdam
        </p>
        <div className="flex items-center gap-4">
          <span className="text-[10px] uppercase tracking-widest opacity-50">
            Join the Journey:
          </span>
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer noopener' : undefined}
                aria-label={label}
                className="opacity-70 hover:opacity-100 transition-colors hover:text-white"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
