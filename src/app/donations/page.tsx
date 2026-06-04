
import DonationForm from "@/components/donation/DonationForm"
import DonationUsage from "@/components/donation/DonationUsage"
import SuccessfulVentures from "@/components/donation/successfulventures"
import CtaSection from "@/components/UI/CtaSection"

function page() {
    return (
        <div>
            <DonationForm />
            <DonationUsage />
            <SuccessfulVentures />
            <CtaSection text="Do you have the same vision as us ?" buttonText="Donate Now" />
        </div>
    )
}

export default page