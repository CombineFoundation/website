import Hero from "@/components/UI/hero"
import FounderProfile from "@/components/our-team/founder-profile"
import CeoProfile from "@/components/our-team/ceo-profile"
import BoardOfTrustees from "@/components/our-team/board-of-trustees"
import LeadershipSections from "@/components/our-team/leadership-sections"
import PartnersSection from "@/components/our-team/partners-section"

const Page = () => {
  return (
    <>
      <Hero text1="OUR" text2="TEAM" image1="/projects/projecthero.png" image2="/projects/projecthero.png" text1Size="big" text2Size="big" mobileTitle="OUR TEAM"/>
      <FounderProfile />
      <CeoProfile />
      <BoardOfTrustees />
      <LeadershipSections />
      <PartnersSection />
    </>
  )
}

export default Page
