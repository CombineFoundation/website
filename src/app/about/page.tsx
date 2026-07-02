import AboutHero from "@/components/UI/hero"
import OurStory from "@/components/about/OurStory"
import MissionVision from "@/components/about/Missionvision"
import Objective from "@/components/about/Objective"
import AboutFounder from "@/components/about/AboutFounder"
import Combineachievements from "@/components/about/Combineachievements"
import Ourvalues from "@/components/about/Ourvalues"
import Goals from "@/components/about/Goals"
const AboutPage = () => {
    return (
        <>
            <AboutHero
                text1="ABOUT"
                text2="COMBINE"
                image1="/about/hero/hero1.png"
                image2="/about/hero/hero2.jpg"
                text1Size="big"
                text2Size="big"
                mobileTitle="About"
            />
            <OurStory />
            <MissionVision />
            <Objective />
            <AboutFounder />
            <Combineachievements />
            <Ourvalues />
            <Goals />
        </>
    )
}

export default AboutPage
