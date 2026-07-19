"use client";

import { useState } from "react";
import { X, Upload } from "lucide-react";

import { uploadImage } from "@/lib/firebase-upload";
import { Loader2 } from "lucide-react";

const SECTION_OPTIONS = [
  "Ambassador",
  "Youth Forum",
  "Board of Trustees",
  "Board of Members",
];

interface TeamMemberFormData {
  name: string;
  role: string;
  section: string;
  image: string;
}

interface EditTeamMemberModalProps {
  member: TeamMemberFormData & { id: string };
  onCancel: () => void;
  onSave: (data: TeamMemberFormData) => void;
}

export default function EditTeamMemberModal({ member, onCancel, onSave }: EditTeamMemberModalProps) {
  const [uploadingFields, setUploadingFields] = useState<Record<string, boolean>>({});
  const [error, setError] = useState("");
  const [form, setForm] = useState<TeamMemberFormData>({
    name: member.name,
    role: member.role,
    section: member.section,
    image: member.image,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const field = "image";
    setUploadingFields((prev) => ({ ...prev, [field]: true }));
    setError("");
    try {
      const storageUrl = await uploadImage(file, "team");
      setForm((prev) => ({ ...prev, [field]: storageUrl }));
    } catch (err: any) {
      console.error("Image upload error:", err);
      setError("Failed to upload image. Please try again.");
    } finally {
      setUploadingFields((prev) => ({ ...prev, [field]: false }));
    }
  };

  const isUploading = Object.values(uploadingFields).some(Boolean);

  const isValid = form.name.trim() && form.role.trim() && form.section.trim() && form.image.trim();

  const handleSave = () => {
    if (!isValid || isUploading) return;
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-gray-900">Edit Team Member</h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Muhammad Umar"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Role</label>
          <input
            type="text"
            name="role"
            value={form.role}
            onChange={handleChange}
            placeholder="Projects Coordinator and Innovation Lead"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Section</label>
          <select
            name="section"
            value={form.section}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
          >
            {SECTION_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Image</label>
          {uploadingFields.image ? (
            <div className="flex flex-col items-center justify-center h-32 w-32 border border-gray-200 rounded-lg bg-gray-50">
              <Loader2 className="w-6 h-6 text-[#134981] animate-spin" />
              <span className="text-xs text-gray-500 mt-1">Uploading...</span>
            </div>
          ) : form.image ? (
            <div className="relative inline-block">
              <img src={form.image} alt="Preview" className="h-32 w-32 object-cover rounded-lg border border-gray-200" />
              <button
                onClick={() => setForm((prev) => ({ ...prev, image: "" }))}
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full animate-fadeIn"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-400 transition-colors">
              <Upload size={20} className="text-gray-400" />
              <span className="text-xs text-gray-400 mt-1">Upload Image</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          )}
        </div>

        {error && (
          <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-4 text-sm text-red-700 font-medium rounded-r-md">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            disabled={isUploading}
            className="px-5 py-2 rounded-md text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!isValid || isUploading}
            className={`px-5 py-2 rounded-md text-sm font-medium text-white transition-all cursor-pointer flex items-center gap-2 ${
              isValid && !isUploading
                ? "bg-gradient-to-r from-secondary-600 via-primary-500 to-secondary-600 hover:brightness-110"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {isUploading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isUploading ? "Uploading..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
