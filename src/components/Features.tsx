import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Check, Hash, Palette, Users } from 'lucide-react'
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle'

const CARD_IMAGE =
  'https://www.humm-amsterdam.nl/cdn/shop/files/model-in-latte-colored-hoodie.jpg?v=1771355773&width=3277'

const cardEase = [0.22, 1, 0.36, 1] as const

interface CardWrapperProps {
  index: number
  children: React.ReactNode
  className?: string
}

function CardWrapper({ index, children, className = '' }: CardWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: cardEase }}
      className={`relative overflow-hidden rounded-2xl md:rounded-[1.5rem] ${className}`}
    >
      {children}
    </motion.div>
  )
}

interface ChecklistItem {
  title: string
  body: string
}

interface FeatureCardProps {
  index: number
  number: string
  title: string
  Icon: React.ComponentType<{ className?: string }>
  items: ChecklistItem[]
}

function FeatureCard({ index, number, title, Icon, items }: FeatureCardProps) {
  return (
    <CardWrapper index={index} className="bg-[#212121] p-5 sm:p-6 md:p-7 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-primary/10 border border-primary/15 flex items-center justify-center">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
        </div>
      </div>

      <h3 className="text-primary text-lg sm:text-xl md:text-2xl font-normal leading-tight mb-1">
        {title}
      </h3>
      <span className="text-xs sm:text-sm mb-5 tracking-[0.15em]" style={{ color: '#C9A86A' }}>
        {number}
      </span>

      <ul className="flex flex-col gap-3 flex-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <Check className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-primary mt-0.5 flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-primary text-xs sm:text-sm font-medium">{item.title}</span>
              <span className="text-gray-400 text-xs">{item.body}</span>
            </div>
          </li>
        ))}
      </ul>

      <a
        href="#"
        className="inline-flex items-center gap-1.5 text-primary text-xs sm:text-sm mt-6 hover:gap-2 transition-all"
      >
        <span>Learn more</span>
        <ArrowRight className="w-3.5 h-3.5" style={{ transform: 'rotate(-45deg)' }} />
      </a>
    </CardWrapper>
  )
}

export default function Features() {
  return (
    <section id="drop" className="relative min-h-screen bg-black py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-10">
      <div className="absolute inset-0 bg-noise opacity-[0.15] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 md:mb-20 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-tight">
          <WordsPullUpMultiStyle
            segments={[
              {
                text: 'Designed to be remembered.',
                className: 'text-primary',
              },
            ]}
            className="mb-2"
          />
          <WordsPullUpMultiStyle
            segments={[
              {
                text: 'No hype. No bots. Just members first.',
                className: 'text-gray-500',
              },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1 lg:h-[480px]">
          <CardWrapper index={0} className="min-h-[320px] lg:min-h-0">
            <img
              src={CARD_IMAGE}
              alt="HUMM Amsterdam lookbook"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            <div className="relative h-full flex flex-col justify-end p-5 sm:p-6">
              <span style={{ color: '#E1E0CC' }} className="text-base sm:text-lg md:text-xl">
                The Golden 100.
              </span>
            </div>
          </CardWrapper>

          <FeatureCard
            index={1}
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

          <FeatureCard
            index={2}
            number="02"
            title="Three Editions."
            Icon={Palette}
            items={[
              { title: 'Crème', body: 'Soft, warm, foundational — the daylight cut.' },
              { title: 'Olive', body: 'Earthy, understated, considered.' },
              { title: 'Black', body: 'Quiet, definitive, anchored.' },
            ]}
          />

          <FeatureCard
            index={3}
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
      </div>
    </section>
  )
}
