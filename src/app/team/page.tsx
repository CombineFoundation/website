import React from 'react';

const teamData = {
  founder: {
    name: "Muhammad Junaid Makhani",
    role: "Founder",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
    description: [
      "Muhammad Junaid Makhani is the visionary behind Combine Foundation. With a passion for community service and youth empowerment, he established this organization to bridge the gap between education and opportunity.",
      "Under his leadership, Combine Foundation has reached thousands of students across the region, providing them with the tools and mentorship needed to succeed in a rapidly changing world."
    ]
  },
  ceo: {
    name: "Muhammad Ashfaq",
    role: "CEO",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
    description: [
      "Muhammad Ashfaq brings years of executive experience to Combine Foundation. As CEO, he oversees the daily operations and strategic planning of the organization.",
      "His focus on operational excellence and sustainable growth has been instrumental in expanding our programs and building strong partnerships with international bodies."
    ]
  },
  boardOfTrustees: [
    { name: "Faysal Aziz Khan", role: "Trustee", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" },
    { name: "Sajid Mahmood", role: "Trustee", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400" },
    { name: "Zia Ullah", role: "Trustee", image: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=400" },
  ],
  departmentHeads: [
    { name: "Ahmed Raza", role: "Head of Education", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400" },
    { name: "Sarah Khan", role: "Head of Marketing", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" },
    { name: "Umar Farooq", role: "Head of Operations", image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=400" },
  ],
  ambassadors: [
    { name: "Ali Hamza", role: "Global Ambassador", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400" },
    { name: "Fatima Jamil", role: "Youth Ambassador", image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400" },
    { name: "Zainab Ali", role: "Culture Ambassador", image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=400" },
  ],
  youthLeaders: [
    { name: "Usman Ghani", role: "Youth Leader", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400" },
    { name: "Ibrahim Malik", role: "Youth Leader", image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&q=80&w=400" },
    { name: "Maryam Noor", role: "Youth Leader", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400" },
  ],
  partners: [
    { name: "Hammad Foundation", role: "Strategic Partner", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800" },
    { name: "Hammad Foundation ", role: "Development Partner", image: "https://images.unsplash.com/photo-1551836022-83587b97143c?auto=format&fit=crop&q=80&w=800" },
    { name: "Hammad Foundation  ", role: "Community Partner", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800" },
  ]
};

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-10">
      <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">{title}</h2>
      <div className="w-full h-[1px] bg-gray-300"></div>
    </div>
  );
}

function GridSection({ title, members }: { title: string, members: any[] }) {
  return (
    <section className="mb-20">
      <SectionHeader title={title} />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
        {members.map((member) => (
          <div key={member.name} className="flex flex-col items-center text-center">
            <div className="w-32 h-32 md:w-48 md:h-48 mb-6 overflow-hidden rounded-[40px]">
              <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
            </div>
            <h4 className="font-bold text-black text-lg md:text-xl mb-1">{member.name}</h4>
            <p className="text-sm md:text-base text-gray-600">{member.role} | Combine Foundation</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-[#F7FBFF] font-sans overflow-hidden">

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          
          <div className="flex flex-col gap-8 md:gap-0 max-w-6xl mx-auto">
            {/* Top Row: "OUR" + Image */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
              <h1 className="text-8xl md:text-[200px] font-black text-black tracking-tighter leading-none m-0">
                OUR
              </h1>
              <div className="bg-[#EBEBEB] p-4 md:p-6 rounded-[30px] md:rounded-[50px] w-full md:w-3/5">
                 <img src={teamData.partners[0].image} alt="Team" className="w-full h-[200px] md:h-[300px] object-cover rounded-2xl md:rounded-[40px]" />
              </div>
            </div>

            {/* Bottom Row: Image + "TEAM" */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 mt-8 md:-mt-8">
              <div className="bg-[#EBEBEB] p-4 md:p-6 rounded-[30px] md:rounded-[50px] w-full md:w-3/5 order-2 md:order-1">
                 <img src={teamData.partners[1].image} alt="Team" className="w-full h-[200px] md:h-[300px] object-cover rounded-2xl md:rounded-[40px]" />
              </div>
              <h1 className="text-8xl md:text-[200px] font-black text-black tracking-tighter leading-none m-0 order-1 md:order-2">
                TEAM
              </h1>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 py-16 max-w-6xl">

        {/* Founder Profile */}
        <section className="mb-24">
          <SectionHeader title="Founder Profile" />
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="flex-1 order-2 md:order-1">
              <h3 className="text-2xl font-bold text-black uppercase mb-6">{teamData.founder.name}</h3>
              {teamData.founder.description.map((p, i) => (
                <p key={i} className="text-gray-600 mb-5 leading-relaxed text-lg">{p}</p>
              ))}
            </div>
            <div className="w-full md:w-5/12 order-1 md:order-2">
               <img src={teamData.founder.image} alt={teamData.founder.name} className="rounded-[40px] w-full h-[350px] md:h-[450px] object-cover" />
            </div>
          </div>
        </section>

        {/* CEO Profile */}
        <section className="mb-24">
          <SectionHeader title="CEO Profile" />
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="w-full md:w-5/12">
               <img src={teamData.ceo.image} alt={teamData.ceo.name} className="rounded-[40px] w-full h-[350px] md:h-[450px] object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-black uppercase mb-6">{teamData.ceo.name}</h3>
              {teamData.ceo.description.map((p, i) => (
                <p key={i} className="text-gray-600 mb-5 leading-relaxed text-lg">{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Board of Trustees */}
        <section className="mb-24">
          <SectionHeader title="Board of Trustees" />
          <div className="flex flex-col gap-12">
            {teamData.boardOfTrustees.map((member) => (
              <div key={member.name} className="flex flex-col md:flex-row items-center md:items-start gap-8">
                 <div className="w-48 h-48 md:w-64 md:h-64 shrink-0">
                    <img src={member.image} alt={member.name} className="rounded-[40px] w-full h-full object-cover" />
                 </div>
                 <div className="flex-1 pt-4 text-center md:text-left">
                    <h4 className="text-2xl font-bold text-black mb-4">{member.name}</h4>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {member.role} at Combine Foundation. Working together to create a lasting impact in the lives of youth and communities through strategic leadership and vision.
                    </p>
                 </div>
              </div>
            ))}
          </div>
        </section>

        {/* Grids */}
        <GridSection title="Department heads" members={teamData.departmentHeads} />
        <GridSection title="Ambassadors" members={teamData.ambassadors} />
        <GridSection title="Youth Leaders" members={teamData.youthLeaders} />

        {/* Partners */}
        <section className="mb-20">
          <SectionHeader title="Partners" />
          <div className="flex flex-col gap-12 md:gap-16">
            {teamData.partners.map((partner) => (
              <div key={partner.name} className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 order-2 md:order-1 pr-0 md:pr-8">
                  <h4 className="text-2xl font-bold text-black mb-4">{partner.name}</h4>
                  <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                    Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id. Praesent lorem
                  </p>
                </div>
                <div className="w-full md:w-5/12 order-1 md:order-2">
                  <div className="overflow-hidden rounded-[30px] aspect-[16/10] w-full shadow-sm">
                    <img src={partner.image} alt={partner.name} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
