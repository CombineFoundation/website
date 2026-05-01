"use client";

type MissionVisionItem = {
  id: number;
  title: string;
  description: string;
};

const items: MissionVisionItem[] = [
  {
    id: 1,
    title: "Mission",
    description:
      "Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id. Praesent lorem orci, mattis non efficitur id,",
  },
  {
    id: 2,
    title: "Vision",
    description:
      "Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id. Praesent lorem orci, mattis non efficitur id,",
  },
];

export default function Missionvision() {
  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-10 md:py-14">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-gray-200 bg-white px-7 py-6"
          >
            <h3 className="text-gray-900 font-bold text-xl mb-3">
              {item.title}
            </h3>

            <div className="w-full h-1 bg-[#e8511a] mb-5" />
            <p className="text-gray-700 text-sm leading-7">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}