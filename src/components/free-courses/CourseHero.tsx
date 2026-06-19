"use client";

import type { Course } from "@/lib/freeCourses";

interface CourseHeroProps {
  course: Course;
}

export default function CourseHero({ course }: CourseHeroProps) {
  const shortTitle = course.name.replace(/ Course$/i, "");

  return (
    <>
      <div className="w-full pl-17 pr-10 py-8 max-sm:px-6 max-sm:py-6">
        <div className="text-[12.5px] lg:text-sm xl:text-base text-gray-500 mb-7">
          Free Courses&nbsp;/&nbsp;<span className="text-gray-500">{course.name}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 items-start">
          <div>
            <h1 className="text-[clamp(32px,5vw,46px)] xl:text-6xl font-extrabold xs:text-5xl leading-[1.1] text-black mb-3.5">
              {shortTitle}
            </h1>

            <p className="text-[13.5px] lg:text-base xl:text-lg leading-relaxed text-black mb-5">
              {course.description}
            </p>

            <ul className="flex flex-col gap-2.5 mb-7">
              <li className="flex items-center gap-[9px] text-[13.5px] lg:text-base xl:text-lg text-gray-700">
                <span className="w-5 h-5 shrink-0 flex items-center justify-center text-gray-500">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </span>
                <span className="font-medium text-gray-600">Duration :&nbsp;</span>
                <span className="text-gray-900">{course.duration}</span>
              </li>

              <li className="flex items-center gap-[9px] text-[13.5px] lg:text-base xl:text-lg text-gray-700">
                <span className="w-5 h-5 shrink-0 flex items-center justify-center text-gray-500">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <line x1="3" y1="9" x2="21" y2="9"/>
                    <line x1="9" y1="21" x2="9" y2="9"/>
                  </svg>
                </span>
                <span className="font-medium text-gray-600">Lessons :&nbsp;</span>
                <span className="text-gray-900">{course.lessons}</span>
              </li>

              <li className="flex items-center gap-[9px] text-[13.5px] lg:text-base xl:text-lg text-gray-700">
                <span className="w-5 h-5 shrink-0 flex items-center justify-center text-gray-500">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </span>
                <span className="font-medium text-gray-600">Price :&nbsp;</span>
                <span className="text-gray-900">{course.price.toLocaleString()} PKR</span>
                {course.originalPrice > 0 && (
                  <span className="text-[12px] lg:text-sm xl:text-base text-gray-400 ml-1">(Originally {course.originalPrice.toLocaleString()} PKR)</span>
                )}
              </li>

              <li className="flex items-center gap-[9px] text-[13.5px] lg:text-base xl:text-lg text-gray-700">
                <span className="w-5 h-5 shrink-0 flex items-center justify-center text-gray-500">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="6"/>
                    <path d="M8 14l-2 7 6-3 6 3-2-7"/>
                  </svg>
                </span>
                <span className="text-gray-700">Get Certified. Get Noticed. Get Hired.</span>
              </li>
            </ul>

            {course.mode && (
              <p className="text-[12.5px] lg:text-sm xl:text-base text-gray-500 mb-2">
                Mode: {course.mode}
              </p>
            )}

            <a
              href={course.enrollmentLink || "#"}
              target={course.enrollmentLink ? "_blank" : undefined}
              rel={course.enrollmentLink ? "noopener noreferrer" : undefined}
            >
              <button className="inline-block bg-accent-orange text-white text-[12.5px] lg:text-sm xl:text-base font-bold uppercase px-6 py-2.5 rounded-full border-none cursor-pointer mb-2.5 hover:brightness-90 hover:-translate-y-0.5 active:translate-y-0 transition-all">
                Enroll Now, Start Learning Today
              </button>
            </a>
            <div className="text-[11.5px] lg:text-xs xl:text-sm text-gray-400 italic">{course.requirements}</div>
          </div>

          <div className="relative w-full h-80 mx-auto max-sm:hidden">
            <div className="absolute left-0 top-0 w-[55%] h-[260px] rounded-[10px] overflow-hidden shadow-md z-10">
              <img
                src={course.heroImage1}
                alt=""
                className="w-full h-full object-cover object-top rounded-[10px]"
                onError={(e) => {
                  const t = e.currentTarget;
                  t.style.background = "#e8e2d8";
                }}
              />
            </div>

            <div
              className="absolute left-[35%] top-[85px] w-[62%] h-[260px] rounded-[10px] overflow-hidden z-20"
              style={{ boxShadow: "0 6px 18px rgba(0,0,0,0.22)" }}
            >
              <img
                src={course.heroImage2}
                alt={course.name}
                className="w-full h-full object-cover object-top rounded-[10px]"
                onError={(e) => {
                  const t = e.currentTarget;
                  t.style.background = "#d0cbc0";
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
