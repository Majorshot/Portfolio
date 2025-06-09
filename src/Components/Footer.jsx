import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Midhun Mohan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
