"use client";

import { useState } from "react";
import SectionHeader from "@/components/UI/SectionHeader";
type Value = {
    id: number;
    urdu: string;
    english: string;
    description: string;
};

const values: Value[] = [
    {
        id: 1,
        urdu: "سالمیت",
        english: "Integrity",
        description:
            "nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id. Praesent lorem orci, mattis non efficitur id,",
    },
    {
        id: 2,
        urdu: "بااختیاربنانا",
        english: "Empowerment",
        description:
            "nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id. Praesent lorem orci, mattis non efficitur id,",
    },
    {
        id: 3,
        urdu: "ہمدردی",
        english: "Compassion",
        description:
            "nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id. Praesent lorem orci, mattis non efficitur id,",
    },
    {
        id: 4,
        urdu: "اختراع",
        english: "Innovation",
        description:
            "nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id. Praesent lorem orci, mattis non efficitur id,",
    },
    {
        id: 5,
        urdu: "تعاون",
        english: "Collaboration",
        description:
            "nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id. Praesent lorem orci, mattis non efficitur id,",
    },
    {
        id: 6,
        urdu: "تعاون",
        english: "Collaboration",
        description:
            "nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id. Praesent lorem orci, mattis non efficitur id,",
    },
];


type ValueCardProps = {
    value: Value;
};

function ValueCard({ value }: ValueCardProps) {
    const [hovered, setHovered] = useState<boolean>(false);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative overflow-hidden rounded-2xl flex items-center justify-center text-center px-6 py-10 cursor-pointer bg-[#0F3D6B]"
            style={{ minHeight: "290px" }}
        >
            {/* DEFAULT STATE */}
            <div
                className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ease-out
        ${hovered ? "opacity-0 translate-y-4 scale-95" : "opacity-100 translate-y-0 scale-100"}`}
            >
                <p
                    className="text-white text-2xl mb-1"
                    style={{ fontFamily: "serif", direction: "rtl" }}
                >
                    {value.urdu}
                </p>
                <p className="text-white font-bold text-xl italic">
                    {value.english}
                </p>
            </div>

            {/* HOVER STATE */}
            <div
                className={`absolute inset-0 flex flex-col items-center justify-center px-4 transition-all duration-500 ease-out
        ${hovered ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-4 scale-95"}`}
            >
                <p className="text-white font-bold text-lg mb-3">
                    <span className="font-normal" style={{ fontFamily: "serif" }}>
                        {value.urdu}
                    </span>{" "}
                    {value.english}
                </p>
                <p className="text-white/85 text-sm leading-6">
                    {value.description}
                </p>
            </div>
        </div>
    );
}

export default function OurValues() {
    return (
        <section className="w-full max-w-5xl mx-auto px-6 py-10 md:py-14">

            <SectionHeader title="Our Values" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-15">
                {values.map((value) => (
                    <ValueCard key={value.id} value={value} />
                ))}
            </div>
        </section>
    );
}