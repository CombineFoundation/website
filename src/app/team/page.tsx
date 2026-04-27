import type { Metadata } from "next";
import { TeamGrid } from "@/components/team/TeamGrid";
import { teamMembers } from "@/components/team/teamData";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the Combine Foundation team.",
};

export default function TeamPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Our Team
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Dedicated people working to deliver impact. Replace this text with
          your real introduction for the team page.
        </p>
      </div>

      <TeamGrid members={teamMembers} />
    </div>
  );
}

