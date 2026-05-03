import Hero from './components/Hero'
import ProductSelector from './components/ProductSelector'
import About from './components/About'
import Features from './components/Features'
import Footer from './components/Footer'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260429_114316_1c7889ad-2885-410e-b493-98119fee0ddb.mp4'

export default function App() {
  return (
    <main className="relative w-full min-h-screen overflow-x-hidden flex flex-col items-center font-sans selection:bg-white/20 selection:text-white">
      <video
        autoPlay
        loop
        muted
        playsInline
        src={VIDEO_URL}
        className="fixed inset-0 w-full h-full object-cover z-0"
      />
      <div className="fixed inset-0 bg-black/55 pointer-events-none z-[1]" />

      <div className="relative z-10 w-full flex flex-col items-center px-4 sm:px-6 md:px-10">
        <Hero />
        <ProductSelector />
        <About />
        <Features />
        <Footer />
      </div>
    </main>
  )
}
