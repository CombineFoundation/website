"use client";

import { useState } from "react";
import { fetchProjects, updateProject } from "@/lib/admin-actions";

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
          await updateProject(p.id!, { images: ["/home/heroslider/5.svg"] });
          lines.push(`${p.title} → ✅ image set to 5.svg`);
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
      <h1 className="text-2xl font-bold mb-8">Update Project Image</h1>
      <p className="text-sm text-gray-600 mb-6">
        Sets <code>/home/heroslider/5.svg</code> as the image for the Healthy Lifestyle Awareness Program project.
      </p>
      <button
        onClick={handleSeed}
        disabled={loading}
        className="bg-secondary-500 text-white px-6 py-2 rounded-lg font-medium hover:brightness-90 disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Updating..." : "Update Image"}
      </button>
      {result && (
        <pre className="mt-6 text-sm whitespace-pre-wrap bg-gray-100 p-4 rounded-lg">{result}</pre>
      )}
    </div>
  );
}
