import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Props {
  text: string
  className?: string
  showAsterisk?: boolean
  staggerDelay?: number
  baseDelay?: number
}

export default function WordsPullUp({
  text,
  className = '',
  showAsterisk = false,
  staggerDelay = 0.08,
  baseDelay = 0,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const words = text.split(' ')

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1
        const splitIdx = isLast && showAsterisk ? word.length - 1 : -1

        return (
          <span key={i} className="inline-block overflow-hidden mr-[0.18em]">
            <motion.span
              className="inline-block relative"
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{
                duration: 0.7,
                delay: baseDelay + i * staggerDelay,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {splitIdx >= 0 ? (
                <>
                  {word.slice(0, splitIdx)}
                  <span className="relative inline-block">
                    {word.slice(splitIdx)}
                    <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em] font-normal">
                      *
                    </span>
                  </span>
                </>
              ) : (
                word
              )}
            </motion.span>
          </span>
        )
      })}
    </span>
  )
}
