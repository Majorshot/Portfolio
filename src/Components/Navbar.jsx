import React, { useState } from "react";
import assets from "../assets/assets.js";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const menuItems = [
    { name: "home.", href: "#home" },
    { name: "about.", href: "#about" },
    { name: "services.", href: "#services" },
    { name: "projects.", href: "#projects" },
  ];

  return (
    <>
      {" "}
      {/* Logo */}
      <div className="fixed top-6 left-6 z-50">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            document
              .querySelector("#home")
              .scrollIntoView({ behavior: "smooth" });
          }}
          className="inline-flex items-center justify-center p-3 rounded-full text-white hover:text-purple-200 focus:outline-none transition-all duration-200 bg-white/10 backdrop-blur-sm shadow-lg border border-white/20"
        >
          <img
            src={assets.logo}
            alt="Logo"
            className="w-10 h-10 object-contain"
          />
        </a>
      </div>
      {/* Hamburger Menu Button */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={toggleMenu}
          className="inline-flex items-center justify-center p-3 rounded-full text-white  focus:outline-none  focus:ring-inset focus: transition-all duration-200 bg-white/10 backdrop-blur-sm shadow-lg border border-white/20"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <div className="w-10 h-10 flex flex-col justify-center items-center">
            <span
              className={`bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
              }`}
            ></span>
            <span
              className={`bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
              }`}
            ></span>
          </div>
        </button>
      </div>
      {/* Full Screen Menu */}
      <div
        className={`fixed inset-0 z-40 transform transition-all duration-500 ease-in-out ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        {" "}
        <div
          className={`absolute inset-0 bg-black/10 transition-all duration-700 ease-out ${
            isOpen ? "backdrop-blur-3xl" : "backdrop-blur-none"
          }`}
        >
          {/* Menu Content */}
          <div className="relative h-full flex flex-col justify-center items-start px-8">
            {/* Menu Items */}
            <div className="space-y-8">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    const element = document.querySelector(item.href);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className={`block text-white text-5xl md:text-7xl lg:text-8xl font-bold opacity-50 leading-tight hover:text-white hover:opacity-100 transition-all duration-300 transform ${
                    isOpen
                      ? "translate-x-0 opacity-50"
                      : "translate-x-8 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isOpen ? `${index * 100}ms` : "0ms",
                  }}
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Contact Button */}
            <div
              className={`absolute bottom-12 right-8 transition-all duration-300 transform ${
                isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{
                transitionDelay: isOpen ? `${menuItems.length * 100}ms` : "0ms",
              }}
            >
              {" "}
              <button
                onClick={() => {
                  setIsOpen(false);
                  document
                    .querySelector("#contact")
                    .scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-black bg-opacity-20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-medium hover:bg-opacity-30 transition-all duration-200 border border-white border-opacity-30 hover:bg-white cursor-pointer hover:text-black"
              >
                CONTACT ME →
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
