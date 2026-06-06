import Image from "next/image";

interface Member {
  id: number;
  name: string;
  title: string;
  image: string;
}

interface GroupSection {
  heading: string;
  members: Member[];
}

const sections: GroupSection[] = [
  {
    heading: "Department heads",
    members: [
      { id: 1, name: "Faysal Aziz Khan", title: "President | BOL Media Group", image: "/about/founder/founder.png" },
      { id: 2, name: "Faysal Aziz Khan", title: "President | BOL Media Group", image: "/events/eventsperson.png" },
      { id: 3, name: "Faysal Aziz Khan", title: "President | BOL Media Group", image: "/home/founder/person.png" },
    ],
  },
  {
    heading: "Ambassadors",
    members: [
      { id: 1, name: "Faysal Aziz Khan", title: "President | BOL Media Group", image: "/volunteer/vol1.png" },
      { id: 2, name: "Faysal Aziz Khan", title: "President | BOL Media Group", image: "/volunteer/vol2.png" },
      { id: 3, name: "Faysal Aziz Khan", title: "President | BOL Media Group", image: "/home/impact/impact1.png" },
    ],
  },
  {
    heading: "Youth Leaders",
    members: [
      { id: 1, name: "Faysal Aziz Khan", title: "President | BOL Media Group", image: "/about/hero/hero1.png" },
      { id: 2, name: "Faysal Aziz Khan", title: "President | BOL Media Group", image: "/about/story/story.png" },
      { id: 3, name: "Faysal Aziz Khan", title: "President | BOL Media Group", image: "/publications/pub1.png" },
    ],
  },
];

function MemberCard({ member }: { member: Member }) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Arrow + Image row */}
      <div className="flex items-start gap-1 w-full justify-center mb-3">
        <div className="relative w-48 h-48 overflow-hidden rounded-2xl flex-shrink-0">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover object-top"
          />
        </div>
      </div>
      <p className="text-lg font-bold text-black">{member.name}</p>
      <p className="text-base text-black mt-1 leading-snug">{member.title}</p>
    </div>
  );
}

function MembersSection({ section }: { section: GroupSection }) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black border-b border-black pb-4 mb-10">
        {section.heading}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {section.members.map((member) => (
          <div key={member.id} className="w-full max-w-[300px] my-3">
            <MemberCard member={member} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LeadershipSections() {
  return (
    <section className="w-full px-6 py-10 md:px-12 lg:px-16">
      {sections.map((section) => (
        <MembersSection key={section.heading} section={section} />
      ))}
    </section>
  );
}
