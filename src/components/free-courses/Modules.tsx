"use client";

import type { Module } from "@/lib/freeCourses";

interface ModulesProps {
  modules: Module[];
}

export default function Modules({ modules }: ModulesProps) {
  return (
    <section className="w-full py-8 max-sm:px-6">
      <div className="pb-3 mb-6 px-9">
        <h2 className="text-2xl md:text-4xl xl:text-5xl font-bold text-gray-900">
          Modules
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:mx-9">
        {modules.map((mod) => (
          <div
            key={mod.id}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col min-h-[350px]"
          >
            <h3 className="text-base lg:text-lg xl:text-xl font-bold text-gray-900 mb-3">
              {mod.title}
            </h3>
            <ul className="space-y-2 flex-1">
              {mod.bullets.map((b, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm lg:text-base xl:text-lg text-gray-700 leading-snug"
                >
                  <span className="mt-[7px] shrink-0 w-1.5 h-1.5 rounded-full bg-gray-700" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="w-full flex mt-6 mb-10 justify-center">
        <div className="w-full sm:w-[95%] bg-[#124980] rounded-xl flex flex-col min-[550px]:flex-row items-center justify-between gap-4 px-8 py-6">
          <p className="text-white text-sm sm:text-xl md:text-2xl font-bold text-center sm:text-left">
            Need More Information?
          </p>
          <button className="shrink-0 bg-[#F0632E] hover:bg-[#d15228] text-white font-semibold text-sm px-4 sm:px-6 py-3 rounded-full transition-colors duration-200 whitespace-nowrap">
            Download Course Guidelines
          </button>
        </div>
      </div>
    </section>
  );
}