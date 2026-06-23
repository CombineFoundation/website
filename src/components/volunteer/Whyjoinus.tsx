"use client";

import Image from "next/image";
import { useState, useRef } from "react";

const PANELS = [
  {
    src: "/volunteer/vol2.png",
    label: "Skill Development",
    heading: "Build Valuable Skills & Practical Experience",
    desc: "Learn new skills, gain practical experience, and build a stronger CV or resume for your future career. Our volunteer program provides a safe, peaceful, and supportive environment where you can grow personally and professionally.",
  },
  {
    src: "/volunteer/vol2.png",
    label: "Exposure & Networking",
    heading: "Expand Your Network & Explore New Fields",
    desc: "Get exposure to different fields, projects, and real-world experiences while connecting with industry professionals. This helps you discover your interests and build meaningful professional relationships.",
  },
  {
    src: "/volunteer/vol2.png",
    label: "Diverse Opportunities",
    heading: "Find Your Passion Across Multiple Areas",
    desc: "Whether your interest is in leadership, events, social work, media, management, or creative programs, we support your goals and help you grow in the direction you choose.",
  },
  {
    src: "/volunteer/vol2.png",
    label: "Mentorship & Guidance",
    heading: "Receive Mentorship & Turn Ideas into Impact",
    desc: "We value new ideas and provide mentorship, guidance, and opportunities to help you turn your ideas into impactful projects and career-building experiences.",
  },
  {
    src: "/volunteer/vol2.png",
    label: "Career Building",
    heading: "Build Your Career with Confidence",
    desc: "Here, you can learn, grow, contribute to society, and start building your career with confidence. By becoming a volunteer, you invest in your own personal and professional growth while helping the community.",
  },
];

export default function WhyJoinUs() {
  const [active, setActive] = useState(0);

  const progress = ((active + 1) / PANELS.length) * 100;

  // ── Drag / scroll refs ──────────────────────────────────────────────────────
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const dragMoved = useRef(false);
  // For touch: snapshot scroll position at touchstart so we can diff it on touchend
  const touchScrollStart = useRef(0);

  // ── Mouse handlers ──────────────────────────────────────────────────────────
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragMoved.current = false;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
    if (scrollRef.current) scrollRef.current.style.cursor = "grabbing";
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX.current;
    if (Math.abs(walk) > 4) dragMoved.current = true;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const onMouseUp = () => {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = "grab";
  };

  // ── Touch handlers (scroll-vs-tap detection) ────────────────────────────────
  const onTouchStart = () => {
    dragMoved.current = false;
    touchScrollStart.current = scrollRef.current?.scrollLeft ?? 0;
  };

  const onTouchEnd = () => {
    const delta = Math.abs((scrollRef.current?.scrollLeft ?? 0) - touchScrollStart.current);
    if (delta > 6) dragMoved.current = true;
    setTimeout(() => { dragMoved.current = false; }, 350);
  };

  const handlePanelClick = (i: number) => {
    if (!dragMoved.current) setActive(i);
  };

  return (
    <section className="max-w-[1500px] mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24 overflow-hidden">

      {/* Title */}

      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight mb-4">

          Why Volunteers Love Working with Us
        </h2>
        <div className="w-full h-1 bg-gray-300 mb-8" />
      </div>

      {/* Accordion strip — drag-scrollable on mouse, native-scroll on touch */}
      <div
        ref={scrollRef}
        className="w-full px-4 md:px-8 overflow-x-auto scrollbar-hide select-none touch-pan-x"
        style={{ cursor: "grab" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex gap-2 items-stretch w-full"
          style={{
            minHeight: "clamp(300px, 55vw, 420px)",
          }}
        >
          {PANELS.map((panel, i) => {
            const isOpen = active === i;
            return (
              <div
                key={i}
                onClick={() => handlePanelClick(i)}
                className="relative rounded-2xl overflow-hidden cursor-pointer shrink-0"
                style={{
                  flex: isOpen ? "1 1 0%" : "0 0 56px",
                  minWidth: isOpen ? "min(85vw, 340px)" : "70px",
                  transition: "all 0.7s cubic-bezier(0.4,0,0.2,1)",
                }}
              >
                {/* ── COLLAPSED: image + vertical label ── */}
                <div
                  className="absolute inset-0"
                  style={{
                    opacity: isOpen ? 0 : 1,
                    transition: "opacity 0.4s ease",
                    pointerEvents: isOpen ? "none" : "auto",
                  }}
                >
                  <Image
                    src={panel.src}
                    alt={panel.label}
                    fill
                    draggable={false}
                    className="object-cover"
                    sizes="56px"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span
                      className="text-white text-xs lg:text-base xl:text-lg font-semibold tracking-wide whitespace-nowrap"
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textShadow: "0 1px 4px rgba(0,0,0,0.7)",
                      }}
                    >
                      {panel.label}
                    </span>
                  </div>
                </div>


                <div
                  className="absolute inset-0 flex flex-col min-[800px]:flex-row h-full"
                  style={{
                    opacity: isOpen ? 1 : 0,
                    transition: "opacity 0.6s ease 0.1s",
                    pointerEvents: isOpen ? "auto" : "none",
                  }}
                >

                  <div className="relative w-full h-40 shrink-0 min-[800px]:h-auto min-[800px]:flex-1 min-[800px]:order-2">
                    <Image
                      src={panel.src}
                      alt={panel.heading}
                      fill
                      draggable={false}
                      className="object-cover"
                      sizes="(max-width: 1024px) 85vw, 300px"
                    />
                  </div>

                  {/* Text
                      • mobile  → below image, grows to fill remaining height
                      • desktop → left side, fixed 48 % width  */}
                  <div className="flex flex-col justify-center gap-2 px-4 py-4 bg-white z-10 flex-1 overflow-hidden lg:w-[48%] lg:flex-none lg:order-1">
                    <h3 className="text-xs sm:text-sm lg:text-lg xl:text-xl font-bold text-primary-500 leading-snug">
                      {panel.heading}
                    </h3>
                    <p className="text-xs text-primary-800 line-clamp-4 lg:line-clamp-5 lg:text-base xl:text-lg">
                      {panel.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-6 md:px-12 max-w-[1500px] mx-auto mt-12">
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-secondary-500 rounded-full transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-3 text-xs font-medium text-gray-400 uppercase tracking-widest">
          <span>01</span>
          <span>0{PANELS.length}</span>
        </div>
      </div>

    </section>
  );
}
