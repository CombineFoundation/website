"use client";

import Image from "next/image";

type PageHeroMobileProps = {
    title: string;
    imageSrc: string;
    imageAlt?: string;
    styles?: string;
};

export default function PageHeroMobile({
    title,
    imageSrc,
    imageAlt = "Hero",
    styles,
}: PageHeroMobileProps) {
    return (
        <div className={" w-full pt-20 relative " + styles}>
            <h2 className="text-black absolute top-[35px] sm:top-[20px] text-center z-2 w-full  text-7xl sm:text-8xl font-semibold">
                {title}
            </h2>
            <div className="relative w-[95%] m-auto h-[350px] rounded-2xl overflow-hidden">
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className="object-cover "
                    priority
                />
                <div className="absolute inset-0 bg-white/20" />
                <div className="absolute bottom-4 left-4">

                </div>
            </div>
        </div>
    );
}