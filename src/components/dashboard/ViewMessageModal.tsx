"use client";

import { X } from "lucide-react";

interface ViewMessageModalProps {
  contact: {
    name: string;
    email: string;
    timestamp: string;
    subject: string;
    message: string;
  };
  onClose: () => void;
}

export default function ViewMessageModal({ contact, onClose }: ViewMessageModalProps) {
  const formatTimestamp = (ts: string) => {
    const parts = ts.split(":");
    if (parts.length === 2) {
      const [datePart, time] = parts;
      return `${datePart} at ${time.slice(0, 2)}:${time.slice(2)}`;
    }
    return ts;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-gray-900">Message</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-500 mb-0.5">Name</label>
              <p className="text-sm text-gray-900">{contact.name}</p>
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-500 mb-0.5">Email</label>
              <p className="text-sm text-gray-900">{contact.email}</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-0.5">Date & Time</label>
            <p className="text-sm text-gray-900">{formatTimestamp(contact.timestamp)}</p>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-0.5">Subject</label>
            <p className="text-sm text-gray-900">{contact.subject}</p>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-0.5">Message</label>
            <p className="text-sm text-gray-700 bg-gray-50 rounded-md p-3 leading-relaxed whitespace-pre-wrap">
              {contact.message}
            </p>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-[#0f3d6b] via-[#0162c3] to-[#0f3d6b] hover:brightness-110 transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
