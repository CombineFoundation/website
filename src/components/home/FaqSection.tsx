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
    question: "Lorem Ipsum dor slit amet ?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus.",
  },
  {
    id: 2,
    question: "Lorem Ipsum dor slit amet ?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.",
  },
  {
    id: 3,
    question: "Lorem Ipsum dor slit amet ?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur.",
  },
  {
    id: 4,
    question: "Lorem Ipsum dor slit amet ?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla.",
  },
];

type FaqRowProps = {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
};

function FaqRow({ item, isOpen, onToggle }: FaqRowProps) {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer"
      >
        <span className="text-gray-900 font-semibold text-sm md:text-base">
          {item.question}
        </span>
        <span className="flex-shrink-0 text-gray-500 text-xl leading-none w-5 text-center">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? "300px" : "0px" }}
      >
        <p className="text-gray-500 text-sm leading-relaxed pb-5">
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export default function FaqSection() {
  const [openId, setOpenId] = useState<number | null>(0);

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="px-6 py-14 max-w-3xl mx-auto">
      <SectionHeader
        title="Frequently Asked Questions"
        description="Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et."
      />

      <div className="mt-8">
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