"use client";

import { useState } from "react";
import SectionHeader from "../UI/SectionHeader";

type GoalItem = {
    id: number;
    text: string;
};

type GoalTab = {
    key: string;
    label: string;
    items: GoalItem[];
};

const goalTabs: GoalTab[] = [
    {
        key: "1year",
        label: "1 YEAR TARGETS",
        items: [
            {
                id: 1,
                text: "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus..",
            },
            {
                id: 2,
                text: "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus..",
            },
            {
                id: 3,
                text: "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus..",
            },

        ],
    },
    {
        key: "5year",
        label: "5 YEAR TARGETS",
        items: [
            {
                id: 1,
                text: "Hello ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus..",
            },
            {
                id: 2,
                text: "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus..",
            },
            {
                id: 3,
                text: "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus..",
            },
        ],
    },
];

export default function Goals() {
    const [activeKey, setActiveKey] = useState<string>("1year");

    const activeTab = goalTabs.find((t) => t.key === activeKey)!;

    return (
        <section className="w-full max-w-5xl mx-auto px-6 py-10 md:py-14">
            <SectionHeader title="Goals" />

            <div className="flex border-b border-gray-200 mb-6 mt-15">
                {goalTabs.map((tab) => {
                    const isActive = tab.key === activeKey;
                    return (
                        <button
                            key={tab.key}
                            onClick={() => setActiveKey(tab.key)}
                            className="flex-1 pb-3 text-sm md:text-base font-bold tracking-widest text-center cursor-pointer transition-colors duration-200"
                            style={{
                                color: isActive ? "#111" : "#9ca3af",
                                borderBottom: isActive ? "3px solid #e8511a" : "3px solid transparent",
                                marginBottom: "-1px",
                            }}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            <div>
                {activeTab.items.map((item, i) => (
                    <div key={item.id}>
                        <div className="flex items-start gap-3 py-5">
                            <span className="text-gray-400 mt-1 text-xs shrink-0">•</span>
                            <p className="text-gray-700 text-sm md:text-base leading-7">
                                {item.text}
                            </p>
                        </div>
                        {i < activeTab.items.length - 1 && (
                            <div className="w-full h-px bg-gray-200" />
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}