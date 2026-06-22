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
    heading: "Department Heads",
    members: [
      { id: 1, name: "Muhammad Umar", title: "Projects Coordinator and Innovation Lead", image: "/volunteer/vol1.png" },
      { id: 2, name: "Saifullah", title: "Finance Manager", image: "/volunteer/vol2.png" },
      { id: 3, name: "Rizwan Ahmed", title: "Legal and Compliance Officer", image: "/about/hero/hero2.jpg" },
      { id: 4, name: "Esha Adeel", title: "Lead Developer", image: "/about/story/story.png" },
      { id: 5, name: "Vikram Singh", title: "Graphics Lead", image: "/publications/pub1.png" },
      { id: 6, name: "Maliha Naz", title: "Content Department Lead", image: "/home/impact/impact1.png" },
      { id: 7, name: "Ayan Ahmed", title: "Social Media Manager", image: "/home/blog/blog1.png" },
      { id: 8, name: "Muhammad Usman", title: "Video Production Lead", image: "/home/blog/blog2.png" },
    ],
  },
  {
    heading: "Ambassadors",
    members: [
      { id: 1, name: "Miss Yasmeen", title: "Pakistan", image: "/home/blog/blog3.png" },
      { id: 2, name: "Aliza Hamid", title: "Spain", image: "/about/achievements/achievements.png" },
      { id: 3, name: "Hira Kamal", title: "China", image: "/donation/df1.png" },
      { id: 4, name: "Mirkamol Qobilov", title: "Uzbekistan", image: "/donation/donation.png" },
    ],
  },
  {
    heading: "Youth Leaders",
    members: [
      { id: 1, name: "Subhan Khan", title: "Youth Leader", image: "/home/project/project.png" },
      { id: 2, name: "Hafsah Khalil", title: "Youth Leader", image: "/home/impact/impact4.png" },
      { id: 3, name: "Sundas Parri", title: "Youth Leader", image: "/home/impact/impact5.png" },
      { id: 4, name: "Neha Rubab", title: "Youth Leader", image: "/home/impact/impact6.png" },
      { id: 5, name: "Haseeb Fakhra", title: "Youth Leader", image: "/home/impact/impact2.jpg" },
      { id: 6, name: "Muzamil Mustafa", title: "Youth Leader", image: "/projects/projecthero.png" },
      { id: 7, name: "Farwa Rehman", title: "Youth Leader", image: "/home/founder/person.png" },
      { id: 8, name: "Spogmay Arif", title: "Youth Leader", image: "/events/eventsperson.png" },
      { id: 9, name: "Malik Kamran", title: "Youth Leader", image: "/about/hero/hero2.jpg" },
    ],
  },
];

function MemberCard({ member }: { member: Member }) {
  return (
    <div className="flex flex-col items-center text-center">
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
  const gridCols =
    section.members.length === 4
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      : section.members.length === 8
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className="mb-12">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black border-b border-black pb-4 mb-10">
        {section.heading}
      </h2>
      
      <div className={`grid ${gridCols} gap-8 justify-items-center`}>
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
    <section className="max-w-[1500px] mx-auto px-4 md:px-6 lg:px-8 py-10">
      {sections.map((section) => (
        <MembersSection key={section.heading} section={section} />
      ))}
    </section>
  );
}
