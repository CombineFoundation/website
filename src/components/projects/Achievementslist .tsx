"use client";

import { useState } from "react";
import Image from "next/image";

type Stat = {
    value: string;
    label: string;
};

type Achievement = {
    id: number;
    title: string;
    images: string[];
    description: string;
    goal: string;
    stats: Stat[];
    beforeImage: string;
    afterImage: string;
    futurePlans: string;
    partners: string[];
};

const achievements: Achievement[] = [
    {
        id: 1,
        title: "Ramadan Bachat Camp With Hammad Foundation",
        images: [
            "/home/image1.avif",
            "/home/image1.avif",
            "/home/image1.avif",
            "/home/image1.avif",
            "/home/image1.avif",
            "/home/image1.avif",
            "/home/image1.avif",
            "/home/image1.avif",
            "/home/image1.avif",
            "/home/image1.avif",
            "/home/image1.avif",
            "/home/image1.avif",
            "/home/image1.avif",
            "/home/image1.avif",
            "/home/image1.avif",
            "/home/image1.avif",
        ],
        description:
            "Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id. Praesent lorem orci, mattis non efficitur id. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet.",
        goal: "Curabitur pellentesque commodo lacus at sodales sodales. Quisque sagittis.",
        stats: [
            { value: "800+", label: "Fruits Distributed" },
            { value: "1200+", label: "People Helped" },
            { value: "1200+", label: "People Helped" },
            { value: "1200+", label: "People Helped" },
        ],
        beforeImage: "/home/image1.avif",
        afterImage: "/home/image1.avif",
        futurePlans:
            "Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.",
        partners: [
            "/home/image1.avif",
            "/home/image1.avif",
            "/home/image1.avif",
            "/home/image1.avif",
        ],
    },
    {
        id: 2,
        title: "Ramadan Bachat Camp With Hammad Foundation",
        images: [
            "/home/image1.avif",
            "/home/image1.avif",
            "/home/image1.avif",
        ],
        description:
            "Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales.",
        goal: "Pellentesque commodo lacus at sodales sodales. Quisque sagittis.",
        stats: [
            { value: "500+", label: "Meals Served" },
            { value: "300+", label: "Families Helped" },
            { value: "50+", label: "Volunteers" },
            { value: "10+", label: "Locations" },
        ],
        beforeImage: "/home/image1.avif",
        afterImage: "/home/image1.avif",
        futurePlans:
            "Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales.",
        partners: [
            "/home/image1.avif",
            "/home/image1.avif",
            "/home/image1.avif",
            "/home/image1.avif",
        ],
    },
];

type AchievementItemProps = {
    item: Achievement;
};

function AchievementItem({ item }: AchievementItemProps) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className="rounded-2xl overflow-hidden transition-all duration-300"
            style={{
                background: open ? "#0F3D6B" : "#ffffff",
                border: open ? "none" : "1.5px solid #e5e7eb",
            }}
        >
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="w-full flex items-center justify-between px-6 py-4 cursor-pointer"
            >
                <span
                    className="font-semibold text-sm md:text-base text-left transition-colors duration-300"
                    style={{ color: open ? "#ffffff" : "#111827" }}
                >
                    {item.title}
                </span>
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={open ? "white" : "#374151"}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 ml-3 transition-transform duration-300"
                    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>

            <div
                className="overflow-hidden transition-all duration-500 ease-in-out"
                style={{ maxHeight: open ? "4000px" : "0px" }}
            >
                <div className="px-6 pb-8 space-y-6">

                    <div
                        className="flex gap-3 overflow-x-auto pb-2"
                        style={{ scrollbarWidth: "none" }}
                    >
                        {item.images.map((src, i) => (
                            <div
                                key={i}
                                className="relative rounded-xl overflow-hidden shrink-0"
                                style={{ width: "250px", height: "250px" }}
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

                    <p className="text-white/85 text-sm leading-6">{item.description}</p>

                    <div>
                        <h4 className="text-white font-bold text-xl mb-1">Goal</h4>
                        <p className="text-white/85 text-base leading-6">{item.goal}</p>
                    </div>

                    <div className="grid sm:grid-cols-4 grid-cols-2 gap-7 sm:gap-3">
                        {item.stats.map((stat, i) => (
                            <div key={i} className="text-center">
                                <p className="text-white font-extrabold text-2xl leading-tight">{stat.value}</p>
                                <p className="text-white/80 text-xs leading-4 mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
                        <div className="">
                            <div className="relative rounded-2xl overflow-hidden mb-3  aspect-video w-[90%] m-auto ">
                                <Image src={item.beforeImage} alt="Before" fill className="object-cover" />
                            </div>
                            <p className="text-white text-center text-base font-bold tracking-wide">Before</p>
                        </div>
                        <div>
                            <div className="relative rounded-2xl overflow-hidden mb-3 aspect-video w-[90%]   m-auto ">
                                <Image src={item.afterImage} alt="After" fill className="object-cover" />
                            </div>
                            <p className="text-white text-center text-base font-bold tracking-wide">After</p>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold text-base mb-2">Future Plans</h4>
                        <p className="text-white/85 text-sm leading-6">{item.futurePlans}</p>
                    </div>

                    <div>
                        <h4 className="text-white font-bold text-base mb-4">Project Partners</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                            {item.partners.map((src, i) => (
                                <div
                                    key={i}
                                    className=" rounded-xl overflow-hidden shrink-0"
                                    style={{ width: "176px", height: "176x" }}
                                >
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={src}
                                            alt={`Partner ${i + 1}`}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default function AchievementsList() {
    return (
        <section className="w-full mx-auto sm:px-4 py-10 space-y-3">
            {achievements.map((item) => (
                <AchievementItem key={item.id} item={item} />
            ))}
        </section>
    );
}