"use client";

import React from "react";
import { FaTrashAlt, FaAppleAlt, FaRecycle } from "react-icons/fa";
import ImageSlider from "@/components/ImageSlider";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    quote:
      "Thanks to SustainBite, our leftover meals now feed families instead of being thrown away. Truly life-changing!",
    name: "Riya, Restaurant Owner",
  },
  {
    quote:
      "I used to struggle finding affordable meals. SustainBite brought hope and food back into our lives.",
    name: "Aman, Beneficiary",
  },
  {
    quote:
      "SustainBite has created a positive impact in our community. We're proud to partner with them!",
    name: "Kavita, NGO Volunteer",
  },
  {
    quote:
      "This is not just a food rescue site—it's a movement. A powerful idea turned into action.",
    name: "Raj, Environmentalist",
  },
  {
    quote:
      "We're saving money and helping others at the same time. This platform is a blessing.",
    name: "Priya, Caterer",
  },
  {
    quote:
      "Food rescue has never been this easy. Love the mission and the people behind it.",
    name: "Sunil, Event Manager",
  },
];

const Hero: React.FC = () => {
  return (
    <section className="w-full overflow-hidden">
      {/* ✅ Hero Section with Video */}
      <div className="relative h-[500px] w-full overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="/hero_vid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Optional: Dark Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10" />

        {/* Hero Text */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wide mb-4">
            Emphasizing sustainability and rescuing food
          </h1>
          <p className="text-lg md:text-xl text-white max-w-2xl mx-auto leading-relaxed">
            At SustainBite, we believe no good food should go to waste while
            people go hungry. Our mission is to rescue surplus food from
            restaurants, stores, and events, and deliver it to communities in
            need—creating a sustainable cycle of care and compassion.
          </p>

          {/* Two Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <a
              href="/donate-food"
              className="bg-green-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-300"
            >
              Donate Now
            </a>
            <a
              href="/food-map"
              className="bg-white text-green-700 font-semibold px-6 py-3 rounded-md hover:bg-green-100 transition-colors duration-300"
            >
              I need food
            </a>
          </div>
        </div>
      </div>

      {/* ✅ Beliefs Section */}
      <section className="bg-white rounded-lg py-10 w-full">
        <h2 className="text-2xl font-bold text-left text-green-700 mb-4 px-4 sm:px-6 lg:px-8">
          We believe that:
        </h2>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <FaTrashAlt className="text-green-600 text-4xl mb-4" />
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                Good food belongs to people, not landfills.
              </h3>
              <p className="text-gray-700 text-sm">
                Up to 40% of food that is produced is wasted.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <FaAppleAlt className="text-green-600 text-4xl mb-4" />
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                Everyone has a right to healthy food.
              </h3>
              <p className="text-gray-700 text-sm">
                1 in 7 people goes hungry every day.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <FaRecycle className="text-green-600 text-4xl mb-4" />
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                Climate change requires urgent action.
              </h3>
              <p className="text-gray-700 text-sm">
                Food waste fuels climate change. India can’t afford to ignore
                it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Image Slider */}
      <div className="mt-10">
        <ImageSlider />
      </div>

      {/* ✅ Testimonials */}
      <div className="mt-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-green-700 text-center mb-6">
          What people are saying
        </h2>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          loop
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="h-52 bg-white rounded-lg shadow-md p-6 flex flex-col justify-between text-center">
                <p className="text-gray-700 text-xl italic mb-4">
                  {`“${testimonial.quote}”`}
                </p>
                <p className="text-green-700 font-semibold text-lg">
                  — {testimonial.name}
                </p>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-pagination mt-8 !relative" />
        </Swiper>
      </div>

      {/* ✅ Closing Statement */}
      <div className="mt-10 text-center text-gray-900 max-w-3xl mx-auto leading-relaxed">
        <p className="text-lg md:text-xl font-semibold mb-4">
          Together, we nourish communities and protect the planet.
        </p>
      </div>
    </section>
  );
};

export default Hero;
