import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: '03+', label: 'YEARS DEV EXPERIENCE', desc: 'Crafting production web applications' },
  { value: '20+', label: 'PROJECTS SHIPPED', desc: 'From full-stack SaaS to creative sites' },
  { value: '60FPS', label: 'FLUID MOTION', desc: 'Kinetic typography & WebGL shaders' },
  { value: '100%', label: 'CODE QUALITY', desc: 'Modular, type-safe, scale-ready logic' },
];

const DISCIPLINES = [
  {
    title: 'FRONTEND ARCHITECTURE',
    tech: 'React • Next.js • TypeScript • Tailwind CSS • WebGL',
    desc: 'Pixel-perfect, responsive UI engineering with smooth Lenis physics and GSAP choreographies.',
  },
  {
    title: 'BACKEND & INFRASTRUCTURE',
    tech: 'Node.js • Python • PostgreSQL • Redis • Docker',
    desc: 'High-throughput APIs, relational schema design, caching strategies, and secure deployments.',
  },
];

export default function About() {
  const containerRef = useRef(null);
  const pinRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial State:
      // "ABOUT ME" starts centered vertically in the viewport
      // Rotated 90deg (or -90deg) fitting the screen height
      gsap.set(titleRef.current, {
        rotation: 90,
        transformOrigin: 'center center',
        yPercent: 0,
        xPercent: 0,
        scale: 1,
      });

      // Content starts invisible and pushed down
      gsap.set(contentRef.current, {
        opacity: 0,
        y: 60,
      });

      // Park signature block reveal elements
      gsap.set('.about-reveal-block', { xPercent: -101 });
      gsap.set('.about-reveal-text', { opacity: 0 });

      // 2. Master Scrub Timeline:
      // - Phase A (0% -> 50% scroll):
      //   "ABOUT ME" title twists from vertical (90deg) to horizontal (0deg),
      //   gliding to the top of the container and scaling to fit the header width.
      // - Phase B (50% -> 100% scroll):
      //   Content underneath unveils with smooth opacity, lift, and signature runner wipe!
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=180%',
          pin: pinRef.current,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // PHASE A: Rotate vertical text to horizontal and dock at the top
      tl.to(titleRef.current, {
        rotation: 0,
        yPercent: -120, // moves from center up to top header position
        duration: 0.5,
        ease: 'power3.inOut',
      });

      // PHASE B: Content smoothly lifts up and unveils underneath
      tl.to(
        contentRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
        },
        '-=0.15'
      )
      // Signature runner block reveal for About headline
      .fromTo(
        '.about-reveal-block',
        { xPercent: -101 },
        {
          xPercent: 0,
          duration: 0.35,
          ease: 'power3.inOut',
        },
        '-=0.3'
      )
      .set('.about-reveal-text', { opacity: 1 }, '-=0.1')
      .to(
        '.about-reveal-block',
        {
          xPercent: 101,
          duration: 0.35,
          ease: 'power3.inOut',
        },
        '-=0.08'
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full bg-[#121316] text-[#f4f4f5] z-30"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinRef}
        className="w-full h-screen relative overflow-hidden flex flex-col justify-center items-center px-4 sm:px-8 md:px-12 py-6 select-none"
      >
        {/* Subtle Top Metadata Track */}
        <div className="absolute top-4 sm:top-6 left-4 sm:left-8 md:left-12 right-4 sm:right-8 md:right-12 flex items-center justify-between z-20 pointer-events-none text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#d4ff00]/60">
          <span>[ 01 // OVERVIEW ]</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4ff00] animate-pulse" />
            LIVE PROFILE
          </span>
        </div>

        {/* 
          TRANSFORMING TITLE: "ABOUT ME"
          Starts vertical in center of screen -> Rotates to horizontal at top of screen 
        */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <h2
            ref={titleRef}
            className="text-[clamp(3.5rem,14vw,8.5rem)] font-black uppercase tracking-tight text-[#d4ff00] leading-none whitespace-nowrap will-change-transform drop-shadow-[0_4px_24px_rgba(212,255,0,0.12)]"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            ABOUT ME
          </h2>
        </div>

        {/* 
          UNVEILED CONTENT UNDERNEATH
          Appears once "ABOUT ME" docks horizontally at the top 
        */}
        <div
          ref={contentRef}
          className="relative z-20 w-full max-w-6xl mx-auto flex flex-col justify-center gap-6 sm:gap-8 mt-16 sm:mt-24 pointer-events-auto"
        >
          {/* Top Row: Headline with Signature Block Runner Wipe */}
          <div className="w-full flex flex-col items-start gap-2">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#d4ff00] font-bold">
              PHILOSOPHY & VISION
            </span>
            <div className="relative inline-block overflow-hidden max-w-3xl">
              <h3 className="about-reveal-text text-xl sm:text-2xl md:text-3xl font-black uppercase text-[#f4f4f5] tracking-tight leading-snug">
                BRIDGING CREATIVE DESIGN & HIGH-PERFORMANCE ARCHITECTURE
              </h3>
              <span className="about-reveal-block absolute inset-0 bg-[#d4ff00] z-20 pointer-events-none will-change-transform" />
            </div>
            <p className="text-sm sm:text-base text-[#f4f4f5]/70 max-w-2xl leading-relaxed mt-1 font-mono">
              I craft digital experiences where technical rigor meets artistic motion. Every line of code is optimized for zero latency, tactile interactivity, and rock-solid scalability.
            </p>
          </div>

          {/* Middle Row: Bento Disciplines & Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
            {STATS.map((stat, idx) => (
              <div
                key={idx}
                className="bg-[#181a1f] border border-white/5 hover:border-[#d4ff00]/40 p-3 sm:p-4 rounded-sm flex flex-col justify-between transition-colors duration-300 group"
              >
                <div className="flex items-baseline justify-between mb-2">
                  <span
                    className="text-3xl sm:text-4xl font-black text-[#d4ff00] font-anton tracking-tight group-hover:scale-105 transition-transform"
                    style={{ fontFamily: "'Anton', sans-serif" }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">
                    #{String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-bold font-mono tracking-wider text-white uppercase mb-0.5">
                    {stat.label}
                  </h4>
                  <p className="text-[11px] text-white/50 leading-tight">
                    {stat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Row: Disciplines Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full">
            {DISCIPLINES.map((disc, idx) => (
              <div
                key={idx}
                className="bg-[#181a1f] border border-white/5 p-4 rounded-sm flex flex-col justify-between hover:border-[#d4ff00]/30 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-1.5 h-1.5 bg-[#d4ff00]" />
                    <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#d4ff00] font-mono">
                      {disc.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[#f4f4f5]/80 leading-relaxed mb-2 font-mono">
                    {disc.desc}
                  </p>
                </div>
                <div className="text-[10px] font-mono tracking-widest text-[#d4ff00]/60 uppercase pt-2 border-t border-white/5">
                  {disc.tech}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Scroll Indicator Pill */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">
          <span>SCROLL TO EXPLORE</span>
          <span className="w-1 h-3 rounded-full border border-white/30 inline-flex justify-center p-0.5">
            <span className="w-0.5 h-1 bg-[#d4ff00] rounded-full animate-bounce" />
          </span>
        </div>
      </div>
    </section>
  );
}
