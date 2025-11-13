import React, { useEffect } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const testimonials = [
  {
    id: 1,
    name: "Aisha Rahman",
    role: "Student, Dhaka University",
    image: "https://cdn-icons-png.flaticon.com/128/1154/1154448.png",
    feedback:
      "StudyMate helped me find a great study partner for my programming course! It made learning so much more enjoyable.",
  },
  {
    id: 2,
    name: "Rafi Ahmed",
    role: "Engineering Student, BUET",
    image: "https://cdn-icons-png.flaticon.com/128/219/219970.png",
    feedback:
      "The platform is so easy to use. I met someone with the same study goals, and we improved together faster than ever!",
  },
  {
    id: 3,
    name: "Nadia Hossain",
    role: "Medical Student, DMC",
    image: "https://cdn-icons-png.flaticon.com/128/14663/14663195.png",
    feedback:
      "I love the idea of connecting based on subjects. StudyMate gave me real motivation to study daily.",
  },
];

const Testimonials = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <section className="py-16 bg-base-100" id="testimonials">
      <div className="max-w-6xl mx-auto text-center px-4">
        <h2
          className="text-3xl md:text-4xl font-bold mb-12"
          data-aos="fade-up"
        >
          What Our Users Say
        </h2>
        <div
          className="grid md:grid-cols-3 gap-8"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="card bg-base-200 shadow-lg p-6 rounded-xl"
            >
              <FaQuoteLeft className="text-3xl text-primary mb-4 mx-auto" />
              <p className="italic mb-4 text-gray-700">{item.feedback}</p>
              <div className="flex flex-col items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary mb-2"
                />
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
