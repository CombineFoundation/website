import PageHeroMobile from "@/components/UI/Pageheromobile"
import OurIdeaAboutEvents from "@/components/events/ourideas"
import UpcomingEvents from "@/components/events/UpcomingEvents"
import MeetOurSpeakers from "@/components/events/meetourspeakers"

const page = () => {
    return (
        <>
            <PageHeroMobile title="Events" imageSrc="/home/blog/blog2.png"
            />
            <OurIdeaAboutEvents />
            <UpcomingEvents />
            <MeetOurSpeakers />
        </>
    )
}

export default page