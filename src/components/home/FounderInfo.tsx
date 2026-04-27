"use client";

import Image from "next/image";
import SectionHeader from "@/components/UI/SectionHeader";

type QuoteData = {
  name: string;
  quote: string;
  image: string;
};

const quoteData: QuoteData = {
  name: "MUHAMMAD AMIN NATHANI",
  quote:
    '"I have always believed that the true measure of success is not what we accumulate, but what we contribute. Looking at Pakistan, I saw a youth full of brilliance but shackled by a lack of resources. I realized that education without health is incomplete, and talent without opportunity is a tragedy."',
  image: "/home/person.png",
};

export default function QuoteSection() {
  return (
    <div className="relative w-full overflow-hidden">
      <section className="relative px-6 py-12 max-w-6xl mx-auto">
        <SectionHeader
          title="Founder Info"
          description="Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et."
        />

        <div className="relative mt-6">
          <div className="bg-[#1a3a7c] rounded-2xl px-8 py-10 md:px-12 md:py-14 md:pr-[210px] lg:pr-[150px] xl:pr-[300px] w-[85vw] max-w-5xl">
            <h2 className="text-white font-bold text-xl md:text-2xl tracking-wide mb-5">
              {quoteData.name}
            </h2>
            <p className="text-white/90 text-sm md:text-base leading-7 md:leading-8">
              {quoteData.quote}
            </p>
          </div>

          <div className="hidden md:block absolute bottom-0 right-[-11%] w-[360px] lg:w-[380px] xl:w-[400px] h-[380px] pointer-events-none">
            <Image
              src={quoteData.image}
              alt={quoteData.name}
              fill
              className="object-cover object-bottom"
              priority
            />
          </div>
        </div>
      </section>
    </div>
  );
}