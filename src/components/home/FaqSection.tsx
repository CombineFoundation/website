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
    question: "What is Combine Foundation and what is its mission?",
    answer:
      "Combine Foundation is a registered non-profit organization under section 42 Companies Act 2017 while we are Tax exempted organization and the social impact arm of Combine Group. We are dedicated to creating sustainable change in Pakistan by focusing on education, health awareness, youth empowerment, and community welfare. Our approach is built on transparency, innovation, and long-term impact. The core mission of Combine Foundation is to create structured, accountable, and impact-driven initiatives that reduce inequality and help communities grow stronger through education, empowerment, and sustainable development.",
  },
  {
    id: 2,
    question: "How can I join or volunteer with Combine Foundation?",
    answer:
      "You can join Combine Foundation by submitting an application through Combine Foundation Portal. The joining process includes application submission, application review, interview, and onboarding. Students, professionals, and passionate individuals who want to contribute to social impact, community development, and learning opportunities can join as volunteers. No prior experience is required — beginners and students are welcome, just you have concept to do something for Allah and Pakistan.",
  },
  {
    id: 3,
    question: "How can I donate or support the foundation?",
    answer:
      "You can support Combine Foundation by:\n• Donating to fund education, healthcare, and welfare programs\n• Sponsoring students through scholarships\n• Supporting community relief initiatives\nWe follow a transparent system, ensuring your contribution directly impacts those in need.",
  },
  {
    id: 4,
    question: "Why should organizations partner with the Combine Foundation?",
    answer:
      "Partnering with Combine Foundation offers:\n• Direct impact through a zero-admin-cost approach\n• Transparency and accountability in all operations\n• Future-focused programs (AI, technology, workforce development)\n• CSR collaboration opportunities aligned with global standards",
  },
  {
    id: 5,
    question: "Do volunteers receive certificates and growth opportunities?",
    answer:
      "Yes, certificates are awarded based on participation and performance. Volunteers can also progress into youth leadership, internship, and job opportunities, helping them grow both personally and professionally.",
  },
  {
    id: 6,
    question: "What are the benefits of volunteering?",
    answer:
      "Joining the Combine Foundation as a volunteer provides opportunities to gain practical experience, improve leadership and communication skills, and work on real-world projects and community initiatives. Volunteers also build teamwork, confidence, networking opportunities, and professional exposure while contributing positively to society. Additionally, volunteers get access to training sessions, webinars, leadership activities, project participation, and skill development opportunities that support personal and professional growth. Volunteering helps individuals strengthen their portfolio and explore career opportunities in different fields.",
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
          <p className="text-gray-600 text-sm md:text-base leading-relaxed whitespace-pre-line">
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
    <section className="max-w-[1500px] mx-auto px-4 md:px-6 lg:px-8 py-16">
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
