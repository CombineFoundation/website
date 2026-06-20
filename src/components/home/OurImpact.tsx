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
    stat: "3000+",
    title: "Lives Impacted",
    image: "/home/impact/impact4.png",
    description:
      "At Combine Foundation, every project is created with the mission to bring positive change in people's lives. Through our educational, welfare, leadership, and community development programs, we have proudly impacted 3000+ individuals by creating opportunities, spreading hope, and supporting communities in times of need.",
  },
  {
    id: 2,
    stat: "204+",
    title: "Students Empowered",
    image: "/home/impact/impact2.jpg",
    description:
      "More than 204 students have been trained through technology, digital skills, and professional development programs. These courses help students to gain confidence, build careers, start earning from home and create better futures through education, freelancing, and modern digital skills.",
  },
  {
    id: 3,
    stat: "250+",
    title: "Passionate Volunteers",
    image: "/home/impact/impact2.jpg",
    description:
      "Our 250+ active volunteers are the heart of our community initiatives. From welfare drives to educational campaigns or Youth Leadership Program, they dedicate their time and efforts to serving humanity, supporting communities, and spreading kindness across Pakistan.",
  },
  {
    id: 4,
    stat: "40+",
    title: "Youth Leaders",
    image: "/home/impact/impact4.png",
    description:
      "We have empowered 40+ active youth leaders who are confidently leading projects, social initiatives, and community activities and working as leaders in the Youth Leadership Program of the Combine Foundation.",
  },
  {
    id: 5,
    stat: "20+",
    title: "Team Members",
    image: "/home/impact/impact5.png",
    description:
      "Behind every successful initiative is our Combine Foundation team. We have 20+ committed members working across different departments with passion, teamwork, and a shared vision to create meaningful social impact.",
  },
  {
    id: 6,
    stat: "9+",
    title: "Courses Completed",
    image: "/home/impact/impact6.png",
    description:
      "Combine Foundation has successfully conducted 9 professional and skill development courses designed to prepare students and professionals for careers in technology, freelancing, digital marketing, and personal growth.",
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
      className="rounded-4xl min-[450px]:w-[75%] w-[300px] sm:w-auto cursor-pointer duration-300 overflow-hidden p-2 border-2 border-gray-400"
      style={{ height: "370px" }}
    >
      <div
        className="relative w-full overflow-hidden rounded-4xl shrink-0 transition-all duration-500 ease-in-out"
        style={{ height: hovered ? "30px" : "180px" }}
      >
        <Image
          src={item.image}
          alt={item.title}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          fill
          className="object-cover object-top"
        />
      </div>

      <div className="p-5 overflow-hidden" style={{ height: hovered ? "300px " : "210px", transition: "height 0.5s ease" }}>
        <p className="text-3xl md:text-4xl font-bold text-gray-900 leading-none mb-1">
          {item.stat}
        </p>
        <h3 className="text-xl md:text-2xl font-medium text-gray-900 mb-2.5">
          {item.title}
        </h3>
        <p
          className="text-sm text-gray-500 leading-relaxed overflow-hidden"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: hovered ? 9 : 3,
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
    <section className="py-16 px-6 mx-auto max-w-[1400px]">
      <SectionHeader title="OUR IMPACT" description="At Combine Foundation, every project is created with the mission to bring positive change in people's lives. Through our educational, welfare, leadership, and community development programs, we have proudly impacted 3000+ individuals by creating opportunities, spreading hope, and supporting communities in times of need." />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center justify-items-center">
        {impactItems.map((item) => (
          <ImpactCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}