"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import type { FirestorePartner } from "@/lib/admin-actions";

type Direction = "next" | "prev";

interface PartnersSectionProps {
  partners: FirestorePartner[];
}

export default function PartnersSection({
  partners,
}: PartnersSectionProps) {
  const [current, setCurrent] = useState<number>(0);
  const [sliding, setSliding] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>("next");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (dir: Direction) => {
      if (sliding || partners.length === 0) return;

      setDirection(dir);
      setSliding(true);

      setTimeout(() => {
        setCurrent((prev) =>
          dir === "next"
            ? (prev + 1) % partners.length
            : (prev - 1 + partners.length) % partners.length
        );

        setSliding(false);
      }, 400);
    },
    [sliding, partners.length]
  );

  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      goTo("next");
    }, 5000);
  }, [goTo]);

  useEffect(() => {
    if (partners.length > 0) {
      startTimer();
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [startTimer, partners.length]);

  const handlePrev = () => {
    goTo("prev");
    startTimer();
  };

  const handleNext = () => {
    goTo("next");
    startTimer();
  };

  if (!partners.length) {
    return null;
  }

  const partner = partners[current];

  const [firstWord, ...remainingWords] = partner.name.split(" ");
  const remainingName = remainingWords.join(" ");

  return (
    <section
      className="w-full mx-auto py-10 px-6 md:px-12 lg:px-16"
      style={{ maxWidth: "1500px" }}
    >
      <div className="m-w-[1500px]">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black border-b border-black pb-4 mb-10">
          Our Partners
        </h2>
      </div>

      <div
        className="relative w-full overflow-hidden rounded-2xl"
        style={{ height: "500px" }}
      >
        <div
          className="absolute inset-0 transition-all w-full duration-400 ease-in-out rounded-2xl"
          style={{
            opacity: sliding ? 0 : 1,
            transform: sliding
              ? direction === "next"
                ? "translateX(-20px)"
                : "translateX(20px)"
              : "translateX(0)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
          }}
        >
          <Image
            src={partner.image}
            alt={partner.name}
            fill
            className="object-cover object-center rounded-2xl"
            priority
          />

          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div
          className="absolute inset-0 flex flex-col justify-center px-8 md:px-12 lg:px-16 max-w-3xl"
          style={{
            opacity: sliding ? 0 : 1,
            transition: "opacity 0.3s ease",
          }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">
            <span className="text-primary-400">{firstWord}</span>
            {remainingName && (
              <span className="text-white"> {remainingName}</span>
            )}
          </h3>

          <p className="text-sm md:text-base text-white/90 leading-relaxed line-clamp-6">
            {partner.description}
          </p>

          <a
            href={partner.mou}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-fit px-6 py-3 mt-6 rounded-full border-2 border-white/80 text-white/80 hover:bg-white hover:text-primary-800 font-semibold text-sm transition-all duration-200"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
            View MOU
          </a>
        </div>
      </div>

      <div className="flex justify-center sm:justify-start gap-3 mt-8 px-4 md:px-6 lg:px-8">
        <button
          onClick={handlePrev}
          aria-label="Previous partner"
          className="w-11 h-11 rounded-full bg-primary-700 hover:brightness-90 text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button
          onClick={handleNext}
          aria-label="Next partner"
          className="w-11 h-11 rounded-full bg-primary-700 hover:brightness-90 text-white flex in items-center justify-center transition-all duration-200 cursor-pointer"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
