"use client";

type EventsIdeaContent = {
    title: string;
    paragraphs: string[];
};

const content: EventsIdeaContent = {
    title: "Our idea About Events",
    paragraphs: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu.",
        "Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id. Praesent lorem",
    ],
};

export default function ourideas() {
    return (
        <section className="w-full max-w-5xl mx-auto px-6 py-10 md:py-14">
            <h2 className="text-gray-900 font-semibold text-2xl md:text-3xl mb-3">
                {content.title}
            </h2>
            <div className="w-full h-px bg-black mb-6" />
            <div className="space-y-5">
                {content.paragraphs.map((para, i) => (
                    <p key={i} className="text-black text-sm md:text-base leading-7">
                        {para}
                    </p>
                ))}
            </div>
        </section>
    );
}