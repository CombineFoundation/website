"use client";

import Image from "next/image";
import SectionHeader from "@/components/UI/SectionHeader";

type FounderContent = {
    title: string;
    image: string;
    imageAlt: string;
    description: string;
};

const founderContent: FounderContent = {
    title: "About The Founder",
    image: "/about/founder/founder.png",
    imageAlt: "About the founder meeting",
    description:
        "Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id. Praesent lorem orci, mattis non efficitur id, Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id. Praesent lorem orci, mattis non efficitur id,",
};

export default function AboutFounder() {
    return (
        <section className="w-full max-w-5xl mx-auto px-6 py-10 md:py-14">
            <SectionHeader title={`${founderContent.title}`} />

            <div
                className="relative w-full rounded-2xl overflow-hidden mb-7"
                style={{ height: "clamp(220px, 35vw, 350px)" }}
            >
                <Image
                    src={founderContent.image}
                    alt={founderContent.imageAlt}
                    fill
                    className="object-cover "
                    priority
                />
            </div>

            <div className="flex gap-4 items-stretch">
                <div className="w-1 rounded-full bg-[#e8511a] shrink-0" />
                <p className="text-gray-700 text-sm md:text-base leading-7">
                    {founderContent.description}
                </p>
            </div>
        </section>
    );
}