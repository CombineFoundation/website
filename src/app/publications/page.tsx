import PageHeroMobile from "@/components/UI/Pageheromobile"
import AnnualReports from "@/components/publications/annual"
import Mouslider from "@/components/publications/Mouseslider"
import TaxShariaCertificates from "@/components/publications/Taxshariacertificates "


const page = () => {
    return (
        <div>
            <PageHeroMobile
                imageSrc="/publications/pub1.png"
                title="Publications"
                mobileStyles="!text-5xl"
            />
            <AnnualReports />
            <Mouslider />
            <TaxShariaCertificates />
        </div>
    )
}

export default page