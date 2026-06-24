"use client";

type EventsIdeaContent = {
    title: string;
    paragraphs: string[];
};

const content: EventsIdeaContent = {
    title: "Our idea About Events",
    paragraphs: [
        "Our main idea or motive about events is to motivate, educate, and empower youth and people by providing them with opportunities for learning, leadership, innovation, and social contribution. With the help of Youth Leadership Program, Kitchen Garden Festival, Future Leaders & AI Summit, and Environmental Plantation Drive programs, we can engage youth leaders, students, professionals, volunteers, and members of the community towards making a positive difference.",
        "We encourage youth to be better leaders, live sustainably, be aware of technology, respect the environment, and engage themselves actively in society through our events. Through all our events, our focus is to develop future ready and responsible leaders of Pakistan.",
    ],
};

export default function ourideas() {
    return (
        <section className="w-full mx-auto px-6 py-10 md:py-14">
            <h2 className="text-secondary-500 font-semibold text-2xl md:text-3xl mb-3">
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