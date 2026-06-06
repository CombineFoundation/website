"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface BlogFormData {
  name: string;
  authorName: string;
  date: string;
  status: "Published" | "Draft" | "Under Review";
  description: string;
}

interface AddBlogModalProps {
  onCancel: () => void;
  onSave: (data: BlogFormData) => void;
}

export default function AddBlogModal({ onCancel, onSave }: AddBlogModalProps) {
  const [form, setForm] = useState<BlogFormData>({
    name: "",
    authorName: "",
    date: "",
    status: "Draft",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isValid =
    form.name.trim() &&
    form.authorName.trim() &&
    form.date.trim() &&
    form.description.trim();

  const handleSave = () => {
    if (!isValid) return;
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-gray-900">Add Blog</h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <p className="text-sm font-medium text-gray-700 mb-4">Information</p>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Blog Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Mental health awareness for students"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">Written By</label>
            <input
              type="text"
              name="authorName"
              value={form.authorName}
              onChange={handleChange}
              placeholder="Muhammad Shamsi"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">Published On</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
            <option value="Under Review">Under Review</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Brief description of the blog post..."
            rows={3}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-md text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!isValid}
            className={`px-5 py-2 rounded-md text-sm font-medium text-white transition-all cursor-pointer ${
              isValid
                ? "bg-gradient-to-r from-[#0f3d6b] via-[#0162c3] to-[#0f3d6b] hover:brightness-110"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
