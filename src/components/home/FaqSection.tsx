"use client";

import { useState } from "react";
import SectionHeader from "@/components/UI/SectionHeader";

type FaqItem = {
  id: number;
  question: string;
  answer: string;
};

const faqs: FaqItem[] = [
  {
    id: 1,
    question: "What is Combine Foundation?",
    answer:
      "Combine Foundation is a registered non-profit organization and the social impact arm of Combine Group. We are dedicated to creating sustainable change in Pakistan by focusing on education, health awareness, youth empowerment, and community welfare. Our approach is built on transparency, innovation, and long-term impact.",
  },
  {
    id: 2,
    question: "What is the core mission of the Combine Foundation?",
    answer:
      "The core mission of Combine Foundation is to create structured, accountable, and impact-driven initiatives that reduce inequality and help communities grow stronger through education, empowerment, and sustainable development.",
  },
  {
    id: 3,
    question: "How can I join the Combine Foundation?",
    answer:
      "You can join Combine Foundation by submitting an application through our portal. The joining process includes application submission, application review, interview, and onboarding.",
  },
  {
    id: 4,
    question: "How can I volunteer with the Combine Foundation?",
    answer:
      "Our structured volunteer program allows individuals to gain hands-on experience, contribute to community projects, and develop leadership and teamwork skills. You can apply through our website and become part of our growing impact network.",
  },
  {
    id: 5,
    question: "How can I donate or support the foundation?",
    answer:
      "You can support Combine Foundation by donating to fund education, healthcare, and welfare programs, sponsoring students through scholarships, or supporting community relief initiatives. We follow a transparent system, ensuring your contribution directly impacts those in need.",
  },
  {
    id: 6,
    question: "Why should organizations partner with the Combine Foundation?",
    answer:
      "Partnering with Combine Foundation offers direct impact through a zero-admin-cost approach, transparency and accountability in all operations, future-focused programs (AI, technology, workforce development), and CSR collaboration opportunities aligned with global standards.",
  },
  {
    id: 7,
    question: "Is prior experience required?",
    answer:
      "No, beginners and students are welcome. You just need a desire to do something for Allah and Pakistan.",
  },
  {
    id: 8,
    question: "Are certificates provided?",
    answer:
      "Yes, certificates are awarded based on participation and performance.",
  },
  {
    id: 9,
    question: "Can volunteers grow into leadership roles?",
    answer:
      "Yes, volunteers can progress into youth leadership, internship, and job opportunities.",
  },
  {
    id: 10,
    question: "What are the benefits of joining as a volunteer?",
    answer:
      "Joining as a volunteer provides opportunities to gain practical experience, improve leadership and communication skills, and work on real-world projects and community initiatives. Volunteers also build teamwork, confidence, networking opportunities, and professional exposure while contributing positively to society.",
  },
  {
    id: 11,
    question: "Will volunteers receive learning and growth opportunities?",
    answer:
      "Yes, volunteers get access to training sessions, webinars, leadership activities, project participation, and skill development opportunities that support personal and professional growth.",
  },
  {
    id: 12,
    question: "Can volunteering help in career development?",
    answer:
      "Yes, volunteering helps individuals gain practical experience, improve soft skills, strengthen their portfolio, and explore networking and career opportunities in different fields.",
  },
  {
    id: 13,
    question: "Who can join as a volunteer?",
    answer:
      "Students, professionals, and passionate individuals who want to contribute to social impact, community development, and learning opportunities can join as volunteers.",
  },
];

type FaqRowProps = {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
};

function FaqRow({ item, isOpen, onToggle }: FaqRowProps) {
  return (
    <div className="border-b border-gray-200 transition-colors duration-300 hover:bg-black/[0.02]">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 py-5 px-4 text-left cursor-pointer group"
      >
        <span className="text-gray-900 font-semibold text-base md:text-lg transition-colors duration-300 group-hover:text-secondary-500">
          {item.question}
        </span>
        <span
          className={`flex-shrink-0 text-2xl transition-colors duration-300 ${
            isOpen ? "text-secondary-500" : "text-gray-400"
          }`}
        >
          {isOpen ? "−" : "+"}
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out px-4 ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 pb-5"
            : "grid-rows-[0fr] opacity-0 pb-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────
type FaqSectionProps = {
  /** When provided the full SectionHeader (title + description) is rendered.
   *  When omitted the heading falls back to the plain image-style layout. */
  description?: string;
};

export default function FaqSection({ description }: FaqSectionProps) {
  const [openId, setOpenId] = useState<number | null>(0);

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="px-6 py-16 w-full lg:w-[90%] mx-auto">
      {/* ── Heading ── */}
      {description ? (
        // ✅ Description provided → keep existing SectionHeader unchanged
        <SectionHeader
          title="Frequently Asked Questions"
          description={description}
        />
      ) : (
        // 🖼 No description → plain heading style matching the image
        <h2 className="text-2xl md:text-5xl font-bold text-black tracking-tight border-b border-gray-300 pb-3">
          Frequently Asked Questions
        </h2>
      )}

      <div className="mt-10">
        {faqs.map((item) => (
          <FaqRow
            key={item.id}
            item={item}
            isOpen={openId === item.id}
            onToggle={() => toggle(item.id)}
          />
        ))}
      </div>
    </section>
  );
}