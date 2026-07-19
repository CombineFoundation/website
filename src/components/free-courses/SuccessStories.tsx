"use client";

import { useState } from "react";

export interface StoryItem {
  name: string;
  description: string;
  course: string;
}

export default function SuccessStories({ stories }: { stories: StoryItem[] }) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [animating, setAnimating] = useState(false);

  const navigate = (dir: "left" | "right") => {
    if (animating || stories.length === 0) return;
    setDirection(dir);
    setAnimating(true);
    setPlaying(false);
    setTimeout(() => {
      setCurrent((prev) =>
        dir === "right"
          ? (prev + 1) % stories.length
          : (prev - 1 + stories.length) % stories.length
      );
      setAnimating(false);
      setDirection(null);
    }, 320);
  };

  const story = stories[current];

  if (stories.length === 0) return null;

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
          filter: brightness(0.9) !important;
          transform: scale(1.08);
        }
        .nav-btn:active { transform: scale(0.96); }

        .dot { transition: width 0.3s ease, background 0.3s ease; }
      `}</style>

      <section className="max-w-[1500px] mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="border-b border-gray-300 pb-3 mb-5">
          <h2 className="ss-title text-2xl md:text-5xl font-bold text-secondary-500 tracking-tight">
            Our Success Stories & Achievements
          </h2>
        </div>

        <div style={{ margin: "0 20px" }}>
          <div className="rounded-2xl overflow-visible" style={{ background: "#FF6900" }}>
            <div className="relative">
              <button
                onClick={() => navigate("left")}
                aria-label="Previous"
                className="nav-btn absolute z-20 flex items-center justify-center rounded-full w-10 h-10 lg:w-[50px] lg:h-[50px] xl:w-[60px] xl:h-[60px]"
                style={{
                  background: "var(--secondary-500)",
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

              <button
                onClick={() => navigate("right")}
                aria-label="Next"
                className="nav-btn absolute z-20 flex items-center justify-center rounded-full w-10 h-10 lg:w-[50px] lg:h-[50px] xl:w-[60px] xl:h-[60px]"
                style={{
                  background: "var(--secondary-500)",
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

              <div
                className={`w-full relative flex items-center justify-center overflow-hidden rounded-t-2xl ${
                  animating
                    ? direction === "right" ? "slide-exit-left" : "slide-exit-right"
                    : "slide-enter-right"
                }`}
                style={{ background: "#c4cdd6", minHeight: 220, maxHeight: 340, aspectRatio: "16/7" }}
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 4px)",
                  }}
                />

                {!playing ? (
                  <button
                    onClick={() => setPlaying(true)}
                    aria-label="Play video"
                    className="play-btn relative z-10 flex items-center justify-center rounded-full"
                    style={{
                      width: 56,
                      height: 56,
                      background: "var(--secondary-500)",
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
            </div>

            <div
              className={`rounded-b-2xl px-6 py-5 ${
                animating
                  ? direction === "right" ? "slide-exit-left" : "slide-exit-right"
                  : "slide-enter-right"
              }`}
              style={{ background: "var(--secondary-500)" }}
            >
              <p
                className="ss-title font-bold text-white mb-1.5"
                style={{ fontSize: "clamp(14px, 2vw, 17px)" }}
              >
                {story.name} — {story.course}
              </p>
              <p
                className="text-blue-100 leading-relaxed lg:text-base"
                style={{ fontSize: "clamp(11px, 1.5vw, 13.5px)" }}
              >
                {story.description}
              </p>

              <div className="flex items-center gap-1.5 mt-3">
                {stories.map((_, i) => (
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
          </div>
        </div>
      </section>
    </>
  );
}
