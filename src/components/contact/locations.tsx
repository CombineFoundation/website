"use client";

import { useState } from "react";

interface Location {
    id: string;
    title: string;
    subtitle: string;
    address: string;
    mapSrc: string;
}

const LOCATIONS: Location[] = [
    {
        id: "main-branch",
        title: "Combine Foundation",
        subtitle: "Main Gulshan Branch",
        address: "House 23, Street 3 Block 13D, Gulshan - e - Iqbal",
        mapSrc:
            "https://maps.google.com/maps?q=24.9214,67.0901&z=15&ie=UTF8&output=embed",
    },
    {
        id: "farm-house",
        title: "Combine Farm House",
        subtitle: "",
        address: "House 23, Street 3 Block 13D, Gulshan - e - Iqbal",
        mapSrc:
            "https://maps.google.com/maps?q=24.9214,67.0901&z=14&ie=UTF8&output=embed",
    },
];

const Locations = () => {
    const [activeId, setActiveId] = useState<string>(LOCATIONS[0].id);
    const activeLocation = LOCATIONS.find((l) => l.id === activeId)!;

    return (
        <section className="max-w-[1500px] w-full mx-auto px-4 md:px-6 lg:px-8 py-10">
            <div className="w-full">

                {/* Header */}
                <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-secondary-500 mb-3">
                    Locations
                </h2>

                <hr className="border-black/70 mb-6" />

                {/* ── MOBILE LAYOUT (hidden on lg+) ── */}
                <div className="lg:hidden flex flex-col gap-4">

                    {/* Tab Selector */}
                    <div className="flex gap-2">
                        {LOCATIONS.map((loc) => {
                            const isActive = loc.id === activeId;
                            return (
                                <button
                                    key={loc.id}
                                    onClick={() => setActiveId(loc.id)}
                                    className={`
                                        flex-1 text-left rounded-2xl px-4 py-3
                                        border transition-all duration-200
                                        ${isActive
                                            ? "bg-black text-white border-black"
                                            : "bg-white text-black border-gray-200 hover:border-gray-400"
                                        }
                                    `}
                                >
                                    <p className="text-[13px] font-semibold leading-tight">
                                        {loc.title}
                                    </p>
                                    {loc.subtitle && (
                                        <p className={`text-[12px] mt-0.5 leading-tight ${isActive ? "text-white/70" : "text-gray-500"}`}>
                                            {loc.subtitle}
                                        </p>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Active Location Address */}
                    <div className="bg-white rounded-2xl px-4 py-3 border border-gray-200">
                        <p className="text-[13px] text-gray-500 font-medium uppercase tracking-wide mb-1">Address</p>
                        <p className="text-[15px] text-gray-800 leading-snug">{activeLocation.address}</p>
                    </div>


                    <div className="rounded-[20px] overflow-hidden border border-gray-300 h-[260px] sm:h-[320px]">
                        <iframe
                            key={activeId}
                            src={activeLocation.mapSrc}
                            title={`Map for ${activeLocation.title}`}
                            className="w-full h-full border-0"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>

                {/* ── DESKTOP LAYOUT (hidden below lg) ── */}
                <div className="hidden lg:block">
                    <div className="relative rounded-[28px] overflow-hidden border border-gray-300 h-[430px]">

                        {/* Google Map */}
                        <iframe
                            key={activeId}
                            src={activeLocation.mapSrc}
                            title={`Map for ${activeLocation.title}`}
                            className="absolute inset-0 w-full h-full border-0"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />

                        {/* Floating Cards */}
                        <div className="absolute top-1 left-1 z-10 flex flex-col gap-4 w-[360px]">
                            {LOCATIONS.map((loc) => {
                                const isActive = loc.id === activeId;
                                return (
                                    <button
                                        key={loc.id}
                                        onClick={() => setActiveId(loc.id)}
                                        className={`
                                            w-full text-left rounded-[24px]
                                            bg-[#F8F8F8]/95 backdrop-blur-md
                                            px-6 py-5
                                            transition-all duration-300
                                            cursor-pointer border
                                            shadow-[0_8px_30px_rgba(0,0,0,0.08)]
                                            hover:scale-[1.01]
                                            ${isActive
                                                ? "border-black"
                                                : "border-transparent hover:border-gray-300"
                                            }
                                        `}
                                    >
                                        <h3 className="text-[22px] leading-[1.15] font-semibold text-black">
                                            {loc.title}
                                            {loc.subtitle && (
                                                <>
                                                    <br />
                                                    <span className="font-medium">{loc.subtitle}</span>
                                                </>
                                            )}
                                        </h3>
                                        <p className="mt-4 text-[16px] leading-[1.6] text-gray-600">
                                            {loc.address}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Locations;
