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
        urdu: "بااختیاربنانا",
        english: "Empowerment",
        description:
            "Equipping individuals with the tools, knowledge, and confidence to take control of their lives and create meaningful change in their communities.",
    },
    {
        id: 2,
        urdu: "قیادت",
        english: "Leadership",
        description:
            "Developing visionary leaders who inspire others, drive positive change, and take initiative to solve challenges facing their communities.",
    },
    {
        id: 3,
        urdu: "پائیداری",
        english: "Sustainability",
        description:
            "Promoting long-term environmental, social, and economic practices that ensure a better future for generations to come.",
    },
    {
        id: 4,
        urdu: "خود انحصاری",
        english: "Self-reliance",
        description:
            "Fostering independence and self-sufficiency so individuals and communities can thrive without external dependency.",
    },
    {
        id: 5,
        urdu: "ہمدردی",
        english: "Compassion",
        description:
            "Leading with empathy and kindness, understanding the needs of others, and working to uplift those who are underserved.",
    },
    {
        id: 6,
        urdu: "سالمیت",
        english: "Integrity",
        description:
            "Upholding the highest standards of honesty, transparency, and ethical conduct in all our actions and decisions.",
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
            className="relative overflow-hidden rounded-2xl flex items-center justify-center text-center px-6 py-10 cursor-pointer bg-secondary-600"
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
        <section className="max-w-[1500px] mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-14 w-full">

            <SectionHeader title="Our Values" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-15 w-full">
                {values.map((value) => (
                    <ValueCard key={value.id} value={value} />
                ))}
            </div>
        </section>
    );
}
