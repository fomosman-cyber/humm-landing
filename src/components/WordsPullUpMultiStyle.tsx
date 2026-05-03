import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export interface Segment {
  text: string
  className?: string
}

interface Props {
  segments: Segment[]
  className?: string
  staggerDelay?: number
  baseDelay?: number
}

export default function WordsPullUpMultiStyle({
  segments,
  className = '',
  staggerDelay = 0.08,
  baseDelay = 0,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  const words = segments.flatMap((seg) =>
    seg.text.split(' ').map((w) => ({ word: w, className: seg.className ?? '' })),
  )

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${className}`}>
      {words.map((entry, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.22em]">
          <motion.span
            className={`inline-block ${entry.className}`}
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{
              duration: 0.7,
              delay: baseDelay + i * staggerDelay,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {entry.word}
          </motion.span>
        </span>
      ))}
    </div>
  )
}
