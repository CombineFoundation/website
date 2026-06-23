"use client";

import Image from "next/image";
import PageHeroMobile from "@/components/UI/Pageheromobile";

type Props = {
    text1: string;
    text2: string;
    image1: string;
    image2: string;
    text1Size?: "small" | "big";
    text2Size?: "small" | "big";
    mobileTitle: string
    mobileStyles?: string
}


export default function AboutHero({
    text1,
    text2,
    image1,
    image2,
    text1Size = "small",
    text2Size = "small",
    mobileTitle,
    mobileStyles,
}: Props) {
    const bigText =
        "text-6xl min-[856px]:text-7xl min-[1100px]:text-8xl";

    const smallText =
        "text-5xl min-[856px]:text-6xl min-[1100px]:text-7xl";

    const text1Style = text1Size === "big" ? bigText : smallText;
    const text2Style = text2Size === "big" ? bigText : smallText;
    return (
        <section className="w-full py-4">
            <div className="hidden md:grid grid-cols-2 relative max-w-full 2xl:w-[95%] mx-auto  h-[95%] rounded-3xl">
                <div className="absolute w-[50%] h-[94%] bg-[#E8E8E8] top-4 right-[30%] z-1" />

                {/* TOP LEFT - ABOUT TEXT */}
                <div className="bg-[#F7FBFF] rounded-br-3xl flex items-center justify-center z-2">
                    <h1 className={`${text1Style} font-extrabold text-primary-900`}>
                        {text1}
                    </h1>
                </div>

                {/* TOP RIGHT - IMAGE */}
                <div className="relative w-full h-[220px] md:h-[260px] rounded-3xl overflow-hidden bg-[#E8E8E8] flex items-center justify-center z-2">
                    <Image
                        src={image1}
                        alt="Team"
                        width={800}
                        height={400}
                        className="object-cover w-[90%] md:w-[85%] h-[80%] rounded-3xl"
                    />
                </div>

                {/* BOTTOM LEFT - IMAGE */}
                <div className="relative w-full h-[220px] md:h-[260px] rounded-3xl overflow-hidden bg-[#E8E8E8] flex items-center justify-center z-2">
                    <Image
                        src={image2}
                        alt="Work"
                        width={800}
                        height={400}
                        className="object-cover w-[90%] md:w-[85%] h-[80%] rounded-3xl"
                    />
                </div>

                {/* BOTTOM RIGHT - TEXT */}
                <div className="bg-[#F7FBFF] rounded-tl-3xl flex items-center justify-center z-2 ">
                    <h1 className={`${text2Style} font-extrabold text-primary-900`}>
                        {text2}
                    </h1>
                </div>
            </div>

            <div className="md:hidden w-full">
                <PageHeroMobile
                    title={mobileTitle}
                    imageSrc={image1}
                    imageAlt={mobileTitle}
                    styles="block md:hidden"
                    mobileStyles={mobileStyles}
                />
            </div>
        </section>
    );
}