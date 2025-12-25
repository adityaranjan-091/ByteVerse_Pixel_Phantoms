"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight, FaPause, FaPlay } from "react-icons/fa";

interface SlideData {
  src: string;
  alt: string;
  caption?: string;
}

const SLIDES: SlideData[] = [
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

const AUTO_PLAY_INTERVAL = 5000;

const ImageSlider: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);

  // Memoize navigation functions
  const goToNext = useCallback(() => {
    setIndex((prevIndex) => (prevIndex + 1) % SLIDES.length);
  }, []);

  const goToPrevious = useCallback(() => {
    setIndex((prevIndex) => (prevIndex - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  const goToSlide = useCallback((slideIndex: number) => {
    setIndex(slideIndex);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isHovered) {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          goToPrevious();
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          goToNext();
        } else if (e.code === "Space") {
          e.preventDefault();
          setIsPlaying((prev) => !prev);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isHovered, goToNext, goToPrevious]);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const timer = setInterval(goToNext, AUTO_PLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, index, goToNext]);
  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) =>
    setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) =>
    setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isSwipeLeft = distance > swipeThreshold;
    const isSwipeRight = distance < -swipeThreshold;

    if (isSwipeLeft) goToNext();
    if (isSwipeRight) goToPrevious();

    setTouchStart(0);
    setTouchEnd(0);
  };

  // Common button classes
  const navBtnBaseClass =
    "absolute top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/90 text-white hover:text-gray-900 p-3 sm:p-4 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 z-20 hover:scale-110 opacity-0 group-hover:opacity-100";

  return (
    <div
      className="w-full max-w-6xl mx-auto relative group px-4"
      role="region"
      aria-roledescription="carousel"
      aria-label="Impact Gallery"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setTimeout(() => setIsHovered(false), 2000)} // Resume after touch interaction
    >
      {/* Main Container */}
      <div
        className="relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-gray-900/5 aspect-[16/9] sm:aspect-[2/1] md:aspect-[16/7]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slides Track */}
        <div
          className="flex transition-transform duration-700 ease-out h-full"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {SLIDES.map((slide, i) => (
            <div
              key={i}
              className="min-w-full relative h-full bg-gray-100"
              role="group"
              aria-roledescription="slide"
              aria-hidden={i !== index}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover"
                priority={i === 0}
                loading={i === 0 ? "eager" : "lazy"}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              />
              {/* Caption Overlay */}
              {slide.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 sm:p-10 flex flex-col justify-end items-center text-center h-1/2">
                  <p
                    className="text-white text-base sm:text-lg md:text-xl font-medium tracking-wide drop-shadow-md max-w-prose opacity-0 animate-fade-in-up"
                    style={{
                      animationDelay: "0.3s",
                      animationFillMode: "forwards",
                    }}
                  >
                    {slide.caption}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Controls Overlay (Only visible on hover) */}

        {/* Previous Button */}
        <button
          onClick={goToPrevious}
          className={`${navBtnBaseClass} left-4`}
          aria-label="Previous image"
        >
          <FaChevronLeft className="text-lg" />
        </button>

        {/* Next Button */}
        <button
          onClick={goToNext}
          className={`${navBtnBaseClass} right-4`}
          aria-label="Next image"
        >
          <FaChevronRight className="text-lg" />
        </button>

        {/* Play/Pause Toggle */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white p-2.5 rounded-full transition-all duration-300 z-20 opacity-0 group-hover:opacity-100"
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? (
            <FaPause size={12} />
          ) : (
            <FaPlay size={12} className="ml-0.5" />
          )}
        </button>

        {/* Slide Counter */}
        <div className="absolute top-4 left-4 bg-black/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wider z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {index + 1} / {SLIDES.length}
        </div>
      </div>

      {/* Navigation Indicators (Dots) */}
      <div className="flex justify-center items-center gap-2 mt-6">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`transition-all duration-300 rounded-full h-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              i === index
                ? "w-8 bg-emerald-600"
                : "w-2 bg-gray-300 hover:bg-emerald-400"
            }`}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
          />
        ))}
      </div>

      {/* Progress Bar (Autoplay Indicator) */}
      {isPlaying && !isHovered && (
        <div className="w-full h-0.5 bg-gray-100 mt-4 rounded-full overflow-hidden relative">
          <div
            key={index}
            className="absolute top-0 left-0 h-full bg-emerald-500 animate-progress origin-left"
            style={{
              animationDuration: `${AUTO_PLAY_INTERVAL}ms`,
              animationTimingFunction: "linear",
            }}
          />
        </div>
      )}
      <style jsx global>{`
        @keyframes progress {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ImageSlider;
