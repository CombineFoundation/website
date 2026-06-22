"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Course, slugify } from "@/lib/freeCourses";

const HOVER_GRADIENT =
  "linear-gradient(145deg, var(--secondary-800) 0%, var(--primary-700) 28%, var(--primary-500) 52%, var(--primary-700) 76%, var(--secondary-800) 100%)";

// ── Individual Card ──────────────────────────────────────────────────────────
function CourseCard({ course, onOpen }: { course: Course; onOpen: (slug: string) => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        relative flex flex-col h-full
        rounded-2xl border overflow-hidden cursor-pointer select-none
        transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
        ${hovered
          ? "border-transparent shadow-2xl shadow-blue-950/60 scale-[1.03]"
          : "border-gray-200 shadow-sm hover:shadow-md"
        }
      `}
      style={{
        background: hovered ? HOVER_GRADIENT : "#ffffff",
        minHeight: "260px",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.5s",
          background:
            "radial-gradient(ellipse at 50% 42%, rgba(55,115,255,0.25) 0%, transparent 62%)",
        }}
      />

      <div className="relative z-10 flex flex-col flex-1 p-4">
        <h3
          className={`text-sm md:text-base lg:text-lg font-bold mb-2.5 leading-tight transition-colors duration-300 ${hovered ? "text-white" : "text-black"
            }`}
        >
          {course.title || course.name}
        </h3>

        <ul className="flex-1 space-y-1.5">
          {course.modules
            .flatMap((mod) => mod.bullets)
            .slice(0, 5)
            .map((bullet, i) => (
              <li
                key={i}
                className={`flex items-start gap-1.5 text-[11px] sm:text-xs lg:text-sm leading-snug transition-colors duration-300 ${hovered ? "text-white" : "text-black"
                  }`}
              >
                <span
                  className={`mt-[5px] shrink-0 rounded-full transition-colors duration-300 ${hovered                   ? "bg-white" : "bg-primary-700"
                    }`}
                  style={{ width: 4, height: 4 }}
                />
                {bullet}
              </li>
            ))}
        </ul>

        <button
          onClick={() => onOpen(course.slug || slugify(course.title || course.name || ""))}
          className={`
            mt-4 w-full rounded-full py-2 text-xs md:text-sm lg:text-base font-semibold
            transition-all cursor-pointer duration-300 active:scale-95
            ${hovered
              ? "bg-white text-black hover:bg-gray-100 shadow-lg"
              : "bg-accent-orange text-white hover:brightness-90 shadow-md"
            }
          `}
        >
          View Course
        </button>
      </div>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function CoursesOffered({ courses }: { courses: Course[] }) {
  const [search, setSearch] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const openCourse = (slug: string) => {
    router.push(`/free-courses/${slug}`);
  };

  const filtered = courses.filter((c) =>
    (c.title || c.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .card-enter {
          animation: fadeUp 0.42s cubic-bezier(0.34,1.56,0.64,1) both;
        }
      `}</style>

      <section className="max-w-[1500px] mx-auto px-4 md:px-6 lg:px-8 py-8 font-sans">
        <div className="border-b border-gray-300 pb-3 mb-5">
          <h2 className="text-2xl md:text-5xl font-bold text-black tracking-tight">
            Courses Offered
          </h2>
        </div>

        <div className="flex items-center gap-2 mb-5">
          <div className="flex-1 flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm focus-within:border-gray-400 transition-colors">
            <svg
              className="w-4 h-4 text-gray-400 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
            />
          </div>

          <button className="p-2 rounded-lg border border-gray-200 bg-white shadow-sm hover:bg-gray-50 transition-colors">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                d="M4 6h16M7 12h10M10 18h4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div
          ref={scrollRef}
          className="overflow-y-auto overflow-x-hidden"
          style={{ maxHeight: "600px", scrollBehavior: "smooth" }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pb-2 px-2 items-stretch">
            {filtered.map((course, idx) => (
              <div
                key={course.id}
                
                className="card-enter flex flex-col h-full"
                style={{ animationDelay: `${idx * 55}ms` }}
              >
                <CourseCard course={course} onOpen={openCourse} />
              </div>
            ))}

            {filtered.length === 0 && (
              <p className="col-span-full py-16 text-center text-gray-400 text-sm">
                No courses match your search.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
