import Image from "next/image";
import type { FirestoreTeamMember } from "@/lib/admin-actions";

export default function BoardOfMembers({ members }: { members?: FirestoreTeamMember[] }) {
  const dbMembers = members?.filter((m) => m.section === "Board of Members") || [];
  const displayMembers = dbMembers.length > 0
    ? dbMembers.map((m) => ({
        id: m.id || m.name,
        name: m.name,
        role: m.role,
        image: m.image,
        description: "",
      }))
    : [];

  return (
    <section className="w-full px-6 py-10 md:px-12 lg:px-16 m-w-[1500px]">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary-500 border-b border-black pb-4 mb-10">
        Board of Members
      </h2>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {displayMembers.map((member) => (
          <div
            key={member.id}
            className="flex flex-col items-center gap-8 py-8 first:pt-0 text-center"
          >
            <div className="relative w-40 sm:w-48 md:w-56 aspect-square overflow-hidden rounded-2xl">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover object-top"
              />
            </div>

            <div className="flex-1">
              <h3 className="text-lg md:text-xl font-bold text-primary-600 mb-1">
                {member.name}
              </h3>
              <p className="text-sm md:text-base text-primary-800 font-medium mb-3">
                {member.role}
              </p>
              <p className="text-sm md:text-base lg:text-lg text-black leading-relaxed">
                {member.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
