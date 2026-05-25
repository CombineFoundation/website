import ProfileHero from '@/components/team/ProfileHero';
import TeamMemberCard from '@/components/team/TeamMemberCard';


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
    { name: "Hamdard Foundation", role: "Strategic Partner", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800" },
    { name: "Saylani Trust", role: "Development Partner", image: "https://images.unsplash.com/photo-1551836022-83587b97143c?auto=format&fit=crop&q=80&w=800" },
  ]
};

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-white font-sans">

      {/* Hero Section */}
      <section className="bg-gray-50 py-20 overflow-hidden relative">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex flex-col items-center justify-center">
             <h1 className="text-7xl md:text-9xl font-black text-navy opacity-10 absolute -top-10 left-1/2 -translate-x-1/2 select-none">
              TEAM
            </h1>
            <h1 className="text-5xl md:text-7xl font-extrabold text-navy mb-6 tracking-tight">
              OUR <span className="text-orange">TEAM</span>
            </h1>
            <div className="w-24 h-2 bg-orange rounded-full"></div>
            <p className="mt-8 text-xl text-gray-600 max-w-2xl">
              Meet the dedicated individuals who make Combine Foundation's mission a reality every single day.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        
        {/* Founder & CEO */}
        <div className="space-y-12">
          <section id="founder">
            <h2 className="text-3xl font-bold text-navy mb-8 border-b-4 border-orange w-fit pb-2">Founder Profile</h2>
            <ProfileHero {...teamData.founder} />
          </section>

          <section id="ceo">
            <h2 className="text-3xl font-bold text-navy mb-8 border-b-4 border-orange w-fit pb-2">CEO Profile</h2>
            <ProfileHero {...teamData.ceo} reverse />
          </section>
        </div>

        <hr className="my-20 border-gray-100" />

        {/* Board of Trustees */}
        <section id="board" className="mb-24">
          <h2 className="text-3xl font-bold text-navy mb-12 text-center">Board of Trustees</h2>
          <div className="max-w-4xl mx-auto divide-y divide-gray-100 bg-white rounded-3xl shadow-sm border border-gray-50">
            {teamData.boardOfTrustees.map((member) => (
              <TeamMemberCard key={member.name} {...member} variant="list" />
            ))}
          </div>
        </section>

        {/* Grids */}
        <div className="space-y-32">
          <SectionGrid title="Department Heads" members={teamData.departmentHeads} />
          <SectionGrid title="Ambassadors" members={teamData.ambassadors} />
          <SectionGrid title="Youth Leaders" members={teamData.youthLeaders} />
        </div>

        <hr className="my-20 border-gray-100" />

        {/* Partners */}
        <section id="partners" className="mb-20">
          <h2 className="text-3xl font-bold text-navy mb-12 text-center">Our Partners</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {teamData.partners.map((partner) => (
              <div key={partner.name} className="flex flex-col md:flex-row gap-6 bg-gray-50 p-8 rounded-3xl group hover:shadow-xl transition-all duration-500">
                <div className="w-full md:w-1/2 overflow-hidden rounded-2xl">
                  <img src={partner.image} alt={partner.name} className="w-full h-full object-cover aspect-video group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <h4 className="text-2xl font-bold text-navy">{partner.name}</h4>
                  <p className="text-orange font-semibold mb-4">{partner.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Working together to create a lasting impact in the lives of youth and communities.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

    </main>
  );
}

function SectionGrid({ title, members }: { title: string, members: any[] }) {
  return (
    <section>
      <h2 className="text-3xl font-bold text-navy mb-12 text-center">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {members.map((member) => (
          <TeamMemberCard key={member.name} {...member} />
        ))}
      </div>
    </section>
  );
}
