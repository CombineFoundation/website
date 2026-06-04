import Image from "next/image";

const trustees = [
  {
    id: 1,
    name: "Faysal Aziz Khan",
    description:
      "Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id. Praesent lorem",
    image: "/about/founder/founder.png",
  },
  {
    id: 2,
    name: "Faysal Aziz Khan",
    description:
      "Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id. Praesent lorem",
    image: "/events/eventsperson.png",
  },
  {
    id: 3,
    name: "Faysal Aziz Khan",
    description:
      "Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id. Praesent lorem",
    image: "/home/founder/person.png",
  },
];

export default function BoardOfTrustees() {
  return (
    <section className="w-full px-6 py-10 md:px-12 lg:px-16">
      {/* Section Title */}
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black border-b border-black pb-4 mb-10">
        Board of Trustees
      </h2>

      {/* Trustees List */}
      <div className="flex flex-col">
        {trustees.map((trustee) => (
          <div
            key={trustee.id}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-20 py-8 first:pt-0 text-center sm:text-left"
          >
            {/* Arrow + Image */}
            <div className="flex items-start justify-center sm:justify-start gap-2 flex-shrink-0">
              {/* Arrow indicator */}
              <span className="text-black text-lg leading-none mt-2">&#8250;</span>

              {/* Portrait Image */}
              <div className="relative w-[60vw] sm:w-48 md:w-56 aspect-square overflow-hidden rounded-2xl flex-shrink-0">
                <Image
                  src={trustee.image}
                  alt={trustee.name}
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="flex-1">
              <h3 className="text-lg md:text-xl font-bold text-black mb-3">
                {trustee.name}
              </h3>
              <p className="text-sm md:text-base lg:text-lg text-black leading-relaxed">
                {trustee.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
