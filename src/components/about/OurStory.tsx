"use client";

import Image from "next/image";

type StoryContent = {
    title: string;
    paragraphs: string[];
    image: string;
    imageAlt: string;
};

const storyContent: StoryContent = {
    title: "The Story",
    paragraphs: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu.",
        "Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id. Praesent lorem orci, mattis non efficitur id, ultricies vel nibh. Sed volutpat lacus vitae gravida viverra. Fusce vel tempor elit. Proin tempus, magna id",
    ],
    image: "/about/story/story.png",
    imageAlt: "Students on a field visit",
};

export default function OurStory() {
    return (
        <section className="w-full  mx-auto px-6 py-10 md:py-14">
            <div
                className="w-full rounded-2xl px-8 py-6 mb-8 md:mb-10 bg-[#124980]"
            >
                <h2 className="text-white font-bold text-4xl md:text-5xl">
                    {storyContent.title}
                </h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-start">
                <div className="flex-1 space-y-5">
                    {storyContent.paragraphs.map((para, i) => (
                        <p key={i} className="text-gray-700 text-base lg:text-lg leading-7">
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