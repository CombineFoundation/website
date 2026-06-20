"use client";

import Image from "next/image";

type StoryContent = {
    title: string;
    paragraphs: string[];
    image: string;
    imageAlt: string;
};

const storyContent: StoryContent = {
    title: "The Story Behind Combine Foundation",
    paragraphs: [
        "Combine Foundation was established on the ideology that \"nation cannot build through donations\" and under this spirit Combine Foundation aims to fill the gap between despair and hope. Pakistan has extraordinary youth potential, yet millions of students still lack access to quality education, leadership opportunities, mentorship, career guidance, and digital skills for the future. After identifying this challenge and need, Combine Foundation came into being as a part of Combine Group's mission to uplift Pakistani youth by focusing on education, technology and initiating social change.",
        "Firstly, Combine Foundation started with community welfare and educational support initiatives, then later evolved into a structured organization officially registered as an NPO (under the Companies Act 2017) in SECP in 2023 and officially launched in May 2025 as Combine Foundation. Combine Foundation now works towards youth empowerment, leadership programs, digital literacy, volunteering, sustainability and health awareness to help create long-term positive change across Pakistan.",
    ],
    image: "/about/story/story.png",
    imageAlt: "Students on a field visit",
};

export default function OurStory() {
    return (
        <section className="w-full  mx-auto px-6 py-10 md:py-14">
            <div
                className="w-full rounded-2xl px-8 py-6 mb-8 md:mb-10 bg-secondary-500"
            >
                <h2 className="text-white font-bold text-4xl md:text-5xl">
                    {storyContent.title}
                </h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-start">
                <div className="flex-1 space-y-5">
                    {storyContent.paragraphs.map((para, i) => (
                        <p key={i} className="text-black text-base lg:text-lg leading-7">
                            {para}
                        </p>
                    ))}
                </div>

                <div
                    className="relative w-full lg:w-[45%] shrink-0 rounded-2xl overflow-hidden"
                    style={{ height: "clamp(220px, 30vw, 360px)" }}
                >
                    <Image
                        src={storyContent.image}
                        alt={storyContent.imageAlt}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </div>
        </section>
    );
}
