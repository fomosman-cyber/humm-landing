import { motion } from 'framer-motion'
import { Instagram, Music2, type LucideIcon } from 'lucide-react'

interface Props {
  onOpenContact: (subject?: string) => void
  onOpenPrivacy: () => void
  onOpenTerms: () => void
}

interface LinkItem {
  label: string
  onClick?: () => void
  href?: string
  external?: boolean
}

const SOCIALS: { Icon: LucideIcon; href: string; label: string }[] = [
  { Icon: Music2, href: 'https://www.tiktok.com/@humm.amsterdam', label: 'TikTok' },
  { Icon: Instagram, href: 'https://instagram.com/humm.amsterdam', label: 'Instagram' },
]

const scrollTo = (selector: string) => () => {
  document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Footer({ onOpenContact, onOpenPrivacy, onOpenTerms }: Props) {
  const columns: { heading: string; items: LinkItem[] }[] = [
    {
      heading: 'The Drop',
      items: [
        { label: 'The Golden 100', onClick: scrollTo('#drop') },
        { label: 'Lookbook', href: 'https://instagram.com/humm.amsterdam', external: true },
        { label: 'Numbering 001–100', onClick: scrollTo('#details') },
        { label: 'Materials & Care', onClick: scrollTo('#details') },
        { label: 'Future Drops', onClick: () => onOpenContact('HUMM — Future Drops') },
      ],
    },
    {
      heading: 'The Story',
      items: [
        { label: 'Origin', onClick: scrollTo('#about') },
        { label: 'The Collective', onClick: scrollTo('#about') },
        { label: 'Press', onClick: () => onOpenContact('HUMM — Press inquiry') },
        { label: 'Join the Team', onClick: () => onOpenContact('HUMM — Join the team') },
      ],
    },
    {
      heading: 'Concierge',
      items: [
        { label: 'Get in Touch', onClick: () => onOpenContact() },
        { label: 'Privacy', onClick: onOpenPrivacy },
        { label: 'Terms of Sale', onClick: onOpenTerms },
        { label: 'Report a Concern', onClick: () => onOpenContact('HUMM — Report a concern') },
      ],
    },
  ]

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
            <img
              src="/logo.png"
              alt="HUMM"
              className="w-10 h-10 object-contain"
              style={{ mixBlendMode: 'lighten' }}
            />
            <span className="text-xl font-medium tracking-tight">HUMM</span>
          </div>
          <p className="text-sm leading-relaxed max-w-sm">
            HUMM is not fashion. Fashion fades. HUMM is recognition — gold-embroidered,
            hand-numbered, designed to be remembered. Made in Amsterdam, given first to
            those who heard it.
          </p>
        </div>

        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm uppercase tracking-wider text-white font-medium mb-4">
                {col.heading}
              </h3>
              <ul className="text-xs space-y-2">
                {col.items.map((item) =>
                  item.onClick ? (
                    <li key={item.label}>
                      <button
                        onClick={item.onClick}
                        className="text-left hover:text-white transition-colors"
                      >
                        {item.label}
                      </button>
                    </li>
                  ) : (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target={item.external ? '_blank' : undefined}
                        rel={item.external ? 'noreferrer noopener' : undefined}
                        className="hover:text-white transition-colors"
                      >
                        {item.label}
                      </a>
                    </li>
                  ),
                )}
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
                target="_blank"
                rel="noreferrer noopener"
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
