"use client";

import { useState } from "react";
import { X } from "lucide-react";

import { uploadImage } from "@/lib/firebase-upload";
import { Loader2 } from "lucide-react";

interface AnnualReportFormData {
  title: string;
  description: string;
  image: string;
  viewUrl: string;
  downloadUrl: string;
}

interface AddAnnualReportModalProps {
  onCancel: () => void;
  onSave: (data: AnnualReportFormData) => void;
}

export default function AddAnnualReportModal({ onCancel, onSave }: AddAnnualReportModalProps) {
  const [uploadingFields, setUploadingFields] = useState<Record<string, boolean>>({});
  const [error, setError] = useState("");
  const [form, setForm] = useState<AnnualReportFormData>({
    title: "",
    description: "",
    image: "",
    viewUrl: "",
    downloadUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const field = "image";
    setUploadingFields((prev) => ({ ...prev, [field]: true }));
    setError("");
    try {
      const storageUrl = await uploadImage(file, "reports");
      setForm((prev) => ({ ...prev, [field]: storageUrl }));
    } catch (err: any) {
      console.error("Image upload error:", err);
      setError("Failed to upload image. Please try again.");
    } finally {
      setUploadingFields((prev) => ({ ...prev, [field]: false }));
    }
  };

  const isUploading = Object.values(uploadingFields).some(Boolean);

  const isValid = form.title.trim() && form.description.trim() && form.image;

  const handleSave = () => {
    if (!isValid || isUploading) return;
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-gray-900">Add Annual Report</h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Annual Report 2024"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Report description..."
            rows={4}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={isUploading}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer disabled:opacity-50"
          />
          {uploadingFields.image ? (
            <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
              <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
              <span>Uploading cover image...</span>
            </div>
          ) : form.image ? (
            <img src={form.image} alt="Preview" className="mt-2 h-32 w-auto object-cover rounded" />
          ) : null}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">View URL</label>
          <input
            type="url"
            name="viewUrl"
            value={form.viewUrl}
            onChange={handleChange}
            placeholder="https://example.com/report-2024"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">Download URL</label>
          <input
            type="url"
            name="downloadUrl"
            value={form.downloadUrl}
            onChange={handleChange}
            placeholder="https://example.com/report-2024.pdf"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
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
