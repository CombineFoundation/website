import PageHeroMobile from "@/components/UI/Pageheromobile"
import AnnualReports from "@/components/publications/annual"
import Mouslider from "@/components/publications/Mouseslider"
import TaxShariaCertificates from "@/components/publications/Taxshariacertificates "
import { fetchMOUs, fetchAnnualReports, type FirestoreAnnualReport,type FirestorePartner, fetchPartners } from "@/lib/admin-actions"

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
                imageSrc="/publications/pub1.png"
                title="Publications"
                mobileStyles="!text-5xl"
            />
            
            {reports.length > 0 && <AnnualReports reports={reports} />}
            <Mouslider mous={mous} />
            <TaxShariaCertificates />
        </div>
    )
}

export default page