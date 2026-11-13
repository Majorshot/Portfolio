import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Waves from './Waves';

export default function Hero({ isLoaded = true }) {
  const bannerRef = useRef(null);

  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      // 1. Initial State: All text and all blocks are strictly hidden before animation starts
      gsap.set('.hero-reveal-text', { visibility: 'hidden', opacity: 0 });
      gsap.set('.hero-reveal-block', { visibility: 'hidden', opacity: 0, xPercent: -101 });

      // Small pause after curtain unfolds before the reveal sequence begins
      const tl = gsap.timeline({ delay: 0.2 });

      const rows = [
        { text: '.hero-tag-text', block: '.hero-tag-block', dur: 0.32 },
        { text: '.hero-midhun-text', block: '.hero-midhun-block', dur: 0.36 },
        { text: '.hero-mohan-text', block: '.hero-mohan-block', dur: 0.36 },
        { text: '.hero-quote-text', block: '.hero-quote-block', dur: 0.32 },
      ];

      rows.forEach((row, i) => {
        // Step A: Only make this row's block visible at the exact moment its animation starts (parked at -101%)
        tl.set(row.block, { visibility: 'visible', opacity: 1, xPercent: -101 }, i === 0 ? '+=0.05' : '-=0.14');

        // Step B: Block sweeps in from left (-101% -> 0%) covering the text area
        tl.to(row.block, {
          xPercent: 0,
          duration: row.dur,
          ease: 'power3.inOut',
        });

        // Step C: AT EXACT 0% (fully covered): text becomes visible underneath the block (never seen before wipe!)
        tl.set(row.text, { visibility: 'visible', opacity: 1 });

        // Step D: Block continues out to the right (0% -> 101%) unveiling the text cleanly
        tl.to(row.block, {
          xPercent: 101,
          duration: row.dur,
          ease: 'power3.inOut',
        });

        // Step E: Instantly hide this block so it never lingers or flashes
        tl.set(row.block, { visibility: 'hidden', opacity: 0, display: 'none' });
      });
    }, bannerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <section className="relative min-h-[100dvh] flex flex-col pt-16 sm:pt-20 bg-[#121316] overflow-hidden">

      {/* TOP: Pure Interactive Waves canvas */}
      <div className="relative flex-1 w-full min-h-[46vh] sm:min-h-[50vh] overflow-hidden cursor-crosshair">
        <Waves
          lineColor="#d4ff00"
          accentColor="#d4ff00"
          spacing={10}
          amplitude={32}
          twist={1}
          speed={1}
          mouseRadius={175}
          mouseStrength={1}
          bounce={0.5}
          returnDuration={1.4}
          clickRipple
          intro
          lineStyle="solid"
          lineWidth={1}
          rotation={0}
          scale={1}
          variation={0}
          fade={0}
          opacity={1}
          mouseInteraction
          lightMode={false}
        />
      </div>

      {/* BOTTOM: Solid Lime name banner with massive 2-line adaptive typography */}
      <div
        ref={bannerRef}
        className="w-full bg-[#d4ff00] text-[#121316] px-3 py-4 sm:px-6 sm:py-6 md:px-10 md:py-8 z-20 overflow-hidden"
      >
        <div className="w-full flex flex-col">

          {/* 1. ABOVE NAME: Full Stack Developer with rightward double animation */}
          <div className="relative inline-block overflow-hidden self-start mb-2 sm:mb-3">
            <span 
              className="hero-reveal-text hero-tag-text relative z-10 text-[10px] sm:text-xs md:text-sm font-mono uppercase tracking-[0.25em] text-[#121316]/80 font-bold block"
              style={{ visibility: 'hidden', opacity: 0 }}
            >
              FULL STACK DEVELOPER
            </span>
            <span 
              className="hero-reveal-block hero-tag-block absolute inset-0 bg-[#121316] z-20 pointer-events-none will-change-transform" 
              style={{ visibility: 'hidden', opacity: 0, transform: 'translateX(-101%)' }}
            />
          </div>

          {/* 2 & 3. 2-LINE ADAPTIVE NAME — Sized big to reach right edge */}
          <h1
            className="text-[clamp(5.6rem,31.5vw,22vw)] font-black tracking-tight text-[#121316] uppercase leading-[0.92] select-none text-left flex flex-col gap-1 sm:gap-2"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            {/* LINE 1: MIDHUN */}
            <div className="relative inline-block overflow-hidden self-start">
              <span 
                className="hero-reveal-text hero-midhun-text relative z-10 block whitespace-nowrap"
                style={{ visibility: 'hidden', opacity: 0 }}
              >
                MIDHUN
              </span>
              <span 
                className="hero-reveal-block hero-midhun-block absolute inset-0 bg-[#121316] z-20 pointer-events-none will-change-transform" 
                style={{ visibility: 'hidden', opacity: 0, transform: 'translateX(-101%)' }}
              />
            </div>

            {/* LINE 2: MOHAN */}
            <div className="relative inline-block overflow-hidden self-start">
              <span 
                className="hero-reveal-text hero-mohan-text relative z-10 block whitespace-nowrap"
                style={{ visibility: 'hidden', opacity: 0 }}
              >
                MOHAN
              </span>
              <span 
                className="hero-reveal-block hero-mohan-block absolute inset-0 bg-[#121316] z-20 pointer-events-none will-change-transform" 
                style={{ visibility: 'hidden', opacity: 0, transform: 'translateX(-101%)' }}
              />
            </div>
          </h1>

          {/* 4. BELOW NAME: Software Engineer Quote with rightward double animation */}
          <div className="relative inline-block overflow-hidden self-start mt-3 sm:mt-5 max-w-2xl">
            <p 
              className="hero-reveal-text hero-quote-text relative z-10 text-[11px] sm:text-xs md:text-sm font-mono tracking-wide text-[#121316]/80 font-medium"
              style={{ visibility: 'hidden', opacity: 0 }}
            >
              “Transforming complex logic into seamless, high-performance digital experiences.”
            </p>
            <span 
              className="hero-reveal-block hero-quote-block absolute inset-0 bg-[#121316] z-20 pointer-events-none will-change-transform" 
              style={{ visibility: 'hidden', opacity: 0, transform: 'translateX(-101%)' }}
            />
          </div>

        </div>
      </div>

    </section>
  );
}
