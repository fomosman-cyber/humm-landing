import Hero from './components/Hero'
import About from './components/About'
import Features from './components/Features'
import Footer from './components/Footer'

export default function App() {
  return (
    <main className="bg-black text-primary overflow-x-hidden">
      <Hero />
      <About />
      <Features />
      <Footer />
    </main>
  )
}
