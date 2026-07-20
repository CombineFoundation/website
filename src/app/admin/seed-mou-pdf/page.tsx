"use client";

import { useState } from "react";
import { fetchMOUs, updateMOU } from "@/lib/admin-actions";

const MOU_PDF: [string, string][] = [
  ["Combine foundation with Hammad foundation", "/mou/hammad foundation.pdf"],
  ["Combine foundation with NED girl's affair society (NGAS)", "/mou/NEDGAS.pdf"],
  ["Combine foundation with Quants society", "/mou/QUANTS SOCIETY.pdf"],
  ["Combine foundation with SMIU", "/mou/youth development training.pdf"],
  ["Combine Foundation with Islamian Computing Society", "/mou/Combine Foundation -Islamian Computing Society-IIUI-MoU.pdf"],
];

export default function SeedMouPdfPage() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSeed = async () => {
    setLoading(true);
    setResult(null);
    try {
      const mous = await fetchMOUs();
      const lines: string[] = [];

      for (const mapping of MOU_PDF) {
        const [title, pdf] = mapping;
        const match = mous.find(
          (m) => m.title.toLowerCase().includes(title.toLowerCase()) || title.toLowerCase().includes(m.title.toLowerCase())
        );
        if (match) {
          await updateMOU(match.id!, { pdf });
          lines.push(`${match.title} → ✅ pdf set`);
        } else {
          lines.push(`${title} → ❌ not found in Firestore`);
        }
      }

      if (lines.length === 0) setResult("No MOUs found in Firestore.");
      else setResult(lines.join("\n"));
    } catch (e: any) {
      setResult(`Error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Seed MOU PDF</h1>
      <p className="text-sm text-gray-600 mb-4">Sets <code>pdf</code> field on existing MOU documents.</p>
      <button
        onClick={handleSeed}
        disabled={loading}
        className="bg-secondary-500 text-white px-6 py-2 rounded-lg font-medium hover:brightness-90 disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Updating..." : "Set MOU PDFs"}
      </button>
      {result && (
        <pre className="mt-6 text-sm whitespace-pre-wrap bg-gray-100 p-4 rounded-lg">{result}</pre>
      )}
    </div>
  );
}
