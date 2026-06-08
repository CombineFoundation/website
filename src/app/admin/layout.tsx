"use client";

import { useState } from "react";

const BellIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const CombineLogo = () => (
  <div className="flex-shrink-0 w-[42px] h-[42px] rounded-[6px] overflow-hidden bg-white flex items-center justify-center">
    <svg
      width="38"
      height="38"
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="9" cy="9" r="3.5" fill="#E63946" />
      <circle cx="19" cy="9" r="3.5" fill="#F4A261" />
      <circle cx="29" cy="9" r="3.5" fill="#2A9D8F" />
      <circle cx="9" cy="19" r="3.5" fill="#457B9D" />
      <circle cx="19" cy="19" r="3.5" fill="#6A4C93" />
      <circle cx="29" cy="19" r="3.5" fill="#E9C46A" />
      <circle cx="9" cy="29" r="3.5" fill="#2A9D8F" />
      <circle cx="19" cy="29" r="3.5" fill="#E63946" />
      <circle cx="29" cy="29" r="3.5" fill="#457B9D" />
    </svg>
  </div>
);

function AdminHeader() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header
      className="w-full flex items-center justify-between px-4 sm:px-6"
      style={{
        backgroundColor: "#0f1b3d",
        height: "64px",
        minHeight: "64px",
      }}
    >
      <div className="flex items-center gap-3">
        <div className="leading-tight">
          <p
            className="font-bold text-white m-0 p-0"
            style={{ fontSize: "11px", lineHeight: "1.3", whiteSpace: "nowrap" }}
          >
            Combine
          </p>
          <p
            className="font-bold text-white m-0 p-0"
            style={{ fontSize: "11px", lineHeight: "1.3", whiteSpace: "nowrap" }}
          >
            Foundation
          </p>
          <p
            className="font-bold text-white m-0 p-0"
            style={{ fontSize: "11px", lineHeight: "1.3", whiteSpace: "nowrap" }}
          >
            Dashboard
          </p>
        </div>
        <CombineLogo />
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <div className="relative flex items-center justify-center cursor-pointer">
          <span className="text-white opacity-80 hover:opacity-100 transition-opacity">
            <BellIcon />
          </span>
          <span
            className="absolute flex items-center justify-center rounded-full bg-red-500 text-white font-bold"
            style={{
              top: "-6px",
              right: "-6px",
              width: "15px",
              height: "15px",
              fontSize: "8px",
              lineHeight: 1,
            }}
          >
            8
          </span>
        </div>

        <div
          className="hidden sm:block h-6 w-px opacity-20"
          style={{ backgroundColor: "#ffffff" }}
        />

        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="flex items-center gap-2 cursor-pointer bg-transparent border-none outline-none focus:outline-none"
          aria-label="User menu"
        >
          <div
            className="flex items-center justify-center rounded-full text-white font-bold flex-shrink-0"
            style={{
              width: "30px",
              height: "30px",
              backgroundColor: "#2563eb",
              fontSize: "13px",
            }}
          >
            A
          </div>
          <span
            className="hidden sm:inline text-white font-medium"
            style={{ fontSize: "13px", whiteSpace: "nowrap" }}
          >
            Ali Imran
          </span>
          <span
            className="text-white opacity-70"
            style={{
              transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease",
            }}
          >
            <ChevronDownIcon />
          </span>
        </button>
      </div>
    </header>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full overflow-x-hidden">
      <AdminHeader />
      {children}
    </div>
  );
}
