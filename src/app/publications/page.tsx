import PageHeroMobile from "@/components/UI/Pageheromobile"
import AnnualReports from "@/components/publications/annual"
import Mouslider from "@/components/publications/Mouseslider"
import TaxShariaCertificates from "@/components/publications/Taxshariacertificates "
import { fetchMOUs, fetchAnnualReports, type FirestoreAnnualReport,type FirestorePartner, fetchPartners } from "@/lib/admin-actions"
import PartnersSection from "@/components/our-team/partners-section"

export const dynamic = "force-dynamic";

const page = async () => {
    let mous: FirestorePartner[] = [];
    let reports: FirestoreAnnualReport[] = [];
    try {
        mous = await fetchPartners();
    } catch (e) {
        console.error("Failed to fetch MOUs:", e);
    }
    try {
        reports = await fetchAnnualReports();
    } catch (e) {
        console.error("Failed to fetch Annual Reports:", e);
    }

    return (
        <div>
            <PageHeroMobile
                imageSrc="/publications/hero.svg"
                title="Publications"
                mobileStyles="!text-5xl"
                styles="object-top"
            />
            
            {reports.length > 0 && <AnnualReports reports={reports} />}
            {/* Section Header */}
                <div className="mt-20 mb-2 px-4 md:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-secondary-500">Our Partners</h2>
                </div>
                <hr className="border-gray-300 m-8 mt-0 " />
            <PartnersSection partners={mous} />
            <TaxShariaCertificates />
        </div>
    )
}

export default page