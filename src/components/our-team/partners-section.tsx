import Image from "next/image";

interface Partner {
  id: number;
  name: string;
  description: string;
  image: string;
}

const partners: Partner[] = [
  {
    id: 1,
    name: "Hammad Foundation",
    description:
      "Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id. Praesent lorem",
    image: "/about/hero/hero1.png",
  },
  {
    id: 2,
    name: "Hammad Foundation",
    description:
      "Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id. Praesent lorem",
    image: "/about/hero/hero2.jpg",
  },
  {
    id: 3,
    name: "Hammad Foundation",
    description:
      "Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id. Praesent lorem",
    image: "/about/story/story.png",
  },
];

function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10">
      
      <div className="w-full md:w-[55%] mt-5">
        <h3 className="text-2xl md:text-3xl xl:text-4xl font-bold text-black mb-4">
          {partner.name}
        </h3>
        <p className="text-base lg:text-lg xl:text-xl text-gray-700 leading-[1.7]">
          {partner.description}
        </p>
      </div>

      {/* Right: Image — 45% on desktop */}
      <div className="w-full md:w-[45%] ">
        <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden">
          <Image
            src={partner.image}
            alt={partner.name}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default function PartnersSection() {
  return (
    <section className="w-full px-6 md:px-12 py-10">
      <div className="">
        {/* Header */}
        <div className="border-b border-black pb-4 mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black">
            Partners
          </h2>
        </div>

        {/* Partners List */}
        <div className="flex flex-col gap-y-14">
          {partners.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  );
}
