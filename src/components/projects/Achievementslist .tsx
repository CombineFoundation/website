"use client";

import Image from "next/image";

interface ProjectItem {
    id: number;
    title: string;
    images: string[];
    description: string;
    goal: string;
    stats: { value: string; label: string }[];
    beforeImage: string;
    afterImage: string;
    futurePlans: string;
    partners: string[];
}

interface AchievementsListProps {
    projects: ProjectItem[];
    activeId: number | null;
    onToggle: (id: number) => void;
}

function AchievementItem({
    item,
    open,
    onToggle,
}: {
    item: ProjectItem;
    open: boolean;
    onToggle: () => void;
}) {
    return (
        <div
            id={`project-card-${item.id}`}
            className={`
                rounded-2xl overflow-hidden border
                transition-all duration-500 ease-in-out
                ${open
                    ? "bg-secondary-600 border-secondary-600 shadow-2xl shadow-blue-950/20"
                    : "bg-white border-gray-200 hover:border-gray-300"}
            `}
        >
            {/* Header */}
            <button
                onClick={onToggle}
                className="
                    w-full flex items-center justify-between
                    px-6 py-5 text-left cursor-pointer
                "
            >
                <span
                    className={`
                        font-semibold text-sm md:text-base
                        transition-colors duration-300
                        ${open ? "text-white" : "text-gray-900"}
                    `}
                >
                    {item.title}
                </span>

                <div
                    className={`
                        flex items-center justify-center
                        w-8 h-8 rounded-full
                        transition-all duration-500
                        ${open
                            ? "bg-white/15 rotate-180"
                            : "bg-gray-100 rotate-0"}
                    `}
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={open ? "white" : "#374151"}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </div>
            </button>

            {/* Content */}
            <div
                className={`
                    overflow-hidden transition-all duration-700 ease-in-out
                    ${open ? "max-h-[5000px]" : "max-h-0"}
                `}
            >
                <div
                    className={`
                        px-6 pb-8 space-y-6
                        transition-all duration-500
                        ${open
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-2"}
                    `}
                >
                    {/* Images */}
                    <div
                        className="flex gap-3 overflow-x-auto pb-2"
                        style={{ scrollbarWidth: "none" }}
                    >
                        {item.images.map((src, i) => (
                            <div
                                key={i}
                                className="
                                    relative rounded-xl overflow-hidden
                                    shrink-0 w-[250px] h-[250px]
                                    hover:scale-[1.02]
                                    transition-transform duration-500
                                "
                            >
                                <Image
                                    src={src}
                                    alt={`${item.title} image ${i + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Description */}
                    <p className="text-white/85 text-sm leading-6">
                        {item.description}
                    </p>

                    {/* Goal */}
                    <div>
                        <h4 className="text-white font-bold text-xl mb-1">
                            Goal
                        </h4>

                        <p className="text-white/85 text-base leading-6">
                            {item.goal}
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid sm:grid-cols-4 grid-cols-2 gap-4">
                        {item.stats.map((stat, i) => (
                            <div
                                key={i}
                                className="
                                    text-center py-5 rounded-2xl
                                    bg-white/5 border border-white/10
                                    backdrop-blur-sm
                                "
                            >
                                <p className="text-white font-extrabold text-2xl">
                                    {stat.value}
                                </p>

                                <p className="text-white/80 text-xs mt-1">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Before After */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
                        <div>
                            <div className="relative rounded-2xl overflow-hidden aspect-video w-[90%] m-auto mb-3">
                                <Image
                                    src={item.beforeImage}
                                    alt="Before"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <p className="text-white text-center font-bold">
                                Before
                            </p>
                        </div>

                        <div>
                            <div className="relative rounded-2xl overflow-hidden aspect-video w-[90%] m-auto mb-3">
                                <Image
                                    src={item.afterImage}
                                    alt="After"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <p className="text-white text-center font-bold">
                                After
                            </p>
                        </div>
                    </div>

                    {/* Future Plans */}
                    <div>
                        <h4 className="text-white font-bold text-base mb-2">
                            Future Plans
                        </h4>

                        <p className="text-white/85 text-sm leading-6">
                            {item.futurePlans}
                        </p>
                    </div>

                    {/* Partners */}
                    <div>
                        <h4 className="text-white font-bold text-base mb-4">
                            Project Partners
                        </h4>

                        <div
                            className="flex gap-3 overflow-x-auto pb-2"
                            style={{ scrollbarWidth: "none" }}
                        >
                            {item.partners.map((src, i) => (
                                <div
                                    key={i}
                                    className="
                                        relative rounded-xl overflow-hidden
                                        shrink-0 w-[200px] h-[200px]
                                    "
                                >
                                    <Image
                                        src={src}
                                        alt={`Partner ${i + 1}`}
                                        fill
                                        className="object-contain p-4"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default function AchievementsList({ projects, activeId, onToggle }: AchievementsListProps) {
    return (
        <section className="w-full mx-auto sm:px-4 py-10 space-y-4">
            {projects.map((item) => (
                <AchievementItem
                    key={item.id}
                    item={item}
                    open={activeId === item.id}
                    onToggle={() => onToggle(item.id)}
                />
            ))}
        </section>
    );
}
