import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";



const Banner = () => {
  const slides = [
    {
      id: 1,
      image: "https://i.ibb.co.com/YT8HNx4w/row-students-doing-exam-1.jpg",
      title: "Find Your Perfect Study Partner",
      description:
        "Connect with learners who match your goals and study style.",
    },
    {
      id: 2,
      image: "https://i.ibb.co.com/W7Jc0y5/young-man-writing-notebook-study-session-1.jpg",
      title: "Collaborate and Grow Together",
      description:
        "Join hands with others to make learning engaging and effective.",
    },
    {
      id: 3,
      image: "https://i.ibb.co.com/RGGCkzr5/young-students-learning-together-group-study-1.jpg",
      title: "Achieve More With Teamwork",
      description:
        "Study smarter — share notes, insights, and motivation with partners.",
    },
  ];

  return (
    <div className="w-full">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="w-full h-[400px] bg-cover bg-center flex items-center justify-center text-white"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="bg-black/50 backdrop-blur-md p-10 rounded-xl text-center">
                <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                <p className="text-lg mb-6">{slide.description}</p>
                <button className="btn btn-primary text-white">
                  Get Started
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
