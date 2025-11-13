import React, { useEffect } from "react";
import { FaUserPlus, FaSearch, FaHandshake } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const HowItWorks = () => {
    useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const steps = [
    {
      id: 1,
      icon: <FaUserPlus className="text-4xl text-primary" />,
      title: "Create Your Profile",
      description:
        "Sign up and create a study profile by adding your subjects, study mode, and availability.",
    },
    {
      id: 2,
      icon: <FaSearch className="text-4xl text-secondary" />,
      title: "Find Your Match",
      description:
        "Search or filter through partners based on subjects, experience level, or location.",
    },
    {
      id: 3,
      icon: <FaHandshake className="text-4xl text-accent" />,
      title: "Connect & Collaborate",
      description:
        "Send requests to your ideal study partners and start learning together effectively.",
    },
  ];

  return (
    <section className="py-16 bg-base-200" id="how-it-works">
      <div className="max-w-6xl mx-auto text-center">
        <h2
          className="text-3xl md:text-4xl font-bold mb-8"
          data-aos="fade-up"
        >
          How It Works
        </h2>
        <div
          className="grid md:grid-cols-3 gap-8 px-4"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {steps.map((step) => (
            <div
              key={step.id}
              className="card bg-base-100 shadow-lg p-6 border-t-4 border-primary"
            >
              <div className="flex flex-col items-center space-y-3">
                {step.icon}
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
