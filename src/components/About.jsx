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
      let hasRevealedContent = false;

      // Automatically reveal bento grid with 4-directional kinetic lime runner block wipes
      const revealAboutContent = () => {
        if (hasRevealedContent) return;
        hasRevealedContent = true;

        const tl = gsap.timeline();

        // 1. Reveal content container
        tl.to(contentRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: 'power3.out',
        })

        // 2. BOX 1: Runner curtain wipes LEFT -> RIGHT
        .fromTo(
          '.bento-curtain-1',
          { xPercent: -101, opacity: 1 },
          { xPercent: 0, duration: 0.34, ease: 'power3.inOut' },
          '-=0.15'
        )
        .set('.bento-content-1', { opacity: 1 }, '-=0.08')
        .to(
          '.bento-curtain-1',
          { xPercent: 101, duration: 0.34, ease: 'power3.inOut' },
          '-=0.06'
        )
        .set('.bento-curtain-1', { opacity: 0 })

        // 3. BOX 2: Runner curtain wipes TOP -> BOTTOM
        .fromTo(
          '.bento-curtain-2',
          { yPercent: -101, opacity: 1 },
          { yPercent: 0, duration: 0.34, ease: 'power3.inOut' },
          '-=0.22'
        )
        .set('.bento-content-2', { opacity: 1 }, '-=0.08')
        .to(
          '.bento-curtain-2',
          { yPercent: 101, duration: 0.34, ease: 'power3.inOut' },
          '-=0.06'
        )
        .set('.bento-curtain-2', { opacity: 0 })

        // 4. BOX 3: Runner curtain wipes BOTTOM -> TOP
        .fromTo(
          '.bento-curtain-3',
          { yPercent: 101, opacity: 1 },
          { yPercent: 0, duration: 0.34, ease: 'power3.inOut' },
          '-=0.22'
        )
        .set('.bento-content-3', { opacity: 1 }, '-=0.08')
        .to(
          '.bento-curtain-3',
          { yPercent: -101, duration: 0.34, ease: 'power3.inOut' },
          '-=0.06'
        )
        .set('.bento-curtain-3', { opacity: 0 })

        // 5. BOX 4: Runner curtain wipes RIGHT -> LEFT
        .fromTo(
          '.bento-curtain-4',
          { xPercent: 101, opacity: 1 },
          { xPercent: 0, duration: 0.34, ease: 'power3.inOut' },
          '-=0.22'
        )
        .set('.bento-content-4', { opacity: 1 }, '-=0.08')
        .to(
          '.bento-curtain-4',
          { xPercent: -101, duration: 0.34, ease: 'power3.inOut' },
          '-=0.06'
        )
        .set('.bento-curtain-4', { opacity: 0 });
      };

      // Function to calculate exact coordinates from vertical center stack to horizontal header
      const calculateDeltas = () => {
        const pinRect = pinEl.getBoundingClientRect();
        const centerX = pinRect.width / 2;
        const centerY = pinRect.height / 2;

        const totalLetters = ABOUT_LETTERS.length;
        // Spacing for vertical stack: fits ~55% of viewport height
        const stepY = Math.min(65, Math.max(36, (pinRect.height * 0.55) / (totalLetters + 1)));
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

      // Hide content and park curtains initially
      gsap.set(contentRef.current, {
        opacity: 0,
        y: 20,
      });
      gsap.set(['.bento-content-1', '.bento-content-2', '.bento-content-3', '.bento-content-4'], { opacity: 0 });
      gsap.set('.bento-curtain-1', { xPercent: -101, opacity: 0 });
      gsap.set('.bento-curtain-2', { yPercent: -101, opacity: 0 });
      gsap.set('.bento-curtain-3', { yPercent: 101, opacity: 0 });
      gsap.set('.bento-curtain-4', { xPercent: 101, opacity: 0 });

      // 2. Master Scrub Timeline for Letter Unspooling:
      // Pinned for responsive scroll, unspools letters to top header
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=75%',
          pin: pinRef.current,
          scrub: 0.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // The EXACT moment "ABOUT ME" settles at the top, reveal all content automatically
            if (self.progress >= 0.55) {
              revealAboutContent();
            } else if (self.progress < 0.20) {
              // Reset if user scrolls back up into Hero
              hasRevealedContent = false;
              gsap.set(contentRef.current, { opacity: 0, y: 20 });
              gsap.set(['.bento-content-1', '.bento-content-2', '.bento-content-3', '.bento-content-4'], { opacity: 0 });
              gsap.set('.bento-curtain-1', { xPercent: -101, opacity: 0 });
              gsap.set('.bento-curtain-2', { yPercent: -101, opacity: 0 });
              gsap.set('.bento-curtain-3', { yPercent: 101, opacity: 0 });
              gsap.set('.bento-curtain-4', { xPercent: 101, opacity: 0 });
            }
          },
        },
      });

      // Letters unspool from vertical stack and settle horizontally into the top header
      // Letter 0 to Letter 6 complete unspooling by t = 0.56
      lettersRef.current.forEach((el, i) => {
        if (!el) return;
        masterTl.to(
          el,
          {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.44,
            ease: 'power2.out',
          },
          i * 0.02
        );
      });

      // Hold window (t = 0.56 to 1.0) so the revealed content can be viewed comfortably while pinned
      masterTl.to({}, { duration: 0.44 });

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
        className="w-full min-h-screen relative flex flex-col justify-start items-center px-4 sm:px-8 md:px-12 pt-20 sm:pt-24 pb-12 select-none"
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
            className="text-[clamp(2.4rem,10.5vw,7rem)] font-black uppercase tracking-tight text-[#d4ff00] leading-none flex items-center flex-nowrap"
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
          AUTHENTIC BENTO BOX GRID:
          Minimalist, asymmetric, high-impact cards with 4-directional kinetic curtain wipes
        */}
        <div
          ref={contentRef}
          className="relative z-20 w-full max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3.5 mt-2.5 sm:mt-4"
        >
          {/* Tile 1: Role & Core Identity (Wide: 2 cols on mobile, 2 cols on desktop) */}
          {/* Direction: Left to Right */}
          <div className="col-span-2 md:col-span-2 relative overflow-hidden bg-[#181a20]/90 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:border-[#d4ff00]/40 transition-colors group">
            {/* Curtain wipe Left -> Right */}
            <div
              className="bento-curtain-1 absolute inset-0 bg-[#d4ff00] z-20 pointer-events-none will-change-transform"
              style={{ transform: 'translateX(-101%)', opacity: 0 }}
            />

            <div className="bento-content-1 will-change-transform flex flex-col justify-between h-full" style={{ opacity: 0 }}>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-[#d4ff00] uppercase flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#d4ff00] animate-pulse" />
                    FULL STACK MERN DEVELOPER
                  </span>
                  <span className="text-[10px] font-mono text-white/40 uppercase">KERALA, INDIA</span>
                </div>
                <h3
                  className="text-lg sm:text-2xl font-black uppercase tracking-tight text-white leading-tight mb-1.5"
                  style={{ fontFamily: "'Anton', sans-serif" }}
                >
                  CRAFTING HIGH-PERFORMANCE WEB APPLICATIONS
                </h3>
                <p className="text-[11px] sm:text-xs text-[#f4f4f5]/70 font-mono leading-relaxed">
                  3 years building production web apps with React & Node.js. Focused on fluid user experiences, payment gateways, and scalable architectures.
                </p>
              </div>

              <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-[#d4ff00]/10 border border-[#d4ff00]/30 text-[#d4ff00] text-[10px] font-mono font-bold uppercase tracking-wider">
                  3+ YEARS EXP
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-[10px] font-mono uppercase tracking-wider">
                  AVAILABLE FOR HIRE
                </span>
              </div>
            </div>
          </div>

          {/* Tile 2: Projects Metric (Square: 1 col on mobile, 1 col on desktop) */}
          {/* Direction: Top to Bottom */}
          <div className="col-span-1 md:col-span-1 relative overflow-hidden bg-[#181a20]/90 backdrop-blur-sm border border-white/10 rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between hover:border-[#d4ff00]/40 transition-colors group">
            {/* Curtain wipe Top -> Bottom */}
            <div
              className="bento-curtain-2 absolute inset-0 bg-[#d4ff00] z-20 pointer-events-none will-change-transform"
              style={{ transform: 'translateY(-101%)', opacity: 0 }}
            />

            <div className="bento-content-2 will-change-transform flex flex-col justify-between h-full" style={{ opacity: 0 }}>
              <span className="text-[9px] font-mono uppercase tracking-widest text-white/40">// SHIPPED</span>
              
              <div className="my-1">
                <span
                  className="text-3xl sm:text-4xl md:text-5xl font-black text-[#d4ff00] leading-none inline-block"
                  style={{ fontFamily: "'Anton', sans-serif" }}
                >
                  10+
                </span>
                <div className="text-[10px] sm:text-xs font-mono font-bold uppercase text-white tracking-wider mt-1">
                  PROJECTS BUILT
                </div>
              </div>

              <span className="text-[9px] font-mono text-[#d4ff00]/70 uppercase">Production Apps</span>
            </div>
          </div>

          {/* Tile 3: Clients Metric (Square: 1 col on mobile, 1 col on desktop) */}
          {/* Direction: Bottom to Top */}
          <div className="col-span-1 md:col-span-1 relative overflow-hidden bg-[#181a20]/90 backdrop-blur-sm border border-white/10 rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between hover:border-[#d4ff00]/40 transition-colors group">
            {/* Curtain wipe Bottom -> Top */}
            <div
              className="bento-curtain-3 absolute inset-0 bg-[#d4ff00] z-20 pointer-events-none will-change-transform"
              style={{ transform: 'translateY(101%)', opacity: 0 }}
            />

            <div className="bento-content-3 will-change-transform flex flex-col justify-between h-full" style={{ opacity: 0 }}>
              <span className="text-[9px] font-mono uppercase tracking-widest text-white/40">// CLIENTS</span>
              
              <div className="my-1">
                <span
                  className="text-3xl sm:text-4xl md:text-5xl font-black text-[#d4ff00] leading-none inline-block"
                  style={{ fontFamily: "'Anton', sans-serif" }}
                >
                  4+
                </span>
                <div className="text-[10px] sm:text-xs font-mono font-bold uppercase text-white tracking-wider mt-1">
                  HAPPY CLIENTS
                </div>
              </div>

              <span className="text-[9px] font-mono text-[#d4ff00]/70 uppercase">Freelance & Contract</span>
            </div>
          </div>

          {/* Tile 4: Core Tech Stack (Wide: 2 cols on mobile, 2 cols on desktop) */}
          {/* Direction: Right to Left */}
          <div className="col-span-2 md:col-span-2 relative overflow-hidden bg-[#181a20]/90 backdrop-blur-sm border border-white/10 rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between hover:border-[#d4ff00]/40 transition-colors group">
            {/* Curtain wipe Right -> Left */}
            <div
              className="bento-curtain-4 absolute inset-0 bg-[#d4ff00] z-20 pointer-events-none will-change-transform"
              style={{ transform: 'translateX(101%)', opacity: 0 }}
            />

            <div className="bento-content-4 will-change-transform flex flex-col justify-between h-full" style={{ opacity: 0 }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-mono uppercase tracking-widest text-white/40">// CORE ARSENAL</span>
                <span className="text-[8px] font-mono text-[#d4ff00] uppercase font-bold">MERN STACK</span>
              </div>

              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind', 'Payment Gateways', 'Cloudinary', 'REST APIs'].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-[#f4f4f5]/90 hover:border-[#d4ff00]/50 hover:text-[#d4ff00] hover:bg-[#d4ff00]/5 transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-2 pt-1.5 border-t border-white/5 flex items-center justify-between text-[8px] font-mono uppercase text-white/30">
                <span>CLEAN CODE & MODULAR ARCHITECTURE</span>
                <span className="text-[#d4ff00]">FAST DEPLOYMENT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
