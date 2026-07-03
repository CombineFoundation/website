"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

type Slide = {
  id: number;
  image: string;
  alt: string;
};

const slides: Slide[] = [
  {
    id: 1,
    image: "/home/heroslider/1.svg",
    alt: "Building communities together",
  },
  {
    id: 2,
    image: "/home/heroslider/2.svg",
    alt: "Empowering education across borders",
  },
  {
    id: 3,
    image: "/home/heroslider/3.svg",
    alt: "Creating lasting change",
  },
  {
    id: 4,
    image: "/home/heroslider/5.svg",
    alt: "Volunteers making a difference",
  },
];

type Direction = "next" | "prev";


export default function HeroSlider() {
  const [current, setCurrent] = useState<number>(0);
  const [sliding, setSliding] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>("next");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goNext = useCallback(() => {
    if (sliding) return;
    setDirection("next");
    setSliding(true);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
      setSliding(false);
    }, 400);
  }, [sliding]);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      goNext();
    }, 5000);
  }, [goNext]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const handleNext = () => {
    goNext();
    startTimer();
  };

  const handlePrev = () => {
    if (sliding) return;
    setDirection("prev");
    setSliding(true);
    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
      setSliding(false);
    }, 400);
    startTimer();
  };

  return (
    <section className="relative w-full aspect-[1280/480] overflow-hidden bg-gray-300">

      <div
        className="absolute inset-0"
        style={{
          opacity: sliding ? 0 : 1,
          transform: sliding
            ? direction === "next"
              ? "translateX(-30px)"
              : "translateX(30px)"
            : "translateX(0)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}
      >
        <Image
          src={slides[current].image}
          alt={slides[current].alt}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
      </div>

      <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 flex gap-2 z-10">
        <button
          onClick={handlePrev}
          aria-label="Previous slide"
          className="w-6 h-6 sm:w-9 sm:h-9 rounded-full border border-white/60 bg-white backdrop-blur-sm text-black flex items-center justify-center hover:bg-white/85 transition-colors duration-200 cursor-pointer"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3 h-3 sm:w-[18px] sm:h-[18px]"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button
          onClick={handleNext}
          aria-label="Next slide"
          className="w-6 h-6 sm:w-9 sm:h-9 rounded-full border border-white/60 bg-white backdrop-blur-sm text-black flex items-center justify-center hover:bg-white/85 transition-colors duration-200 cursor-pointer"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3 h-3 sm:w-[18px] sm:h-[18px]"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-0.5 sm:gap-1.5 z-10">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`h-1 sm:h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-3 sm:w-6" : "w-1.5"
            }`}
            style={{
              background:
                i === current ? "#fff" : "rgba(255,255,255,0.4)",
            }}
          />
        ))}
      </div>
    </section>
  );
}