import React from "react";
import StaggeredMenu from "./Animations/StaggeredMenu";
import logo from "../assets/logo.png"; // Adjust path if your logo is elsewhere

const menuItems = [
  { label: "Home", ariaLabel: "Go to home page", link: "#home" },
  { label: "About", ariaLabel: "Learn about us", link: "#about" },
  { label: "Projects", ariaLabel: "Learn about us", link: "#projects" },
  { label: "Services", ariaLabel: "View our services", link: "#services" },
  { label: "Contact", ariaLabel: "Get in touch", link: "#contact" },
];

const socialItems = [
  { label: "Twitter", link: "https://twitter.com" },
  { label: "GitHub", link: "https://github.com" },
  { label: "LinkedIn", link: "https://linkedin.com" },
];

const handleSmoothScroll = (e, link) => {
  e.preventDefault(); // Prevents the default anchor tag jump
  const targetId = link.substring(1); // Removes the "#" from the link
  const targetElement = document.getElementById(targetId);

  if (targetElement) {
    window.scrollTo({
      top: targetElement.offsetTop,
      behavior: 'smooth'
    });
  }
};

const Navbar = () => {
  return (
    <StaggeredMenu
      position="right"
      items={menuItems}
      socialItems={socialItems}
      displaySocials={true}
      displayItemNumbering={true}
      menuButtonColor="#fff"
      openMenuButtonColor="#000000"
      changeMenuColorOnOpen={true}
      colors={["#B19EEF", "#5227FF"]}
      logoUrl={logo}
      accentColor="#ff6b6b"
      onMenuOpen={() => console.log("Menu opened")}
      onMenuClose={() => console.log("Menu closed")}
      onLinkClick={handleSmoothScroll} // Pass the new function as a prop
    />
  );
};

export default Navbar;