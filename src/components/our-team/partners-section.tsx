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
    <div className="group grid grid-cols-1 md:grid-cols-5 gap-0 rounded-3xl overflow-hidden mb-5">
      {/* Text */}
      <div className="md:col-span-3 flex flex-col justify-center p-8 md:p-10 lg:p-12">
        <h3 className="text-xl md:text-2xl font-bold mb-6">
          <span className="text-primary-600">{firstWord}</span>
          {remainingName && (
            <span className="text-secondary-500"> {remainingName}</span>
          )}
        </h3>
        <p className="text-sm md:text-base text-primary-800 leading-relaxed">
          {partner.description}
        </p>
        {partner.mouUrl && (
          <div className="mt-6">
            <a
              href={partner.mouUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-secondary-600 text-white font-medium text-sm rounded-lg hover:shadow-lg hover:brightness-110 transition-all duration-300 w-fit"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              View MOU
            </a>
          </div>
        )}

        {/* moved here */}
        <div className="flex gap-3 mt-8">
          <button onClick={handlePrev} aria-label="Previous partner" className="w-11 h-11 rounded-full bg-primary-700 hover:brightness-90 text-white flex items-center justify-center transition-all duration-200 cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button onClick={handleNext} aria-label="Next partner" className="w-11 h-11 rounded-full bg-primary-700 hover:brightness-90 text-white flex items-center justify-center transition-all duration-200 cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
      <div
        className="relative md:col-span-2 w-full overflow-hidden rounded-2xl"
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


      </div>

    </div>
  );
}
