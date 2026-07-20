"use client";

import { useState } from "react";
import { fetchPartners, updatePartner } from "@/lib/admin-actions";

const PARTNER_MOU: Record<string, string> = {
  "Sindh Madarasatul Islam University (SMIU)": "/mou/youth development training.pdf",
  "Hammad Foundation": "/mou/hammad foundation.pdf",
  "Quants Society (NED University)": "/mou/QUANTS SOCIETY.pdf",
  "NGAS \u2014 NED Girls Affairs Society (NED University)": "/mou/NEDGAS.pdf",
  "Combine Foundation with Islamian Computing Society": "/mou/Combine Foundation -Islamian Computing Society-IIUI-MoU.pdf",
};

export default function SeedPartnerMouPage() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const matchKey = (raw: string): string | undefined => {
    if (PARTNER_MOU[raw]) return raw;
    for (const key of Object.keys(PARTNER_MOU)) {
      if (key.toLowerCase().includes(raw.toLowerCase()) || raw.toLowerCase().includes(key.toLowerCase())) return key;
    }
    return undefined;
  };

  const handleSeed = async () => {
    setLoading(true);
    setResult(null);
    try {
      const partners = await fetchPartners();
      const lines: string[] = [];

      for (const p of partners) {
        const matched = matchKey(p.name);
        if (matched) {
          await updatePartner(p.id!, { mou: PARTNER_MOU[matched] });
          lines.push(`${p.name} \u2192 \u2705 mou set to ${PARTNER_MOU[matched]}`);
        } else {
          lines.push(`${p.name} \u2192 \u2796 skipped (no mapping)`);
        }
      }

      if (lines.length === 0) setResult("No partners found in Firestore.");
      else setResult(lines.join("\n"));
    } catch (e: any) {
      setResult(`Error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Seed Partner MOU</h1>
      <p className="text-sm text-gray-600 mb-4">Sets <code>mou</code> field for the 5 known partners using static PDF paths from <code>public/mou/</code>.</p>
      <button
        onClick={handleSeed}
        disabled={loading}
        className="bg-secondary-500 text-white px-6 py-2 rounded-lg font-medium hover:brightness-90 disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Updating..." : "Set MOU Fields"}
      </button>
      {result && (
        <pre className="mt-6 text-sm whitespace-pre-wrap bg-gray-100 p-4 rounded-lg">{result}</pre>
      )}
    </div>
  );
}
