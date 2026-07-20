"use client";

import Image from "next/image";
import { useState } from "react";
import type { FirestoreTeamMember } from "@/lib/admin-actions";

interface Member {
  id: number | string;
  name: string;
  title: string;
  image: string;
}

interface GroupSection {
  heading: string;
  members: Member[];
}

function MemberCard({ member }: { member: Member }) {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-20 py-8 first:pt-0 text-center sm:text-left">
      <div className="flex items-start justify-center sm:justify-start gap-2 flex-shrink-0">
        <div className="relative w-[60vw] sm:w-48 md:w-56 aspect-square overflow-hidden rounded-2xl flex-shrink-0">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover object-top"
          />
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-lg md:text-xl font-bold text-primary-600 mb-1">
          {member.name}
        </h3>
        <p className="text-sm md:text-base text-primary-800 font-medium mb-3">
          {member.title}
        </p>
      </div>
    </div>
  );
}

function MembersSection({ section }: { section: GroupSection }) {
  const [visibleCount, setVisibleCount] = useState(8);
  const increment = 8;

  const visibleMembers = section.members.slice(0, visibleCount);
  const hasMore = section.members.length > visibleCount;
  const canShowLess = visibleCount > increment;

  return (
    <div className="mb-12">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary-500 border-b border-black pb-4 mb-10">
        {section.heading}
      </h2>

      <div className="flex flex-col">
        {visibleMembers.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          {!canShowLess ? (
            <button
              onClick={() => setVisibleCount((p) => p + increment)}
              className="bg-secondary-500 text-white px-8 py-3 rounded-full font-semibold hover:brightness-90 transition-all cursor-pointer"
            >
              Show More
            </button>
          ) : (
            <button
              onClick={() => setVisibleCount(increment)}
              className="md:hidden bg-secondary-500 text-white px-8 py-3 rounded-full font-semibold hover:brightness-90 transition-all cursor-pointer"
            >
              Show Less
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function LeadershipSections({ members }: { members?: FirestoreTeamMember[] }) {
  const hasDbMembers = members && members.length > 0 && members.some(m => ["Department Head", "Youth Forum", "Youth Leader", "Ambassador"].includes(m.section));

  const displaySections = hasDbMembers
    ? [
        {
          heading: "Youth Forum",
          members: members
            .filter((m) => m.section === "Department Head" || m.section === "Youth Forum" || m.section === "Youth Leader")
            .map((m) => ({ id: m.id || m.name, name: m.name, title: m.role, image: m.image })),
        },
        {
          heading: "Ambassadors",
          members: members
            .filter((m) => m.section === "Ambassador")
            .map((m) => ({ id: m.id || m.name, name: m.name, title: m.role, image: m.image })),
        },
      ].filter((s) => s.members.length > 0)
    : [];

  return (
    <section className="max-w-[1500px] mx-auto px-4 md:px-6 lg:px-8 py-10">
      {displaySections.map((section) => (
        <MembersSection key={section.heading} section={section} />
      ))}
    </section>
  );
}
