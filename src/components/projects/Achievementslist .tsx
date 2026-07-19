"use client";

import Image from "next/image";
import { useRef } from "react";

interface ProjectItem {
    id: string;
    title: string;
    images: string[];
    description: string;
    goal: string;
    stats: { value: string; label: string }[];
    beforeImage: string;
    afterImage: string;
    futurePlans: string;
    partners: string[];
}

interface AchievementsListProps {
    projects: ProjectItem[];
    activeId: string | null;
    onToggle: (id: string) => void;
}

function ScrollableImages({ images, title }: { images: string[]; title: string }) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (dir: "left" | "right") => {
        if (!scrollRef.current) return;
        const amount = 280;
        scrollRef.current.scrollBy({
            left: dir === "left" ? -amount : amount,
            behavior: "smooth",
        });
    };

    return (
        <div className="relative group">
            {images.length > 2 && (
                <>
                    <button
                        onClick={() => scroll("left")}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        aria-label="Scroll left"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        aria-label="Scroll right"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                    </button>
                </>
            )}
            <div
                ref={scrollRef}
                className="flex gap-3 overflow-x-auto pb-2 scroll-smooth"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                onMouseDown={(e) => {
                    const el = scrollRef.current;
                    if (!el) return;
                    const startX = e.pageX;
                    const scrollLeft = el.scrollLeft;
                    const onMove = (ev: MouseEvent) => {
                        ev.preventDefault();
                        el.scrollLeft = scrollLeft - (ev.pageX - startX);
                    };
                    document.addEventListener("mousemove", onMove);
                    document.addEventListener("mouseup", () => {
                        document.removeEventListener("mousemove", onMove);
                    }, { once: true });
                }}
            >
                {images.map((src, i) => (
                    <div
                        key={i}
                        className="relative rounded-xl overflow-hidden shrink-0 w-[200px] sm:w-[250px] h-[200px] sm:h-[250px] hover:scale-[1.02] transition-transform duration-500"
                    >
                        <Image
                            src={src}
                            alt={`${title} image ${i + 1}`}
                            fill
                            className="object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

function AchievementItem({
    item,
    open,
    onToggle,
}: {
    item: ProjectItem;
    open: boolean;
    onToggle: () => void;
}) {
    return (
        <div
            id={`project-card-${item.id}`}
            className={`
                rounded-2xl overflow-hidden border
                transition-all duration-500 ease-in-out
                ${open
                    ? "bg-secondary-500 border-gray-600 "
                    : "bg-white border-gray-200 hover:border-gray-300"}
            `}
        >
            {/* Header */}
            <button
                onClick={onToggle}
                className="
                    w-full flex items-center justify-between
                    px-6 py-5 text-left cursor-pointer
                "
            >
                <span
                    className={`
                        font-semibold text-sm md:text-base
                        transition-colors duration-300
                        ${open ? "text-white" : "text-gray-900"}
                    `}
                >
                    {item.title}
                </span>

                <div
                    className={`
                        flex items-center justify-center
                        w-8 h-8 rounded-full
                        transition-all duration-500
                        ${open
                            ? "bg-white/15 rotate-180"
                            : "bg-gray-100 rotate-0"}
                    `}
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={open ? "white" : "#374151"}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </div>
            </button>

            {/* Content */}
            <div
                className={`
                    overflow-hidden transition-all duration-700 ease-in-out
                    ${open ? "max-h-[5000px]" : "max-h-0"}
                `}
            >
                <div
                    className={`
                        px-6 pb-8 space-y-6
                        transition-all duration-500
                        ${open
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-2"}
                    `}
                >
                    {/* Images */}
                    <ScrollableImages images={item.images} title={item.title} />

                    {/* Description */}
                    <p className="text-white/85 text-sm leading-6">
                        {item.description}
                    </p>

                    {/* Goal */}
                    <div>
                        <h4 className="text-white font-bold text-xl mb-1">
                            Goal
                        </h4>

                        <p className="text-white/85 text-base leading-6">
                            {item.goal}
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid sm:grid-cols-4 grid-cols-2 gap-4">
                        {item.stats.map((stat, i) => (
                            <div
                                key={i}
                                className="
                                    text-center py-5 rounded-2xl
                                    bg-white/5 border border-white/10
                                    backdrop-blur-sm
                                "
                            >
                                <p className="text-white font-extrabold text-2xl">
                                    {stat.value}
                                </p>

                                <p className="text-white/80 text-xs mt-1">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Before After */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-10">
                        <div>
                            <div className="relative rounded-2xl overflow-hidden aspect-video w-full mb-2">
                                <Image
                                    src={item.beforeImage}
                                    alt="Before"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <p className="text-white text-center font-bold">Before</p>
                        </div>
                        <div>
                            <div className="relative rounded-2xl overflow-hidden aspect-video w-full mb-2">
                                <Image
                                    src={item.afterImage}
                                    alt="After"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <p className="text-white text-center font-bold">After</p>
                        </div>
                    </div>

                    {/* Future Plans */}
                    <div>
                        <h4 className="text-white font-bold text-base mb-2">
                            Future Plans
                        </h4>

                        <p className="text-white/85 text-sm leading-6">
                            {item.futurePlans}
                        </p>
                    </div>

                    {/* Partners */}
                    <div>
                        <h4 className="text-white font-bold text-base mb-4">
                            Project Partners
                        </h4>

                        <div
                            className="flex gap-3 overflow-x-auto pb-2"
                            style={{ scrollbarWidth: "none" }}
                        >
                            {item.partners.map((src, i) => (
                                <div
                                    key={i}
                                    className="
                                        relative rounded-xl overflow-hidden
                                        shrink-0 w-[200px] h-[200px]
                                    "
                                >
                                    <Image
                                        src={src}
                                        alt={`Partner ${i + 1}`}
                                        fill
                                        className="object-contain p-4"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default function AchievementsList({ projects, activeId, onToggle }: AchievementsListProps) {
    return (
        <section className="max-w-[1500px] mx-auto px-4 md:px-6 lg:px-8 py-10 space-y-4">
            {projects.map((item) => (
                <AchievementItem
                    key={item.id}
                    item={item}
                    open={activeId === item.id}
                    onToggle={() => onToggle(item.id)}
                />
            ))}
        </section>
    );
}
