import { useState, useEffect } from 'react'
import Lenis from 'lenis'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
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
        </main>
      </div>
    </>
  )
}
