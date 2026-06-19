"use client";

interface Instructor {
  id: number;
  name: string;
  title: string;
  image: string;
}

const INSTRUCTORS: Instructor[] = [
  {
    id: 1,
    name: "Syeda Maliha Naz",
    title: "Web Development Instructor",
    image: "/home/image1.avif",
  },
  {
    id: 2,
    name: "Esha",
    title: "Python & AI Mentor | Lead Developer",
    image: "/home/image1.avif",
  },
  {
    id: 3,
    name: "Muhammad Umar",
    title: "Digital Empowerment Course Instructor",
    image: "/home/image1.avif",
  },
  {
    id: 4,
    name: "Rida Fatima",
    title: "Quantitative Finance Course Instructor",
    image: "/home/image1.avif",
  },
];

export default function MeetInstructors() {
  return (
    <section className="w-full mx-auto px-9 py-8 max-sm:px-6">
      <div className="pb-3">
        <h2 className="text-2xl md:text-4xl xl:text-5xl font-bold text-gray-900">
          Your Learning Mentors
        </h2>
      </div>
      <hr className="w-[95vw] text-gray-500 m-auto mb-10" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {INSTRUCTORS.map((inst) => (
          <div key={inst.id} className="flex flex-col items-center text-center gap-3">
            <div
              className="relative rounded-xl overflow-hidden bg-gray-100"
              style={{ width: 130, height: 130, flexShrink: 0 }}
            >
              <img
                src={inst.image}
                alt={inst.name}
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div>
              <p className="text-sm lg:text-base xl:text-lg font-semibold text-gray-900">{inst.name}</p>
              <p className="text-xs lg:text-sm xl:text-base text-gray-500 mt-0.5 leading-snug">{inst.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
