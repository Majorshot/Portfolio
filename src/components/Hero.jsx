import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Waves from './Waves';

export default function Hero({ isLoaded = true }) {
  const bannerRef = useRef(null);

  const tagTextRef = useRef(null);
  const tagBlockRef = useRef(null);

  const midhunTextRef = useRef(null);
  const midhunBlockRef = useRef(null);

  const mohanTextRef = useRef(null);
  const mohanBlockRef = useRef(null);

  const quoteTextRef = useRef(null);
  const quoteBlockRef = useRef(null);

  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      // 1. Initial State: All text hidden (opacity 0), all blocks parked off-screen to the left (-101%)
      gsap.set('.hero-wipe-text', { opacity: 0 });
      gsap.set('.hero-wipe-block', { xPercent: -101, display: 'block' });

      // Clean delay after preloader curtain finishes unfolding
      const tl = gsap.timeline({ delay: 0.15 });

      const rows = [
        { text: tagTextRef.current, block: tagBlockRef.current, dur: 0.32 },
        { text: midhunTextRef.current, block: midhunBlockRef.current, dur: 0.36 },
        { text: mohanTextRef.current, block: mohanBlockRef.current, dur: 0.36 },
        { text: quoteTextRef.current, block: quoteBlockRef.current, dur: 0.32 },
      ];

      rows.forEach((row, i) => {
        // Step 1: Block comes from left to right until it completes the full width of the word (0%)
        tl.fromTo(
          row.block,
          { xPercent: -101 },
          {
            xPercent: 0,
            duration: row.dur,
            ease: 'power3.inOut',
          },
          i === 0 ? '+=0.05' : '-=0.14' // smooth cascading wave from top to bottom
        )
        // Step 2: The exact moment block completes full width, the word appears behind the block
        .set(row.text, { opacity: 1 })
        // Step 3: Block removes from left to right (sliding out to 101%), unveiling the word
        .to(row.block, {
          xPercent: 101,
          duration: row.dur,
          ease: 'power3.inOut',
        })
        // Step 4: Hide block completely so it never lingers
        .set(row.block, { display: 'none' });
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

          {/* 1. ABOVE NAME: Full Stack Developer */}
          <div className="relative inline-block overflow-hidden self-start mb-2 sm:mb-3">
            <span
              ref={tagTextRef}
              className="hero-wipe-text text-[10px] sm:text-xs md:text-sm font-mono uppercase tracking-[0.25em] text-[#121316]/80 font-bold block"
              style={{ opacity: 0 }}
            >
              FULL STACK DEVELOPER
            </span>
            <span
              ref={tagBlockRef}
              className="hero-wipe-block absolute inset-0 bg-[#121316] pointer-events-none will-change-transform"
              style={{ transform: 'translateX(-101%)' }}
            />
          </div>

          {/* 2 & 3. 2-LINE ADAPTIVE NAME — Each entire word as a single unit */}
          <h1
            className="text-[clamp(5.6rem,31.5vw,22vw)] font-black tracking-tight text-[#121316] uppercase leading-[0.92] select-none text-left flex flex-col gap-1 sm:gap-2"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            {/* LINE 1: MIDHUN */}
            <div className="relative inline-block overflow-hidden self-start">
              <span
                ref={midhunTextRef}
                className="hero-wipe-text block whitespace-nowrap"
                style={{ opacity: 0 }}
              >
                MIDHUN
              </span>
              <span
                ref={midhunBlockRef}
                className="hero-wipe-block absolute inset-0 bg-[#121316] pointer-events-none will-change-transform"
                style={{ transform: 'translateX(-101%)' }}
              />
            </div>

            {/* LINE 2: MOHAN */}
            <div className="relative inline-block overflow-hidden self-start">
              <span
                ref={mohanTextRef}
                className="hero-wipe-text block whitespace-nowrap"
                style={{ opacity: 0 }}
              >
                MOHAN
              </span>
              <span
                ref={mohanBlockRef}
                className="hero-wipe-block absolute inset-0 bg-[#121316] pointer-events-none will-change-transform"
                style={{ transform: 'translateX(-101%)' }}
              />
            </div>
          </h1>

          {/* 4. BELOW NAME: Software Engineer Quote */}
          <div className="relative inline-block overflow-hidden self-start mt-3 sm:mt-5 max-w-2xl">
            <p
              ref={quoteTextRef}
              className="hero-wipe-text text-[11px] sm:text-xs md:text-sm font-mono tracking-wide text-[#121316]/80 font-medium"
              style={{ opacity: 0 }}
            >
              “Transforming complex logic into seamless, high-performance digital experiences.”
            </p>
            <span
              ref={quoteBlockRef}
              className="hero-wipe-block absolute inset-0 bg-[#121316] pointer-events-none will-change-transform"
              style={{ transform: 'translateX(-101%)' }}
            />
          </div>

        </div>
      </div>

    </section>
  );
}
