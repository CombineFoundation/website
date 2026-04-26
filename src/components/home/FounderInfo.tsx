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

        <div className="mt-6 bg-[#1a3a7c] rounded-2xl px-8 py-10 md:px-12 md:py-14 md:pr-[300px] lg:pr-[360px]">
          <h2 className="text-white font-bold text-xl md:text-2xl tracking-wide mb-5">
            {quoteData.name}
          </h2>
          <p className="text-white/90 text-sm md:text-base leading-7 md:leading-8">
            {quoteData.quote}
          </p>
        </div>

        <div className="md:hidden relative w-full h-64 mt-4 rounded-2xl overflow-hidden">
          <Image
            src={quoteData.image}
            alt={quoteData.name}
            fill
            className="object-cover object-top"
          />
        </div>
      </section>

      <div
        // className="hidden md:block absolute right-0 bottom-0 w-[280px] lg:w-[340px] h-[120%]"
        className="hidden md:block absolute right-[-7%]  bottom-0 w-[35%] h-[120%]"
        style={{
          // top: "10px",
          // mixBlendMode: "screen",
        }}
      >
        <Image
          src={quoteData.image}
          alt={quoteData.name}
          fill
          className="object-contain object-bottom"
        />
      </div>
    </div>
  );
}