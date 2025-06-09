import React, { useState } from "react";
import { MdEmail, MdPhone } from "react-icons/md";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import AnimatedContent from "./Animations/AnimatedContent";
import ShinyText from "./Animations/ShinyText";
import Stepper, { Step } from "./Animations/Stepper";

const Contact = () => {
  const [setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "079d0be6-c0b0-4d88-bb65-94dd22d1e7a0", // Replace with your Web3Forms access key
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: "New Contact Form Submission",
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Thank you for your message. I will get back to you soon!");
        setFormData({ name: "", email: "", message: "" });
        setCurrentStep(1);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div id="contact" className="bg-black text-white py-10">
      <div className="flex justify-center mb-8"></div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="lg:w-1/2">
            <AnimatedContent
              distance={100}
              direction="vertical"
              reverse={false}
              config={{ tension: 50, friction: 25 }}
              initialOpacity={0.2}
              animateOpacity
              scale={1}
              threshold={0.1}
            >
              {" "}
              <div>
                <ShinyText
                  text="Get In Touch"
                  disabled={false}
                  speed={3}
                  className="text-4xl sm:text-5xl md:text-7xl font-bold leading-none"
                />
                <p className="text-gray-300 mb-8 text-lg">
                  I'm available for freelance projects and full-time positions.
                  Feel free to reach out through any of these channels:
                </p>

                <div className="space-y-6">
                  {" "}
                  <div className="flex items-center gap-3 group">
                    <MdEmail className="text-white/70 text-2xl group-hover:text-white" />
                    <a
                      href="mailto:midhunmohankzhyw@gmail.com"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      midhunmohankzhyw@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3 group">
                    {" "}
                    <MdPhone className="text-white/70 text-2xl group-hover:text-white" />
                    <a
                      href="tel:+919995855774"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      +91 999 58 55 774
                    </a>
                  </div>
                  <div className="flex items-center gap-3 group">
                    {" "}
                    <FaGithub className="text-white/70 text-2xl group-hover:text-white" />
                    <a
                      href="https://github.com/Majorshot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Majorshot
                    </a>
                  </div>
                  <div className="flex items-center gap-3 group">
                    {" "}
                    <FaLinkedin className="text-white/70 text-2xl group-hover:text-white" />
                    <a
                      href="https://www.linkedin.com/in/midhunmohan-dev/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Midhun Mohan
                    </a>
                  </div>
                  <div className="flex items-center gap-3 group">
                    {" "}
                    <FaInstagram className="text-white/70 text-2xl group-hover:text-white" />
                    <a
                      href="https://www.instagram.com/perilla_paiyen/?__pwa=1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      @perilla_paiyen
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedContent>
          </div>

          {/* Right Column */}
          <div className="lg:w-1/2">
            <AnimatedContent
              distance={100}
              direction="horizontal"
              reverse={true}
              config={{ tension: 50, friction: 25 }}
              initialOpacity={0.2}
              animateOpacity
              scale={1}
              threshold={0.1}
            >
              {" "}
              <div>
                <ShinyText
                  text="Let's Talk"
                  disabled={false}
                  speed={3}
                  className="text-4xl sm:text-5xl md:text-7xl font-bold leading-none"
                />
                <p className="text-gray-300 mb-8 text-lg">
                  Have a project in mind? Send me a message and let's create
                  something amazing together!
                </p>
                <Stepper
                  initialStep={1}
                  onStepChange={(step) => {
                    console.log(step);
                  }}
                  onFinalStepCompleted={() => handleSubmit()}
                  backButtonText="Previous"
                  nextButtonText="Next"
                >
                  <Step>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-white mb-4">
                        Your Info
                      </h3>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your Name"
                        className="w-full bg-gray-800 text-gray-100 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Your Email"
                        className="w-full bg-gray-800 text-gray-100 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                      />
                    </div>
                  </Step>

                  <Step>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4">
                        Message
                      </h3>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Your Message"
                        rows={6}
                        className="w-full bg-gray-800 text-gray-100 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                      />
                    </div>
                  </Step>

                  <Step>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4">
                        Preview
                      </h3>
                      <div className="space-y-2 text-gray-300">
                        <p>
                          <span className="font-semibold">Name:</span>{" "}
                          {formData.name}
                        </p>
                        <p>
                          <span className="font-semibold">Email:</span>{" "}
                          {formData.email}
                        </p>
                        <p>
                          <span className="font-semibold">Message:</span>
                        </p>
                        <p className="whitespace-pre-wrap">
                          {formData.message}
                        </p>
                      </div>
                    </div>
                  </Step>
                </Stepper>
              </div>
            </AnimatedContent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
