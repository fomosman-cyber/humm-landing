import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ShoppingBag } from 'lucide-react'
import { createCheckoutForVariant, shopifyApiEnabled } from '../lib/shopify'

type ColorKey = 'creme' | 'black'

interface ColorOption {
  key: ColorKey
  name: string
  swatch: string
  ring: string
  image: string
  variantId?: string
  shopUrl: string
}

const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_DOMAIN || 'www.humm-amsterdam.nl'

const buildShopUrl = (
  fullUrl: string | undefined,
  variantId: string | undefined,
  fallbackHandle: string,
): string => {
  if (fullUrl) return fullUrl
  if (variantId) return `https://${SHOPIFY_DOMAIN}/cart/${variantId}:1`
  return `https://${SHOPIFY_DOMAIN}/products/${fallbackHandle}`
}

const COLORS: ColorOption[] = [
  {
    key: 'creme',
    name: 'Crème',
    swatch: '#DEDBC8',
    ring: '#DEDBC8',
    image:
      'https://www.humm-amsterdam.nl/cdn/shop/files/man-in-white-and-light-tan-outfit.jpg?v=1771012404&width=2731',
    variantId: import.meta.env.VITE_SHOPIFY_VARIANT_CREME,
    shopUrl: buildShopUrl(
      import.meta.env.VITE_SHOPIFY_URL_CREME,
      import.meta.env.VITE_SHOPIFY_VARIANT_CREME,
      'golden-100-creme',
    ),
  },
  {
    key: 'black',
    name: 'Black',
    swatch: '#0E0E0E',
    ring: '#5A5A5A',
    image:
      'https://www.humm-amsterdam.nl/cdn/shop/files/model-deep-in-thought.jpg?v=1771355823&width=2730',
    variantId: import.meta.env.VITE_SHOPIFY_VARIANT_BLACK,
    shopUrl: buildShopUrl(
      import.meta.env.VITE_SHOPIFY_URL_BLACK,
      import.meta.env.VITE_SHOPIFY_VARIANT_BLACK,
      'golden-100-black',
    ),
  },
]

const easeOut = [0.16, 1, 0.3, 1] as const

export default function ProductSelector() {
  const [selected, setSelected] = useState<ColorKey>('creme')
  const [buying, setBuying] = useState(false)
  const [buyError, setBuyError] = useState<string | null>(null)
  const active = COLORS.find((c) => c.key === selected)!

  const handleBuy = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!shopifyApiEnabled || !active.variantId) {
      // Fall through to the regular href (cart-permalink or product page)
      return
    }
    e.preventDefault()
    setBuying(true)
    setBuyError(null)
    try {
      const checkoutUrl = await createCheckoutForVariant(active.variantId)
      window.location.href = checkoutUrl
    } catch (err) {
      console.error('[Shopify checkout]', err)
      setBuyError('Could not start checkout. Try again or use the cart link.')
      setBuying(false)
    }
  }

  return (
    <motion.section
      id="drop"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.6, ease: easeOut }}
      className="liquid-glass w-full max-w-5xl rounded-3xl p-6 sm:p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 scroll-mt-20"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-black/40">
        <AnimatePresence mode="wait">
          <motion.img
            key={active.key}
            src={active.image}
            alt={`HUMM Golden Drop — ${active.name}`}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-white/80">
          GD100 · Limited to 100
        </div>
      </div>

      <div className="flex flex-col justify-between gap-8">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">
            The Golden 100
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-white leading-[1] tracking-tight">
            HUMM <span className="font-serif-italic font-normal text-white/80">Tee.</span>
          </h2>
          <p className="text-sm text-white/60 leading-relaxed mt-2 max-w-md">
            Heavyweight cotton. Gold-embroidered, hand-numbered 001–100. Two editions,
            never reissued. Inside details only the owner sees.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-white/50">
            <span>Choose edition</span>
            <span className="text-white/80">{active.name}</span>
          </div>
          <div className="flex items-center gap-3">
            {COLORS.map((c) => {
              const isActive = c.key === selected
              return (
                <button
                  key={c.key}
                  onClick={() => setSelected(c.key)}
                  aria-label={`Select ${c.name}`}
                  className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-transform hover:scale-105"
                  style={{
                    boxShadow: isActive
                      ? `0 0 0 1.5px ${c.ring}, 0 0 0 4px rgba(0,0,0,0.6), 0 0 0 5.5px ${c.ring}40`
                      : '0 0 0 1px rgba(255,255,255,0.2)',
                  }}
                >
                  <span
                    className="absolute inset-1 rounded-full"
                    style={{ backgroundColor: c.swatch }}
                  />
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <a
            href={active.shopUrl}
            onClick={handleBuy}
            aria-disabled={buying}
            className="group inline-flex items-center justify-between gap-2 hover:gap-3 transition-all bg-white text-black font-medium text-sm sm:text-base rounded-full pl-5 pr-1.5 py-1.5 sm:py-2 disabled:opacity-60"
          >
            <span className="inline-flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              {buying ? 'Opening checkout…' : `Buy the Golden Drop — ${active.name}`}
            </span>
            <span className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform group-hover:scale-110">
              <ArrowRight className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-white" />
            </span>
          </a>
          {buyError ? (
            <p className="text-xs text-red-300/80 text-center">{buyError}</p>
          ) : (
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 text-center">
              One per member · No bots · No resale
            </p>
          )}
        </div>
      </div>
    </motion.section>
  )
}
