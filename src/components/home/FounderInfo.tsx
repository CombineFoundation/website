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
  image: "/home/founder/person.png",
};

export default function QuoteSection() {
  return (
    <div className="relative w-full overflow-hidden">
      <SectionHeader
        title="Founder Info"
        description="Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et."
      />
      <section className="relative px-6 w-full md:w-[95%] lg:w-[85%] xl:w-[87%] max-w-6xl mx-auto">

        <div className="relative rounded-2xl w-full"
          style={{
            background: "linear-gradient(97.67deg, #0F3D6B 12.02%, #0061C3 43.27%, #0061C3 65.87%, #0F3D6B 89.9%)",
          }}
        >
          <div className=" px-8 py-6 md:px-12 md:py-14 lg:pr-[250px] xl:pr-[300px] w-full lg:w-full min-[856px]:w-[80%] ">

            <h2 className="text-white font-bold text-xl md:text-2xl mb-5 text-center min-[856px]:text-left">
              {quoteData.name}
            </h2>
            <p className="text-white/90 text-base md:text-sm xl:text-lg text-center min-[856px]:text-left ">
              {quoteData.quote}
            </p>

            <div className="hidden min-[856px]:block absolute bottom-0  right-[-25%] w-[450px] lg:w-[500px] h-[380px] pointer-events-none">
              <Image
                src={quoteData.image}
                alt={quoteData.name}
                fill
                className="object-contain object-bottom"
                priority
              />
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}