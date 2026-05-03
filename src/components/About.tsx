import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle'
import AnimatedLetter from './AnimatedLetter'

const PARAGRAPH =
  'Born in Amsterdam, HUMM begins with The Golden 100 — a limited edition of 100 hand-numbered tees in crème and black, finished with gold embroidery. Inside details only the owner will ever know. You heard it before they did.'

const STORY_BLOCKS: { heading: string; body: string }[] = [
  {
    heading: 'The Origin.',
    body: 'HUMM began as a quiet conversation between a handful of friends in Amsterdam who wanted clothing made the way music gets made — slowly, on purpose, and only for the people listening. No seasons. No follow-up collections by default. Just one drop at a time, considered to the last stitch.',
  },
  {
    heading: 'The Craft.',
    body: 'Heavyweight cotton, hand-numbered 001 through 100, finished with discreet gold embroidery. Tiny details inside — a stamp on the inner hem, a tone-on-tone tag — only the owner ever sees. Made in small workshops we know by name.',
  },
  {
    heading: 'The Way.',
    body: 'No algorithms decide who gets one. No bots, no resale games, no waitlist farming. Members hear it first. When the last number is gone, the drop is gone. That is the point.',
  },
]

export default function About() {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.2'],
  })

  const chars = PARAGRAPH.split('')

  return (
    <section
      id="about"
      className="w-full max-w-5xl px-4 sm:px-6 py-24 sm:py-32 md:py-40 flex flex-col items-center text-center gap-10 sm:gap-12 scroll-mt-20"
    >
      <span className="text-white/60 text-[10px] sm:text-xs uppercase tracking-[0.3em]">
        HUMM Amsterdam
      </span>

      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9] text-white">
        <WordsPullUpMultiStyle
          segments={[
            { text: 'HUMM is not fashion.', className: 'font-normal' },
            { text: 'Fashion fades.', className: 'font-serif-italic' },
            { text: 'HUMM is recognition. That lasts.', className: 'font-normal' },
          ]}
        />
      </h2>

      <p
        ref={ref}
        className="max-w-2xl text-xs sm:text-sm md:text-base text-white"
        style={{ lineHeight: 1.55 }}
      >
        {chars.map((char, i) => (
          <AnimatedLetter
            key={i}
            char={char}
            index={i}
            total={chars.length}
            progress={scrollYProgress}
          />
        ))}
      </p>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mt-6 sm:mt-10 text-left">
        {STORY_BLOCKS.map((block, i) => (
          <motion.div
            key={block.heading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="liquid-glass rounded-2xl p-5 sm:p-6 md:p-7 text-white/70"
          >
            <h3 className="text-white text-lg sm:text-xl mb-3 leading-tight">
              {block.heading}
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed">{block.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
