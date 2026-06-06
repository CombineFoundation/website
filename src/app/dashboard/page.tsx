"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import type { SectionId } from "@/components/dashboard/Sidebar";
import DashboardContent from "@/components/dashboard/DashboardContent";

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState<SectionId>("events");

  return (
    <div className="flex">
      <Sidebar
        activeSection={activeSection}
        onSelect={setActiveSection}
      />
      <main className="flex-1 transition-all duration-300 md:ml-56 p-6">
        <DashboardContent section={activeSection} />
      </main>
    </div>
  );
}
