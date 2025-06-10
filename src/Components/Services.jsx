import React, { useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform } from "motion/react";
import assets from "../assets/assets";

export const Services = () => {
  return (
    <div id="services" className="bg-black">
      <div className="flex justify-center items-center pt-20 pb-12">
        
      </div>
      <TextParallaxContent
        imgUrl={assets.web}
        subheading=""
        heading="Web Development"
      >
        <ExampleContent heading="Web Development" />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl={assets.graphic}
        subheading=""
        heading="Graphic designing"
      >
        <ExampleContent heading="Graphic designing" />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl={assets.editing}
        subheading=""
        heading="Video editing & Photography"
      >
        <ExampleContent heading="Video editing & Photography" />
      </TextParallaxContent>
    </div>
  );
};

const IMG_PADDING = 12;

const TextParallaxContent = ({ imgUrl, subheading, heading, children }) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

const OverlayCopy = ({ subheading, heading }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">
        {subheading}
      </p>
      <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
    </motion.div>
  );
};

const ExampleContent = ({ heading }) => {
  const serviceContent = {
    "Web Development": {
      title: "Modern Web Solutions",
      description: [
        "Full-stack development using the latest technologies (React, Node.js)",
        "Responsive and mobile-first design principles",
        "Performance optimization and SEO best practices",
        "Progressive Web Apps (PWA) development",
        "API integration and development",
        "Database design and management",
      ],
    },
    "Graphic designing": {
      title: "Creative Design Solutions",
      description: [
        "Brand identity and logo design",
        "UI/UX design for web and mobile applications",
        "Social media graphics and marketing materials",
        "Print design (brochures, business cards, posters)",
        "Motion graphics and animations",
        "Illustration and digital artwork",
      ],
    },
    "Video editing & Photography": {
      title: "Visual Content Creation",
      description: [
        "Professional photo editing and retouching",
        "Video post-production and color grading",
        "Motion graphics and visual effects",
        "Social media content creation",
        "Event photography and videography",
        "Documentary and storytelling",
      ],
    },
  };

  const content = serviceContent[heading] || serviceContent["Web Development"];

  return (
    <div className="mx-auto max-w-5xl px-4 pb-24 pt-12">
      <h2 className="text-3xl font-bold text-white mb-8">{content.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {content.description.map((item, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="mt-2 text-purple-500">•</div>
            <p className="text-lg text-neutral-300">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
