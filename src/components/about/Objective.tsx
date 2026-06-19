"use client";

type ObjectiveContent = {
    title: string;
    description: string;
};

const objectiveContent: ObjectiveContent = {
    title: "Objective",
    description:
        "The main motive behind the Combine Foundation is to help and support youth and communities to grow through leadership, digital skills, sustainable development initiatives, and health awareness. Our main objective is to create opportunities, start meaningful programs, and mentorships that empower youth, support underserved communities, and bring positive change across Pakistan.",
};

export default function Objective() {
    return (
        <section className="w-full mx-auto px-6 py-4">
            <div
                className="w-full rounded-2xl px-8 py-7 bg-secondary-500"
            >
                <h3 className="text-white font-bold text-xl mb-3">
                    {objectiveContent.title}
                </h3>
                <div className="w-full h-1 bg-accent-orange mb-5" />
                <p className="text-white/90 text-sm leading-7">
                    {objectiveContent.description}
                </p>
            </div>
        </section>
    );
}
