"use client";

import type { SectionId } from "./Sidebar";
import EventsView from "./EventsView";
import CoursesView from "./CoursesView";
import BlogsView from "./BlogsView";
import ContactView from "./ContactView";
import DonationsView from "./DonationsView";
import ProjectsView from "./ProjectsView";

export default function DashboardContent({
  section,
}: {
  section: SectionId;
}) {
  switch (section) {
    case "events":
      return <EventsView />;
    case "courses":
      return <CoursesView />;
    case "blogs":
      return <BlogsView />;
    case "contact":
      return <ContactView />;
    case "donations":
      return <DonationsView />;
    case "projects":
      return <ProjectsView />;
    default:
      return (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-slate-800">
            {sectionTitles[section]}
          </h1>
          <p className="text-slate-500">{sectionDescriptions[section]}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard label="Total" value="—" />
            <StatCard label="Published" value="—" />
            <StatCard label="Pending" value="—" />
          </div>
        </div>
      );
  }
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
    </div>
  );
}

const sectionTitles: Record<SectionId, string> = {
  events: "Events",
  courses: "Courses",
  blogs: "Blogs",
  contact: "Contact Messages",
  donations: "Donations",
  projects: "Projects",
};

const sectionDescriptions: Record<SectionId, string> = {
  events: "Manage your events here.",
  courses: "Manage your courses here.",
  blogs: "Manage your blog posts here.",
  contact: "View contact form submissions.",
  donations: "Manage donations here.",
  projects: "Manage your projects here.",
};
