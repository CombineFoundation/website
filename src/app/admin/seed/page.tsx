"use client";

import { useState } from "react";
import { seedYouthLeaders } from "@/lib/seed-youth-leaders";
import { migrateAllSections } from "@/lib/migrate-sections-batch";

export default function AdminSeedPage() {
  const [seedResult, setSeedResult] = useState<string | null>(null);
  const [migrateResult, setMigrateResult] = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);
  const [migrating, setMigrating] = useState(false);

  const handleSeed = async () => {
    setSeeding(true);
    setSeedResult(null);
    try {
      const res = await seedYouthLeaders();
      setSeedResult(`Added ${res.added} youth leaders to Youth Forum`);
    } catch (e: any) {
      setSeedResult(`Error: ${e.message}`);
    } finally {
      setSeeding(false);
    }
  };

  const handleMigrate = async () => {
    setMigrating(true);
    setMigrateResult(null);
    try {
      const results = await migrateAllSections();
      const lines = results.map(
        (r: any) => `${r.from} → ${r.to}: ${r.count} updated`
      );
      setMigrateResult(lines.join("\n"));
    } catch (e: any) {
      setMigrateResult(`Error: ${e.message}`);
    } finally {
      setMigrating(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Admin Seed Tools</h1>

      <div className="space-y-6">
        <div className="border rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-2">Seed Youth Leaders</h2>
          <p className="text-sm text-gray-600 mb-4">
            Add 9 youth leader members (Subhan Khan, Hafsah Khalil, etc.) to the{" "}
            <strong>Youth Forum</strong> section.
          </p>
          <button
            onClick={handleSeed}
            disabled={seeding}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:brightness-90 disabled:opacity-50 cursor-pointer"
          >
            {seeding ? "Seeding..." : "Seed 9 Youth Leaders"}
          </button>
          {seedResult && (
            <pre className="mt-4 text-sm whitespace-pre-wrap">{seedResult}</pre>
          )}
        </div>

        <div className="border rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-2">Migrate Sections</h2>
          <p className="text-sm text-gray-600 mb-4">
            Update existing Firestore data:{" "}
            <strong>Ambassador → International Forum</strong> and{" "}
            <strong>Youth Leader → Youth Forum</strong>.
          </p>
          <button
            onClick={handleMigrate}
            disabled={migrating}
            className="bg-secondary-500 text-white px-6 py-2 rounded-lg font-medium hover:brightness-90 disabled:opacity-50 cursor-pointer"
          >
            {migrating ? "Migrating..." : "Migrate Sections"}
          </button>
          {migrateResult && (
            <pre className="mt-4 text-sm whitespace-pre-wrap">{migrateResult}</pre>
          )}
        </div>
      </div>
    </div>
  );
}
