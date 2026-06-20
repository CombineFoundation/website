"use client";

import Image from "next/image";

interface Certificate {
    id: number;
    title: string;
    image: string;
    imageAlt: string;
    url: string;
}

const certificates: Certificate[] = [
    {
        id: 1,
        title: "Tax Certificate for the year 2024",
        image: "/publications/pub1.png",
        imageAlt: "Tax Certificate 2024",
        url: "/certificates/tax-2024",
    },
    {
        id: 2,
        title: "Tax Certificate for the year 2023",
        image: "/publications/pub1.png",
        imageAlt: "Tax Certificate 2023",
        url: "/certificates/tax-2023",
    },
    {
        id: 3,
        title: "Tax Certificate for the year 2022",
        image: "/publications/pub1.png",
        imageAlt: "Tax Certificate 2022",
        url: "/certificates/tax-2022",
    },
];

const ArrowIcon = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <line x1="7" y1="17" x2="17" y2="7" />
        <polyline points="7 7 17 7 17 17" />
    </svg>
);

const CertificateCard = ({ cert }: { cert: Certificate }) => {
    return (
        <div className="aspect-square flex flex-col rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200 ">
            {/* Book Cover Image */}
            <div className="relative w-full flex-1 bg-gray-200 flex items-center justify-center">
                {cert.image ? (
                    <Image
                        src={cert.image}
                        alt={cert.imageAlt}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <span className="text-gray-400 text-sm lg:text-base font-medium">
                        Book cover image
                    </span>
                )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-white shrink-0">
                <span className="text-sm font-medium text-gray-800 leading-tight">
                    {cert.title}
                </span>
                <a
                    href={cert.url}
                    aria-label={`Open ${cert.title}`}
                    className="ml-3 flex-shrink-0 w-8 h-8 rounded-full bg-secondary-700 hover:brightness-90 text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
                >
                    <ArrowIcon />
                </a>
            </div>
        </div>
    );
};

const TaxShariaCertificates = () => {
    return (
        <section className="bg-white py-12 px-4">
            <div className="max-w-full mx-auto">

                <div className="mb-2">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Tax and Sharia Certificates
                    </h2>
                </div>
                <hr className="border-gray-300 mb-8" />

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mx-5">
                    {certificates.map((cert) => (
                        <CertificateCard key={cert.id} cert={cert} />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default TaxShariaCertificates;