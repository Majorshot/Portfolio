import React from "react";
import Aurora from "./Animations/Aurora";
import SplitText from "./Animations/SplitText";
import ShinyText from "./Animations/ShinyText";
import Lottie from "lottie-react";
import scrollDownAnimation from "../assets/scrollDown.json";
import AnimatedContent from "./Animations/AnimatedContent";

const handleAnimationComplete = () => {
  console.log("Animation completed!");
};

const Home = () => {
  return (
    <div id='home' className="relative h-screen w-screen bg-black overflow-hidden">
      {/* Aurora as main background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Aurora
          colorStops={["#C3139D", "#353BE9", "#C3139D"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      {/* Content above Aurora */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8 -translate-y-16 sm:-translate-y-24 lg:-translate-y-8">
        <SplitText
          text="Crafting Code. Designing Dreams."
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-semibold text-center text-white leading-tight"
          delay={100}
          duration={2}
          ease="power3.out"
          splitType="lines"
          from={{ opacity: 0, y: 100 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
          onLetterAnimationComplete={handleAnimationComplete}
        />
        <div className="mt-4 sm:mt-6 md:mt-8">
          <SplitText
            text="Engineering seamless experiences with elegance, speed, and soul."
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold text-center text-white leading-relaxed px-2 sm:whitespace-nowrap"
            delay={100}
            duration={3}
            ease="power3.out"
            splitType="lines"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            onLetterAnimationComplete={handleAnimationComplete}
          />
        </div>
        
        <div className="flex flex-row items-center justify-center gap-3 sm:gap-6 lg:gap-10 pt-12 sm:pt-16 lg:pt-24 w-full max-w-md sm:max-w-none">
          <AnimatedContent
            distance={150}
            direction="horizontal"
            reverse={true}
            duration={2}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            scale={1}
            threshold={0.2}
            delay={1.5}
          >
            
            <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#contact")
                    .scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto text-center text-sm sm:text-base rounded-2xl border-2 border-dashed border-black bg-white px-6 sm:px-6 py-4 sm:py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
              >
                Get in Touch
              </a>
          </AnimatedContent>

          <AnimatedContent
            distance={150}
            direction="horizontal"
            reverse={false}
            duration={2}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            scale={1}
            threshold={0.2}
            delay={1.5}
          >
            <a
                href="https://drive.google.com/file/d/1N6OSk6vVPt6omUmZaSSL8QcS3oqnfTYp/view?usp=sharing"
                target="_blank"
                className="w-full sm:w-auto text-center text-sm sm:text-base rounded-2xl border-2 border-dashed border-black bg-white px-6 sm:px-6 py-4 sm:py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
              >
                My Resume
              </a>
          </AnimatedContent>
        </div>
        
        {/* Lottie scroll down animation at bottom */}
        <div className="absolute bottom-20 sm:bottom-6 lg:bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
          <AnimatedContent
            distance={150}
            direction="vertical"
            reverse={true}
            duration={2}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            scale={1}
            threshold={0.2}
            delay={3}
          >
            <div className="flex flex-col items-center">
              <Lottie
                animationData={scrollDownAnimation}
                loop={true}
                style={{ width: 48, height: 48 }}
                className="sm:w-16 sm:h-16"
              />
              <span className="mt-2 text-sm sm:text-base lg:text-lg text-neutral-200 font-medium text-center px-4">
                Scroll down to know more
              </span>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </div>
  );
};

export default Home;