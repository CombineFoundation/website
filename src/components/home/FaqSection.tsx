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
    question: "How can I support Combine Foundation?",
    answer:
      "You can support us by volunteering your time, making a donation, or spreading awareness about our initiatives. Every contribution helps us create a better impact in the lives of those we serve.",
  },
  {
    id: 2,
    question: "What areas do you focus on?",
    answer:
      "We focus on education, healthcare, and community development. Our goal is to provide sustainable resources and opportunities that empower individuals to build a better future.",
  },
  {
    id: 3,
    question: "Is Combine Foundation a registered non-profit?",
    answer:
      "Yes, Combine Foundation is a registered non-profit organization dedicated to social welfare and community empowerment through various transparent initiatives.",
  },
  {
    id: 4,
    question: "How are donations utilized?",
    answer:
      "100% of public donations are used directly for our projects. We maintain full transparency in our financial reporting to ensure that your support reaches the people who need it most.",
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
          isOpen ? "grid-rows-[1fr] opacity-100 pb-5" : "grid-rows-[0fr] opacity-0 pb-0"
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

export default function FaqSection() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="px-6 py-16 max-w-full mx-auto">
      <SectionHeader
        title="Frequently Asked Questions"
        description="Find answers to common questions about our mission, projects, and how you can get involved."
      />

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