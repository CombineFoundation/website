import Contact from "@/components/contact/contact";
import Locations from "@/components/contact/locations";

export const metadata = {
    title: "Contact Us",
    description: "Get in touch with Combine Foundation for donations, volunteering, programs, partnerships, and general enquiries.",
};

export default function ContactPage() {
    return (
        <>
            <Contact />
            <Locations />
        </>

    )
}
