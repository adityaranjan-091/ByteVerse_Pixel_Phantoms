import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-green-800 mb-6">
          About SustainBite
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700">
            At SustainBite, we believe no good food should go to waste while
            people go hungry. Our mission is to rescue surplus food from
            restaurants, stores, and events, and deliver it to communities in
            need—creating a sustainable cycle of care and compassion.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">
            The Problem
          </h2>
          <p className="text-gray-700">
            Every year, millions of tons of edible food are thrown away, while
            one in eight people struggles with hunger. We’re here to bridge that
            gap, one meal at a time.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">
            How It Works
          </h2>
          <p className="text-gray-700">
            We partner with local donors—restaurants, grocery stores, and
            individuals—to collect surplus food. Volunteers and recipients
            connect through our platform to pick up and distribute meals,
            ensuring nothing goes to waste.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">
            Our Story
          </h2>
          <p className="text-gray-700">
            SustainBite was born from a student-led initiative, inspired by the
            belief that food should be shared, not wasted, to help feed those in
            need. As budding developers, we wanted to build something
            meaningful—combining our passion for coding with a cause that
            matters. This is our way of learning, experimenting, and making a
            difference.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">
            Our Vision
          </h2>
          <p className="text-gray-700">
            We dream of a world where every community has access to fresh,
            rescued food, and where sustainability is a way of life. SustainBite
            is just the beginning!
          </p>
        </section>

        <section>
          <Link href={"/volunteer"}>
            <li className="inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors">
              Join Us
            </li>
          </Link>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Hero;
