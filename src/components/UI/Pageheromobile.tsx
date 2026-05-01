"use client";

import Image from "next/image";

type PageHeroMobileProps = {
    title: string;
    imageSrc: string;
    imageAlt?: string;
};

export default function PageHeroMobile({
    title,
    imageSrc,
    imageAlt = "Hero",
}: PageHeroMobileProps) {
    return (
        <div className="block md:hidden w-full py-6 relative">
            <h2 className="text-black absolute top-1 text-center z-2 w-full  text-4xl font-extrabold">
                {title}
            </h2>
            <div className="relative w-[90%] m-auto h-[220px] rounded-2xl overflow-hidden">
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-white/40" />
                <div className="absolute bottom-4 left-4">

                </div>
            </div>
        </div>
    );
}