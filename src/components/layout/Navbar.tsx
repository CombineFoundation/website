/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

export type NavItem = {
  label: string;
  href?: string;
  children?: Array<{ label: string; href: string }>;
};

export function Navbar({
  navItems,
}: {
  navItems: NavItem[];
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const items = useMemo(() => navItems ?? [], [navItems]);

  return (
    <header className="w-full bg-white">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Combine Foundation"
            className="h-11 w-11 rounded"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <span className="text-sm font-semibold tracking-wide text-[#0b4b8e]">
            COMBINE FOUNDATION
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-800 lg:flex">
          {items.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            if (!hasChildren) {
              return (
                <Link
                  key={item.label}
                  href={item.href ?? "#"}
                  className="hover:text-[#0b4b8e]"
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <div key={item.label} className="relative">
                <button
                  type="button"
                  className="inline-flex items-center gap-1 hover:text-[#0b4b8e]"
                  onClick={() =>
                    setOpenDropdown((v) => (v === item.label ? null : item.label))
                  }
                  aria-expanded={openDropdown === item.label}
                >
                  {item.label}
                  <ChevronDown className="h-4 w-4" />
                </button>
                {openDropdown === item.label && (
                  <div
                    className="absolute left-0 top-full z-50 mt-3 w-56 overflow-hidden rounded-xl border border-black/10 bg-white shadow-lg"
                    role="menu"
                  >
                    <div className="py-2">
                      {item.children!.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm hover:bg-slate-50"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/join-us"
            className="rounded-full bg-[#0b4b8e] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#083a6f]"
          >
            Join Us
          </Link>
          <Link
            href="/donate"
            className="rounded-full border-2 border-[#0b4b8e] px-5 py-2.5 text-sm font-semibold text-[#0b4b8e] hover:bg-[#0b4b8e] hover:text-white"
          >
            Donate
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-800 hover:bg-slate-100 lg:hidden"
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden">
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed right-0 top-0 z-50 h-full w-[88%] max-w-sm bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-black/10 px-4 py-4">
              <span className="text-sm font-semibold text-[#0b4b8e]">
                Menu
              </span>
              <button
                type="button"
                className="rounded-lg p-2 hover:bg-slate-100"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="px-4 py-4">
              <div className="flex flex-col gap-1">
                {items.map((item) => {
                  const hasChildren = item.children && item.children.length > 0;
                  if (!hasChildren) {
                    return (
                      <Link
                        key={item.label}
                        href={item.href ?? "#"}
                        className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-50"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    );
                  }
                  return (
                    <details key={item.label} className="rounded-lg">
                      <summary className="cursor-pointer list-none rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-50">
                        <span className="inline-flex items-center gap-1">
                          {item.label}
                          <ChevronDown className="h-4 w-4 opacity-70" />
                        </span>
                      </summary>
                      <div className="ml-2 mt-1 flex flex-col gap-1">
                        {item.children!.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="rounded-lg px-3 py-2 text-sm hover:bg-slate-50"
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </details>
                  );
                })}
              </div>

              <div className="mt-5 flex gap-3">
                <Link
                  href="/join-us"
                  className="flex-1 rounded-full bg-[#0b4b8e] px-5 py-2.5 text-center text-sm font-semibold text-white hover:bg-[#083a6f]"
                  onClick={() => setMobileOpen(false)}
                >
                  Join Us
                </Link>
                <Link
                  href="/donate"
                  className="flex-1 rounded-full border-2 border-[#0b4b8e] px-5 py-2.5 text-center text-sm font-semibold text-[#0b4b8e] hover:bg-[#0b4b8e] hover:text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  Donate
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

