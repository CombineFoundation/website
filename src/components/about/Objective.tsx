"use client";

type ObjectiveContent = {
    title: string;
    description: string;
};

const objectiveContent: ObjectiveContent = {
    title: "Objective",
    description:
        "Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id. Praesent lorem orci, mattis non efficitur id, Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id. Praesent lorem orci, mattis non efficitur id,",
};

export default function Objective() {
    return (
        <section className="w-full max-w-5xl mx-auto px-6 py-4">
            <div
                className="w-full rounded-2xl px-8 py-7 bg-[#124980]"
            >
                <h3 className="text-white font-bold text-xl mb-3">
                    {objectiveContent.title}
                </h3>
                <div className="w-full h-1 bg-[#e8511a] mb-5" />
                <p className="text-white/90 text-sm leading-7">
                    {objectiveContent.description}
                </p>
            </div>
        </section>
    );
}