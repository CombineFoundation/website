"use client";

import Image from "next/image";
import { useState, useRef } from "react";

const PANELS = [
  {
    src: "/volunteer/vol2.png",
    label: "Lorem ipsum dolor",
    heading: "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et.",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur,",
  },
  {
    src: "/volunteer/vol2.png",
    label: "Lorem ipsum dolor",
    heading: "Aliquam in hendrerit urna consectetur adipiscing elit Ut et.",
    desc: "Pellentesque sit amet sapien fringilla, mattis ligula consectetur. Ut et massa mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit hendrerit urna.",
  },
  {
    src: "/volunteer/vol2.png",
    label: "Lorem ipsum dolor",
    heading: "Pellentesque sit amet sapien fringilla mattis ligula.",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur,",
  },
  {
    src: "/volunteer/vol2.png",
    label: "Lorem ipsum dolor",
    heading: "Maecenas vitae mattis tellus nullam quis imperdiet augue.",
    desc: "Ut et massa mi. Aliquam in hendrerit urna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit amet sapien fringilla, mattis ligula consectetur,",
  },
  {
    src: "/volunteer/vol2.png",
    label: "Lorem ipsum dolor",
    heading: "Vestibulum auctor ornare leo non suscipit magna interdum.",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur,",
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
  // `touch-pan-x` lets the browser handle native scroll, so we don't need to
  // manually move scrollLeft — we just snapshot the scroll position at the
  // start of the gesture and compare it at the end to know if the user scrolled.
  const onTouchStart = () => {
    dragMoved.current = false;
    touchScrollStart.current = scrollRef.current?.scrollLeft ?? 0;
  };

  const onTouchEnd = () => {
    const delta = Math.abs((scrollRef.current?.scrollLeft ?? 0) - touchScrollStart.current);
    // If the container scrolled more than 6 px, treat it as a drag, not a tap
    if (delta > 6) dragMoved.current = true;
    // Reset after the synthetic click has fired (~300 ms)
    setTimeout(() => { dragMoved.current = false; }, 350);
  };

  const handlePanelClick = (i: number) => {
    if (!dragMoved.current) setActive(i);
  };

  return (
    <section className="w-full py-16 md:py-24 overflow-hidden bg-[#F7FBFF]">

      {/* Title */}
      <div className="px-6 md:px-12 mx-auto mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight mb-4">
          Why Join Us
        </h2>
        <div className="w-20 h-1.5 bg-[#0f2d5c] rounded-full mb-8" />
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
            // Tall enough on mobile to fit image-on-top + text-below layout
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
                  // Collapsed: 56 px pill  |  Expanded: up to 85 vw (mobile) or 340 px (lg+)
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
                    <h3 className="text-xs sm:text-sm lg:text-lg xl:text-xl font-bold text-black leading-snug">
                      {panel.heading}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-4 lg:line-clamp-5 lg:text-base xl:text-lg">
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
      <div className="px-6 md:px-12 max-w-7xl mx-auto mt-12">
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#0f2d5c] rounded-full transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
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