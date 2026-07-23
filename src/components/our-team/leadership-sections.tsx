"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
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
    <div className="flex flex-col items-center text-center w-full">
      <div className="relative w-full aspect-square overflow-hidden rounded-2xl mb-3">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover object-top"
        />
      </div>
      <p className="text-lg font-bold text-primary-600">{member.name}</p>
      <p className="text-base text-primary-800 mt-1 leading-snug">{member.title}</p>
    </div>
  );
}

function MembersSection({ section }: { section: GroupSection }) {
  const [cols, setCols] = useState(4);
  const [expanded, setExpanded] = useState(false);
  const initialRows = 2;

  useEffect(() => {
    const update = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) setCols(4);
      else if (window.matchMedia("(min-width: 768px)").matches) setCols(3);
      else setCols(2);
    };
    update();
    const mqls = [
      window.matchMedia("(min-width: 1024px)"),
      window.matchMedia("(min-width: 768px)"),
    ];
    mqls.forEach((m) => m.addEventListener("change", update));
    return () => mqls.forEach((m) => m.removeEventListener("change", update));
  }, []);

  const limit = expanded ? section.members.length : initialRows * cols;
  const visibleMembers = section.members.slice(0, limit);
  const hasMore = section.members.length > initialRows * cols;
  const isExpanded = expanded && hasMore;

  return (
    <div className="mb-12 w-full max-w-[1500px]">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary-500 border-b border-black pb-4 mb-10">
        {section.heading}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {visibleMembers.map((member) => (
          <div key={member.id}>
            <MemberCard member={member} />
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="bg-secondary-500 text-white px-8 py-3 rounded-full font-semibold hover:brightness-90 transition-all cursor-pointer"
          >
            {isExpanded ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
}

export default function LeadershipSections({ members }: { members?: FirestoreTeamMember[] }) {
  const hasDbMembers = members && members.length > 0 && members.some(m => ["Department Head", "Youth Forum", "Youth Leader", "Ambassador", "International Forum"].includes(m.section));

  const displaySections = hasDbMembers
    ? [
        {
          heading: "Youth Forum",
          members: (members ?? [])
            .filter((m) => m.section === "Department Head" || m.section === "Youth Forum" || m.section === "Youth Leader")
            .sort((a, b) => {
              if (a.section === "Youth Leader" && b.section !== "Youth Leader") return 1;
              if (a.section !== "Youth Leader" && b.section === "Youth Leader") return -1;
              return 0;
            })
            .map((m) => ({ id: m.id || m.name, name: m.name, title: m.role, image: m.image })),
        },
        {
          heading: "International Forum",
          members: (members ?? [])
            .filter((m) => m.section === "Ambassador" || m.section === "International Forum")
            .map((m) => ({ id: m.id || m.name, name: m.name, title: m.role, image: m.image })),
        },
      ].filter((s) => s.members.length > 0)
    : [];

  return (
    <section className="max-w-[1500px] px-4 md:px-6 lg:px-8 py-10">
      {displaySections.map((section) => (
        <MembersSection key={section.heading} section={section} />
      ))}
    </section>
  );
}
