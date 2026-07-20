"use client";

import { useState } from "react";
import { fetchProjects, updateProject } from "@/lib/admin-actions";

const PROJECT_IMAGES: Record<string, { before: string; after: string }> = {
  "One Follower One Plant: Plantation Drives": {
    before: "/before & after/1.svg",
    after: "/before & after/7.svg",
  },
  "Healthy Lifestyle Awareness Program": {
    before: "/before & after/3.svg",
    after: "/before & after/9.svg",
  },
  "Kitchen Garden Festival Camp": {
    before: "/before & after/5.svg",
    after: "/before & after/11.svg",
  },
};

export default function SeedProjectImagesPage() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSeed = async () => {
    setLoading(true);
    setResult(null);
    try {
      const projects = await fetchProjects();
      const updates: string[] = [];

      for (const project of projects) {
        const mapping = PROJECT_IMAGES[project.title];
        if (mapping) {
          await updateProject(project.id!, {
            beforeImage: mapping.before,
            afterImage: mapping.after,
          });
          updates.push(`${project.title}: ✅ updated`);
        }
      }

      if (updates.length === 0) {
        setResult("No matching projects found in Firestore.");
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
      <h1 className="text-2xl font-bold mb-8">Seed Project Before/After Images</h1>
      <p className="text-sm text-gray-600 mb-6">
        Updates <code>beforeImage</code> and <code>afterImage</code> fields for:
      </p>
      <ul className="list-disc pl-6 mb-6 text-sm space-y-1">
        <li><strong>One Follower One Plant: Plantation Drives</strong> — 1.svg / 7.svg</li>
        <li><strong>Healthy Lifestyle Awareness Program</strong> — 3.svg / 9.svg</li>
        <li><strong>Kitchen Garden Festival Camp</strong> — 5.svg / 11.svg</li>
      </ul>

      <button
        onClick={handleSeed}
        disabled={loading}
        className="bg-secondary-500 text-white px-6 py-2 rounded-lg font-medium hover:brightness-90 disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Updating..." : "Update Project Images"}
      </button>

      {result && (
        <pre className="mt-6 text-sm whitespace-pre-wrap bg-gray-100 p-4 rounded-lg">{result}</pre>
      )}
    </div>
  );
}
