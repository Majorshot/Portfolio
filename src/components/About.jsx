import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ABOUT_LETTERS = [
  { char: 'A', group: 'about' },
  { char: 'B', group: 'about' },
  { char: 'O', group: 'about' },
  { char: 'U', group: 'about' },
  { char: 'T', group: 'about' },
  { char: 'M', group: 'me' },
  { char: 'E', group: 'me' },
];

const STATS = [
  { value: '3+', label: 'YEARS EXPERIENCE', desc: 'Full Stack Software Engineering' },
  { value: '10+', label: 'PROJECTS BUILT', desc: 'Production web apps & client systems' },
  { value: '4+', label: 'CLIENTS SERVED', desc: 'Custom freelance & contract delivery' },
  { value: 'MERN', label: 'CORE STACK FOCUS', desc: 'MongoDB • Express • React • Node.js' },
];

const DISCIPLINES = [
  {
    title: 'FRONTEND & UI ENGINEERING',
    tech: 'React.js • Tailwind CSS • HTML5 • CSS3 • JavaScript (ES6+) • Vite',
    desc: 'Crafting responsive, high-performance web applications with modular components, fluid layouts, and polished user experiences.',
  },
  {
    title: 'BACKEND & CLOUD INTEGRATIONS',
    tech: 'Node.js • Express.js • MongoDB • Payment Gateways • Cloudinary • REST APIs',
    desc: 'Engineering scalable server architectures, secure database schemas, seamless payment gateways (Stripe/Razorpay), and automated media delivery with Cloudinary.',
  },
];

export default function About() {
  const containerRef = useRef(null);
  const pinRef = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const lettersRef = useRef([]);

  useEffect(() => {
    const pinEl = pinRef.current;
    if (!pinEl) return;

    const ctx = gsap.context(() => {
      let hasPlayedRunner = false;

      // Automatic headline runner block animation (plays automatically at natural speed once letters settle)
      const playHeadlineRunner = () => {
        if (hasPlayedRunner) return;
        hasPlayedRunner = true;

        const tl = gsap.timeline();
        tl.fromTo(
          '.about-reveal-block',
          { xPercent: -101, opacity: 1 },
          {
            xPercent: 0,
            duration: 0.38,
            ease: 'power3.inOut',
          }
        )
        .set('.about-reveal-text', { opacity: 1 }, '-=0.1')
        .to(
          '.about-reveal-block',
          {
            xPercent: 101,
            duration: 0.38,
            ease: 'power3.inOut',
          },
          '-=0.08'
        )
        .set('.about-reveal-block', { opacity: 0 });
      };

      // Function to calculate exact coordinates from vertical center stack to horizontal header
      const calculateDeltas = () => {
        const pinRect = pinEl.getBoundingClientRect();
        const centerX = pinRect.width / 2;
        const centerY = pinRect.height / 2;

        const totalLetters = ABOUT_LETTERS.length;
        // Spacing for vertical stack: fits ~60% of viewport height
        const stepY = Math.min(68, Math.max(38, (pinRect.height * 0.58) / (totalLetters + 1)));
        const wordGap = stepY * 0.6;
        const totalHeight = (totalLetters - 1) * stepY + wordGap;
        const startY0 = centerY - totalHeight / 2;

        return lettersRef.current.map((el, i) => {
          if (!el) return { dx: 0, dy: 0 };
          const rect = el.getBoundingClientRect();
          // Horizontal resting position relative to pinned container
          const currentCenterX = rect.left - pinRect.left + rect.width / 2;
          const currentCenterY = rect.top - pinRect.top + rect.height / 2;

          // Target vertical stack position:
          // X is screen center, Y is stacked top-to-bottom
          const isSecondWord = i >= 5; // 'M' and 'E'
          const targetY = startY0 + i * stepY + (isSecondWord ? wordGap : 0);
          const targetX = centerX;

          return {
            dx: targetX - currentCenterX,
            dy: targetY - currentCenterY,
          };
        });
      };

      const deltas = calculateDeltas();

      // 1. Initial State:
      // Position every letter at its vertical stack coordinates in the center of the screen
      lettersRef.current.forEach((el, i) => {
        if (!el || !deltas[i]) return;
        gsap.set(el, {
          x: deltas[i].dx,
          y: deltas[i].dy,
          scale: 1.15,
        });
      });

      // Hide content initially
      gsap.set(contentRef.current, {
        opacity: 0,
        y: 40,
      });
      gsap.set('.about-reveal-block', { xPercent: -101, opacity: 0 });
      gsap.set('.about-reveal-text', { opacity: 0 });

      // 2. Master Scrub Timeline for Letter Unspooling & Content Fade-in:
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=130%',
          pin: pinRef.current,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Reset runner animation if user scrolls back up
            if (self.progress < 0.65) {
              hasPlayedRunner = false;
              gsap.set('.about-reveal-block', { xPercent: -101, opacity: 0 });
              gsap.set('.about-reveal-text', { opacity: 0 });
            }
          },
        },
      });

      // Letters unspool from vertical stack and settle horizontally into the top header
      lettersRef.current.forEach((el, i) => {
        if (!el) return;
        masterTl.to(
          el,
          {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.65,
            ease: 'power3.inOut',
          },
          i * 0.04
        );
      });

      // Once letters settle at top, show full content smoothly
      masterTl.to(
        contentRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: 'power3.out',
        },
        '-=0.15'
      );

      // Automatically play the runner block animation as soon as the letters settle
      masterTl.call(playHeadlineRunner, null, '+=0.05');

      // Recalculate positions on window resize
      ScrollTrigger.addEventListener('refreshInit', () => {
        const newDeltas = calculateDeltas();
        lettersRef.current.forEach((el, i) => {
          if (!el || !newDeltas[i]) return;
          if (masterTl.progress() === 0) {
            gsap.set(el, { x: newDeltas[i].dx, y: newDeltas[i].dy });
          }
        });
      });

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
        className="w-full min-h-screen relative flex flex-col justify-start items-center px-4 sm:px-8 md:px-12 pt-10 sm:pt-14 pb-12 select-none"
      >
        {/* Top Technical Metadata Track */}
        <div className="w-full max-w-6xl flex items-center justify-between z-30 text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#d4ff00]/60 mb-2 sm:mb-3">
          <span>[ 01 // KERALA, INDIA ]</span>
          <span className="flex items-center gap-2 text-[#d4ff00]">
            <span className="w-2 h-2 rounded-full bg-[#d4ff00] animate-pulse" />
            OPEN FOR FULL-TIME & FREELANCE
          </span>
        </div>

        {/* 
          HORIZONTAL DOCKED HEADER AT THE TOP:
          Letters start stacked vertically in screen center (all letters upright),
          then on scroll each letter migrates and settles horizontally into place!
        */}
        <div
          ref={headerRef}
          className="w-full max-w-6xl flex items-center justify-start z-30 py-1"
        >
          <h2
            className="text-[clamp(2.8rem,11.5vw,7.5rem)] font-black uppercase tracking-tight text-[#d4ff00] leading-none flex items-center flex-nowrap"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            {/* Word 1: ABOUT */}
            <span className="flex items-center flex-nowrap">
              {ABOUT_LETTERS.slice(0, 5).map((item, idx) => (
                <span
                  key={`letter-about-${idx}`}
                  ref={(el) => (lettersRef.current[idx] = el)}
                  className="inline-block will-change-transform drop-shadow-[0_4px_20px_rgba(212,255,0,0.15)]"
                >
                  {item.char}
                </span>
              ))}
            </span>

            {/* Space between ABOUT and ME */}
            <span className="inline-block w-3 sm:w-6 md:w-8" />

            {/* Word 2: ME */}
            <span className="flex items-center flex-nowrap">
              {ABOUT_LETTERS.slice(5).map((item, idx) => (
                <span
                  key={`letter-me-${idx}`}
                  ref={(el) => (lettersRef.current[5 + idx] = el)}
                  className="inline-block will-change-transform drop-shadow-[0_4px_20px_rgba(212,255,0,0.15)]"
                >
                  {item.char}
                </span>
              ))}
            </span>
          </h2>
        </div>

        {/* 
          FULL UNVEILED CONTENT UNDERNEATH:
          Shows fully once "ABOUT ME" settles at the top, without inner scroll containers
        */}
        <div
          ref={contentRef}
          className="relative z-20 w-full max-w-6xl mx-auto flex flex-col justify-start gap-4 sm:gap-6 mt-3 sm:mt-5"
        >
          {/* Headline with Automatic Signature Block Runner Wipe */}
          <div className="w-full flex flex-col items-start gap-1.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#d4ff00]" />
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#d4ff00] font-bold">
                SOFTWARE ENGINEER • FULL STACK MERN
              </span>
            </div>
            
            <div className="relative inline-block overflow-hidden max-w-3xl">
              <h3 className="about-reveal-text text-base sm:text-2xl md:text-3xl font-black uppercase text-[#f4f4f5] tracking-tight leading-snug">
                ARCHITECTING MODERN MERN WEB APPS WITH SEAMLESS USER EXPERIENCES
              </h3>
              <span className="about-reveal-block absolute inset-0 bg-[#d4ff00] z-20 pointer-events-none will-change-transform" />
            </div>

            <p className="text-xs sm:text-sm text-[#f4f4f5]/80 max-w-3xl leading-relaxed font-mono">
              Hi, I&apos;m Midhun Mohan — a Full Stack Software Engineer from Kerala with 3 years of hands-on experience building production web applications. I specialize in the MERN stack (MongoDB, Express.js, React, Node.js), engineering responsive interfaces with Tailwind CSS, secure payment gateway integrations, Cloudinary media pipelines, and high-performance REST APIs.
            </p>
          </div>

          {/* Real Bento Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 w-full">
            {STATS.map((stat, idx) => (
              <div
                key={idx}
                className="bg-[#181a1f] border border-white/5 hover:border-[#d4ff00]/40 p-3 sm:p-4 rounded-sm flex flex-col justify-between transition-colors duration-300 group"
              >
                <div className="flex items-baseline justify-between mb-1.5">
                  <span
                    className="text-2xl sm:text-4xl font-black text-[#d4ff00] font-anton tracking-tight group-hover:scale-105 transition-transform"
                    style={{ fontFamily: "'Anton', sans-serif" }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">
                    #{String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-xs font-bold font-mono tracking-wider text-white uppercase mb-0.5">
                    {stat.label}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-white/50 leading-tight">
                    {stat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Real Disciplines & Tech Arsenal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 w-full">
            {DISCIPLINES.map((disc, idx) => (
              <div
                key={idx}
                className="bg-[#181a1f] border border-white/5 p-3.5 sm:p-4 rounded-sm flex flex-col justify-between hover:border-[#d4ff00]/30 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-1.5 h-1.5 bg-[#d4ff00]" />
                    <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#d4ff00] font-mono">
                      {disc.title}
                    </h4>
                  </div>
                  <p className="text-[11px] sm:text-xs text-[#f4f4f5]/80 leading-relaxed mb-2 font-mono">
                    {disc.desc}
                  </p>
                </div>
                <div className="text-[9px] sm:text-[10px] font-mono tracking-widest text-[#d4ff00]/70 uppercase pt-2 border-t border-white/5">
                  {disc.tech}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
