"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

type Project = {
  id: number;
  name: string;
  description: string;
  image: string;
  link: string;
};

const projects: Project[] = [
  {
    id: 1,
    name: "PROJECT NAME",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non",
    image: "/image1.avif",
    link: "/projects/1",
  },
  {
    id: 2,
    name: "PROJECT TWO",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue.",
    image: "/image1.avif",
    link: "/projects/2",
  },
  {
    id: 3,
    name: "PROJECT THREE",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.",
    image: "/image1.avif",
    link: "/projects/3",
  },
];

type Direction = "next" | "prev";

export default function ProjectsSlider() {
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
            ? (prev + 1) % projects.length
            : (prev - 1 + projects.length) % projects.length
        );
        setSliding(false);
      }, 400);
    },
    [sliding]
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

  const project = projects[current];

  return (
    <section className="relative px-10 py-4">
      <div className="absolute left-3 top-1/2 w-2 h-[30%] translate-y-[-65%] rounded-full bg-[#1a2f5a]" />
      <div className="absolute right-3 translate-y-[-65%] top-1/2 w-2 h-[30%] rounded-full bg-[#1a2f5a]" />

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

          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
        </div>

        <div
          className="absolute inset-0 flex flex-col justify-center px-10 max-w-2xl"
          style={{
            opacity: sliding ? 0 : 1,
            transition: "opacity 0.3s ease",
          }}
        >
          <h2 className="text-white text-4xl font-bold tracking-wide mb-5">
            {project.name}
          </h2>
          <p className="text-white/90 text-base leading-relaxed mb-8 line-clamp-5">
            {project.description}
          </p>
          <Link
            href={project.link}
            className="inline-flex items-center justify-center w-fit px-7 py-3 rounded-full bg-[#e8511a] hover:bg-[#cf4515] text-white font-semibold text-base transition-colors duration-200"
          >
            Learn More
          </Link>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-5">
        <button
          onClick={handlePrev}
          aria-label="Previous project"
          className="w-11 h-11 rounded-full bg-[#1a2f5a] hover:bg-[#243d73] text-white flex items-center justify-center transition-colors duration-200 cursor-pointer"
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
          className="w-11 h-11 rounded-full bg-[#1a2f5a] hover:bg-[#243d73] text-white flex items-center justify-center transition-colors duration-200 cursor-pointer"
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