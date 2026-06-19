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
      "Sindh Madarasatul Islam University (SMIU) is a highly valued partner organization associated with Combine Foundation to provide educational and innovative learning opportunities for students. In this connection, both partner organizations are looking forward to providing a platform where students can learn and develop skills. The Combine Foundation has already accomplished its task of conducting FYP evaluation with SMIU and is currently engaged in a design pilot project with the aim of increasing creativity and innovation of students.",
    image: "/combinelogo.png",
  },
  {
    id: 2,
    name: "Hammad Foundation",
    description:
      "Hammad Foundation is one of our valued community partners that help us in our mission to serve the community in terms of social welfare and environmental awareness, along with other community services. It shows the commitment of both foundations in bringing about a positive impact on society. In collaboration with Hammad Foundation, Combine Foundation has been successful in organizing beach cleanup campaigns and Ramadan Bachat camp.",
    image: "/combinelogo.png",
  },
  {
    id: 3,
    name: "Quants Society (NED University)",
    description:
      "Quants Society, being one of the Department Societies of NED University, is a valued academic and community society that works in collaboration with the Combine Foundation in helping students develop their skills and careers. Under this collaboration, a session was conducted at NED University by the Director of Combine Foundation in collaboration with the Quants Society. The session focused on aspects such as empowerment of youth, leadership, innovation, and career building.",
    image: "/combinelogo.png",
  },
  {
    id: 4,
    name: "NGAS \u2014 NED Girls Affairs Society (NED University)",
    description:
      "NGAS \u2013 NED Girls Affairs Society is a valued partner organization collaborating with Combine Foundation to promote awareness, education, and community empowerment initiatives focused on social wellbeing and women\u2019s development. Through this partnership, Combine Foundation and NGAS have worked together on designing and promoting breast cancer awareness campaigns and gender-based violence awareness drives, aiming to educate communities, encourage awareness, and support positive social change.",
    image: "/combinelogo.png",
  },
];

function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative w-32 h-32 mb-6 flex-shrink-0">
        <Image
          src={partner.image}
          alt={partner.name}
          fill
          className="object-contain"
        />
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-black mb-4">
        {partner.name}
      </h3>
      <p className="text-sm md:text-base text-gray-700 leading-relaxed max-w-prose">
        {partner.description}
      </p>
    </div>
  );
}

export default function PartnersSection() {
  return (
    <section className="w-full px-6 md:px-12 py-10">
      <div className="border-b border-black pb-4 mb-10">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black">
          Our Collaboration Partners
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {partners.map((partner) => (
          <PartnerCard key={partner.id} partner={partner} />
        ))}
      </div>
    </section>
  );
}
