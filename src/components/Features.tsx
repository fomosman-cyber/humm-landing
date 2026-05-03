import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, Hash, Palette, Users } from 'lucide-react'
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle'

const cardEase = [0.22, 1, 0.36, 1] as const

interface CardProps {
  index: number
  number: string
  title: string
  Icon: React.ComponentType<{ className?: string }>
  items: { title: string; body: string }[]
}

function GlassFeatureCard({ index, number, title, Icon, items }: CardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: cardEase }}
      className="liquid-glass rounded-2xl md:rounded-[1.5rem] p-5 sm:p-6 md:p-7 flex flex-col h-full text-white/70"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-white/5 border border-white/10 flex items-center justify-center">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
      </div>

      <h3 className="text-white text-lg sm:text-xl md:text-2xl font-normal leading-tight mb-1">
        {title}
      </h3>
      <span
        className="text-xs sm:text-sm mb-5 tracking-[0.15em]"
        style={{ color: '#C9A86A' }}
      >
        {number}
      </span>

      <ul className="flex flex-col gap-3 flex-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <Check className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-white mt-0.5 flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-white text-xs sm:text-sm font-medium">
                {item.title}
              </span>
              <span className="text-white/50 text-xs">{item.body}</span>
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function Features() {
  return (
    <section id="drop" className="relative w-full max-w-7xl px-4 sm:px-6 md:px-10 py-20 sm:py-28">
      <div className="text-center mb-12 sm:mb-16 md:mb-20 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-tight">
        <WordsPullUpMultiStyle
          segments={[{ text: 'Designed to be remembered.', className: 'text-white' }]}
          className="mb-2"
        />
        <WordsPullUpMultiStyle
          segments={[
            { text: 'No hype. No bots. Just members first.', className: 'text-white/40' },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        <GlassFeatureCard
          index={0}
          number="01"
          title="Limited Edition."
          Icon={Hash}
          items={[
            { title: '100 pieces only', body: 'Hand-numbered 001 to 100, never reissued.' },
            { title: 'Gold embroidery', body: 'Each tee finished with the GD signature.' },
            { title: 'Inside details', body: 'Quiet marks only the owner will ever see.' },
            { title: 'Heavyweight cotton', body: 'Built for years, not seasons.' },
          ]}
        />
        <GlassFeatureCard
          index={1}
          number="02"
          title="Three Editions."
          Icon={Palette}
          items={[
            { title: 'Crème', body: 'Soft, warm, foundational — the daylight cut.' },
            { title: 'Olive', body: 'Earthy, understated, considered.' },
            { title: 'Black', body: 'Quiet, definitive, anchored.' },
          ]}
        />
        <GlassFeatureCard
          index={2}
          number="03"
          title="Members First."
          Icon={Users}
          items={[
            { title: 'No algorithms', body: 'No feed decides who gets allocated a number.' },
            { title: 'No bots, no resale', body: 'Verified humans, one piece per member.' },
            { title: 'Heard it first', body: 'Early access for those already inside.' },
          ]}
        />
      </div>
    </section>
  )
}
