"use client";

import Image from "next/image";
import PageHeroMobile from "@/components/UI/Pageheromobile";

export default function Hero() {
  return (
    <section className="w-full bg-[#F7FBFF] py-10 px-4 md:px-10">
      <div className="hidden md:block">
        <div className="relative max-w-6xl mx-auto grid grid-cols-2 h-[95%] rounded-3xl">
          <div className="absolute w-full h-[94%] bg-[#E8E8E8] top-4 right-0 z-[1]" />

          <div className="bg-[#F7FBFF] rounded-br-3xl flex items-center justify-center p-6 z-[2]">
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-950">ABOUT</h1>
          </div>

          <div className="relative w-full h-[220px] md:h-[260px] rounded-3xl overflow-hidden bg-[#E8E8E8] flex items-center justify-center z-[2]">
            <Image
              src="/about/hero/hero1.png"
              alt="Team"
              width={800}
              height={400}
              className="object-cover w-[90%] md:w-[85%] h-[80%] rounded-3xl"
            />
          </div>

          <div className="relative w-full h-[220px] md:h-[260px] rounded-3xl overflow-hidden bg-[#E8E8E8] flex items-center justify-center z-[2]">
            <Image
              src="/about/hero/hero2.jpg"
              alt="Work"
              width={800}
              height={400}
              className="object-cover w-[90%] md:w-[85%] h-[80%] rounded-3xl"
            />
          </div>

          <div className="bg-[#F7FBFF] rounded-tl-3xl flex items-center justify-center p-6 z-[2]">
            <h1 className="text-5xl md:text-7xl font-extrabold">COMBINE</h1>
          </div>
        </div>
      </div>
      <div className="block md:hidden">
        <PageHeroMobile
          imageSrc="/about/hero/hero2.jpg"
          title="About Us"
          imageAlt="image"
        />
      </div>
    </section>
  );
}