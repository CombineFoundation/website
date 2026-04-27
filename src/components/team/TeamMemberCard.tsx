import type { TeamMember } from "./teamData";

function initials(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase()).join("");
}

export function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="group rounded-2xl border border-black/10 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#0b4b8e] text-sm font-semibold text-white">
          {initials(member.name)}
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-slate-900">
            {member.name}
          </div>
          <div className="mt-0.5 text-xs font-medium text-[#ff7a33]">
            {member.role}
          </div>
        </div>
      </div>

      {member.bio && (
        <p className="mt-4 line-clamp-3 text-sm text-slate-600">
          {member.bio}
        </p>
      )}
    </div>
  );
}

