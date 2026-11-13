import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const GREETINGS = [
  { text: "HELLO", font: "'Anton', sans-serif" },
  { text: "നമസ്കാരം", font: "'Anek Malayalam', sans-serif" },
  { text: "வணக்கம்", font: "'Anek Tamil', sans-serif" },
  { text: "नमस्ते", font: "'Teko', sans-serif" },
  { text: "ನಮಸ್ಕಾರ", font: "'Anek Kannada', sans-serif" },
]

function getGraphemes(str) {
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter('und', { granularity: 'grapheme' })
    return Array.from(segmenter.segment(str), (s) => s.segment)
  }
  return str.split('')
}

export default function Preloader({ onFinish }) {
  const containerRef = useRef(null)
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial State: Park full-screen lime bars below, hide greeting rows
      gsap.set(".lime-bar", { yPercent: 100 })
      gsap.set(".greeting-row", { display: "none", opacity: 0 })
      gsap.set(".char-text", { opacity: 0 })
      gsap.set(".char-block", { yPercent: 101 })

      const masterTl = gsap.timeline({
        onComplete: () => {
          if (onFinish) onFinish()
        }
      })

      // 2. Realistic Decoupled Percentage Counter
      const counterObj = { val: 0 }
      const counterTl = gsap.timeline({
        onUpdate: () => {
          setPercent(Math.min(100, Math.floor(counterObj.val)))
        }
      })

      counterTl
        .to(counterObj, { val: 14, duration: 0.35, ease: "power2.out" })
        .to(counterObj, { val: 29, duration: 0.3, ease: "power1.in" })
        .to({}, { duration: 0.75 }) // Stall on 29%
        .to(counterObj, { val: 46, duration: 0.35, ease: "power2.out" })
        .to(counterObj, { val: 51, duration: 0.25, ease: "linear" })
        .to({}, { duration: 0.7 })  // Stall on 51%
        .to(counterObj, { val: 74, duration: 0.4, ease: "power3.out" })
        .to({}, { duration: 0.6 })  // Stall on 74%
        .to(counterObj, { val: 88, duration: 0.35, ease: "power1.out" })
        .to(counterObj, { val: 96, duration: 0.35, ease: "power2.out" })
        .to({}, { duration: 0.3 })  // Stall on 96%
        .to(counterObj, { val: 100, duration: 0.25, ease: "power2.inOut" })

      masterTl.add(counterTl, 0)

      // 3. Word Sequence with Double Animation (Neon Lime block comes and goes to reveal / vanish)
      const wordsTl = gsap.timeline()

      GREETINGS.forEach((_, idx) => {
        const rowSelector = `.greeting-row-${idx}`
        const charsSelector = `${rowSelector} .char-text`
        const blocksSelector = `${rowSelector} .char-block`

        // Display current row
        wordsTl.set(rowSelector, { display: "flex", opacity: 1 })

        // ENTRANCE: Lime block surges UP (101% -> 0%), text turns ON, Lime block continues UP (0% -> -101%)
        wordsTl.fromTo(blocksSelector, 
          { yPercent: 101 },
          {
            yPercent: 0,
            duration: 0.28,
            ease: "power3.inOut",
            stagger: 0.03
          }
        )

        // Make text visible behind block as block covers it
        wordsTl.set(charsSelector, { opacity: 1 }, "-=0.14")

        // Block glides out the top, revealing the letter!
        wordsTl.to(blocksSelector, {
          yPercent: -101,
          duration: 0.28,
          ease: "power3.inOut",
          stagger: 0.03
        }, "-=0.14")

        // Poised reading pause
        wordsTl.to({}, { duration: 0.28 })

        // VANISH: Lime block surges UP again (101% -> 0%), text turns OFF, Lime block continues UP (0% -> -101%)
        wordsTl.fromTo(blocksSelector,
          { yPercent: 101 },
          {
            yPercent: 0,
            duration: 0.26,
            ease: "power3.inOut",
            stagger: 0.025
          }
        )

        // Hide text behind block as block covers it
        wordsTl.set(charsSelector, { opacity: 0 }, "-=0.12")

        // Block glides out the top, wiping the letter completely!
        wordsTl.to(blocksSelector, {
          yPercent: -101,
          duration: 0.26,
          ease: "power3.inOut",
          stagger: 0.025
        }, "-=0.12")

        // Hide row after letters have vanished
        wordsTl.set(rowSelector, { display: "none", opacity: 0 })
      })

      masterTl.add(wordsTl, 0)

      // 4. Macro Transition: Screen-wide Lime Bars Fill and Unfold to Hero
      masterTl.to(".counter-wrapper", {
        opacity: 0,
        duration: 0.15,
        ease: "power2.in"
      })

      // Macro Phase 1: 5 Neon Lime bars surge up from bottom, filling the screen with Lime Green
      masterTl.to(".lime-bar", {
        yPercent: 0,
        duration: 0.65,
        ease: "power4.out",
        stagger: 0.08
      })

      // Instantly remove dark preloader backdrop behind the filled lime screen
      masterTl.set(".preloader-backdrop", { display: "none" })

      // Macro Phase 2: 5 Neon Lime bars glide up out the top, smoothly unveiling the Hero section
      masterTl.to(".lime-bar", {
        yPercent: -100,
        duration: 0.75,
        ease: "power4.inOut",
        stagger: 0.08
      }, "+=0.08")

    }, containerRef)

    return () => ctx.revert()
  }, [onFinish])

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-50 pointer-events-auto flex items-center justify-center overflow-hidden text-[#d4ff00] select-none"
    >
      {/* 100% Solid Seamless Background Layer - Completely plain, ZERO lines */}
      <div className="preloader-backdrop absolute inset-0 bg-[#121316] z-0 pointer-events-none" />

      {/* 5 Macro Neon Lime Bars: Surge up to fill screen, then unfold to Hero */}
      <div className="absolute inset-0 flex pointer-events-none z-30 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className="lime-bar flex-1 h-full bg-[#d4ff00] -mr-[1px] will-change-transform"
          />
        ))}
      </div>

      {/* Pre-rendered Greeting Rows with Micro Lime Block Reveal & Vanish */}
      <div className="relative z-20 w-full flex items-center justify-center px-4 min-h-[140px]">
        {GREETINGS.map((greeting, gIdx) => {
          const chars = getGraphemes(greeting.text)
          return (
            <div
              key={gIdx}
              className={`greeting-row greeting-row-${gIdx} absolute inset-0 flex flex-wrap justify-center items-center text-center`}
              style={{ fontFamily: greeting.font }}
            >
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-normal text-[#d4ff00] flex flex-wrap justify-center items-center">
                {chars.map((char, cIdx) => (
                  <span 
                    key={cIdx} 
                    className="relative inline-block overflow-hidden py-1 px-0.5"
                  >
                    {/* The Character */}
                    <span className="char-text inline-block will-change-transform">
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                    {/* Neon Lime Block Wipe Layer: Color comes and goes */}
                    <span 
                      className="char-block absolute inset-0 bg-[#d4ff00] pointer-events-none will-change-transform"
                    />
                  </span>
                ))}
              </h1>
            </div>
          )
        })}
      </div>

      {/* Bottom Corner Monospace Percentage Indicator */}
      <div className="counter-wrapper absolute bottom-6 sm:bottom-10 right-6 sm:right-12 z-20 pointer-events-none text-right pb-[env(safe-area-inset-bottom)] pr-[env(safe-area-inset-right)]">
        <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#f4f4f5]/40 block mb-0.5">
          LOADING
        </span>
        <div 
          className="font-mono text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-[#f4f4f5] leading-none"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          <span className="tabular-nums">{percent.toString().padStart(2, '0')}</span>
          <span className="text-xl sm:text-3xl text-[#d4ff00] ml-1">%</span>
        </div>
      </div>
    </div>
  )
}
