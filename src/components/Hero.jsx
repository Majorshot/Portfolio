import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Waves from './Waves';

const TOP_TINY_TRACK = [
  '/// CORE STACKS & ARCHITECTURE',
  'HIGH PERFORMANCE LOGIC',
  'SCALABLE FULL STACK ENGINE',
  '60FPS INTERACTIVE MOTION',
  'MODERN WEB RUNTIMES',
  'MODULAR SYSTEM DESIGN ///',
];

const MIDDLE_STACKS = [
  'REACT',
  'NEXT.JS',
  'TYPESCRIPT',
  'NODE.JS',
  'TAILWIND CSS',
  'GSAP',
  'POSTGRESQL',
  'PYTHON',
  'DOCKER',
  'THREE.JS',
  'GRAPHQL',
  'REDIS',
  'VITE',
];

const BOTTOM_TOOLS_TRACK = [
  '/// TOOLS & WORKFLOW: VS CODE',
  'GIT & GITHUB ACTIONS',
  'FIGMA UI/UX',
  'POSTMAN API',
  'LINUX & TERMINAL',
  'VERCEL DEPLOYMENTS',
  'WEBGL & SHADERS',
  'CI/CD AUTOMATION ///',
];

export default function Hero({ isLoaded = true }) {
  const bannerRef = useRef(null);

  useEffect(() => {
    // Park runner blocks and hide text immediately on mount, even while isLoaded is false
    gsap.set('.hero-reveal-text', { opacity: 0 });
    gsap.set('.hero-reveal-block', { xPercent: -101, opacity: 0, x: 0 });
    gsap.set('.hero-ribbon-banner', { opacity: 0, y: -8 });
    gsap.set('.hero-gemini-star', { opacity: 0, scale: 0.5 });

    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      // Park runner blocks off-screen to the left (-101%), hide texts
      gsap.set('.hero-reveal-text', { opacity: 0 });
      gsap.set('.hero-reveal-block', { xPercent: -101, opacity: 0, x: 0 });
      gsap.set('.hero-ribbon-banner', { opacity: 0, y: -8 });
      gsap.set('.hero-gemini-star', { opacity: 0, scale: 0.5 });

      // Clean delay after preloader curtain unfolds
      const tl = gsap.timeline({ delay: 0.15 });

      // 1. Ribbon banner glides in at the top
      tl.to('.hero-ribbon-banner', {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: 'power3.out',
      });

      const rows = [
        { text: '.hero-tag-text', block: '.hero-tag-block', dur: 0.32 },
        { text: '.hero-midhun-text', block: '.hero-midhun-block', dur: 0.38 },
        { text: '.hero-mohan-text', block: '.hero-mohan-block', dur: 0.38 },
        { text: '.hero-quote-text', block: '.hero-quote-block', dur: 0.34 },
      ];

      rows.forEach((row, i) => {
        // ENTRANCE: Runner block surges from left (-101% -> 0%)
        tl.fromTo(
          row.block,
          { xPercent: -101, opacity: 1, x: 0 },
          {
            xPercent: 0,
            duration: row.dur,
            ease: 'power3.inOut',
          },
          i === 0 ? '-=0.15' : '-=0.18'
        )
        // Reveal text behind block as block fully covers it
        .set(row.text, { opacity: 1 }, '-=0.1')
        // EXIT: Runner block slides out to the right (0% -> 101%) to unveil text
        .to(
          row.block,
          {
            xPercent: 101,
            duration: row.dur,
            ease: 'power3.inOut',
          },
          '-=0.08'
        )
        // Once exited, completely hide block so it never lingers or flashes
        .set(row.block, { opacity: 0 });

        // When MOHAN (row index 2) reveals, pop the Gemini star in with an elastic spring
        if (i === 2) {
          tl.to('.hero-gemini-star', {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'back.out(2)',
          }, '-=0.15');
        }
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
        {/* 3-PART MOVING RIBBON BANNER (STACKS & TOOLS) */}
        <div 
          className="hero-ribbon-banner -mx-3 sm:-mx-6 md:-mx-10 -mt-4 sm:-mt-6 md:-mt-8 mb-3 sm:mb-5 bg-[#121316] text-[#d4ff00] border-b-2 border-[#121316] overflow-hidden select-none group cursor-default shadow-sm"
          style={{ opacity: 0 }}
        >
          {/* Part 1: Top Very Tiny Track */}
          <div className="w-full overflow-hidden border-b border-[#d4ff00]/15 py-0.5 sm:py-1 bg-[#121316]">
            <div className="flex w-max">
              <div className="animate-marquee-forward flex items-center gap-6 sm:gap-8 text-[8px] sm:text-[9px] font-mono tracking-[0.25em] uppercase text-[#d4ff00]/70 font-semibold px-3">
                {TOP_TINY_TRACK.map((item, idx) => (
                  <span key={idx} className="whitespace-nowrap">{item}</span>
                ))}
              </div>
              <div className="animate-marquee-forward flex items-center gap-6 sm:gap-8 text-[8px] sm:text-[9px] font-mono tracking-[0.25em] uppercase text-[#d4ff00]/70 font-semibold px-3" aria-hidden="true">
                {TOP_TINY_TRACK.map((item, idx) => (
                  <span key={`dup-${idx}`} className="whitespace-nowrap">{item}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Part 2: Middle Big Words Track */}
          <div className="w-full overflow-hidden py-1 sm:py-2 bg-[#0e0f11]">
            <div className="flex w-max">
              <div className="animate-marquee-fast flex items-center gap-5 sm:gap-8 text-sm sm:text-lg md:text-xl font-black uppercase tracking-wider text-[#d4ff00] px-3 font-anton">
                {MIDDLE_STACKS.map((item, idx) => (
                  <span key={idx} className="flex items-center gap-5 sm:gap-8 whitespace-nowrap">
                    <span>{item}</span>
                    <span className="text-[10px] sm:text-xs text-[#d4ff00]/40">✦</span>
                  </span>
                ))}
              </div>
              <div className="animate-marquee-fast flex items-center gap-5 sm:gap-8 text-sm sm:text-lg md:text-xl font-black uppercase tracking-wider text-[#d4ff00] px-3 font-anton" aria-hidden="true">
                {MIDDLE_STACKS.map((item, idx) => (
                  <span key={`dup-${idx}`} className="flex items-center gap-5 sm:gap-8 whitespace-nowrap">
                    <span>{item}</span>
                    <span className="text-[10px] sm:text-xs text-[#d4ff00]/40">✦</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Part 3: Bottom Very Tiny Track */}
          <div className="w-full overflow-hidden border-t border-[#d4ff00]/15 py-0.5 sm:py-1 bg-[#121316]">
            <div className="flex w-max">
              <div className="animate-marquee-backward flex items-center gap-6 sm:gap-8 text-[8px] sm:text-[9px] font-mono tracking-[0.25em] uppercase text-[#d4ff00]/70 font-semibold px-3">
                {BOTTOM_TOOLS_TRACK.map((item, idx) => (
                  <span key={idx} className="whitespace-nowrap">{item}</span>
                ))}
              </div>
              <div className="animate-marquee-backward flex items-center gap-6 sm:gap-8 text-[8px] sm:text-[9px] font-mono tracking-[0.25em] uppercase text-[#d4ff00]/70 font-semibold px-3" aria-hidden="true">
                {BOTTOM_TOOLS_TRACK.map((item, idx) => (
                  <span key={`dup-${idx}`} className="whitespace-nowrap">{item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col">

          {/* 1. ABOVE NAME: Full Stack Developer with rightward double animation */}
          <div className="relative inline-block overflow-hidden self-start mb-2 sm:mb-3">
            <span
              className="hero-reveal-text hero-tag-text relative z-10 text-[10px] sm:text-xs md:text-sm font-mono uppercase tracking-[0.25em] text-[#121316]/80 font-bold block"
              style={{ opacity: 0 }}
            >
              FULL STACK DEVELOPER
            </span>
            <span
              className="hero-reveal-block hero-tag-block absolute inset-0 bg-[#121316] z-20 pointer-events-none will-change-transform"
              style={{ transform: 'translateX(-101%)', opacity: 0 }}
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
                style={{ opacity: 0 }}
              >
                MIDHUN
              </span>
              <span
                className="hero-reveal-block hero-midhun-block absolute inset-0 bg-[#121316] z-20 pointer-events-none will-change-transform"
                style={{ transform: 'translateX(-101%)', opacity: 0 }}
              />
            </div>

            {/* LINE 2: MOHAN + ROTATING GEMINI STAR IN VACANT SPACE */}
            <div className="w-full flex items-center justify-between flex-nowrap">
              <div className="relative inline-block overflow-hidden self-start shrink-0">
                <span
                  className="hero-reveal-text hero-mohan-text relative z-10 block whitespace-nowrap"
                  style={{ opacity: 0 }}
                >
                  MOHAN
                </span>
                <span
                  className="hero-reveal-block hero-mohan-block absolute inset-0 bg-[#121316] z-20 pointer-events-none will-change-transform"
                  style={{ transform: 'translateX(-101%)', opacity: 0 }}
                />
              </div>

              {/* Centered Rotating Gemini Star in remaining space */}
              <div className="flex-1 flex items-center justify-center min-w-0">
                <div 
                  className="hero-gemini-star flex items-center justify-center shrink-0 select-none group cursor-pointer"
                  style={{ opacity: 0 }}
                  title="Google Gemini AI"
                >
                  <div className="animate-gemini-float">
                    <svg
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-12 h-12 sm:w-18 sm:h-18 md:w-22 md:h-22 lg:w-26 lg:h-26 text-[#121316] animate-gemini-spin will-change-transform drop-shadow-[0_2px_10px_rgba(18,19,22,0.2)] transition-transform duration-300 group-hover:scale-110"
                    >
                      {/* Outer 4-pointed Gemini star in carbon black */}
                      <path
                        d="M50 0C50 27.614 27.614 50 0 50C27.614 50 50 72.386 50 100C50 72.386 72.386 50 100 50C72.386 50 50 27.614 50 0Z"
                        fill="currentColor"
                      />
                      {/* Inner 4-pointed star in lime yellow */}
                      <path
                        d="M50 30C50 41.046 41.046 50 30 50C41.046 50 50 58.954 50 70C50 58.954 58.954 50 70 50C58.954 50 50 41.046 50 30Z"
                        fill="#d4ff00"
                      />
                      {/* Center floating pupil / iris dot */}
                      <circle cx="50" cy="50" r="4" fill="currentColor" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </h1>

          {/* 4. BELOW NAME: Software Engineer Quote with rightward double animation */}
          <div className="relative inline-block overflow-hidden self-start mt-3 sm:mt-5 max-w-2xl">
            <p
              className="hero-reveal-text hero-quote-text relative z-10 text-[11px] sm:text-xs md:text-sm font-mono tracking-wide text-[#121316]/80 font-medium"
              style={{ opacity: 0 }}
            >
              “Transforming complex logic into seamless, high-performance digital experiences.”
            </p>
            <span
              className="hero-reveal-block hero-quote-block absolute inset-0 bg-[#121316] z-20 pointer-events-none will-change-transform"
              style={{ transform: 'translateX(-101%)', opacity: 0 }}
            />
          </div>

        </div>
      </div>

    </section>
  );
}
