"use client";

import Link from "next/link";
import { FaTrashAlt, FaAppleAlt, FaRecycle, FaQuoteLeft } from "react-icons/fa";
import ImageSlider from "@/components/ImageSlider";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface Belief {
  icon: React.ReactNode;
  title: string;
  description: string;
  stat: string;
}

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Thanks to SustainBite, our leftover meals now feed families instead of being thrown away. Truly life-changing!",
    name: "Riya Sharma",
    role: "Restaurant Owner",
  },
  {
    quote:
      "I used to struggle finding affordable meals. SustainBite brought hope and food back into our lives.",
    name: "Aman Kumar",
    role: "Community Member",
  },
  {
    quote:
      "SustainBite has created a positive impact in our community. We're proud to partner with them!",
    name: "Kavita Singh",
    role: "NGO Volunteer",
  },
  {
    quote:
      "This is not just a food rescue site—it's a movement. A powerful idea turned into action.",
    name: "Raj Malhotra",
    role: "Environmental Activist",
  },
  {
    quote:
      "We're saving money and helping others at the same time. This platform is a blessing.",
    name: "Priya Gupta",
    role: "Catering Business Owner",
  },
  {
    quote:
      "Food rescue has never been this easy. Love the mission and the people behind it.",
    name: "Sunil Verma",
    role: "Event Manager",
  },
];

const Hero: React.FC = () => {
  const beliefs: Belief[] = [
    {
      icon: (
        <FaTrashAlt className="text-emerald-600 text-4xl" aria-hidden="true" />
      ),
      title: "Good food belongs to people, not landfills",
      description: "Up to 40% of food produced is wasted globally",
      stat: "40%",
    },
    {
      icon: (
        <FaAppleAlt className="text-emerald-600 text-4xl" aria-hidden="true" />
      ),
      title: "Everyone has a right to healthy food",
      description: "1 in 7 people experiences hunger every day",
      stat: "1 in 7",
    },
    {
      icon: (
        <FaRecycle className="text-emerald-600 text-4xl" aria-hidden="true" />
      ),
      title: "Climate change requires urgent action",
      description:
        "Food waste is a major contributor to greenhouse gas emissions",
      stat: "8-10%",
    },
  ];

  return (
    <main className="w-full overflow-hidden">
      {/* Hero Section with Video */}
      <section
        className="relative h-[650px] md:h-[750px] w-full overflow-hidden"
        aria-label="Hero section"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className={`absolute top-0 left-0 w-full h-full object-cover z-0`}
        >
          <source src="/hero_vid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Enhanced Gradient Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/60 via-black/50 to-black/70 z-10" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-emerald-900/20 to-teal-900/20 z-10" />

        {/* Hero Content */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 max-w-5xl leading-tight animate-fadeIn tracking-tight">
            Rescuing Food, Feeding Communities, Sustaining Our Planet
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed mb-10 font-medium">
            At SustainBite, we believe no good food should go to waste while
            people go hungry. Join us in creating a sustainable cycle of care
            and compassion by connecting surplus food with communities in need.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:justify-center gap-5 w-full max-w-md sm:max-w-none">
            <Link
              href="/donate"
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold px-10 py-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-500/30 transition-all duration-300 shadow-2xl hover:shadow-emerald-500/25 hover:scale-105 transform text-lg"
            >
              Donate Surplus Food
            </Link>
            <Link
              href="/available"
              className="bg-white/95 backdrop-blur text-emerald-700 font-bold px-10 py-4 rounded-xl hover:bg-white focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-300 shadow-2xl hover:scale-105 transform border border-white/20 text-lg"
            >
              Find Food Near You
            </Link>
          </div>
        </div>
      </section>

      {/* Beliefs Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Our Core Beliefs
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles drive everything we do at SustainBite
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {beliefs.map((belief, index) => (
              <article
                key={index}
                className="group bg-white p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-bl-full opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    {belief.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                    {belief.title}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed mb-4">
                    {belief.description}
                  </p>
                  <div className="text-center">
                    <span className="inline-block bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 font-bold px-5 py-2.5 rounded-xl text-sm ring-1 ring-emerald-200">
                      {belief.stat} Food Waste
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            {[
              { value: "10,000+", label: "Meals Rescued" },
              { value: "500+", label: "Partner Restaurants" },
              { value: "50+", label: "Communities Served" },
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="text-5xl md:text-6xl font-black mb-3 bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 inline-block">
                  {stat.value}
                </div>
                <div className="text-lg text-emerald-100 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Slider Section */}
      <section className="py-20 bg-white" aria-label="Community impact gallery">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 text-center mb-14">
            Making a Difference Together
          </h2>
          <ImageSlider />
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        className="py-20 bg-gradient-to-b from-gray-50 to-white"
        aria-label="Testimonials"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Stories from Our Community
            </h2>
            <p className="text-lg text-gray-600">
              Hear from those making an impact with SustainBite
            </p>
          </div>

          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={32}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <article className="bg-white rounded-2xl shadow-xl p-10 h-80 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1">
                  <div>
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center mb-6">
                      <FaQuoteLeft
                        className="text-emerald-600 text-xl"
                        aria-hidden="true"
                      />
                    </div>
                    <blockquote className="text-gray-700 text-base leading-relaxed">
                      &quot;{testimonial.quote}&quot;
                    </blockquote>
                  </div>
                  <footer className="border-t border-gray-100 pt-5 mt-4">
                    <cite className="not-italic">
                      <div className="text-gray-900 font-bold text-lg">
                        {testimonial.name}
                      </div>
                      <div className="text-emerald-600 text-sm font-medium">
                        {testimonial.role}
                      </div>
                    </cite>
                  </footer>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 py-20 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6">
            Together, We Can Make a Difference
          </h2>
          <p className="text-lg sm:text-xl mb-10 text-emerald-100 leading-relaxed max-w-3xl mx-auto">
            Join thousands of restaurants, volunteers, and community members in
            our mission to eliminate food waste and fight hunger.
          </p>
          <Link
            href="/volunteer"
            className="inline-block bg-white text-emerald-700 font-bold px-10 py-4 rounded-xl hover:bg-emerald-50 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-300 shadow-2xl hover:scale-105 transform text-lg"
          >
            Get Involved Today
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Hero;
