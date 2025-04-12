"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface ImageType {
  src: string;
  alt: string;
}

const ImageSlider: React.FC = () => {
  const images: ImageType[] = [
    { src: "/food-rescue.png", alt: "Food rescue initiative" },
    { src: "/food-people.avif", alt: "Community food distribution" },
    { src: "/phones-hero.jpg", alt: "Sustainable food practices" },
    { src: "/volunteer.png", alt: "Volunteer support" },
    { src: "/food-sharing.jpeg", alt: "Food sharing event" },
  ];

  const [index, setIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const newIndex = prevIndex + direction;
        let newDirection = direction;

        if (newIndex >= images.length - 1 || newIndex <= 0) {
          newDirection = -direction;
        }

        setDirection(newDirection);
        return newIndex;
      });
    }, 3000); // Slide every 3 seconds

    return () => clearInterval(interval);
  }, [direction, images.length]);

  return (
    <div className="w-full max-w-7xl mx-auto overflow-hidden relative">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((image, i) => (
          <div key={i} className="min-w-full relative">
            <div className="relative w-full h-[450px] rounded-xl overflow-hidden shadow-lg">
              {" "}
              {/* Reduced the height to 450px */}
              <Image
                src={image.src}
                alt={image.alt}
                layout="fill"
                className="object-contain"
                priority={i === 0}
                loading={i === 0 ? undefined : "lazy"}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
