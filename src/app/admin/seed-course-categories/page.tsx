"use client";

import { useState } from "react";
import { fetchCourses, updateCourse } from "@/lib/admin-actions";

const COURSE_CATEGORIES: Record<string, string> = {
  "AI Video Creation Course": "Technology",
  "Meta Ads Mastery Program": "Marketing",
  "Digital Empowerment Course": "Technology",
  "Quantitative Finance Course": "Finance",
  "WEB DEVELOPMENT COURSE – Batch 03": "Technology",
  "Python & AI Chatbot Course — Batch 2": "Technology",
};

export default function SeedCourseCategoriesPage() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSeed = async () => {
    setLoading(true);
    setResult(null);
    try {
      const courses = await fetchCourses();
      const updates: string[] = [];

      for (const course of courses) {
        const category = COURSE_CATEGORIES[course.name];
        if (category) {
          await updateCourse(course.id!, { category });
          updates.push(`${course.name}: ✅ → ${category}`);
        }
      }

      if (updates.length === 0) {
        setResult("No matching courses found in Firestore.");
      } else {
        setResult(updates.join("\n"));
      }
    } catch (e: any) {
      setResult(`Error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Seed Course Categories</h1>
      <p className="text-sm text-gray-600 mb-6">
        Updates <code>category</code> field for existing courses:
      </p>
      <ul className="list-disc pl-6 mb-6 text-sm space-y-1">
        <li>AI Video Creation Course → Technology</li>
        <li>Meta Ads Mastery Program → Marketing</li>
        <li>Digital Empowerment Course → Technology</li>
        <li>Quantitative Finance Course → Finance</li>
        <li>WEB DEVELOPMENT COURSE – Batch 03 → Technology</li>
        <li>Python & AI Chatbot Course — Batch 2 → Technology</li>
      </ul>

      <button
        onClick={handleSeed}
        disabled={loading}
        className="bg-secondary-500 text-white px-6 py-2 rounded-lg font-medium hover:brightness-90 disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Updating..." : "Update Course Categories"}
      </button>

      {result && (
        <pre className="mt-6 text-sm whitespace-pre-wrap bg-gray-100 p-4 rounded-lg">{result}</pre>
      )}
    </div>
  );
}
