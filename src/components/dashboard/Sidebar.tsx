"use client";

import { useState } from "react";
import {
  LayoutList,
  BookOpen,
  LayoutDashboard,
  Users,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export type SectionId =
  | "events"
  | "courses"
  | "blogs"
  | "contact"
  | "donations";

interface NavItem {
  id: SectionId;
  label: string;
  icon: React.ElementType;
  badge: number | null;
}

const navItems: NavItem[] = [
  { id: "events", label: "Events", icon: LayoutList, badge: null },
  { id: "courses", label: "Courses", icon: BookOpen, badge: null },
  { id: "blogs", label: "Blogs", icon: LayoutDashboard, badge: null },
  { id: "contact", label: "Contact", icon: Users, badge: null },
  { id: "donations", label: "Donations", icon: Star, badge: null },
];

export default function Sidebar({
  activeSection,
  onSelect,
}: {
  activeSection: SectionId;
  onSelect: (id: SectionId) => void;
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`
          bg-primary-900 flex flex-col flex-shrink-0 self-stretch
          transition-all duration-300 ease-in-out
          ${isOpen ? "w-56" : "w-16 overflow-visible"}
        `}
      >
        {/* Logo / Top area */}
        <div className="flex items-center justify-between px-4 py-5 min-w-max">
          {isOpen ? (
            <>
              <span className="text-white font-bold text-lg tracking-wide">
                Admin
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors ml-auto cursor-pointer"
                aria-label="Close sidebar"
              >
                <ChevronLeft size={20} />
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsOpen(true)}
              className="text-white hover:text-slate-300 transition-colors mx-auto cursor-pointer"
              aria-label="Open sidebar"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>

        {/* Nav Items */}
        <nav className="flex flex-col gap-1 px-2 mt-2 flex-1">
          {navItems.map(({ id, label, icon: Icon, badge }) => {
            const isActive = activeSection === id;
            return (
              <button
                key={id}
                onClick={() => onSelect(id)}
                className={`
                  group flex items-center gap-3 rounded-lg px-3 py-2.5 w-full text-left
                  transition-all duration-200 relative min-w-max cursor-pointer
                  ${
                    isActive
                      ? "bg-orange text-white"
                      : "text-slate-300 hover:bg-slate-700/60 hover:text-white"
                  }
                `}
              >
                <Icon
                  size={20}
                  className={`flex-shrink-0 transition-colors ${
                    isActive
                      ? "text-white"
                      : "text-slate-400 group-hover:text-white"
                  }`}
                />

                {isOpen && (
                  <span className="text-sm font-medium">{label}</span>
                )}

                {badge && isOpen && (
                  <span className="ml-auto bg-orange text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                    {badge}
                  </span>
                )}

                {badge && !isOpen && (
                  <span className="absolute -top-1 -right-1 bg-orange text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full leading-none">
                    {badge}
                  </span>
                )}

                {/* Tooltip when collapsed */}
                {!isOpen && (
                  <span className="absolute left-14 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                    {label}
                    {badge ? ` (${badge})` : ""}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
