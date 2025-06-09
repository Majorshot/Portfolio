import React from "react";
import About from "./Components/About";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Services from "./Components/Services";
import Div from "./Components/Div";
import Photo from "./Components/Photo";
import Project from "./Components/Project";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";

const App = () => {
  return (
    <div>
      <Navbar />
      <Home />
      <Div />
      <About />
      <Services />
      <Project />
      <Photo />
      <Contact/>
      <Footer/>
    </div>
  );
};

export default App;
