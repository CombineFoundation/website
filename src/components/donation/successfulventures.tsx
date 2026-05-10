"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const VENTURES = [
    {
        id: 1,
        heading: "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et.",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum su. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum",
        images: [
            "/home/image1.avif",
            "/home/image1.avif",
            "/home/image1.avif",
            "/home/image1.avif",
            "/home/image1.avif",
        ],
    },
    {
        id: 2,
        heading: "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et.",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum su. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum",
        images: [
            "/home/image1.avif",
            "/home/image1.avif",
            "/home/image1.avif",
            "/home/image1.avif",
            "/home/image1.avif",
        ],
    },
];

interface DragSliderProps {
    images: string[];
}

function DragSlider({ images }: DragSliderProps) {
    const trackRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const [dragged, setDragged] = useState(false);

    /* ── Mouse events ── */
    const onMouseDown = (e: React.MouseEvent) => {
        if (!trackRef.current) return;
        isDragging.current = true;
        setDragged(false);
        startX.current = e.pageX - trackRef.current.offsetLeft;
        scrollLeft.current = trackRef.current.scrollLeft;
        trackRef.current.style.cursor = "grabbing";
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current || !trackRef.current) return;
        e.preventDefault();
        const x = e.pageX - trackRef.current.offsetLeft;
        const walk = x - startX.current;
        if (Math.abs(walk) > 5) setDragged(true);
        trackRef.current.scrollLeft = scrollLeft.current - walk;
    };

    const onMouseUp = () => {
        isDragging.current = false;
        if (trackRef.current) trackRef.current.style.cursor = "grab";
    };

    return (
        <div
            ref={trackRef}
            className="flex gap-2 overflow-x-auto pb-1"
            style={{
                cursor: "grab",
                scrollbarWidth: "none",        /* Firefox */
                msOverflowStyle: "none",       /* IE/Edge */
                WebkitOverflowScrolling: "touch",
                userSelect: "none",
            }}
            /* hide webkit scrollbar via inline — can't do in Tailwind */
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
        >
            {/* hide scrollbar on webkit browsers */}
            {/* <style>{`
        .drag-slider::-webkit-scrollbar { display: none; }
      `}</style> */}

            {images.map((src, i) => (
                <div
                    key={i}
                    className="shrink-0 rounded-md overflow-hidden"
                    style={{ width: "32%", minWidth: "200px", aspectRatio: "4/3", position: "relative" }}
                    /* prevent accidental navigation on drag */
                    onDragStart={(e) => e.preventDefault()}
                >
                    <Image
                        src={src}
                        alt={`Slide ${i + 1}`}
                        fill
                        draggable={false}
                        className="object-cover pointer-events-none"
                        sizes="(max-width: 640px) 60vw, 30vw"
                    />
                </div>
            ))}
        </div>
    );
}

export default function SuccessfulVentures() {
    return (
        <div className="min-h-screen px-4 py-10 md:px-8 md:py-14">
            <div className="w-full mx-auto">

                <h1 className="text-3xl md:text-4xl font-extrabold text-black tracking-tight mb-8">
                    Successful Ventures
                </h1>

                <div className="flex flex-col gap-12">
                    {VENTURES.map((venture) => (
                        <div key={venture.id}>
                            <p className="text-base md:text-lg lg:text-xl font-semibold text-black mb-4 leading-snug">
                                {venture.heading}
                            </p>
                            <hr className="border-t border-gray-300 mb-5" />

                            <DragSlider images={venture.images} />

                            <p className="text-sm lg:text-lg text-black leading-relaxed mt-5">
                                {venture.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}