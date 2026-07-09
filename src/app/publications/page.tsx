import PageHeroMobile from "@/components/UI/Pageheromobile"
import AnnualReports from "@/components/publications/annual"
import Mouslider from "@/components/publications/Mouseslider"
import TaxShariaCertificates from "@/components/publications/Taxshariacertificates "
import { fetchMOUs, type FirestoreMOU } from "@/lib/admin-actions"

export const dynamic = "force-dynamic";

const page = async () => {
    let mous: FirestoreMOU[] = [];
    try {
        mous = await fetchMOUs();
    } catch (e) {
        console.error("Failed to fetch MOUs:", e);
    }

    return (
        <div>
            <PageHeroMobile
                imageSrc="/publications/pub1.png"
                title="Publications"
                mobileStyles="!text-5xl"
            />
            <AnnualReports />
            <Mouslider mous={mous} />
            <TaxShariaCertificates />
        </div>
    )
}

export default page