import Hero from "@/components/UI/hero"
import FounderProfile from "@/components/our-team/founder-profile"
import CeoProfile from "@/components/our-team/ceo-profile"
import BoardOfTrustees from "@/components/our-team/board-of-trustees"
import LeadershipSections from "@/components/our-team/leadership-sections"
import PartnersSection from "@/components/our-team/partners-section"
import { fetchTeamMembers, fetchPartners, type FirestoreTeamMember, type FirestorePartner } from "@/lib/admin-actions"

export const dynamic = "force-dynamic";

const Page = async () => {
  let teamMembers: FirestoreTeamMember[] = [];
  let partners: FirestorePartner[] = [];

  try {
    teamMembers = await fetchTeamMembers();
  } catch (error) {
    console.error("Failed to fetch team members:", error);
  }

  try {
    partners = await fetchPartners();
  } catch (error) {
    console.error("Failed to fetch partners:", error);
  }

  return (
    <>
      <Hero text1="OUR" text2="TEAM" image1="/projects/projecthero.png" image2="/projects/projecthero.png" text1Size="big" text2Size="big" mobileTitle="OUR TEAM"/>
      <FounderProfile />
      <CeoProfile />
      <BoardOfTrustees teamMembers={teamMembers} />
      <LeadershipSections teamMembers={teamMembers} />
      <PartnersSection partners={partners} />
    </>
  )
}

export default Page
