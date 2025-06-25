import React from "react";
import { assets } from "../assets/assets.js";
import ShinyText from "./Animations/ShinyText";
import Masonry from './Animations/Masonry';

const items = [
    {
      id: "1",
      img:   assets.chicken,
      height: 400,
    },
    {
      id: "2",
      img:   assets.choco,
      height: 250,
    },
    {
      id: "3",
      img:   assets.club,
      height: 600,
    },{
      id: "4",
      img:   assets.fruit,
      height: 600,
    },{
      id: "5",
      img:   assets.ladoo,
      height: 600,
    },{
      id: "6",
      img:   assets.puff,
      height: 600,
    },{
      id: "7",
      img:   assets.spanish,
      height: 600,
    },{
      id: "8",
      img:   assets.veg,
      height: 600,
    },{
      id: "9",
      img:   assets.zatar,
      height: 600,
    },{
      id: "10",
      img:   assets.sand,
      height: 600,
    },
];

const Photo = () => {
  return (
    <div className="w-screen min-h-screen bg-black pb-8">
      <div className="flex justify-center items-center pt-16 pb-12">
        <ShinyText
          text="My Photography"
          disabled={false}
          speed={3}
          className="text-4xl sm:text-4xl md:text-7xl font-bold leading-none"
        />
      </div>
      <div className="px-4 md:px-8">
        <Masonry
          items={items}
          ease="power3.out"
          duration={0.6}
          stagger={0.05}
          animateFrom="bottom"
          scaleOnHover={true}
          hoverScale={0.95}
          blurToFocus={true}
          colorShiftOnHover={false}
        />
      </div>
    </div>
  )
}

export default Photo