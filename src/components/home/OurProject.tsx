"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import SectionHeader from "../UI/SectionHeader";
import Image from "next/image";
import Link from "next/link";

type Project = {
  id: string;
  name: string;
  description: string;
  image: string;
  link: string;
};

const DEFAULT_PROJECTS: Project[] = [
  {
    id: "1",
    name: "RAISE",
    description:
      "RAISE (Rising Ambitions in Skills & Education) is a project of Combine Foundation that aims to empower students as well as employees with all the information, skills, and opportunities to excel in today's fast-paced environment. The project offers courses like Python with AI, Web Development, Basic Computer Skills, Quantitative Finance, and Meta Ads Marketing, designed to foster digital literacy and self-reliance.",
    image: "/home/project/project.png",
    link: "/projects",
  },
  {
    id: "2",
    name: "Scholarship & Career Support",
    description:
      "The Scholarship & Career Support Projects by Combine Foundation are designed to help students achieve their educational and professional goals through financial assistance, career guidance, and skill development opportunities. These initiatives support deserving students by creating pathways for education, digital learning, online earning, and future career growth.",
    image: "/home/project/project.png",
    link: "/projects",
  },
  {
    id: "3",
    name: "Volunteer & Youth Leadership",
    description:
      "The Volunteer and Youth Leadership Programs by Combine Foundation are designed to help students and young individuals develop leadership, communication, teamwork, and practical professional skills through real-world projects, community involvement, and social initiatives that create positive impact.",
    image: "/home/project/project.png",
    link: "/projects",
  },
  {
    id: "4",
    name: "Ramadan Reset Challenge",
    description:
      "The Ramadan Reset Challenge by Combine Foundation is a spiritual and personal development program designed to help students and individuals reconnect with Islamic values during the holy month of Ramadan through daily learning, reflection, and positive habit-building activities.",
    image: "/home/project/project.png",
    link: "/projects",
  },
  {
    id: "5",
    name: "Health & Environmental Sustainability",
    description:
      "The Health Awareness & Environmental Sustainability Initiatives by Combine Foundation focus on promoting wellness, healthy living, and environmental sustainability awareness within communities through awareness programs, lifestyle education, plantation drives, and sustainability activities for a greener future.",
    image: "/home/project/project.png",
    link: "/projects",
  },
  {
    id: "6",
    name: "Community Welfare & Support",
    description:
      "The Community Welfare & Support Initiatives by Combine Foundation are focused on helping deserving families and supporting communities during difficult times through relief camps, social support programs, and community-driven initiatives that restore dignity and improve quality of life.",
    image: "/home/project/project.png",
    link: "/projects",
  },
];

type Direction = "next" | "prev";

interface ProjectsSliderProps {
  projects?: Array<{
    id: string | number;
    title?: string;
    name?: string;
    images?: string[];
    image?: string;
    description: string;
    link?: string;
  }>;
}

export default function ProjectsSlider({ projects: initialProjects }: ProjectsSliderProps) {
  const displayProjects = useMemo(() => {
    const list = initialProjects && initialProjects.length > 0 ? initialProjects : DEFAULT_PROJECTS;
    return list.map((p: any) => ({
      id: String(p.id),
      name: p.title || p.name || "",
      description: p.description,
      image: p.images?.[0] || p.image || "/home/project/project.png",
      link: p.link || `/projects`,
    }));
  }, [initialProjects]);

  const [current, setCurrent] = useState<number>(0);
  const [sliding, setSliding] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>("next");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (dir: Direction) => {
      if (sliding) return;
      setDirection(dir);
      setSliding(true);
      setTimeout(() => {
        setCurrent((prev) =>
          dir === "next"
            ? (prev + 1) % displayProjects.length
            : (prev - 1 + displayProjects.length) % displayProjects.length
        );
        setSliding(false);
      }, 400);
    },
    [sliding, displayProjects.length]
  );

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => goTo("next"), 5000);
  }, [goTo]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const handlePrev = () => {
    goTo("prev");
    startTimer();
  };

  const handleNext = () => {
    goTo("next");
    startTimer();
  };

  const project = displayProjects[current];

  if (displayProjects.length === 0) {
    return null;
  }

  return (
    <section className="relative px-5 sm:px-10 py-4">
      <SectionHeader
        title="Our Projects"
        description="Explore our initiatives creating lasting impact across Pakistan."
      />

      <div className="absolute left-1 sm:left-3 top-1/2 w-1.5 h-[30%] translate-y-[-35%] rounded-full bg-secondary-700" />
      <div className="absolute right-1 sm:right-3 translate-y-[-35%] top-1/2 w-1.5 h-[30%] rounded-full bg-secondary-700" />

      <div
        className="relative w-full rounded-2xl overflow-hidden"
        style={{ height: "430px" }}
      >
        <div
          className="absolute inset-0 transition-all duration-400 ease-in-out"
          style={{
            opacity: sliding ? 0 : 1,
            transform: sliding
              ? direction === "next"
                ? "translateX(-20px)"
                : "translateX(20px)"
              : "translateX(0)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
          }}
        >
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover object-center"
            priority
          />

          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div
          className="absolute inset-0 flex flex-col justify-center px-10 max-w-2xl items-center md:items-start"
          style={{
            opacity: sliding ? 0 : 1,
            transition: "opacity 0.3s ease",
          }}
        >
          <h2 className="text-white text-2xl md:text-4xl font-bold mb-5 text-center md:text-left ">
            {project.name}
          </h2>
          <p className="text-white/90 text-sm md:text-base leading-relaxed mb-8 line-clamp-5">
            {project.description}
          </p>
          <Link
            href={project.link}
            className="inline-flex items-center justify-center w-fit px-7 py-3 rounded-full bg-accent-orange hover:brightness-90 text-white font-semibold text-base transition-all duration-200"
          >
            Learn More
          </Link>
        </div>
      </div>

      <div className="flex justify-center sm:justify-end gap-3 my-10">
        <button
          onClick={handlePrev}
          aria-label="Previous project"
          className="w-11 h-11 rounded-full bg-secondary-700 hover:brightness-90 text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          aria-label="Next project"
          className="w-11 h-11 rounded-full bg-secondary-700 hover:brightness-90 text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </section>
  );
}