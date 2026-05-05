"use client";

import Image from "next/image";
import PageHeroMobile from "@/components/UI/Pageheromobile";

export default function AboutHero() {
    return (
        <section className="w-full bg-[#F7FBFF] py-4">
            <div className="hidden md:grid grid-cols-2 relative max-w-6xl mx-auto  h-[95%] rounded-3xl">
                <div className="absolute w-[50%] h-[94%] bg-[#E8E8E8] top-4 right-[30%] z-1" />

                {/* TOP LEFT - ABOUT TEXT */}
                <div className="bg-[#F7FBFF] rounded-br-3xl flex items-center justify-center z-2">
                    <h1 className="text-6xl min-[856px]:text-7xl min-[1100px]:text-8xl font-extrabold text-black">
                        ABOUT
                    </h1>
                </div>

                {/* TOP RIGHT - IMAGE */}
                <div className="relative w-full h-[220px] md:h-[260px] rounded-3xl overflow-hidden bg-[#E8E8E8] flex items-center justify-center z-2">
                    <Image
                        src="/about/hero/hero1.png"
                        alt="Team"
                        width={800}
                        height={400}
                        className="object-cover w-[90%] md:w-[85%] h-[80%] rounded-3xl"
                    />
                </div>

                {/* BOTTOM LEFT - IMAGE */}
                <div className="relative w-full h-[220px] md:h-[260px] rounded-3xl overflow-hidden bg-[#E8E8E8] flex items-center justify-center z-2">
                    <Image
                        src="/about/hero/hero2.jpg"
                        alt="Work"
                        width={800}
                        height={400}
                        className="object-cover w-[90%] md:w-[85%] h-[80%] rounded-3xl"
                    />
                </div>

                {/* BOTTOM RIGHT - TEXT */}
                <div className="bg-[#F7FBFF] rounded-tl-3xl flex items-center justify-center z-2 ">
                    <h1 className="text-6xl min-[856px]:text-7xl min-[1100px]:text-8xl font-extrabold text-black">
                        COMBINE
                    </h1>
                </div>
            </div>

            <div className="md:hidden w-full">
                <PageHeroMobile
                    title="About Us"
                    imageSrc="/about/hero/hero1.png"
                    imageAlt="About Combine Hero"
                    styles="block md:hidden"
                />
            </div>
        </section>
    );
}