"use client";

import { useState } from "react";
import Image from "next/image";
import SectionHeader from "../UI/SectionHeader";

type ImpactItem = {
  id: number;
  stat: string;
  title: string;
  image: string;
  description: string;
};

const impactItems: ImpactItem[] = [
  {
    id: 1,
    stat: "100+",
    title: "Schools Built",
    // image: "/images/impact/schools.jpg",
    image: "/image1.avif",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien.",
  },
  {
    id: 2,
    stat: "500+",
    title: "Volunteers Trained",
    // image: "/images/impact/volunteers.jpg",
    image: "/image1.avif",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante.",
  },
  {
    id: 3,
    stat: "50+",
    title: "Cities Reached",
    // image: "/images/impact/cities.jpg",
    image: "/image1.avif",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur ultrices mauris.",
      
  },
  {
    id: 4,
    stat: "50+",
    title: "Cities Reached",
    // image: "/images/impact/cities.jpg",
    image: "/image1.avif",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur ultrices mauris.",
      
  },
  
];
type ImpactCardProps = {
  item: ImpactItem;
};
 
function ImpactCard({ item }: ImpactCardProps) {
  const [hovered, setHovered] = useState<boolean>(false);
 
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl border border-gray-200 bg-white cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden p-2"
      style={{ height: "420px" }}
    >
      <div
        className="relative w-full overflow-hidden rounded-2xl flex-shrink-0 transition-all duration-500 ease-in-out"
        style={{ height: hovered ? "50px" : "210px" }}
      >
        <Image
          src={item.image}
          alt={item.title}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          fill
          className="object-cover object-top"
        />
      </div>
 
      <div className="p-5 overflow-hidden" style={{ height: hovered ? "290px" : "210px", transition: "height 0.5s ease" }}>
        <p className="text-3xl font-bold text-gray-900 leading-none mb-1">
          {item.stat}
        </p>
        <h3 className="text-lg font-semibold text-gray-900 mb-2.5">
          {item.title}
        </h3>
        <p
          className="text-sm text-gray-500 leading-relaxed overflow-hidden"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: hovered ? 9 : 4,
            overflow: "hidden",
          }}
        >
          {item.description}
        </p>
      </div>
    </div>
  );
}
 
export default function OurImpact() {
  return (
    <section className="py-16 px-6 max-w-6xl mx-auto bg-white">
      <SectionHeader title="OUR IMPACT" description="Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et." />
 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {impactItems.map((item) => (
          <ImpactCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}