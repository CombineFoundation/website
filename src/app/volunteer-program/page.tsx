import Hero from "@/components/UI/hero"
import HowItWorks from "@/components/volunteer/Howitworks"
import WhyJoinUs from "@/components/volunteer/Whyjoinus"
import Filltheform from "@/components/volunteer/Filltheform"
import CtaSection from "@/components/UI/CtaSection";
import HearFromVolunteers from "@/components/volunteer/ourVolunteer";
import FAQs from "@/components/home/FaqSection"


export default function VolunteerPage() {
    return (
        <div>
            <Hero text1="VOLUNTEER" text2="PROGRAM"
                image1="/volunteer/vol1.png"
                image2="/volunteer/vol2.png"
                text1Size="small"
                text2Size="small"
                mobileTitle="Volunteer"
            />
            <HowItWorks />
            <WhyJoinUs />
            <Filltheform />
            <CtaSection text="Ready to Contribute for Good ?" buttonText="Apply Now" url="/contact" />
            <HearFromVolunteers />
            <FAQs />
        </div>
    );
}