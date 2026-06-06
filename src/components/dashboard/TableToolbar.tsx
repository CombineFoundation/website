"use client";

import { Search, Pencil, Trash2, ChevronDown } from "lucide-react";

interface TableToolbarProps {
  searchValue: string;
  onSearchChange: (val: string) => void;
  filterValue: string;
  onFilterChange: (val: string) => void;
  filterOptions?: string[];
  canEdit: boolean;
  canDelete: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function TableToolbar({
  searchValue,
  onSearchChange,
  filterValue,
  onFilterChange,
  filterOptions = [],
  canEdit,
  canDelete,
  onEdit,
  onDelete,
}: TableToolbarProps) {
  return (
    <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
      <div className="flex items-center gap-3">
        {/* Filter */}
        <div className="relative">
          <select
            value={filterValue}
            onChange={(e) => onFilterChange(e.target.value)}
            className="appearance-none border border-gray-200 rounded-md px-3 py-2 pr-8 text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="">Filter</option>
            {filterOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="border border-gray-200 rounded-md pl-9 pr-3 py-2 text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-56"
          />
        </div>
      </div>

      {/* Action icons */}
      <div className="flex items-center gap-2">
        <button
          onClick={onEdit}
          disabled={!canEdit}
          title={!canEdit ? "Select exactly one item to edit" : "Edit"}
          className={`p-2 rounded-md border transition-colors ${
            canEdit
              ? "border-gray-200 text-gray-600 hover:bg-gray-100 cursor-pointer"
              : "border-gray-100 text-gray-300 cursor-not-allowed"
          }`}
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={onDelete}
          disabled={!canDelete}
          title={!canDelete ? "Select items to delete" : "Delete"}
          className={`p-2 rounded-md border transition-colors ${
            canDelete
              ? "border-gray-200 text-gray-600 hover:bg-red-50 hover:text-red-500 hover:border-red-200 cursor-pointer"
              : "border-gray-100 text-gray-300 cursor-not-allowed"
          }`}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
