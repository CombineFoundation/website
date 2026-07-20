import Hero from "@/components/UI/hero"
import HowItWorks from "@/components/volunteer/Howitworks"
import WhyJoinUs from "@/components/volunteer/Whyjoinus"
import CtaSection from "@/components/UI/CtaSection";
import HearFromVolunteers from "@/components/volunteer/ourVolunteer";
import VolunteerFAQ from "@/components/volunteer/VolunteerFAQ";


export default function VolunteerPage() {
    return (
        <div>
            <Hero text1="VOLUNTEER" text2="PROGRAM"
                image1="/volunteer/volunteer program imgs/hero g.svg"
                image2="/volunteer/volunteer program imgs/hero g (2).svg"
                text1Size="small"
                text2Size="small"
                mobileTitle="Volunteer"
            />
            <HowItWorks />
            <WhyJoinUs />
            <CtaSection text="More Than Volunteering — A Career Journey" buttonText="Join Today" url="https://www.combinefoundationportal.com/volunteer/apply" />
            <HearFromVolunteers />
            <VolunteerFAQ />
        </div>
    );
}
