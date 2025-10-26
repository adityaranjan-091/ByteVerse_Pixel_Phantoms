"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight, FaPause, FaPlay } from "react-icons/fa";

interface ImageType {
  src: string;
  alt: string;
  caption?: string;
}

const ImageSlider: React.FC = () => {
  const images: ImageType[] = [
    {
      src: "/slider-images/img-1.png",
      alt: "Night Food Distribution",
      caption: "Volunteers distributing food at night to those in need",
    },
    {
      src: "/slider-images/img-2.png",
      alt: "Farm to Community",
      caption: "Fresh produce being delivered from farms to local communities",
    },
    {
      src: "/slider-images/img-3.png",
      alt: "Volunteer Team Unity",
      caption: "A group of dedicated volunteers united for a common cause",
    },
    {
      src: "/slider-images/img-4.png",
      alt: "Food Waste Prevention",
      caption: "Preventing food waste by rescuing surplus food from businesses",
    },
    {
      src: "/slider-images/img-11.jpg",
      alt: "Sustainable food practices",
      caption: "Technology connecting donors and recipients",
    },
    {
      src: "/slider-images/img-12.png",
      alt: "Volunteer support",
      caption: "Volunteers making a difference",
    },
    {
      src: "/slider-images/img-5.png",
      alt: "Elder Receiving Meal",
      caption: "An elderly person happily receiving a meal from a volunteer",
    },
    {
      src: "/slider-images/img-6.png",
      alt: "Mobile Food Distribution Van",
      caption: "A van equipped for mobile food distribution in urban areas",
    },
    {
      src: "/slider-images/img-13.png",
      alt: "Food rescue initiative",
      caption: "Rescuing surplus food from local businesses",
    },
    {
      src: "/slider-images/img-10.png",
      alt: "Community food distribution",
      caption: "Delivering meals to communities in need",
    },
    {
      src: "/slider-images/img-7.png",
      alt: "Traditional Meal Packaging",
      caption: "Volunteers packaging traditional meals for distribution",
    },
    {
      src: "/slider-images/img-8.png",
      alt: "Community Food Distribution",
      caption: "Volunteers distributing food to a community gathering",
    },
    {
      src: "/slider-images/img-9.png",
      alt: "Tech Enabled Food Donation",
      caption: "Using technology to streamline food donation processes",
    },
  ];

  const [index, setIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);

  const goToNext = useCallback(() => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  const goToSlide = useCallback((slideIndex: number) => {
    setIndex(slideIndex);
  }, []);

  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      goToNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, goToNext]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      goToNext();
    }
    if (touchStart - touchEnd < -75) {
      goToPrevious();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.code === "Space") {
        e.preventDefault();
        togglePlayPause();
      }
    };

    const sliderElement = document.querySelector(".group");
    sliderElement?.addEventListener("keydown", handleKeyDown as EventListener);

    return () => {
      sliderElement?.removeEventListener(
        "keydown",
        handleKeyDown as EventListener
      );
    };
  }, [goToNext, goToPrevious, togglePlayPause]);

  return (
    <div
      className="w-full max-w-6xl mx-auto relative group"
      role="region"
      aria-roledescription="carousel"
      aria-label="Image carousel showing SustainBite's impact"
    >
      {/* Main Slider Container */}
      <div
        className="relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-gray-900/5"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Images */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((image, i) => (
            <div
              key={i}
              className="min-w-full relative"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${images.length}`}
              aria-hidden={i !== index}
            >
              <div className="relative w-full h-[350px] sm:h-[450px] md:h-[500px] lg:h-[550px] bg-gradient-to-br from-gray-100 to-gray-200">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  priority={i === 0}
                  loading={i === 0 ? undefined : "lazy"}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                />
                {/* Gradient Overlay for Caption */}
                {image.caption && (
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 flex justify-center items-end">
                    <div className="max-w-4xl">
                      <p className="text-white text-base sm:text-lg font-semibold text-center drop-shadow-lg">
                        {image.caption}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm hover:bg-white text-gray-800 p-4 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 z-10 hover:scale-110 transform"
          aria-label="Previous slide"
        >
          <FaChevronLeft className="text-lg md:text-xl" aria-hidden="true" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm hover:bg-white text-gray-800 p-4 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 z-10 hover:scale-110 transform"
          aria-label="Next slide"
        >
          <FaChevronRight className="text-lg md:text-xl" aria-hidden="true" />
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          className="absolute top-4 md:top-6 right-4 md:right-6 bg-white/95 backdrop-blur-sm hover:bg-white text-gray-800 p-3 md:p-4 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 z-10 hover:scale-110 transform"
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? (
            <FaPause className="text-sm md:text-base" aria-hidden="true" />
          ) : (
            <FaPlay
              className="text-sm md:text-base ml-0.5"
              aria-hidden="true"
            />
          )}
        </button>

        {/* Slide Counter Badge */}
        <div className="absolute top-4 md:top-6 left-4 md:left-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-xl shadow-xl z-10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300">
          <span className="text-sm font-bold">
            {index + 1} / {images.length}
          </span>
        </div>
      </div>

      {/* Dots Navigation */}
      <div
        className="flex justify-center items-center gap-2.5 mt-8"
        role="tablist"
        aria-label="Slide navigation"
      >
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
              i === index
                ? "w-12 h-3 bg-gradient-to-r from-emerald-600 to-teal-600 shadow-md"
                : "w-3 h-3 bg-gray-300 hover:bg-gray-400 hover:scale-125"
            }`}
            aria-label={`Go to slide ${i + 1}`}
            role="tab"
            aria-selected={i === index}
            aria-controls={`slide-${i}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mt-6 w-full bg-gray-200 rounded-full h-1 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-600 to-teal-600 transition-all duration-300 rounded-full"
          style={{ width: `${((index + 1) / images.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default ImageSlider;
