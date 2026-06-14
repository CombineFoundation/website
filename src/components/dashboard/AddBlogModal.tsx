"use client";

import { useState } from "react";
import { X, Upload } from "lucide-react";

interface BlogFormData {
  name: string;
  authorName: string;
  date: string;
  status: "Published" | "Draft" | "Under Review";
  description: string;
  conclusion: string;
  heroImage1: string;
  heroImage2: string;
}

interface AddBlogModalProps {
  onCancel: () => void;
  onSave: (data: BlogFormData) => void;
}

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function AddBlogModal({ onCancel, onSave }: AddBlogModalProps) {
  const [form, setForm] = useState<BlogFormData>({
    name: "",
    authorName: "",
    date: "",
    status: "Draft",
    description: "",
    conclusion: "",
    heroImage1: "",
    heroImage2: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageUpload = async (field: "heroImage1" | "heroImage2", e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await readFileAsDataURL(file);
    setForm((prev) => ({ ...prev, [field]: dataUrl }));
  };

  const isValid =
    form.name.trim() &&
    form.authorName.trim() &&
    form.date.trim() &&
    form.description.trim() &&
    form.heroImage1.trim() &&
    form.heroImage2.trim();

  const handleSave = () => {
    if (!isValid) return;
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 p-6 max-h-[90vh] overflow-y-auto">
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

        <div className="mb-4">
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

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Conclusion</label>
          <textarea
            name="conclusion"
            value={form.conclusion}
            onChange={handleChange}
            placeholder="Summarize the key takeaways of the blog post..."
            rows={3}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        <hr className="my-5 border-gray-200" />
        <p className="text-sm font-medium text-gray-700 mb-4">Images</p>

        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">Image 1</label>
            {form.heroImage1 ? (
              <div className="relative">
                <img src={form.heroImage1} alt="Blog image 1 preview" className="w-full h-28 object-cover rounded-md border border-gray-200" />
                <button onClick={() => setForm((prev) => ({ ...prev, heroImage1: "" }))} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full">
                  <X size={14} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-28 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-400 transition-colors">
                <Upload size={18} className="text-gray-400" />
                <span className="text-xs text-gray-400 mt-1">Upload Image</span>
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload("heroImage1", e)} className="hidden" />
              </label>
            )}
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">Image 2</label>
            {form.heroImage2 ? (
              <div className="relative">
                <img src={form.heroImage2} alt="Blog image 2 preview" className="w-full h-28 object-cover rounded-md border border-gray-200" />
                <button onClick={() => setForm((prev) => ({ ...prev, heroImage2: "" }))} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full">
                  <X size={14} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-28 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-400 transition-colors">
                <Upload size={18} className="text-gray-400" />
                <span className="text-xs text-gray-400 mt-1">Upload Image</span>
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload("heroImage2", e)} className="hidden" />
              </label>
            )}
          </div>
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
