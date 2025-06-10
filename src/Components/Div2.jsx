import React from "react";
import ScrollVelocity from "./Animations/ScrollVelocity";

const Div2 = () => {
  return (
    <div className="bg-black text-white pt-10">
      <ScrollVelocity
        texts={["My Services", "Services My"]}
        className="custom-scroll-text"
      />
    </div>
  );
};

export default Div2;
