"use client";

import { useState } from "react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore/lite";
import { getDb } from "@/lib/firebase";
import { fetchProjects } from "@/lib/admin-actions";

export default function SeedImgUpdatePage() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSeed = async () => {
    setLoading(true);
    setResult(null);
    try {
      const projects = await fetchProjects();
      const lines: string[] = [];

      for (const p of projects) {
        if (p.title.toLowerCase().includes("healthy") || p.title.toLowerCase().includes("lifestyle") || p.title.toLowerCase().includes("health")) {
          const ref = doc(getDb(), "projects", p.id!);
          await updateDoc(ref, { images: arrayUnion("/home/heroslider/5.svg") });
          lines.push(`${p.title} → ✅ 5.svg appended to images`);
        }
      }

      if (lines.length === 0) {
        setResult("No matching project found.");
      } else {
        setResult(lines.join("\n"));
      }
    } catch (e: any) {
      setResult(`Error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Add Image to Project</h1>
      <p className="text-sm text-gray-600 mb-6">
        Appends <code>/home/heroslider/5.svg</code> to the existing images array (does not replace).
      </p>
      <button
        onClick={handleSeed}
        disabled={loading}
        className="bg-secondary-500 text-white px-6 py-2 rounded-lg font-medium hover:brightness-90 disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Updating..." : "Add Image"}
      </button>
      {result && (
        <pre className="mt-6 text-sm whitespace-pre-wrap bg-gray-100 p-4 rounded-lg">{result}</pre>
      )}
    </div>
  );
}
