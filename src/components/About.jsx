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

      // Automatically reveal bento grid and run kinetic line animations
      const revealAboutContent = () => {
        if (hasRevealedContent) return;
        hasRevealedContent = true;

        const tl = gsap.timeline();

        // 1. Reveal content container
        tl.to(contentRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: 'power3.out',
        })
        // 2. Bento cards stagger in with smooth lift
        .fromTo(
          '.bento-card',
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.08,
            ease: 'power3.out',
          },
          '-=0.15'
        )
        // 3. Kinetic neon line draws across the top border of each bento box!
        .fromTo(
          '.bento-accent-line',
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.65,
            stagger: 0.08,
            ease: 'power3.inOut',
          },
          '-=0.4'
        )
        // 4. Metric numbers pop in with punchy physics
        .fromTo(
          '.bento-stat-num',
          { scale: 0.75, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            stagger: 0.06,
            ease: 'back.out(1.8)',
          },
          '-=0.45'
        );
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

      // Hide content initially
      gsap.set(contentRef.current, {
        opacity: 0,
        y: 25,
      });
      gsap.set('.bento-card', { opacity: 0, y: 16 });
      gsap.set('.bento-accent-line', { scaleX: 0 });
      gsap.set('.bento-stat-num', { scale: 0.75, opacity: 0 });

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
              gsap.set(contentRef.current, { opacity: 0, y: 25 });
              gsap.set('.bento-card', { opacity: 0, y: 16 });
              gsap.set('.bento-accent-line', { scaleX: 0 });
              gsap.set('.bento-stat-num', { scale: 0.75, opacity: 0 });
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
          BENTO BOX GRID:
          Clean, spacious, employer-focused layout with kinetic neon line animations
        */}
        <div
          ref={contentRef}
          className="relative z-20 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mt-2.5 sm:mt-4"
        >
          {/* Card 1: Role & Identity */}
          <div className="bento-card relative overflow-hidden bg-[#16181d] border border-white/5 p-4 sm:p-5 rounded-none flex flex-col justify-between hover:border-[#d4ff00]/40 transition-colors group">
            {/* Kinetic Neon Line at Top Border */}
            <div className="bento-accent-line absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#d4ff00] via-[#d4ff00]/80 to-transparent origin-left scale-x-0 will-change-transform" />
            
            <div>
              <div className="flex items-center justify-between text-[9px] font-mono tracking-widest text-[#d4ff00]/70 uppercase mb-2">
                <span>[ 01 // PROFILE ]</span>
                <span className="flex items-center gap-1.5 text-[#d4ff00] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4ff00] animate-pulse" />
                  OPEN FOR ROLES
                </span>
              </div>
              <h3
                className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-tight text-white mb-2"
                style={{ fontFamily: "'Anton', sans-serif" }}
              >
                FULL STACK MERN DEVELOPER
              </h3>
              <p className="text-[11px] sm:text-xs text-[#f4f4f5]/75 leading-relaxed font-mono">
                Software Engineer with 3 years of experience developing production web applications from Kerala, India. Dedicated to crafting fluid, responsive frontends and resilient, secure backends.
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[9px] font-mono uppercase tracking-wider text-white/40">
              <span>LOCATION: KERALA, IN</span>
              <span className="text-[#d4ff00]">AVAILABLE IMMEDIATELY</span>
            </div>
          </div>

          {/* Card 2: Proven Impact / Verified Metrics */}
          <div className="bento-card relative overflow-hidden bg-[#16181d] border border-white/5 p-4 sm:p-5 rounded-none flex flex-col justify-between hover:border-[#d4ff00]/40 transition-colors group">
            {/* Kinetic Neon Line at Top Border */}
            <div className="bento-accent-line absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#d4ff00] via-[#d4ff00]/80 to-transparent origin-left scale-x-0 will-change-transform" />

            <div>
              <div className="flex items-center justify-between text-[9px] font-mono tracking-widest text-[#d4ff00]/70 uppercase mb-3">
                <span>[ 02 // TRACK RECORD ]</span>
                <span className="text-white/40">VERIFIED METRICS</span>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-4 items-center py-1">
                {/* Metric 1 */}
                <div className="flex flex-col">
                  <span
                    className="bento-stat-num text-3xl sm:text-4xl md:text-5xl font-black text-[#d4ff00] leading-none mb-1"
                    style={{ fontFamily: "'Anton', sans-serif" }}
                  >
                    3+
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-mono uppercase text-white font-bold tracking-wider">
                    YEARS EXP
                  </span>
                  <span className="text-[8px] font-mono text-white/40 uppercase">Production</span>
                </div>

                {/* Metric 2 */}
                <div className="flex flex-col border-x border-white/10 px-2 sm:px-4">
                  <span
                    className="bento-stat-num text-3xl sm:text-4xl md:text-5xl font-black text-[#d4ff00] leading-none mb-1"
                    style={{ fontFamily: "'Anton', sans-serif" }}
                  >
                    10+
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-mono uppercase text-white font-bold tracking-wider">
                    PROJECTS
                  </span>
                  <span className="text-[8px] font-mono text-white/40 uppercase">Full Apps</span>
                </div>

                {/* Metric 3 */}
                <div className="flex flex-col">
                  <span
                    className="bento-stat-num text-3xl sm:text-4xl md:text-5xl font-black text-[#d4ff00] leading-none mb-1"
                    style={{ fontFamily: "'Anton', sans-serif" }}
                  >
                    4+
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-mono uppercase text-white font-bold tracking-wider">
                    CLIENTS
                  </span>
                  <span className="text-[8px] font-mono text-white/40 uppercase">Satisfied</span>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[9px] font-mono uppercase tracking-wider text-white/40">
              <span>SPECIALTY: MERN STACK</span>
              <span className="text-[#d4ff00]">100% DELIVERY</span>
            </div>
          </div>

          {/* Card 3: Core Tech Arsenal */}
          <div className="bento-card relative overflow-hidden bg-[#16181d] border border-white/5 p-4 sm:p-5 rounded-none flex flex-col justify-between hover:border-[#d4ff00]/40 transition-colors group">
            {/* Kinetic Neon Line at Top Border */}
            <div className="bento-accent-line absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#d4ff00] via-[#d4ff00]/80 to-transparent origin-left scale-x-0 will-change-transform" />

            <div>
              <div className="flex items-center justify-between text-[9px] font-mono tracking-widest text-[#d4ff00]/70 uppercase mb-2.5">
                <span>[ 03 // TECH ARSENAL ]</span>
                <span className="text-white/40">PRODUCTION READY</span>
              </div>

              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {[
                  'React.js',
                  'Node.js',
                  'Express.js',
                  'MongoDB',
                  'Tailwind CSS',
                  'Payment Gateways',
                  'Cloudinary',
                  'REST APIs',
                  'Vite',
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 bg-white/[0.04] border border-white/10 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-[#f4f4f5]/90 hover:border-[#d4ff00]/50 hover:text-[#d4ff00] hover:bg-[#d4ff00]/5 transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[9px] font-mono uppercase tracking-wider text-white/40">
              <span>ARCHITECTURE: MVC & MODULAR</span>
              <span className="text-[#d4ff00]">CLEAN CODE</span>
            </div>
          </div>

          {/* Card 4: What an Employer Gets / Core Deliverables */}
          <div className="bento-card relative overflow-hidden bg-[#16181d] border border-white/5 p-4 sm:p-5 rounded-none flex flex-col justify-between hover:border-[#d4ff00]/40 transition-colors group">
            {/* Kinetic Neon Line at Top Border */}
            <div className="bento-accent-line absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#d4ff00] via-[#d4ff00]/80 to-transparent origin-left scale-x-0 will-change-transform" />

            <div>
              <div className="flex items-center justify-between text-[9px] font-mono tracking-widest text-[#d4ff00]/70 uppercase mb-2.5">
                <span>[ 04 // VALUE DELIVERED ]</span>
                <span className="text-white/40">KEY CAPABILITIES</span>
              </div>

              <ul className="space-y-1.5 sm:space-y-2 text-[10px] sm:text-xs font-mono text-[#f4f4f5]/85">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#d4ff00] shrink-0 mt-1" />
                  <span>Fluid, high-performance React UIs styled with Tailwind CSS.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#d4ff00] shrink-0 mt-1" />
                  <span>Secure payment gateways (Stripe/Razorpay) & Cloudinary media automation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#d4ff00] shrink-0 mt-1" />
                  <span>Robust RESTful APIs, JWT authentication & optimized MongoDB schemas.</span>
                </li>
              </ul>
            </div>

            <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[9px] font-mono uppercase tracking-wider text-white/40">
              <span>SPEED: RAPID DEPLOYMENT</span>
              <span className="text-[#d4ff00]">PRODUCTION TESTED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
