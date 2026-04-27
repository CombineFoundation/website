import type { TeamMember } from "./teamData";
import { TeamMemberCard } from "./TeamMemberCard";

export function TeamGrid({ members }: { members: TeamMember[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((m, idx) => (
        <TeamMemberCard key={`${m.name}-${idx}`} member={m} />
      ))}
    </div>
  );
}

