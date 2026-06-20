"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import PageHeroMobile from "@/components/UI/Pageheromobile";
import AchievementsList from "@/components/projects/Achievementslist ";
import projectsData from "@/data/projects.json";

const AchievementsMap = dynamic(() => import("@/components/projects/map"), { ssr: false });

export default function Projects() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const projects = projectsData as Array<{
    id: number;
    title: string;
    images: string[];
    description: string;
    goal: string;
    stats: { value: string; label: string }[];
    beforeImage: string;
    afterImage: string;
    futurePlans: string;
    partners: string[];
    location: string;
    coordinates: string;
  }>;

  const handleMapSelect = (id: number) => {
    setActiveId(id);
    setTimeout(() => {
      const el = document.getElementById(`project-card-${id}`);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  };

  const handleCardToggle = (id: number) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <PageHeroMobile title="Projects" imageSrc="/projects/projecthero.png" styles="my-4" />
      <AchievementsMap
        projects={projects}
        activeId={activeId}
        onSelect={handleMapSelect}
      />
      <AchievementsList
        projects={projects}
        activeId={activeId}
        onToggle={handleCardToggle}
      />
    </>
  );
}
