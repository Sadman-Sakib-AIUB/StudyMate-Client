import React, { useEffect } from "react";
import { Link } from "react-router";
import { FaHome } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const ErrorPage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4 text-center">
      
      <h1
        className="text-9xl font-extrabold text-purple-600 animate-bounce mb-6"
        data-aos="zoom-in"
      >
        404
      </h1>

      <h2
        className="text-3xl md:text-4xl font-bold text-gray-700 mb-4"
        data-aos="fade-up"
      >
        Oops! Page Not Found
      </h2>

      <p
        className="text-gray-600 mb-8 max-w-md"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      <Link
        to="/"
        className="btn btn-primary flex items-center gap-2 text-white shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <FaHome /> Back to Home
      </Link>

      {/* Floating decorative shapes */}
      <div className="absolute top-10 left-10 w-16 h-16 bg-purple-300 rounded-full opacity-70 animate-pulse"></div>
      <div className="absolute bottom-20 right-16 w-24 h-24 bg-pink-300 rounded-full opacity-50 animate-pulse"></div>
      <div className="absolute top-1/2 right-0 w-12 h-12 bg-indigo-300 rounded-full opacity-60 animate-pulse"></div>
    </div>
  );
};

export default ErrorPage;
