import { useRef } from 'react'
import { useScroll } from 'framer-motion'
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle'
import AnimatedLetter from './AnimatedLetter'

const PARAGRAPH =
  'Born in Amsterdam, HUMM begins with The Golden 100 — a limited edition of 100 hand-numbered tees in crème, olive and black, finished with gold embroidery. Inside details only the owner will ever know. You heard it before they did.'

export default function About() {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })

  const chars = PARAGRAPH.split('')

  return (
    <section id="about" className="bg-black py-24 sm:py-32 md:py-40 px-4 sm:px-6 md:px-10">
      <div className="bg-[#101010] mx-auto max-w-6xl rounded-2xl md:rounded-3xl px-6 sm:px-10 md:px-16 py-20 sm:py-24 md:py-32 text-center flex flex-col items-center gap-10 sm:gap-12">
        <span className="text-primary text-[10px] sm:text-xs uppercase tracking-[0.2em]">
          HUMM Amsterdam
        </span>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9] text-primary">
          <WordsPullUpMultiStyle
            segments={[
              { text: 'HUMM is not fashion.', className: 'font-normal' },
              { text: 'Fashion fades.', className: 'italic font-serif' },
              {
                text: 'HUMM is recognition. That lasts.',
                className: 'font-normal',
              },
            ]}
          />
        </h2>

        <p
          ref={ref}
          className="max-w-2xl text-xs sm:text-sm md:text-base"
          style={{ color: '#DEDBC8', lineHeight: 1.55 }}
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
      </div>
    </section>
  )
}
