import React, { useRef, useEffect } from "react";

const steps = [
  {
    title: "College",
    subtitle: "B.Sc. Computer Science — Completed 2023",
    text: "Completed my B.Sc. in Computer Science in 2023.",
  },
  {
    title: "Software Manager — M Kins",
    subtitle: "Jan 2024 — Feb 2025",
    text: "Worked as a Software Manager at M Kins, delivering features and coordinating the team.",
  },
  {
    title: "Diploma — MERN Stack",
    subtitle: "Completed Feb 2025",
    text: "Completed a diploma / certification focused on the MERN stack (MongoDB, Express, React, Node) in February 2025.",
  },
  {
    title: "Backend Administrator — Kerala Financial Corporation",
    subtitle: "Apr 2025 — Jun 2025",
    text: "Worked as a Backend Administrator, maintaining services and backend systems.",
  },
];

const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));

export default function Journey() {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const stepRefs = useRef([]);

  useEffect(() => {
    let raf = null;

    const update = () => {
      const container = containerRef.current;
      const path = pathRef.current;
      if (!container || !path) return;

      const rect = container.getBoundingClientRect();
      const viewportCenter = window.innerHeight * 0.75; // where progress is calculated
      const totalHeight = Math.max(rect.height, window.innerHeight);

      // progress is 0..1 from top of container entering the trigger zone to leaving
      const progress = clamp((viewportCenter - rect.top) / totalHeight, 0, 1);

      // animate SVG path stroke
      const length = path.getTotalLength();
      const offset = Math.round(length * (1 - progress));
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = offset;

      // animate each step card as it comes into view
      stepRefs.current.forEach((el) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const stepProgress = clamp(
          (window.innerHeight * 0.9 - r.top) / (r.height + 120),
          0,
          1
        );
        // transform & opacity keyed to stepProgress
        const translateY = Math.round((1 - stepProgress) * 30);
        el.style.transform = `translateY(${translateY}px) scale(${
          0.98 + stepProgress * 0.02
        })`;
        el.style.opacity = String(stepProgress);
        el.style.filter = `blur(${(1 - stepProgress) * 6}px)`;
      });

      raf = requestAnimationFrame(update);
    };

    // start loop
    raf = requestAnimationFrame(update);

    const onResize = () => {
      // re-run a frame to reposition everything quickly on resize
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  const accent = "#7c3aed";

  return (
    <section ref={containerRef} className="relative py-32 bg-black text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-semibold mb-8 text-white">
          My journey
        </h1>

        <div className="relative flex gap-12 md:gap-20">
          {/* Left: SVG timeline */}
          <div className="flex flex-col items-center w-12 md:w-24">
            <svg
              width="4"
              height="100%"
              viewBox="0 0 4 100"
              preserveAspectRatio="none"
              className="h-full w-1"
            >
              <g>
                <path
                  ref={pathRef}
                  d={`M2 0 L2 ${steps.length * 200}`}
                  stroke={accent}
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                  style={{ transition: "stroke-dashoffset 300ms linear" }}
                />
              </g>
            </svg>
          </div>

          {/* Right: steps */}
          <div className="flex-1">
            <div className="space-y-14">
              {steps.map((s, i) => (
                <div
                  key={s.title}
                  ref={(el) => (stepRefs.current[i] = el)}
                  className="bg-gray-900 p-8 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.6)] border border-gray-800 transform transition-all duration-600 ease-out"
                  style={{
                    opacity: 0,
                    transform: "translateY(30px)",
                    filter: "blur(6px)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {s.title}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1">{s.subtitle}</p>
                    </div>
                    <div
                      className="flex items-center justify-center h-12 w-12 rounded-full"
                      style={{
                        background: accent,
                        color: "#fff",
                        fontWeight: 700,
                      }}
                    >
                      {i + 1}
                    </div>
                  </div>
                  <p className="mt-4 text-gray-200 leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
