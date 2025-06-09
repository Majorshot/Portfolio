import React from "react";
import Beams from "./Animations/Beams";
import Lanyard from "./Animations/Lanyard";
import AnimatedContent from "./Animations/AnimatedContent";
import FadeContent from "./Animations/FadeContent";

const Home = () => {
  return (
    <div id="home" className="relative w-screen h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Beams
          beamWidth={3}
          beamHeight={30}
          beamNumber={20}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={30}
        />{" "}
      </div>
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full h-full px-4 md:px-12">
        {/* Lanyard Animation - Shows on top in mobile, right side in desktop */}
        <div className="w-full md:w-1/2 h-[5vh] md:h-full order-1 md:order-2 md:relative flex items-start md:items-center justify-end md:justify-center">
          <div className="w-full h-full md:opacity-100 transform scale-80 md:scale-100 translate-x-8  -translate-y-10 md:translate-x- md:translate-y-0">
            <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
          </div>
        </div>
        {/* Introduction - Shows below Lanyard in mobile, left side in desktop */}
        <div className="w-full md:w-1/2 text-left order-2 md:order-1 mt-0 md:mt-0 pb-8 md:pb-0">
          <FadeContent
            blur={true}
            duration={1000}
            easing="ease-out"
            initialOpacity={0}
          >
            <AnimatedContent
              distance={150}
              direction="horizontal"
              reverse={true}
              duration={2.5}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity
              scale={1}
              threshold={0.2}
              delay={0.3}
            >
              <h1 className="text-4xl md:text-7xl font-bold mb-6 text-white">
                Full Stack Developer, Photographer & Tech Enthusiast
              </h1>
            </AnimatedContent>
          </FadeContent>

          <AnimatedContent
            distance={150}
            direction="horizontal"
            reverse={true}
            duration={2.5}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            scale={1}
            threshold={0.2}
            delay={1}
          >
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              I create exceptional digital experiences through innovative web
              solutions and capture moments that tell compelling stories.
            </p>
          </AnimatedContent>

          <AnimatedContent
            distance={150}
            direction="vertical"
            reverse={true}
            duration={2.5}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            scale={1}
            threshold={0.2}
            delay={1.8}
          >
            <div className="flex gap-4">
              {" "}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#contact")
                    .scrollIntoView({ behavior: "smooth" });
                }}
                className="rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
              >
                Get in Touch
              </a>
              <a
                href="https://drive.google.com/file/d/1i5xAfm0aTy4FW8DJKeiDkxpYQmz3Gem_/view?usp=sharing"
                target="_blank"
                className="rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
              >
                My Resume
              </a>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </div>
  );
};

export default Home;
