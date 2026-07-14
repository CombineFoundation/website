"use client";

import { useState } from "react";
import Image from "next/image";
import type { FirestoreMOU } from "@/lib/admin-actions";

interface MOU {
    id: string;
    title: string;
    paragraphs: string[];
    image: string;
    imageAlt: string;
}
interface MOUSliderProps {
    mous: FirestoreMOU[];
}

const MOUSlider = ({ mous: dbMous }: MOUSliderProps) => {
    const displayMous: MOU[] = dbMous.length > 0
        ? dbMous.map((m, index) => ({
            id: m.id || index.toString(),
            title: m.title,
            paragraphs: m.paragraphs || [],
            image: m.image,
            imageAlt: m.imageAlt || m.title,
        }))
        : [
            {
                id: "1",
                title: "Combine foundation with Hammad foundation",
                paragraphs: [
                    "A Memorandum of Understanding has been signed between the Combine Foundation and Hammad Foundation to enhance their joint commitment towards education, skills training, and community upliftment. This MOU is focused on offering opportunities to needy students by minimizing financial constraints and maximizing their access to education.",
                    "Both foundations intend to cooperate through various programs which will help in achieving the goals related to scholarships, awareness campaigns, vocational assistance, and sustainable development programs. Transparency and accountability will be key components of any joint commitment between the two foundations as the focus will be on making a positive difference to society.",
                ],
                image: "/publications/pub1.png",
                imageAlt: "MOU signing between Hammad Foundation and Combine Foundation",
            },
            {
                id: "2",
                title: "Combine foundation with NED girl's affair society (NGAS)",
                paragraphs: [
                    "Memorandum of Understanding has been signed between Combine Foundation and NGAS Girls Affair to help and empower women in Pakistan through education, professional development, and skill building. The Combine Foundation has signed an agreement of MoU between itself and the NED Girls Affair Society (NGAS).",
                    "This MoU involves working together to plan out workshops, specially customized training, health seminars, and career development sessions specifically for the benefit of NGAS members and students. Through their collective efforts, these two institutions will try to give the girls the skills necessary for success in academics and their personal and professional lives. In order to increase the number of attendees to these sessions, Combine Foundation will be promoted through the NGAS social media accounts, joint campaigns, and students' mobilizations.",
                ],
                image: "/publications/pub1.png",
                imageAlt: "MOU signing between NGAS and Combine Foundation",
            },
            {
                id: "3",
                title: "Combine foundation with Quants society",
                paragraphs: [
                    "The Combine Foundation and Quants Society has formed a strategic partnership via a Memorandum of Understanding (MoU) to advance technical education, future-ready skills, and educational empowerment among students pursuing Computational Finance education. The objective of this partnership is to offer scholarships or discounts to deserving students to attend industry-based courses and webinars on trending topics including Python, Artificial Intelligence (AI), Web Development, Shopify, WordPress, and many more.",
                    "With this collaboration, both the Combine Foundation and Quants Society will jointly engage in awareness campaigns and educational initiatives that will equip the students to excel academically and professionally in the digital world. Under the MoU, the Quants Society will help Combine Foundation by organizing campaigns and outreach programs aimed at promoting their educational offerings through various social media platforms while offering fair merit-based admission procedures to the eligible candidates.",
                ],
                image: "/publications/pub1.png",
                imageAlt: "MOU signing between Quants Society and Combine Foundation",
            },
            {
                id: "4",
                title: "Combine foundation with SMIU",
                paragraphs: [
                    "A Memorandum of Understanding (MoU) has been signed by Combine Foundation and Sindh Madarsatul Islam University (SMIU) to empower students in terms of youth development, leadership, training, internships, and community involvement. The goal of this MoU is to create meaningful educational opportunities to bridge the gap between theoretical academic education and industry requirements.",
                    "With the help of combined workshops, leadership programs, career development programs, and skill-building programs, the students will be able to gain useful information and competencies which will enable them to be successful in their careers. Under this MoU, the Combine Foundation will provide trainers, coordinators, and learning resources whereas SMIU will take care of ensuring student involvement and success of various programs. Both organizations will work towards innovation, grooming responsible future leaders, and leaving a positive social impact through education and sustainable community development.",
                ],
                image: "/publications/pub1.png",
                imageAlt: "MOU signing between SMIU and Combine Foundation",
            },
            {
                id: "5",
                title: "Combine Foundation with Islamian Computing Society",
                paragraphs: [
                    "The Memorandum of Understanding has been signed by Combine Foundation and Islamian Computing Society (ICS), International Islamic University Islamabad (IIUI) to enhance the technical skills of the students through education, training, and professional development. The aim of this MoU is to fill the gap between theory and practice and make sure that the students have access to new technological courses and skill development programs through which they can develop their technical skills.",
                    "In collaboration with each other, they can arrange workshops, webinars, campaigns, and training related to Artificial Intelligence (AI), Python, Web Development, Cybersecurity, Shopify, WordPress, and Programming, through which they can develop their technical skills and enhance their career ready competencies. Under this MoU, the Combine Foundation will provide free or reduced fees of courses along with training, learning materials, guidance, and ecertificates while the Islamian Computing Society will help the students participate in the educational initiatives.",
                ],
                image: "/publications/pub1.png",
                imageAlt: "MOU signing between Islamian Computing Society and Combine Foundation",
            },
        ];

    const [current, setCurrent] = useState(0);

    const handlePrev = () =>
        setCurrent((c) => (c === 0 ? displayMous.length - 1 : c - 1));
    const handleNext = () =>
        setCurrent((c) => (c === displayMous.length - 1 ? 0 : c + 1));

    const mou = displayMous[current];

    if (!mou) return null;

    return (
        <section className="bg-white">
            <div className="max-w-[1500px] mx-auto px-4 md:px-6 lg:px-8">

                {/* Section Header */}
                <div className="mb-2">
                    <h2 className="text-3xl font-bold text-secondary-500">MOU&apos;s</h2>
                </div>
                <hr className="border-gray-300 mb-8" />

                {/* Slide Content */}
                <div className="transition-all duration-300">

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary-600 mb-4 leading-snug">
                        {mou.title}
                    </h3>

                    {/* Description Paragraphs */}
                    <div className="space-y-4 mb-6">
                        {mou.paragraphs.map((para, idx) => (
                            <p key={idx} className="text-primary-800 text-sm md:text-base lg:text-lg leading-relaxed">
                                {para}
                            </p>
                        ))}
                    </div>

                    {/* Image */}
                    <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden">
                        <Image
                            src={mou.image}
                            alt={mou.imageAlt}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-center sm:justify-end items-center gap-3 mt-6">
                    <button
                        onClick={handlePrev}
                        aria-label="Previous MOU"
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
                        aria-label="Next MOU"
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

            </div>
        </section>
    );
};

export default MOUSlider;
