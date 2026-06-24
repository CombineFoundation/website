import Image from "next/image";

interface Trustee {
  id: number;
  name: string;
  role: string;
  description: string;
  image: string;
}

const trustees: Trustee[] = [
  {
    id: 1,
    name: "Mr. Farrukh Rehman",
    role: "Director",
    description:
      "Farrukh Rehman is a specialist in Risk Based Internal Auditing and Risk Management with over 20 years of expertise in the fields of finance, governance, and business advisory. As the Director of Combine Consultants and CRMA, he assists companies to enhance internal control measures, manage risks, and grow sustainably. Besides, he serves as an executive trainer and visiting faculty dedicated to developing future leaders in audit and risk management.",
    image: "/about/hero/hero1.png",
  },
];

export default function BoardOfTrustees() {
  return (
    <section className="w-full px-6 py-10 md:px-12 lg:px-16">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary-500 border-b border-black pb-4 mb-10">
        Board of Directors
      </h2>

      <div className="flex flex-col">
        {trustees.map((trustee) => (
          <div
            key={trustee.id}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-20 py-8 first:pt-0 text-center sm:text-left"
          >
            <div className="flex items-start justify-center sm:justify-start gap-2 flex-shrink-0">
              <div className="relative w-[60vw] sm:w-48 md:w-56 aspect-square overflow-hidden rounded-2xl flex-shrink-0">
                <Image
                  src={trustee.image}
                  alt={trustee.name}
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-lg md:text-xl font-bold text-primary-600 mb-1">
                {trustee.name}
              </h3>
              <p className="text-sm md:text-base text-primary-800 font-medium mb-3">
                {trustee.role}
              </p>
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
