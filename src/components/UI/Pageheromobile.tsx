"use client";

import Image from "next/image";

type PageHeroMobileProps = {
    title: string;
    imageSrc: string;
    imageAlt?: string;
    styles?: string;
    Overlaycolor?: string;
    mobileStyles?: string;
};

export default function PageHeroMobile({
    title,
    imageSrc,
    imageAlt = "Hero",
    styles,
    Overlaycolor,
    mobileStyles,
}: PageHeroMobileProps) {
    console.log("mobileStyles received:", mobileStyles); // Debug trace
    return (
        <div className={`w-full pt-20 relative ${styles ?? ""}`}>
            <h2
                className={`text-orange absolute text-center z-2 w-full !text-5xl !top-[50px] sm:!top-[20px] sm:!text-8xl font-semibold ${mobileStyles ?? ""}`}
            >
                {title}
            </h2>
            <div className="relative w-[95%] m-auto h-[350px] rounded-2xl overflow-hidden">
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className={`object-cover ${styles ?? ""}`}
                    priority
                />
                <div className={`absolute inset-0 ${Overlaycolor ?? ""}`} />
            </div>
        </div>
    );
}