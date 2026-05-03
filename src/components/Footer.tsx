import { ArrowRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-primary/10 px-4 sm:px-6 md:px-10 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12">
          <div className="flex flex-col gap-3">
            <span
              className="text-5xl sm:text-6xl md:text-7xl font-medium tracking-[-0.06em] leading-none"
              style={{ color: '#E1E0CC' }}
            >
              HUMM
            </span>
            <span className="italic font-serif text-primary/70 text-base sm:text-lg">
              Designed to be remembered.
            </span>
          </div>

          <a
            href="https://instagram.com/humm.amsterdam"
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex items-center gap-2 hover:gap-3 transition-all bg-primary text-black font-medium text-sm sm:text-base rounded-full pl-5 pr-1.5 py-1.5 self-start"
          >
            <span>Follow @humm.amsterdam</span>
            <span className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform group-hover:scale-110">
              <ArrowRight
                className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
                style={{ color: '#E1E0CC', transform: 'rotate(-45deg)' }}
              />
            </span>
          </a>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-primary/10 text-xs text-gray-500">
          <span>© 2026 HUMM Amsterdam. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#about" className="hover:text-primary transition-colors">
              About
            </a>
            <a href="#drop" className="hover:text-primary transition-colors">
              The Drop
            </a>
            <a
              href="https://instagram.com/humm.amsterdam"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-primary transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
