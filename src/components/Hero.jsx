import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Waves from './Waves';

const TAG_WORDS = ['FULL', 'STACK', 'DEVELOPER'];
const MIDHUN_CHARS = ['M', 'I', 'D', 'H', 'U', 'N'];
const MOHAN_CHARS = ['M', 'O', 'H', 'A', 'N'];
const QUOTE_WORDS = '“Transforming complex logic into seamless, high-performance digital experiences.”'.split(' ');

export default function Hero({ isLoaded = true }) {
  const bannerRef = useRef(null);

  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      // 1. Initial State: all text hidden, all micro-blocks parked at -101%
      gsap.set('.hero-anim-text', { opacity: 0 });
      gsap.set('.hero-anim-block', { xPercent: -101, display: 'block' });

      // Clean delay after the preloader curtain finishes unfolding
      const tl = gsap.timeline({ delay: 0.15 });

      // --- PHASE 1: FULL STACK DEVELOPER (word wave) ---
      tl.fromTo('.tag-block',
        { xPercent: -101 },
        {
          xPercent: 0,
          duration: 0.24,
          ease: 'power3.inOut',
          stagger: 0.05
        }
      )
      .set('.tag-text', { opacity: 1 }, '-=0.12')
      .to('.tag-block',
        {
          xPercent: 101,
          duration: 0.24,
          ease: 'power3.inOut',
          stagger: 0.05
        },
        '-=0.12'
      )
      .set('.tag-block', { display: 'none' });

      // --- PHASE 2: MIDHUN (letter-by-letter wave in rightward direction) ---
      tl.fromTo('.midhun-block',
        { xPercent: -101 },
        {
          xPercent: 0,
          duration: 0.26,
          ease: 'power3.inOut',
          stagger: 0.035
        },
        '-=0.1' // fluid overlap with tag
      )
      .set('.midhun-text', { opacity: 1 }, '-=0.13')
      .to('.midhun-block',
        {
          xPercent: 101,
          duration: 0.26,
          ease: 'power3.inOut',
          stagger: 0.035
        },
        '-=0.13'
      )
      .set('.midhun-block', { display: 'none' });

      // --- PHASE 3: MOHAN (letter-by-letter wave in rightward direction) ---
      tl.fromTo('.mohan-block',
        { xPercent: -101 },
        {
          xPercent: 0,
          duration: 0.26,
          ease: 'power3.inOut',
          stagger: 0.035
        },
        '-=0.14' // seamless cascade from MIDHUN to MOHAN
      )
      .set('.mohan-text', { opacity: 1 }, '-=0.13')
      .to('.mohan-block',
        {
          xPercent: 101,
          duration: 0.26,
          ease: 'power3.inOut',
          stagger: 0.035
        },
        '-=0.13'
      )
      .set('.mohan-block', { display: 'none' });

      // --- PHASE 4: QUOTE (word-by-word wave) ---
      tl.fromTo('.quote-block',
        { xPercent: -101 },
        {
          xPercent: 0,
          duration: 0.22,
          ease: 'power3.inOut',
          stagger: 0.03
        },
        '-=0.1' // smooth cascade from MOHAN to quote
      )
      .set('.quote-text', { opacity: 1 }, '-=0.11')
      .to('.quote-block',
        {
          xPercent: 101,
          duration: 0.22,
          ease: 'power3.inOut',
          stagger: 0.03
        },
        '-=0.11'
      )
      .set('.quote-block', { display: 'none' });

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

          {/* 1. ABOVE NAME: Full Stack Developer — Word-by-word wave */}
          <div className="flex flex-wrap items-center mb-2 sm:mb-3">
            {TAG_WORDS.map((word, i) => (
              <span key={i} className="relative inline-block overflow-hidden mr-2 sm:mr-2.5 py-0.5">
                <span className="hero-anim-text tag-text text-[10px] sm:text-xs md:text-sm font-mono uppercase tracking-[0.25em] text-[#121316]/80 font-bold inline-block will-change-transform">
                  {word}
                </span>
                <span 
                  className="hero-anim-block tag-block absolute inset-0 bg-[#121316] pointer-events-none will-change-transform" 
                  style={{ transform: 'translateX(-101%)' }}
                />
              </span>
            ))}
          </div>

          {/* 2 & 3. 2-LINE ADAPTIVE NAME — Letter-by-letter wave just like preloader */}
          <h1
            className="text-[clamp(5.6rem,31.5vw,22vw)] font-black tracking-tight text-[#121316] uppercase leading-[0.92] select-none text-left flex flex-col gap-1 sm:gap-2"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            {/* LINE 1: MIDHUN (letter-by-letter) */}
            <div className="flex flex-nowrap items-baseline self-start">
              {MIDHUN_CHARS.map((char, i) => (
                <span key={i} className="relative inline-block overflow-hidden py-0.5">
                  <span className="hero-anim-text midhun-text inline-block will-change-transform">
                    {char}
                  </span>
                  <span 
                    className="hero-anim-block midhun-block absolute inset-0 bg-[#121316] pointer-events-none will-change-transform" 
                    style={{ transform: 'translateX(-101%)' }}
                  />
                </span>
              ))}
            </div>

            {/* LINE 2: MOHAN (letter-by-letter) */}
            <div className="flex flex-nowrap items-baseline self-start">
              {MOHAN_CHARS.map((char, i) => (
                <span key={i} className="relative inline-block overflow-hidden py-0.5">
                  <span className="hero-anim-text mohan-text inline-block will-change-transform">
                    {char}
                  </span>
                  <span 
                    className="hero-anim-block mohan-block absolute inset-0 bg-[#121316] pointer-events-none will-change-transform" 
                    style={{ transform: 'translateX(-101%)' }}
                  />
                </span>
              ))}
            </div>
          </h1>

          {/* 4. BELOW NAME: Quote — Word-by-word wave */}
          <div className="flex flex-wrap items-center mt-3 sm:mt-5 max-w-2xl">
            {QUOTE_WORDS.map((word, i) => (
              <span key={i} className="relative inline-block overflow-hidden mr-1.5 sm:mr-2 py-0.5">
                <span className="hero-anim-text quote-text text-[11px] sm:text-xs md:text-sm font-mono tracking-wide text-[#121316]/80 font-medium inline-block will-change-transform">
                  {word}
                </span>
                <span 
                  className="hero-anim-block quote-block absolute inset-0 bg-[#121316] pointer-events-none will-change-transform" 
                  style={{ transform: 'translateX(-101%)' }}
                />
              </span>
            ))}
          </div>

        </div>
      </div>

    </section>
  );
}
