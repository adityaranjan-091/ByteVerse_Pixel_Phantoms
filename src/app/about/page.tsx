import React from "react";
import Link from "next/link";
import {
  FaLeaf,
  FaHandHoldingHeart,
  FaUsers,
  FaLightbulb,
  FaRecycle,
  FaChartLine,
  FaHeart,
  FaTrophy,
} from "react-icons/fa";

interface Stat {
  value: string;
  label: string;
  icon: React.ReactNode;
}

interface Value {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const AboutPage: React.FC = () => {
  const stats: Stat[] = [
    {
      value: "10L+",
      label: "Meals Rescued",
      icon: (
        <FaHandHoldingHeart
          className="text-3xl text-emerald-600"
          aria-hidden="true"
        />
      ),
    },
    {
      value: "500+",
      label: "Partner Restaurants",
      icon: (
        <FaUsers className="text-3xl text-emerald-600" aria-hidden="true" />
      ),
    },
    {
      value: "50+",
      label: "Cities Across India",
      icon: (
        <FaChartLine className="text-3xl text-emerald-600" aria-hidden="true" />
      ),
    },
    {
      value: "5,000+",
      label: "Active Volunteers",
      icon: (
        <FaHeart className="text-3xl text-emerald-600" aria-hidden="true" />
      ),
    },
  ];

  const values: Value[] = [
    {
      icon: <FaLeaf className="text-3xl text-emerald-600" aria-hidden="true" />,
      title: "Sustainability",
      description:
        "We're committed to reducing food waste and protecting our environment for future generations.",
    },
    {
      icon: (
        <FaHandHoldingHeart
          className="text-3xl text-emerald-600"
          aria-hidden="true"
        />
      ),
      title: "Compassion",
      description:
        "Every meal we rescue represents care for both people and the planet.",
    },
    {
      icon: (
        <FaUsers className="text-3xl text-emerald-600" aria-hidden="true" />
      ),
      title: "Community",
      description:
        "We bring together restaurants, volunteers, and communities to create lasting change.",
    },
    {
      icon: (
        <FaLightbulb className="text-3xl text-emerald-600" aria-hidden="true" />
      ),
      title: "Innovation",
      description:
        "Using technology to solve real-world problems and make food rescue accessible to all.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 py-24 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
            About SustainBite
          </h1>
          <p className="text-lg md:text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
            Rescuing surplus food, feeding communities, and building a
            sustainable future—one meal at a time across India.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-bl-full opacity-50"></div>
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-semibold text-sm">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl mb-6 shadow-lg">
              <FaTrophy className="text-4xl text-white" aria-hidden="true" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Our Mission
            </h2>
          </div>
          <div className="relative bg-white p-10 rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-br-full opacity-30"></div>
            <p className="relative text-lg text-gray-700 leading-relaxed text-center">
              At SustainBite, we believe no good food should go to waste while
              people go hungry. Our mission is to rescue surplus food from
              restaurants, hotels, events, and stores across India, and deliver
              it to communities in need—creating a sustainable cycle of care,
              compassion, and environmental responsibility.
            </p>
          </div>
        </div>
      </section>

      {/* The Problem & Solution */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* The Problem */}
            <div className="group bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-bl-full opacity-50"></div>
              <div className="relative">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-orange-100 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <FaRecycle
                      className="text-2xl text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <h2 className="text-2xl font-black text-gray-900">
                    The Problem
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Every year in India,{" "}
                  <span className="font-bold text-red-600">
                    68 million tonnes
                  </span>{" "}
                  of food is wasted—enough to feed the entire population of
                  Bihar. Meanwhile,
                  <span className="font-bold text-red-600">
                    {" "}
                    1 in 7 Indians
                  </span>{" "}
                  goes to bed hungry every night.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Food waste contributes to{" "}
                  <span className="font-bold text-red-600">
                    8-10% of global greenhouse gas emissions
                  </span>
                  , accelerating climate change while perfectly edible food ends
                  up in landfills.
                </p>
              </div>
            </div>

            {/* Our Solution */}
            <div className="group bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full opacity-50"></div>
              <div className="relative">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <FaLightbulb
                      className="text-2xl text-emerald-600"
                      aria-hidden="true"
                    />
                  </div>
                  <h2 className="text-2xl font-black text-gray-900">
                    Our Solution
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We bridge the gap between surplus and scarcity. Through our
                  platform, we connect food donors with volunteers and NGOs to
                  ensure that excess food reaches those who need it most.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  By leveraging technology and community power, we&apos;re
                  creating a sustainable ecosystem where{" "}
                  <span className="font-bold text-emerald-600">
                    zero food goes to waste
                  </span>{" "}
                  and
                  <span className="font-bold text-emerald-600">
                    {" "}
                    zero person goes hungry
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Simple steps to rescue food and feed communities
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: "1",
                title: "Food Donation",
                desc: "Restaurants, hotels, and events list their surplus food on our platform with details about quantity and pickup time.",
              },
              {
                num: "2",
                title: "Volunteer Pickup",
                desc: "Our verified volunteers receive notifications and collect the food promptly, ensuring freshness and food safety.",
              },
              {
                num: "3",
                title: "Community Distribution",
                desc: "Food is distributed to partnered NGOs, shelters, and communities, ensuring no one goes to bed hungry.",
              },
            ].map((step, index) => (
              <div key={index} className="group text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-2xl flex items-center justify-center text-2xl font-black mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {step.num}
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-10 left-full w-full">
                      <svg
                        className="w-full h-1 text-emerald-200"
                        fill="currentColor"
                      >
                        <rect width="100%" height="2" />
                      </svg>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 text-center transform hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="relative py-24 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-8">Our Vision</h2>
          <p className="text-lg md:text-xl text-emerald-100 leading-relaxed mb-8">
            We dream of a{" "}
            <span className="font-bold text-white">hunger-free India</span>{" "}
            where every community has access to fresh, rescued food, and where
            sustainability is woven into the fabric of daily life. We envision
            cities where food waste is a thing of the past, and compassion is
            the currency that feeds our nation.
          </p>
          <p className="text-lg text-emerald-100 font-semibold">
            SustainBite is just the beginning! Join us in creating a future
            where no food goes to waste and no one goes hungry.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
            Be Part of the Change
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Whether you&apos;re a restaurant owner, volunteer, or someone who
            cares about making a difference—there&apos;s a place for you at
            SustainBite.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/volunteer"
              className="inline-flex items-center justify-center bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Become a Volunteer
            </Link>
            <Link
              href="/donate-food"
              className="inline-flex items-center justify-center bg-white text-emerald-600 border-2 border-emerald-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              Donate Surplus Food
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
