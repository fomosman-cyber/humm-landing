import { useEffect, useRef, useState } from 'react'
import Hero from './components/Hero'
import ProductSelector from './components/ProductSelector'
import About from './components/About'
import Features from './components/Features'
import Footer from './components/Footer'
import ContactModal from './components/ContactModal'
import LegalModal from './components/LegalModal'
import CookieConsent from './components/CookieConsent'
import NotifyForm from './components/NotifyForm'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260429_114316_1c7889ad-2885-410e-b493-98119fee0ddb.mp4'

const PRIVACY_BODY = (
  <>
    <p>
      HUMM Amsterdam ("HUMM", "we", "us") respects your privacy. This notice explains
      what data we collect when you visit our site or buy from a HUMM drop, and how we
      use it.
    </p>
    <h3>What we collect</h3>
    <p>
      Order details (name, shipping address, email, phone) processed through Shopify;
      basic site analytics (anonymised page views and device type); the email you give
      us when you contact us. We do not collect payment card data — that flows directly
      to Shopify Payments / your card provider.
    </p>
    <h3>How we use it</h3>
    <p>
      To fulfil your order, support you after the sale, and let you know about future
      drops only if you've opted in. We don't sell your data to third parties.
    </p>
    <h3>Your rights</h3>
    <p>
      You can ask us at any time to access, correct, or delete the data we hold on you.
      Email <a href="mailto:info@humm-amsterdam.nl">info@humm-amsterdam.nl</a> and
      we'll respond within a reasonable time.
    </p>
    <h3>Cookies</h3>
    <p>
      Shopify and our analytics provider may set strictly necessary and analytics
      cookies. You can disable non-essential cookies in your browser at any time.
    </p>
    <p className="text-white/40 text-xs pt-2">
      This notice is a plain-language summary. The legally binding version will be
      published before the first paid drop ships.
    </p>
  </>
)

const TERMS_BODY = (
  <>
    <p>
      These are the terms that apply when you reserve or buy from a HUMM Amsterdam drop.
      By completing checkout you confirm you have read and accepted them.
    </p>
    <h3>The drop</h3>
    <p>
      Each HUMM drop is a strictly limited release. The Golden 100 is capped at 100
      hand-numbered pieces across two editions (Crème, Black). Once the last number is
      sold, the drop is closed and is not reissued.
    </p>
    <h3>Allocation</h3>
    <p>
      Members hear about drops first. We sell one piece per person; orders that look
      automated or that exceed the per-person cap may be cancelled and refunded.
    </p>
    <h3>Payment & shipping</h3>
    <p>
      Prices are in euro and include applicable VAT. Payment is taken at checkout
      through Shopify. We ship from the Netherlands; delivery times depend on your
      destination and the carrier.
    </p>
    <h3>Returns</h3>
    <p>
      You may return an unworn, unwashed piece within 14 days of delivery for a refund.
      Returns must include the original packaging and number tag. Made-to-order or
      personalised pieces are excluded from returns where allowed by law.
    </p>
    <h3>Contact</h3>
    <p>
      Questions? Write us at{' '}
      <a href="mailto:info@humm-amsterdam.nl">info@humm-amsterdam.nl</a>.
    </p>
    <p className="text-white/40 text-xs pt-2">
      The full, legally binding terms will be published before the first paid drop
      ships.
    </p>
  </>
)

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [contact, setContact] = useState<{ open: boolean; subject?: string }>({
    open: false,
  })
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const [termsOpen, setTermsOpen] = useState(false)

  // Mobile autoplay fallback: iOS Safari sometimes refuses muted autoplay until the
  // first user gesture. Try to play on mount, and again on first interaction.
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const tryPlay = () => v.play().catch(() => {})
    tryPlay()
    const onFirstTouch = () => {
      tryPlay()
      window.removeEventListener('touchstart', onFirstTouch)
      window.removeEventListener('click', onFirstTouch)
    }
    window.addEventListener('touchstart', onFirstTouch, { once: true })
    window.addEventListener('click', onFirstTouch, { once: true })
    return () => {
      window.removeEventListener('touchstart', onFirstTouch)
      window.removeEventListener('click', onFirstTouch)
    }
  }, [])

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        {...({
          'webkit-playsinline': 'true',
          'x5-playsinline': 'true',
        } as Record<string, string>)}
        src={VIDEO_URL}
        className="fixed inset-0 w-full h-full object-cover z-0"
        style={{ transform: 'translateZ(0)' }}
      />
      <div className="fixed inset-0 bg-black/55 pointer-events-none z-[1]" />

      <main className="relative z-10 w-full min-h-screen overflow-x-hidden flex flex-col items-center font-sans selection:bg-white/20 selection:text-white">
        <div className="relative w-full flex flex-col items-center px-4 sm:px-6 md:px-10">
          <Hero onOpenContact={() => setContact({ open: true })} />
          <ProductSelector />
          <About />
          <Features />
          <NotifyForm />
          <Footer
            onOpenContact={(subject) => setContact({ open: true, subject })}
            onOpenPrivacy={() => setPrivacyOpen(true)}
            onOpenTerms={() => setTermsOpen(true)}
          />
        </div>
      </main>

      <CookieConsent onOpenPrivacy={() => setPrivacyOpen(true)} />

      <ContactModal
        open={contact.open}
        onClose={() => setContact({ open: false })}
        defaultSubject={contact.subject}
      />
      <LegalModal
        open={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
        title="Privacy Notice."
        body={PRIVACY_BODY}
      />
      <LegalModal
        open={termsOpen}
        onClose={() => setTermsOpen(false)}
        title="Terms of Sale."
        body={TERMS_BODY}
      />
    </>
  )
}
