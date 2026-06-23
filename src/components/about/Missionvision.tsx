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
      "Reducing inequality and helping communities grow stronger through education, leadership, and sustainable growth.",
  },
  {
    id: 2,
    title: "Vision",
    description:
      "Building a stronger Pakistan and the next generation of leaders by empowering 1 million youth through leadership, digital education, sustainability, and community development.",
  },
];

export default function Missionvision() {
  return (
    <section className="max-w-[1500px] mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-14">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-gray-200 bg-white px-7 py-6"
          >
            <h3 className="text-black font-bold text-xl mb-3">
              {item.title}
            </h3>

            <div className="w-full h-1 bg-accent-orange mb-5" />
            <p className="text-black text-sm leading-7">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
