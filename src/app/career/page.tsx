"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import PageHeroMobile from "@/components/UI/Pageheromobile";
import { fetchJobs, type FirestoreJob } from "@/lib/admin-actions";

const typeColors: Record<string, string> = {
  "Full-time": "bg-blue-100 text-blue-700",
  "Part-time": "bg-purple-100 text-purple-700",
  Internship: "bg-green-100 text-green-700",
  Volunteer: "bg-amber-100 text-amber-700",
};

export default function CareerPage() {
  const [jobs, setJobs] = useState<FirestoreJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const all = await fetchJobs();
        setJobs(all.filter((j) => j.active));
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <PageHeroMobile
        imageSrc="/home/image1.avif"
        title="Career Opportunities"
        mobileStyles="!text-5xl"
      />

      <section className="max-w-[1500px] mx-auto px-4 md:px-6 lg:px-8 py-16">
        <div className="mb-8 border-b border-gray-300 pb-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-black">
            Open Positions
          </h1>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#134981] animate-spin" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
              <svg
                className="w-10 h-10 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              No Open Positions at This Time
            </h2>
            <p className="text-gray-500 max-w-md">
              We don&apos;t have any open positions right now, but we&apos;re always looking for talented
              individuals. Check back later for updates or follow us on social media.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{job.title}</h2>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                      <span>{job.location}</span>
                      <span className="text-gray-300">•</span>
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColors[job.type] || "bg-gray-100 text-gray-600"}`}>
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <button className="bg-gradient-to-r from-secondary-600 via-primary-500 to-secondary-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:brightness-110 transition-all cursor-pointer shrink-0">
                    Apply Now
                  </button>
                </div>
                <p className="mt-4 text-gray-600 text-sm leading-relaxed">{job.description}</p>
                {job.requirements && job.requirements.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">Requirements</h3>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      {job.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
