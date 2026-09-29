import { motion } from 'framer-motion'
import { ArrowRight, Camera, Eye, Gift, Instagram } from 'lucide-react'

interface Props {
  onOpenRules: () => void
}

const INSTAGRAM_URL = 'https://instagram.com/humm.amsterdam'

const STEPS = [
  {
    Icon: Eye,
    title: 'Spot it.',
    body: 'The white BMW with the black HUMM livery. Somewhere in Amsterdam, any day.',
  },
  {
    Icon: Camera,
    title: 'Snap it.',
    body: 'Photo or video, the HUMM logo in view. Safe only — never while you drive.',
  },
  {
    Icon: Instagram,
    title: 'Post & tag.',
    body: 'Story or post. Tag @humm.amsterdam and add #SpotTheHUMM.',
  },
  {
    Icon: Gift,
    title: 'Win The Signal.',
    body: 'Every week we pick one spotter who wins a tee from The Signal.',
  },
]

export default function SpotTheHumm({ onOpenRules }: Props) {
  return (
    <motion.section
      id="spot"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="liquid-glass w-full max-w-6xl rounded-3xl overflow-hidden text-white/80 my-16 sm:my-24 scroll-mt-20"
      aria-labelledby="spot-title"
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative aspect-[4/5] md:aspect-auto md:min-h-full">
          <img
            src="/humm-mobiel.jpg"
            alt="The white HUMM BMW with black HUMM livery and the line Not For Everyone"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <span className="absolute bottom-4 left-4 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-[10px] uppercase tracking-[0.2em] text-white/80">
            The HUMM mobile
          </span>
        </div>

        <div className="px-6 sm:px-8 md:px-10 py-8 sm:py-10 md:py-12 flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">
            Spot the HUMM mobile
          </span>
          <h2
            id="spot-title"
            className="text-2xl sm:text-3xl md:text-4xl text-white mt-3 leading-[1.05] tracking-tight"
          >
            Seen it on the street? Win The Signal.
          </h2>
          <p className="text-sm text-white/60 mt-3 leading-relaxed">
            Our car is out there. Not for everyone — only for the ones who look up.
          </p>

          <ol className="mt-6 flex flex-col gap-4">
            {STEPS.map(({ Icon, title, body }, i) => (
              <li key={title} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-md bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-sm font-medium">
                    <span className="mr-2" style={{ color: '#C9A86A' }}>
                      0{i + 1}
                    </span>
                    {title}
                  </span>
                  <span className="text-white/50 text-xs leading-relaxed">{body}</span>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center justify-between gap-2 hover:gap-3 transition-all bg-white text-black font-medium text-sm rounded-full pl-5 pr-1.5 py-1.5"
            >
              <span>Follow @humm.amsterdam</span>
              <span className="bg-black rounded-full w-9 h-9 flex items-center justify-center transition-transform group-hover:scale-110">
                <ArrowRight className="w-4 h-4 text-white" />
              </span>
            </a>
            <button
              onClick={onOpenRules}
              className="text-xs text-white/60 hover:text-white underline underline-offset-4 transition-colors"
            >
              Actievoorwaarden
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
