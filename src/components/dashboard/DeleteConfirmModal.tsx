"use client";

import { X } from "lucide-react";

interface DeleteConfirmModalProps {
  count: number;
  label?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmModal({ count, label = "item", onCancel, onConfirm }: DeleteConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-4 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Delete {label}{count > 1 ? "s" : ""}</h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to delete {count} {label}{count > 1 ? "s" : ""}? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-md text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
