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
    name: "Sindh Madarasatul Islam University (SMIU)",
    description:
      "Sindh Madarasatul Islam University (SMIU) is a highly valued partner organization associated with Combine Foundation to provide educational and innovative learning opportunities for students. In this connection, both partner organizations are looking forward to providing a platform where students can learn and develop skills.",
    image: "/about/hero/hero1.png",
  },
  {
    id: 2,
    name: "Hammad Foundation",
    description:
      "Hammad Foundation is one of our valued community partners that help us in our mission to serve the community in terms of social welfare and environmental awareness, along with other community services. It shows the commitment of both foundations in bringing about a positive impact on society.",
    image: "/about/hero/hero2.jpg",
  },
  {
    id: 3,
    name: "Quants Society (NED University)",
    description:
      "Quants Society, being one of the Department Societies of NED University, is a valued academic and community society that works in collaboration with the Combine Foundation in helping students develop their skills and careers. Under this collaboration, a session was conducted at NED University.",
    image: "/about/story/story.png",
  },
  {
    id: 4,
    name: "NGAS \u2014 NED Girls Affairs Society (NED University)",
    description:
      "NGAS \u2013 NED Girls Affairs Society is a valued partner organization collaborating with Combine Foundation to promote awareness, education, and community empowerment initiatives focused on social wellbeing and women\u2019s development.",
    image: "/events/eventsperson.png",
  },
];

function PartnerCard({ partner }: { partner: Partner }) {
  const [firstWord, ...remainingWords] = partner.name.split(" ");
  const remainingName = remainingWords.join(" ");

  return (
    <div className="group grid grid-cols-1 md:grid-cols-5 gap-0 rounded-3xl overflow-hidden">
      {/* Text */}
      <div className="md:col-span-3 flex flex-col justify-center p-8 md:p-10 lg:p-12">
        <h3 className="text-xl md:text-2xl font-bold mb-6">
          <span className="text-primary-600">{firstWord}</span>
          {remainingName && (
            <span className="text-secondary-500"> {remainingName}</span>
          )}
        </h3>
        <p className="text-sm md:text-base text-primary-800 leading-relaxed">
          {partner.description}
        </p>
      </div>

      {/* Image */}
      <div className="relative w-full h-96 md:h-[400px] md:col-span-2 overflow-hidden rounded-2xl">
        <Image
          src={partner.image}
          alt={partner.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
    </div>
  );
}

export default function PartnersSection() {
  return (

    <section className="max-w-[1500px] mx-auto px-4 md:px-6 lg:px-8 py-10">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black border-b border-black pb-4 mb-10">

        Our Partners
      </h2>

      <div className="flex flex-col gap-8">
        {partners.map((partner) => (
          <PartnerCard key={partner.id} partner={partner} />
        ))}
      </div>
    </section>
  );
}
