"use client";

import Image from "next/image";
import { useState } from "react";

interface MOU {
    id: number;
    title: string;
    paragraphs: string[];
    image: string;
    imageAlt: string;
}

const mous: MOU[] = [
    {
        id: 1,
        title: "Hammad Foundation X Combine Foundation MOU",
        paragraphs: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu.",
            "Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id. Praesent lorem",
        ],
        image: "/publications/pub1.png",
        imageAlt: "MOU signing between Hammad Foundation and Combine Foundation",
    },
    {
        id: 2,
        title: "Hammad Foundation X Green Earth MOU",
        paragraphs: [
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
            "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
        ],
        image: "/publications/pub1.png",
        imageAlt: "MOU signing between Hammad Foundation and Green Earth",
    },
    {
        id: 3,
        title: "Hammad Foundation X Education Trust MOU",
        paragraphs: [
            "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
            "Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
        ],
        image: "/publications/pub1.png",
        imageAlt: "MOU signing between Hammad Foundation and Education Trust",
    },
];

const MOUSlider = () => {
    const [current, setCurrent] = useState(0);

    const handlePrev = () =>
        setCurrent((c) => (c === 0 ? mous.length - 1 : c - 1));
    const handleNext = () =>
        setCurrent((c) => (c === mous.length - 1 ? 0 : c + 1));

    const mou = mous[current];

    return (
        <section className="bg-white">
            <div className="max-w-[1500px] mx-auto px-4 md:px-6 lg:px-8">

                {/* Section Header */}
                <div className="mb-2">
                    <h2 className="text-3xl font-bold text-secondary-500">MOU&apos;s</h2>
                </div>
                <hr className="border-gray-300 mb-8" />

                {/* Slide Content */}
                <div className="transition-all duration-300">

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary-600 mb-4 leading-snug">
                        {mou.title}
                    </h3>

                    {/* Description Paragraphs */}
                    <div className="space-y-4 mb-6">
                        {mou.paragraphs.map((para, idx) => (
                            <p key={idx} className="text-primary-800 text-sm md:text-base lg:text-lg leading-relaxed">
                                {para}
                            </p>
                        ))}
                    </div>

                    {/* Image */}
                    <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden">
                        <Image
                            src={mou.image}
                            alt={mou.imageAlt}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-center sm:justify-end items-center gap-3 mt-6">
                    <button
                        onClick={handlePrev}
                        aria-label="Previous MOU"
                        className="w-11 h-11 rounded-full bg-secondary-700 hover:brightness-90 text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>
                    <button
                        onClick={handleNext}
                        aria-label="Next MOU"
                        className="w-11 h-11 rounded-full bg-secondary-700 hover:brightness-90 text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                </div>

            </div>
        </section>
    );
};

export default MOUSlider;
