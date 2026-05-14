import ProfileHero from '@/components/team/ProfileHero';
import TeamMemberCard from '@/components/team/TeamMemberCard';
import AboutHero from '@/components/UI/hero';


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

      <AboutHero 
        text1="OUR" 
        text2="TEAM" 
        image1="https://images.unsplash.com/photo-1511632765486-a01c80cf8cb4?auto=format&fit=crop&q=80&w=800" 
        image2="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800"
        text1Size="small"
        text2Size="small"
        mobileTitle="OUR TEAM"
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        
        {/* Founder & CEO */}
        <div className="space-y-12">
          <section id="founder">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-bold text-black whitespace-nowrap">Founder Profile</h2>
              <div className="h-[2px] bg-gray-300 w-full rounded"></div>
            </div>
            <ProfileHero {...teamData.founder} />
          </section>

          <section id="ceo">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-bold text-black whitespace-nowrap">CEO Profile</h2>
              <div className="h-[2px] bg-gray-300 w-full rounded"></div>
            </div>
            <ProfileHero {...teamData.ceo} reverse />
          </section>
        </div>

        <hr className="my-20 border-gray-100" />

        {/* Board of Trustees */}
        <section id="board" className="mb-24">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold text-black whitespace-nowrap">Board of Trustees</h2>
            <div className="h-[2px] bg-gray-300 w-full rounded"></div>
          </div>
          <div className="max-w-5xl mx-auto divide-y divide-gray-200">
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
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold text-black whitespace-nowrap">Partners</h2>
            <div className="h-[2px] bg-gray-300 w-full rounded"></div>
          </div>
          <div className="grid grid-cols-1 gap-12">
            {teamData.partners.map((partner) => (
              <div key={partner.name} className="flex flex-col md:flex-row gap-8 items-center bg-white p-4 rounded-3xl group">
                <div className="w-full md:w-1/2 flex flex-col justify-center pr-4">
                  <h4 className="text-xl md:text-2xl font-bold text-black mb-4">{partner.name}</h4>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    {partner.role === 'Strategic Partner' ? 'Curabitur pellentesque nibh nibh, et maximus amet fermentum sit amet. Pellentesque commodo lacus ut scelerisque condimentum. Quisque sagittis orci nullam condimentum, vehicula leo id erat placerat in iaculis arcu erat, eget tempus dui tincidunt. Proin ut lorem.' : 'Curabitur pellentesque nibh nibh, et maximus amet fermentum sit amet. Pellentesque commodo lacus ut scelerisque condimentum. Quisque sagittis orci nullam condimentum, vehicula leo id erat placerat in iaculis arcu erat, eget tempus dui tincidunt. Proin ut lorem.'}
                  </p>
                </div>
                <div className="w-full md:w-1/2 overflow-hidden rounded-2xl relative">
                  <img src={partner.image} alt={partner.name} className="w-full h-full object-cover aspect-[4/3] rounded-2xl" />
                  <div className="absolute bottom-2 right-2 bg-orange text-white text-[10px] font-bold px-2 py-1 rounded">COMBINE</div>
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
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-3xl font-bold text-black whitespace-nowrap">{title}</h2>
        <div className="h-[2px] bg-gray-300 w-full rounded"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {members.map((member) => (
          <TeamMemberCard key={member.name} {...member} />
        ))}
      </div>
    </section>
  );
}
