"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

const TESTIMONIALS = [
    {
        name: "Faysal Aziz Khan",
        role: "Youth Leader | Combine Foundation",
        quote:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu.",
        image: "/volunteer/vol2.png",
    },
    {
        name: "Sarah Ahmed",
        role: "Community Lead | Combine Foundation",
        quote:
            "Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.",
        image: "/volunteer/vol2.png",
    },
    {
        name: "Omar Farooq",
        role: "Program Officer | Combine Foundation",
        quote:
            "Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Maecenas vitae mattis tellus. Nullam quis imperdiet augue vestibulum.",
        image: "/volunteer/vol2.png",
    },
];

type Direction = "next" | "prev";

export default function HearFromVolunteers() {
    const [current, setCurrent] = useState(0);
    const [sliding, setSliding] = useState(false);
    const [direction, setDirection] = useState<Direction>("next");
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const goNext = useCallback(() => {
        if (sliding) return;
        setDirection("next");
        setSliding(true);
        setTimeout(() => {
            setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
            setSliding(false);
        }, 400);
    }, [sliding]);

    const goPrev = useCallback(() => {
        if (sliding) return;
        setDirection("prev");
        setSliding(true);
        setTimeout(() => {
            setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
            setSliding(false);
        }, 400);
    }, [sliding]);

    const startTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            goNext();
        }, 6000);
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
        goPrev();
        startTimer();
    };

    const t = TESTIMONIALS[current];

    return (
        <section className="w-full py-16 md:py-24 bg-[#F7FBFF]">
            <div className="w-full px-6 md:px-12">

                {/* Title */}
                <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight mb-4">
                    Hear from our Volunteers
                </h2>
                {/* Full-width divider */}
                <div className="w-full h-px bg-gray-200 mb-12" />

                {/* Content row with transition */}
                <div 
                    className="flex flex-col min-[550px]:flex-row items-center gap-8 md:gap-16"
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

                    {/* ── Left: text ── */}
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-center min-[550px]:justify-start gap-x-3 gap-y-1 mb-4">
                            <span className="text-lg md:text-xl font-bold text-gray-900 whitespace-nowrap">
                                {t.name}
                            </span>
                            <span className="text-gray-400 font-light text-lg select-none">—</span>
                            <span className="text-sm md:text-base text-gray-500 font-medium">
                                {t.role}
                            </span>
                        </div>

                        <p className="text-sm md:text-base text-gray-600 leading-relaxed text-center min-[550px]:text-left">
                            {t.quote}
                        </p>
                    </div>

                    {/* ── Right: image ── */}
                    <div className="relative shrink-0 w-full min-[550px]:w-48 h-[280px] min-[550px]:h-60">
                        <div className="relative w-full h-full rounded-2xl overflow-hidden z-10">
                            <Image
                                src={t.image}
                                alt={t.name}
                                fill
                                className="object-cover object-top"
                                sizes="(max-width: 768px) 100vw, 192px"
                            />
                        </div>
                    </div>

                </div>

                {/* ── Footer: Nav buttons ── */}
                <div className="flex justify-center sm:justify-end gap-3 mt-12">
                    <button
                        onClick={handlePrev}
                        aria-label="Previous"
                        className="w-10 h-10 rounded-full bg-[#0f2d5c] flex items-center justify-center
                       transition-all duration-200 hover:bg-[#0f2d5c]/80 hover:scale-105 active:scale-95"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M10 12L6 8l4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button
                        onClick={handleNext}
                        aria-label="Next"
                        className="w-10 h-10 rounded-full bg-[#0f2d5c] flex items-center justify-center
                       transition-all duration-200 hover:bg-[#0f2d5c]/80 hover:scale-105 active:scale-95"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M6 4l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

            </div>
        </section>
    );
}