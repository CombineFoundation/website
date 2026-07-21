"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import type { FirestorePartner } from "@/lib/admin-actions";

interface Partner {
  id: number | string;
  name: string;
  description: string;
  image: string;
  mou?: string;
}

const fallbackPartners: Partner[] = [
  {
    id: 1,
    name: "Sindh Madarasatul Islam University (SMIU)",
    description:
      "Sindh Madarasatul Islam University (SMIU) is a highly valued partner organization associated with Combine Foundation to provide educational and innovative learning opportunities for students. In this connection, both partner organizations are looking forward to providing a platform where students can learn and develop skills.",
    image: "/about/hero/hero1.png",
    mou: "/mou/youth development training.pdf",
  },
  {
    id: 2,
    name: "Hammad Foundation",
    description:
      "Hammad Foundation is one of our valued community partners that help us in our mission to serve the community in terms of social welfare and environmental awareness, along with other community services. It shows the commitment of both foundations in bringing about a positive impact on society.",
    image: "/about/hero/hero2.jpg",
    mou: "/mou/hammad foundation.pdf",
  },
  {
    id: 3,
    name: "Quants Society (NED University)",
    description:
      "Quants Society, being one of the Department Societies of NED University, is a valued academic and community society that works in collaboration with the Combine Foundation in helping students develop their skills and careers. Under this collaboration, a session was conducted at NED University.",
    image: "/about/story/story.png",
    mou: "/mou/QUANTS SOCIETY.pdf",
  },
  {
    id: 4,
    name: "NGAS \u2014 NED Girls Affairs Society (NED University)",
    description:
      "NGAS \u2013 NED Girls Affairs Society is a valued partner organization collaborating with Combine Foundation to promote awareness, education, and community empowerment initiatives focused on social wellbeing and women\u2019s development.",
    image: "/events/eventsperson.png",
    mou: "/mou/NEDGAS.pdf",
  },
  {
    id: 5,
    name: "Combine Foundation with Islamian Computing Society",
    description:
      "The Memorandum of Understanding has been signed by Combine Foundation and Islamian Computing Society (ICS), International Islamic University Islamabad (IIUI) to enhance the technical skills of the students through education, training, and professional development. The aim of this MoU is to fill the gap between theory and practice and make sure that the students have access to new technological courses and skill development programs through which they can develop their technical skills. In collaboration with each other, they can arrange workshops, webinars, campaigns, and training related to Artificial Intelligence (AI), Python, Web Development, Cybersecurity, Shopify, WordPress, and Programming, through which they can develop their technical skills and enhance their career ready competencies. Under this MoU, the Combine Foundation will provide free or reduced fees of courses along with training, learning materials, guidance, and ecertificates while the Islamian Computing Society will help the students participate in the educational initiatives.",
    image: "/about/hero/hero1.png",
    mou: "/mou/Combine Foundation -Islamian Computing Society-IIUI-MoU.pdf",
  },
];

type Direction = "next" | "prev";

export default function PartnersSection({ partners: initialPartners }: { partners?: FirestorePartner[] }) {
  const displayPartners: Partner[] =
    initialPartners && initialPartners.length > 0 ? (initialPartners as Partner[]) : fallbackPartners;

  const [current, setCurrent] = useState<number>(0);
  const [sliding, setSliding] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>("next");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (dir: Direction) => {
      if (sliding || displayPartners.length === 0) return;
      setDirection(dir);
      setSliding(true);
      setTimeout(() => {
        setCurrent((prev) =>
          dir === "next"
            ? (prev + 1) % displayPartners.length
            : (prev - 1 + displayPartners.length) % displayPartners.length
        );
        setSliding(false);
      }, 400);
    },
    [sliding, displayPartners.length]
  );

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (displayPartners.length < 2) return;
    timerRef.current = setInterval(() => goTo("next"), 5000);
  }, [goTo, displayPartners.length]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const handlePrev = () => { goTo("prev"); startTimer(); };
  const handleNext = () => { goTo("next"); startTimer(); };

  if (displayPartners.length === 0) return null;

  const partner = displayPartners[current];
  const [firstWord, ...remainingWords] = partner.name.split(" ");
  const remainingName = remainingWords.join(" ");

  return (
    <section className="w-full mx-auto py-10 px-6 md:px-12 lg:px-16" style={{ maxWidth: "1500px" }}>
      <div className="max-w-[1500px]">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black border-b border-black pb-4 mb-10">
          Our Partners
        </h2>
      </div>

      <div
        className="relative w-full overflow-hidden rounded-2xl"
        style={{ height: "500px" }}
      >
        <div
          className="absolute inset-0 transition-all w-full duration-400 ease-in-out rounded-2xl"
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
            src={partner.image}
            alt={partner.name}
            fill
            className="object-cover object-center rounded-2xl"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div
          className="absolute inset-0 flex flex-col justify-center px-8 md:px-12 lg:px-16 max-w-3xl"
          style={{
            opacity: sliding ? 0 : 1,
            transition: "opacity 0.3s ease",
          }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">
            <span className="text-primary-400">{firstWord}</span>
            {remainingName && <span className="text-white"> {remainingName}</span>}
          </h3>
          <p className="text-sm md:text-base text-white/90 leading-relaxed line-clamp-6">
            {partner.description}
          </p>
          {(partner as any).pdf || (partner as any).mou ? (
            <div className="mt-6">
              <a
                href={(partner as any).pdf || (partner as any).mou}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-fit px-6 py-3 mt-6 rounded-full border-2 border-white text-white hover:bg-white hover:text-primary-800 font-semibold text-sm transition-all duration-200"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
                View MOU
              </a>
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex justify-center sm:justify-start gap-3 mt-8 px-4 md:px-6 lg:px-8">
        <button
          onClick={handlePrev}
          aria-label="Previous partner"
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
          aria-label="Next partner"
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
