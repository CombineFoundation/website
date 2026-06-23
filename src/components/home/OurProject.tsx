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
      "RAISE (Rising Ambitions in Skills & Education) is a project of the Combine Foundation that aims to empower students as well as employees with all the information, skills, and opportunities to excel in today's fast-paced environment. The aim of this project is to connect learners to practical training modules relevant to the industries which can help them secure their future employment. The RAISE project offers a variety of courses like Python with AI, Web Development, Basic Computer Skills, Quantitative Finance, Meta Ads Marketing, as well as programs designed to foster growth in personal qualities of learners. With a focus on building digital literacy, innovation, and a passion for learning, this project can help learners pursue freelancing jobs and improve their income and self-reliance.",
    image: "/home/project/project.png",
    link: "/projects",
  },
  {
    id: "2",
    name: "Scholarship & Career Support",
    description:
      "The Scholarship & Career Support Projects by Combine Foundation are designed to help students achieve their educational and professional goals through financial assistance, career guidance, and skill development opportunities. These initiatives support deserving students by creating pathways for education, digital learning, online earning, and future career growth. The CSC Scholarship Program provides financial assistance and academic support to deserving students unable to study due to financial reasons. Additionally, Freelancing & Online Earning Awareness sessions teach students and freelancers how to start earning online through digital skills, freelancing platforms, and practical career guidance.",
    image: "/home/project/project.png",
    link: "/projects",
  },
  {
    id: "3",
    name: "Volunteer & Youth Leadership",
    description:
      "The Volunteer and Youth Leadership Programs by Combine Foundation are specifically designed to help students and young individuals who want to develop leadership, communication, teamwork, and practical professional skills through real-world projects, community involvement, and social initiatives beyond academics. The Volunteer Program provides opportunities to work on real-world projects across different niches, developing skills like leadership, teamwork, responsibility, and communication. The Youth Leadership Program is a 6-month leadership development program that empowers young individuals through activities, real-world projects, teamwork, and social initiatives, helping them build confidence, personal growth, and strong community engagement skills.",
    image: "/home/project/project.png",
    link: "/projects",
  },
  {
    id: "4",
    name: "Ramadan Reset Challenge",
    description:
      "The Ramadan Reset Challenge by Combine Foundation is a spiritual and personal development program designed to help students and Muslim individuals to reconnect with Islamic values during the holy month of Ramadan. Through daily learning, reflection, and positive habit-building activities, this program encourages youth to strengthen their faith, improve character, and develop a more disciplined and meaningful lifestyle. This program also helps youth and students to build strong faith and create a sense of good habits through small actions from daily life.",
    image: "/home/project/project.png",
    link: "/projects",
  },
  {
    id: "5",
    name: "Health & Environmental Sustainability",
    description:
      "The Health Awareness & Environmental Sustainability Initiatives by Combine Foundation focus on promoting wellness, healthy living, and environmental sustainability within communities. Through the Healthy Lifestyle Awareness Program, we guide individuals on balanced nutrition, physical activity, and mindful living. Our One Follower One Plant plantation drive promotes environmental sustainability by planting a tree for every new supporter. The Kitchen Garden Festival Camp educates families on organic lifestyles and home-grown food. The Packet Palto Phir Kharido campaign encourages smarter food choices by reading product labels. Together, these initiatives encourage every individual to adopt positive habits and contribute toward a cleaner, healthier future.",
    image: "/home/project/project.png",
    link: "/projects",
  },
  {
    id: "6",
    name: "Community Welfare & Support",
    description:
      "The Community Welfare & Support Initiatives by Combine Foundation are focused on helping deserving families and supporting communities during difficult times. Through Disaster Relief & Emergency camps, we provide immediate help to communities affected by floods and natural disasters, distributing essential supplies with compassion. The Winter Relief & Community Support Drives provide warm clothing, blankets, and essential supplies to vulnerable families in remote areas like Balochistan. The Ramadan Food Support & Relief Program distributes essential food packages to deserving households during Ramadan, ensuring dignity and privacy for all recipients.",
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
    <section className="relative max-w-[1500px] mx-auto px-4 md:px-6 lg:px-8 py-4">
      <SectionHeader
        title="Our Projects"
        description="Explore our initiatives creating lasting impact across Pakistan."
      />

      <div className="absolute left-1 sm:left-3 top-1/2 w-1.5 h-[30%] translate-y-[-35%] rounded-full bg-primary-700" />
      <div className="absolute right-1 sm:right-3 translate-y-[-35%] top-1/2 w-1.5 h-[30%] rounded-full bg-primary-700" />

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
            className="inline-flex items-center justify-center w-fit px-7 py-3 rounded-full bg-navy hover:brightness-90 text-white font-semibold text-base transition-all duration-200"
          >
            Learn More
          </Link>
        </div>
      </div>

      <div className="flex justify-center sm:justify-end gap-3 my-10">
        <button
          onClick={handlePrev}
          aria-label="Previous project"
          className="w-11 h-11 rounded-full bg-primary-700 hover:brightness-90 text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
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
          className="w-11 h-11 rounded-full bg-primary-700 hover:brightness-90 text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
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
