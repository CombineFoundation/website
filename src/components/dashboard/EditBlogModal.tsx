"use client";

import { useState } from "react";
import { X, Upload, Loader2 } from "lucide-react";
import { compressImage } from "@/lib/image-compress";

interface BlogFormData {
  name: string;
  authorName: string;
  date: string;
  status: "Published" | "Draft" | "Under Review";
  description: string;
  conclusion: string;
  heroImage1: string;
  heroImage2: string;
  content: string;
}

interface EditBlogModalProps {
  blog: any;
  onCancel: () => void;
  onSave: (data: BlogFormData) => Promise<void> | void;
}

function toDateInput(dateStr: string): string {
  if (!dateStr) return "";
  const parts = dateStr.split("/");
  if (parts.length === 3) {
    const [m, d, y] = parts;
    return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
  }
  return dateStr;
}

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function EditBlogModal({ blog, onCancel, onSave }: EditBlogModalProps) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<BlogFormData>({
    name: blog.name,
    authorName: blog.authorName,
    date: toDateInput(blog.date),
    status: blog.status,
    description: blog.description,
    conclusion: blog.conclusion || "",
    heroImage1: blog.heroImage1 || "",
    heroImage2: blog.heroImage2 || "",
    content: blog.content ? (Array.isArray(blog.content) ? blog.content.join("\n\n") : blog.content) : "",
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
    const compressedDataUrl = await compressImage(dataUrl);
    setForm((prev) => ({ ...prev, [field]: compressedDataUrl }));
  };

  const isValid =
    form.name.trim() &&
    form.authorName.trim() &&
    form.date.trim() &&
    form.description.trim() &&
    form.content.trim() &&
    form.heroImage1.trim() &&
    form.heroImage2.trim();

  const handleSave = async () => {
    if (!isValid) return;
    setSaving(true);
    setError("");
    try {
      await onSave(form);
    } catch (err: any) {
      console.error("Save blog error:", err);
      setError(err.message || "Failed to save blog. Ensure you are signed in and images are not too large.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-gray-900">Edit Blog</h2>
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
          <label className="block text-sm text-gray-600 mb-1">Body Content (Use blank lines to separate paragraphs)</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Write the full blog post paragraphs here..."
            rows={6}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

        {error && (
          <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-4 text-sm text-red-700 font-medium rounded-r-md">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            disabled={saving}
            className="px-5 py-2 rounded-md text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!isValid || saving}
            className={`px-5 py-2 rounded-md text-sm font-medium text-white transition-all cursor-pointer flex items-center gap-2 ${
              isValid && !saving
                ? "bg-gradient-to-r from-secondary-600 via-primary-500 to-secondary-600 hover:brightness-110"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
