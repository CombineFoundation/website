"use client";

import { useState } from "react";

interface Story {
  id: number;
  name: string;
  description: string;
  videoThumb?: string; // optional future use
}

const STORIES: Story[] = [
  {
    id: 1,
    name: "Meet Arham Imran",
    description:
      "Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id. Praesent lorem orci, mattis non efficitur id, Curabitur pellentesque nibh nibh.",
  },
  {
    id: 2,
    name: "Meet Sara Khan",
    description:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Nulla porttitor accumsan tincidunt. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.",
  },
  {
    id: 3,
    name: "Meet Usman Tariq",
    description:
      "Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Nulla quis lorem ut libero malesuada feugiat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
  },
];

export default function SuccessStories() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [animating, setAnimating] = useState(false);

  const navigate = (dir: "left" | "right") => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setPlaying(false);
    setTimeout(() => {
      setCurrent((prev) =>
        dir === "right"
          ? (prev + 1) % STORIES.length
          : (prev - 1 + STORIES.length) % STORIES.length
      );
      setAnimating(false);
      setDirection(null);
    }, 320);
  };

  const story = STORIES[current];

  return (
    <>
      <style>{`

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(48px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-48px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideOutRight {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(48px); }
        }
        @keyframes slideOutLeft {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(-48px); }
        }

        .slide-enter-right { animation: slideInRight 0.32s cubic-bezier(0.22,1,0.36,1) both; }
        .slide-enter-left  { animation: slideInLeft  0.32s cubic-bezier(0.22,1,0.36,1) both; }
        .slide-exit-right  { animation: slideOutRight 0.32s cubic-bezier(0.22,1,0.36,1) both; }
        .slide-exit-left   { animation: slideOutLeft  0.32s cubic-bezier(0.22,1,0.36,1) both; }

        .play-btn {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .play-btn:hover {
          transform: scale(1.12);
          box-shadow: 0 8px 32px rgba(0,0,0,0.28);
        }
        .nav-btn {
          transition: background 0.18s ease, transform 0.18s ease;
        }
        .nav-btn:hover {
          background: #1a3a8a !important;
          transform: scale(1.08);
        }
        .nav-btn:active { transform: scale(0.96); }

        /* Dot indicators */
        .dot { transition: width 0.3s ease, background 0.3s ease; }
      `}</style>

      <section className="ss-section w-full mx-auto px-9 py-8 max-sm:px-6">
        {/* Heading */}
        <div className="border-b border-gray-300 pb-3 mb-6">
          <h2 className="ss-title text-2xl md:text-4xl xl:text-5xl font-bold text-gray-900">
            Success Stories
          </h2>
        </div>

        {/*
          Outer wrapper: relative + overflow-visible so the arrows (which are
          absolutely positioned) can sit half-outside the card on each side.
        */}
        <div style={{ margin: "0 20px" }}>

          {/* ── Card ── */}
          <div className="rounded-2xl overflow-visible" style={{ background: "#dce6f0" }}>
            <div className="relative">
              {/* ── Left arrow — centred on the video section ── */}
              <button
                onClick={() => navigate("left")}
                aria-label="Previous"
                className="nav-btn absolute z-20 flex items-center justify-center rounded-full w-10 h-10 lg:w-[50px] lg:h-[50px] xl:w-[60px] xl:h-[60px]"
                style={{
                  background: "#1e3a7a",
                  border: "none",
                  cursor: "pointer",
                  left: -22,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 2L4 7L9 12" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* ── Right arrow — centred on the video section ── */}
              <button
                onClick={() => navigate("right")}
                aria-label="Next"
                className="nav-btn absolute z-20 flex items-center justify-center rounded-full w-10 h-10 lg:w-[50px] lg:h-[50px] xl:w-[60px] xl:h-[60px]"
                style={{
                  background: "#1e3a7a",
                  border: "none",
                  cursor: "pointer",
                  right: -22,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 2L10 7L5 12" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Video — full width */}
              <div
                className={`w-full relative flex items-center justify-center overflow-hidden rounded-t-2xl ${
                  animating
                    ? direction === "right" ? "slide-exit-left" : "slide-exit-right"
                    : "slide-enter-right"
                }`}
                style={{ background: "#c4cdd6", minHeight: 220, maxHeight: 340, aspectRatio: "16/7" }}
              >
                {/* Scanline texture */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 4px)",
                  }}
                />

                {/* Play button */}
                {!playing ? (
                  <button
                    onClick={() => setPlaying(true)}
                    aria-label="Play video"
                    className="play-btn relative z-10 flex items-center justify-center rounded-full"
                    style={{
                      width: 56,
                      height: 56,
                      background: "rgba(10,10,10,0.82)",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
                      <path d="M2 1.5L18 11L2 20.5V1.5Z" fill="white" />
                    </svg>
                  </button>
                ) : (
                  <div className="relative z-10 text-gray-600 text-sm font-medium">
                    ▶ Playing…
                  </div>
                )}
              </div>
              {/* end video */}
            </div>

            {/* Info panel */}
            <div
              className={`rounded-b-2xl px-6 py-5 ${
                animating
                  ? direction === "right" ? "slide-exit-left" : "slide-exit-right"
                  : "slide-enter-right"
              }`}
              style={{ background: "#1e3a7a" }}
            >
              <p
                className="ss-title font-bold text-white mb-1.5"
                style={{ fontSize: "clamp(14px, 2vw, 17px)" }}
              >
                {story.name}
              </p>
              <p
                className="text-blue-100 leading-relaxed lg:text-base"
                style={{ fontSize: "clamp(11px, 1.5vw, 13.5px)" }}
              >
                {story.description}
              </p>

              {/* Dot indicators */}
              <div className="flex items-center gap-1.5 mt-3">
                {STORIES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (i === current) return;
                      setDirection(i > current ? "right" : "left");
                      setAnimating(true);
                      setPlaying(false);
                      setTimeout(() => {
                        setCurrent(i);
                        setAnimating(false);
                        setDirection(null);
                      }, 320);
                    }}
                    aria-label={`Go to story ${i + 1}`}
                    className="dot rounded-full"
                    style={{
                      height: 6,
                      width: i === current ? 20 : 6,
                      background: i === current ? "#fff" : "rgba(255,255,255,0.35)",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  />
                ))}
              </div>
            </div>
            {/* end info panel */}

          </div>
          {/* end card */}

        </div>
        {/* end outer wrapper */}

      </section>
    </>
  );
}