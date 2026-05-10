import React from 'react'
import PageHeroMobile from "@/components/UI/Pageheromobile"
import DonationForm from "@/components/donation/DonationForm"
import DonationUsage from "@/components/donation/DonationUsage"
import SuccessfulVentures from "@/components/donation/successfulventures"
import CtaSection from "@/components/UI/CtaSection"

function page() {
    return (
        <div>
            <PageHeroMobile title='Donate'
                imageSrc='/donation/donation.png'
                styles='object-top'
                Overlaycolor='bg-transparent'
            />
            <DonationForm />
            <DonationUsage />
            <SuccessfulVentures />
            <CtaSection text="Do you have the same vision as us ?" buttonText="Donate Now" />
        </div>
    )
}

export default page