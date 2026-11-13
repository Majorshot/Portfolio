import { useState, useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  // Initialize Lenis smooth scroll synchronized with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    const ticker = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(ticker)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      {/* Subtle Analog Noise Film Grain */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Preloader sits at z-50 covering the screen until bars slide up */}
      {isLoading && (
        <Preloader onFinish={() => setIsLoading(false)} />
      )}

      {/* Hero section is ready underneath to be revealed by the lifting bars */}
      <div className="min-h-screen bg-[#121316] text-[#f4f4f5] selection:bg-[#d4ff00] selection:text-[#121316]">
        <Navbar />
        <main>
          <Hero isLoaded={!isLoading} />
          <About />
        </main>
      </div>
    </>
  )
}
