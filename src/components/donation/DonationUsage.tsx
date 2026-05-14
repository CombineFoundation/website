"use client";

import Image from "next/image";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const SLICES = [
    {
        label: "Health and Education",
        percent: "60%",
        value: 60,
        color: "#7ecde8",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur,",
    },
    {
        label: "Health and Education",
        percent: "20%",
        value: 20,
        color: "#0f2d5c",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur,",
    },
    {
        label: "Health and Education",
        percent: "20%",
        value: 20,
        color: "#1e5b9e",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur,",
    },
];

export default function DonationUsage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-[1280px]">

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-extrabold text-black tracking-tight mb-3">
                    How we use your donations
                </h1>
                <hr className="border-t border-[#b0bec5] mb-10" />

                {/* Two-col layout */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">

                    {/* ── LEFT: Pie Chart ── */}
                    <div className="w-full md:w-[50%] flex justify-center">
                        <div className="w-full max-w-[520px] aspect-square">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={SLICES}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius="95%"
                                        dataKey="value"
                                        startAngle={90}
                                        endAngle={-270}
                                        strokeWidth={3}
                                        stroke="#e8f0f7"
                                    >
                                        {SLICES.map((slice, i) => (
                                            <Cell key={i} fill={slice.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* ── RIGHT: Legend items ── */}
                    <div className="flex flex-col gap-7 w-full md:w-[50%]">
                        {SLICES.map((slice, i) => (
                            <div key={i} className="flex flex-col gap-1.5">
                                {/* Label row */}
                                <div className="flex items-center gap-3">

                                    <span
                                        className="shrink-0 w-4 h-4 rounded-full inline-block"
                                        style={{ background: slice.color }}
                                    />
                                    <h3 className="text-lg md:text-xl font-bold text-black">
                                        {slice.label}
                                        <span className="ml-2 text-black font-bold">| {slice.percent}</span>
                                    </h3>
                                </div>
                                {/* Description */}
                                <p className=" text-base md:text-sm lg:text-base xl:text-xl text-gray-600 leading-relaxed pl-7">
                                    {slice.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}