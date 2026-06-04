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
    name: "Faysal Aziz Khan",
    title: "President | BOL Media Group",
    image: "/home/founder/person.png",
  },
  {
    id: 2,
    name: "Sarah Ahmed",
    title: "Director | Digital Learning",
    image: "/events/eventsperson.png",
  },
  {
    id: 3,
    name: "Usman Tariq",
    title: "Lead Instructor | Tech Education",
    image: "/about/founder/founder.png",
  },
];

export default function MeetInstructors() {
  return (
    <section className="w-full mx-auto px-9 py-8 max-sm:px-6">
      {/* Heading */}
      <div className=" pb-3">
        <h2 className="text-2xl md:text-4xl xl:text-5xl font-bold text-gray-900">
          Meet Our Instructors
        </h2>
      </div>
        <hr className="w-[95vw] text-gray-500 m-auto mb-10" />

      {/* Instructor grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
