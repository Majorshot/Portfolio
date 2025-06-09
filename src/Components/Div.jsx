import React from "react";
import ScrollVelocity from "./Animations/ScrollVelocity";

const Div = () => {
  return (
    <div className="bg-black text-white pt-10">
      <ScrollVelocity
        texts={["About Me", "Me About"]}
        className="custom-scroll-text"
      />
    </div>
  );
};

export default Div;
