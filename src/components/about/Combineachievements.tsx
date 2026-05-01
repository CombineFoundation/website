"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import SectionHeader from "@/components/UI/SectionHeader";
type Achievement = {
    id: number;
    title: string;
    paragraphs: string[];
    images: string[];
};

const achievements: Achievement[] = [
    {
        id: 1,
        title: "Title of the Achievement",
        paragraphs: [
            "Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id. Praesent lorem orci, mattis non efficitur id, Curabitur pellentesque",
            "nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id. Praesent lorem orci, mattis non efficitur id,",
        ],
        images: [
            "/about/achievements/achievements.png",
            "/about/achievements/achievements.png",
            "/about/achievements/achievements.png",
            "/about/achievements/achievements.png",
        ],
    },
    {
        id: 2,
        title: "Second Achievement",
        paragraphs: [
            "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.",
            "Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante.",
        ],
        images: [
            "/about/achievements/achievements.png",
            "/about/achievements/achievements.png",
            "/about/achievements/achievements.png",
            "/about/achievements/achievements.png",
        ],
    },
];

type Direction = "next" | "prev";

export default function CombineAchievements() {
    const [current, setCurrent] = useState<number>(0);
    const [sliding, setSliding] = useState<boolean>(false);
    const [direction, setDirection] = useState<Direction>("next");
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const goTo = useCallback(
        (dir: Direction) => {
            if (sliding) return;
            setDirection(dir);
            setSliding(true);
            setTimeout(() => {
                setCurrent((prev) =>
                    dir === "next"
                        ? (prev + 1) % achievements.length
                        : (prev - 1 + achievements.length) % achievements.length
                );
                setSliding(false);
            }, 350);
        },
        [sliding]
    );

    const startTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => goTo("next"), 5000);
    }, [goTo]);

    useEffect(() => {
        startTimer();
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [startTimer]);

    const handlePrev = () => {
        goTo("prev");
        startTimer();
    };

    const handleNext = () => {
        goTo("next");
        startTimer();
    };

    const item = achievements[current];

    return (
        <section className="w-full max-w-5xl mx-auto px-6 py-10 md:py-14">
            <SectionHeader title="Combine&apos;s Achievements" />

            <div
                className="rounded-2xl border border-gray-200 bg-[#F9F9F9] p-6 md:p-8 flex flex-col md:flex-row gap-8 overflow-hidden justify-center items-center"
                style={{
                    opacity: sliding ? 0 : 1,
                    transform: sliding
                        ? direction === "next"
                            ? "translateX(-16px)"
                            : "translateX(16px)"
                        : "translateX(0)",
                    transition: "opacity 0.35s ease, transform 0.35s ease",
                }}
            >
                <div className="flex-1">
                    <h3 className="text-gray-900 font-bold text-xl md:text-2xl mb-4">
                        {item.title}
                    </h3>
                    <div className="space-y-4">
                        {item.paragraphs.map((para, i) => (
                            <p key={i} className="text-gray-600 text-sm leading-5">
                                {para}
                            </p>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 shrink-0 w-full md:w-[52%]">
                    {item.images.map((src, i) => (
                        <div
                            key={i}
                            className="relative rounded-xl overflow-hidden"
                            style={{ height: "clamp(120px, 14vw, 190px)" }}
                        >
                            <Image
                                src={src}
                                alt={`${item.title} image ${i + 1}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end gap-3 mt-5">
                <button
                    onClick={handlePrev}
                    aria-label="Previous achievement"
                    className="w-11 h-11 rounded-full bg-[#1a3a7c] hover:bg-[#243d73] text-white flex items-center justify-center transition-colors duration-200 cursor-pointer"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>
                <button
                    onClick={handleNext}
                    aria-label="Next achievement"
                    className="w-11 h-11 rounded-full bg-[#1a3a7c] hover:bg-[#243d73] text-white flex items-center justify-center transition-colors duration-200 cursor-pointer"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>
            </div>
        </section>
    );
}