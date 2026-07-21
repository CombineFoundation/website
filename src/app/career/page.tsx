"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore/lite";
import { Job } from "@/types/database";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  AlertCircle, 
  Loader2, 
  ArrowRight,
  BookOpen
} from "lucide-react";

export default function CareerPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchJobs() {
      try {
        if (!db) {
          setError("Firebase is not initialized. Please configure your environment variables.");
          setLoading(false);
          return;
        }

        const jobsRef = collection(db, "jobs");
        const q = query(jobsRef, where("active", "==", true));
        const querySnapshot = await getDocs(q);
        
        const jobsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Job[];

        // Sort in memory by createdAt descending safely
        jobsList.sort((a, b) => {
          const timeA = a.createdAt?.seconds || 0;
          const timeB = b.createdAt?.seconds || 0;
          return timeB - timeA;
        });

        setJobs(jobsList);
      } catch (err: any) {
        console.error("Error fetching jobs: ", err);
        setError("Failed to load career opportunities. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedJobId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col">

      {/* Main Content Area */}
      <section className="flex-grow max-w-7xl w-full mx-auto px-4 md:px-8 py-16">
        {loading ? (
          /* Loading State */
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-[#134981] animate-spin" />
            <p className="text-gray-500 font-semibold mt-4">Loading opportunities...</p>
          </div>
        ) : error ? (
          /* Error State */
          <div className="max-w-md mx-auto bg-red-50 border border-red-200 rounded-3xl p-8 text-center shadow-sm">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-red-800">Something went wrong</h3>
            <p className="text-sm text-red-600 mt-2 font-medium">{error}</p>
          </div>
        ) : jobs.length === 0 ? (
          /* No Jobs State (Currently Not Hiring) */
          <div className="max-w-2xl mx-auto bg-white rounded-[2rem] shadow-xl border border-gray-100/80 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500">
            {/* Accent colored line */}
            <div className="h-2 bg-gradient-to-r from-secondary-800 via-secondary-500 to-secondary-800"></div>
            
            <div className="p-8 md:p-12 text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-blue-50 text-secondary-500 rounded-full flex items-center justify-center mb-6 shadow-inner">
                <Briefcase className="w-10 h-10" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-secondary-500">
                Currently Not Hiring
              </h2>
              <p className="text-gray-500 mt-4 font-semibold text-sm md:text-base leading-relaxed max-w-lg">
                We do not have any open employment positions at the moment. However, we are always looking for passionate volunteers to join our mission.
              </p>
              
              <div className="w-full h-px bg-gray-100 my-8"></div>
              
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <Link 
                  href="/volunteer-program" 
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-sm md:text-base flex items-center gap-2 group"
                >
                  <span>Apply as Volunteer</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link 
                  href="/contact" 
                  className="border-2 border-gray-200 text-gray-600 hover:border-secondary-500 hover:text-secondary-500 font-bold px-8 py-4 rounded-full transition-all text-sm md:text-base"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* Jobs List State */
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Open Positions
              </h2>
              <span className="bg-secondary-500 text-white text-xs md:text-sm font-bold px-4 py-1.5 rounded-full">
                {jobs.length} Available
              </span>
            </div>

            <div className="space-y-6">
              {jobs.map((job) => {
                const isExpanded = expandedJobId === job.id;
                return (
                  <div 
                    key={job.id} 
                    className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300"
                  >
                    <div className="p-6 md:p-8">
                      <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                        <div>
                          {/* Department Badge */}
                          <span className="inline-block bg-blue-50 text-secondary-500 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                            {job.department}
                          </span>
                          <h3 className="text-xl md:text-2xl font-bold text-secondary-500 mt-2">
                            {job.title}
                          </h3>
                        </div>
                        
                        <button
                          onClick={() => job.id && toggleExpand(job.id)}
                          className="flex items-center gap-1.5 text-sm font-bold text-secondary-500 hover:text-blue-800 transition-colors bg-blue-50/50 hover:bg-blue-50 px-4 py-2 rounded-xl"
                        >
                          {isExpanded ? (
                            <>
                              <span>Hide Details</span>
                              <ChevronUp className="w-4 h-4" />
                            </>
                          ) : (
                            <>
                              <span>View Details</span>
                              <ChevronDown className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>

                      {/* Location & Job Type Row */}
                      <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 font-semibold mb-4">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-sky-400" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span>{job.type}</span>
                        </div>
                      </div>

                      {/* Job Brief Description */}
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                        {job.description}
                      </p>

                      {/* Expandable Details Container */}
                      {isExpanded && (
                        <div className="mt-6 pt-6 border-t border-gray-100 space-y-6 animate-in slide-in-from-top-4 duration-300">
                          {/* Requirements List */}
                          {job.requirements && job.requirements.length > 0 && (
                            <div>
                              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
                                Requirements & Qualifications
                              </h4>
                              <ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm md:text-base leading-relaxed">
                                {job.requirements.map((req, idx) => (
                                  <li key={idx}>{req}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* How to Apply Banner */}
                          <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-6 flex flex-col md:flex-row items-start gap-4">
                            <div className="w-12 h-12 bg-white text-secondary-500 border border-blue-100 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                              <Mail className="w-6 h-6 text-secondary-500" />
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 text-base">
                                How to Apply
                              </h4>
                              <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                                Please send your updated resume / CV to{" "}
                                <a 
                                  href={`mailto:combinegroup@gmail.com?subject=Job Application - ${job.title}`}
                                  className="text-secondary-500 hover:underline font-bold"
                                >
                                  combinegroup@gmail.com
                                </a>
                                . Make sure to specify <span className="font-bold">"Job Application - {job.title}"</span> as the subject line.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}