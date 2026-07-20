"use client";

import { useState } from "react";
import { X, Upload } from "lucide-react";

import { uploadImage, uploadPDF } from "@/lib/firebase-upload";
import { Loader2 } from "lucide-react";

interface PartnerFormData {
  name: string;
  description: string;
  image: string;
  mou: string;
}

interface AddPartnerModalProps {
  onCancel: () => void;
  onSave: (data: PartnerFormData) => void;
}

export default function AddPartnerModal({ onCancel, onSave }: AddPartnerModalProps) {
  const [uploadingFields, setUploadingFields] = useState<Record<string, boolean>>({});
  const [error, setError] = useState("");
  const [form, setForm] = useState<PartnerFormData>({
    name: "",
    description: "",
    image: "",
    mou: "",
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
      const storageUrl = await uploadImage(file, "partners");
      setForm((prev) => ({ ...prev, [field]: storageUrl }));
    } catch (err: any) {
      console.error("Image upload error:", err);
      setError("Failed to upload image. Please try again.");
    } finally {
      setUploadingFields((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleMouUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const field = "mou";
    setUploadingFields((prev) => ({ ...prev, [field]: true }));
    setError("");
    try {
      const url = await uploadPDF(file, "mou");
      setForm((prev) => ({ ...prev, [field]: url }));
    } catch (err: any) {
      console.error("MOU upload error:", err);
      setError("Failed to upload MOU. Please try again.");
    } finally {
      setUploadingFields((prev) => ({ ...prev, [field]: false }));
    }
  };

  const isUploading = Object.values(uploadingFields).some(Boolean);

  const isValid = form.name.trim() && form.description.trim() && form.image.trim();

  const handleSave = () => {
    if (!isValid || isUploading) return;
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-gray-900">Add Partner</h2>
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
            placeholder="Sindh Madarasatul Islam University (SMIU)"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe the partnership..."
            rows={4}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Image</label>
          {uploadingFields.image ? (
            <div className="flex flex-col items-center justify-center h-32 w-48 border border-gray-200 rounded-lg bg-gray-50">
              <Loader2 className="w-6 h-6 text-[#134981] animate-spin" />
              <span className="text-xs text-gray-500 mt-1">Uploading...</span>
            </div>
          ) : form.image ? (
            <div className="relative inline-block">
              <img src={form.image} alt="Preview" className="h-32 w-48 object-cover rounded-lg border border-gray-200" />
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

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">MOU Document (PDF)</label>
          {uploadingFields.mou ? (
            <div className="flex flex-col items-center justify-center h-20 border border-gray-200 rounded-lg bg-gray-50">
              <Loader2 className="w-6 h-6 text-[#134981] animate-spin" />
              <span className="text-xs text-gray-500 mt-1">Uploading...</span>
            </div>
          ) : form.mou ? (
            <div className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg bg-gray-50">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-500 shrink-0"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
              <span className="text-xs text-gray-600 truncate flex-1">{form.mou.split("/").pop()}</span>
              <a href={form.mou} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs">View</a>
              <button onClick={() => setForm((prev) => ({ ...prev, mou: "" }))} className="text-red-500 hover:text-red-700 ml-1"><X size={14} /></button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-400 transition-colors">
              <Upload size={18} className="text-gray-400" />
              <span className="text-xs text-gray-400 mt-1">Upload PDF</span>
              <input type="file" accept="application/pdf" onChange={handleMouUpload} className="hidden" />
            </label>
          )}
        </div>

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
