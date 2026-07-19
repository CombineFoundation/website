"use client";

import Image from "next/image";
import type { FirestorePartner } from "@/lib/admin-actions";



function PartnerCard({ partner }: { partner: FirestorePartner }) {
  const [firstWord, ...remainingWords] = partner.name.split(" ");
  const remainingName = remainingWords.join(" ");

  return (
    <div className="group grid grid-cols-1 md:grid-cols-5 gap-0 rounded-3xl overflow-hidden">
      <div className="md:col-span-3 flex flex-col justify-center p-8 md:p-10 lg:p-12">
        <h3 className="text-xl md:text-2xl font-bold mb-6">
          <span className="text-primary-600">{firstWord}</span>
          {remainingName && (
            <span className="text-secondary-500"> {remainingName}</span>
          )}
        </h3>
        <p className="text-sm md:text-base text-primary-800 leading-relaxed">
          {partner.description}
        </p>
      </div>

      <div className="relative w-full h-96 md:h-[400px] md:col-span-2 overflow-hidden rounded-2xl">
        <Image
          src={partner.image}
          alt={partner.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
    </div>
  );
}

export default function PartnersSection({ partners: initialPartners }: { partners?: FirestorePartner[] }) {
  const displayPartners = initialPartners && initialPartners.length > 0 ? initialPartners : [];
  return (
    <section className="max-w-[1500px] mx-auto px-4 md:px-6 lg:px-8 py-10">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black border-b border-black pb-4 mb-10">
        Our Partners
      </h2>

      <div className="flex flex-col gap-8">
        {displayPartners.map((partner) => (
          <PartnerCard key={partner.id || partner.name} partner={partner} />
        ))}
      </div>
    </section>
  );
}
