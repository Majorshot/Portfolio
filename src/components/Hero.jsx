import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Waves from './Waves';

export default function Hero({ isLoaded = true }) {
  const bannerRef = useRef(null);

  // 1. Always ensure blocks are parked off-screen as soon as Hero mounts
  useEffect(() => {
    gsap.set('.hero-reveal-text', { opacity: 0 });
    gsap.set('.hero-reveal-block', { xPercent: -105, display: 'block' });
  }, []);

  // 2. Play the rightward double wipe animation once the preloader curtain has unfolded
  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      // Start with text hidden and runner blocks parked off-screen to the left (-105%)
      gsap.set('.hero-reveal-text', { opacity: 0 });
      gsap.set('.hero-reveal-block', { xPercent: -105, display: 'block' });

      const tl = gsap.timeline({ delay: 0.15 });

      const rows = [
        { text: '.hero-tag-text', block: '.hero-tag-block', dur: 0.32 },
        { text: '.hero-midhun-text', block: '.hero-midhun-block', dur: 0.38 },
        { text: '.hero-mohan-text', block: '.hero-mohan-block', dur: 0.38 },
        { text: '.hero-quote-text', block: '.hero-quote-block', dur: 0.34 },
      ];

      rows.forEach((row, i) => {
        // ENTRANCE: Runner block surges from left (-105% -> 0%)
        tl.fromTo(
          row.block,
          { xPercent: -105 },
          {
            xPercent: 0,
            duration: row.dur,
            ease: 'power3.inOut',
          },
          i === 0 ? '+=0.05' : '-=0.18'
        )
        // Reveal text behind block as block fully covers it
        .set(row.text, { opacity: 1 }, '-=0.1')
        // EXIT: Runner block slides out to the right (0% -> 105%) to unveil text
        .to(
          row.block,
          {
            xPercent: 105,
            duration: row.dur,
            ease: 'power3.inOut',
          },
          '-=0.08'
        );
      });

      // Clean removal: hide runner blocks once reveal finishes so they never flash
      tl.set('.hero-reveal-block', { display: 'none' });
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
            <span className="hero-reveal-text hero-tag-text opacity-0 relative z-10 text-[10px] sm:text-xs md:text-sm font-mono uppercase tracking-[0.25em] text-[#121316]/80 font-bold block">
              FULL STACK DEVELOPER
            </span>
            <span 
              className="hero-reveal-block hero-tag-block absolute inset-0 bg-[#121316] z-20 pointer-events-none will-change-transform" 
              style={{ transform: 'translateX(-105%)' }}
            />
          </div>

          {/* 2 & 3. 2-LINE ADAPTIVE NAME — Sized big to reach right edge */}
          <h1
            className="text-[clamp(5.6rem,31.5vw,22vw)] font-black tracking-tight text-[#121316] uppercase leading-[0.92] select-none text-left flex flex-col gap-1 sm:gap-2"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            {/* LINE 1: MIDHUN */}
            <div className="relative inline-block overflow-hidden self-start">
              <span className="hero-reveal-text hero-midhun-text opacity-0 relative z-10 block whitespace-nowrap">
                MIDHUN
              </span>
              <span 
                className="hero-reveal-block hero-midhun-block absolute inset-0 bg-[#121316] z-20 pointer-events-none will-change-transform" 
                style={{ transform: 'translateX(-105%)' }}
              />
            </div>

            {/* LINE 2: MOHAN */}
            <div className="relative inline-block overflow-hidden self-start">
              <span className="hero-reveal-text hero-mohan-text opacity-0 relative z-10 block whitespace-nowrap">
                MOHAN
              </span>
              <span 
                className="hero-reveal-block hero-mohan-block absolute inset-0 bg-[#121316] z-20 pointer-events-none will-change-transform" 
                style={{ transform: 'translateX(-105%)' }}
              />
            </div>
          </h1>

          {/* 4. BELOW NAME: Software Engineer Quote with rightward double animation */}
          <div className="relative inline-block overflow-hidden self-start mt-3 sm:mt-5 max-w-2xl">
            <p className="hero-reveal-text hero-quote-text opacity-0 relative z-10 text-[11px] sm:text-xs md:text-sm font-mono tracking-wide text-[#121316]/80 font-medium">
              “Transforming complex logic into seamless, high-performance digital experiences.”
            </p>
            <span 
              className="hero-reveal-block hero-quote-block absolute inset-0 bg-[#121316] z-20 pointer-events-none will-change-transform" 
              style={{ transform: 'translateX(-105%)' }}
            />
          </div>

        </div>
      </div>

    </section>
  );
}
