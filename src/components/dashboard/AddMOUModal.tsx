"use client";

import { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";

import { uploadImage, uploadPDF } from "@/lib/firebase-upload";
import { Loader2 } from "lucide-react";

interface MOUFormData {
  title: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
  pdf: string;
}

interface AddMOUModalProps {
  onCancel: () => void;
  onSave: (data: MOUFormData) => void;
}

export default function AddMOUModal({ onCancel, onSave }: AddMOUModalProps) {
  const [uploadingFields, setUploadingFields] = useState<Record<string, boolean>>({});
  const [error, setError] = useState("");
  const [form, setForm] = useState<MOUFormData>({
    title: "",
    paragraphs: [""],
    image: "",
    imageAlt: "",
    pdf: "",
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
      const storageUrl = await uploadImage(file, "mous");
      setForm((prev) => ({ ...prev, [field]: storageUrl }));
    } catch (err: any) {
      console.error("Image upload error:", err);
      setError("Failed to upload image. Please try again.");
    } finally {
      setUploadingFields((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const field = "pdf";
    setUploadingFields((prev) => ({ ...prev, [field]: true }));
    setError("");
    try {
      const url = await uploadPDF(file, "mou");
      setForm((prev) => ({ ...prev, [field]: url }));
    } catch (err: any) {
      console.error("PDF upload error:", err);
      setError("Failed to upload PDF. Please try again.");
    } finally {
      setUploadingFields((prev) => ({ ...prev, [field]: false }));
    }
  };

  const addParagraph = () => {
    setForm((prev) => ({ ...prev, paragraphs: [...prev.paragraphs, ""] }));
  };

  const removeParagraph = (idx: number) => {
    setForm((prev) => ({
      ...prev,
      paragraphs: prev.paragraphs.filter((_, i) => i !== idx),
    }));
  };

  const updateParagraph = (idx: number, value: string) => {
    setForm((prev) => {
      const updated = [...prev.paragraphs];
      updated[idx] = value;
      return { ...prev, paragraphs: updated };
    });
  };

  const isUploading = Object.values(uploadingFields).some(Boolean);

  const isValid = form.title.trim() && form.image && form.paragraphs.some((p) => p.trim());

  const handleSave = () => {
    if (!isValid || isUploading) return;
    onSave({ ...form, paragraphs: form.paragraphs.filter((p) => p.trim()) });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-gray-900">Add MOU</h2>
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
            placeholder="Foundation X Partner MOU"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Image</label>
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
              <span>Uploading image...</span>
            </div>
          ) : form.image ? (
            <img src={form.image} alt="Preview" className="mt-2 h-32 w-auto object-cover rounded" />
          ) : null}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Image Alt Text</label>
          <input
            type="text"
            name="imageAlt"
            value={form.imageAlt}
            onChange={handleChange}
            placeholder="MOU signing ceremony"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">MOU Document (PDF)</label>
          {uploadingFields.pdf ? (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
              <span>Uploading PDF...</span>
            </div>
          ) : form.pdf ? (
            <div className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg bg-gray-50">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-500 shrink-0"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
              <span className="text-xs text-gray-600 truncate flex-1">{form.pdf.split("/").pop()}</span>
              <a href={form.pdf} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs">View</a>
              <button onClick={() => setForm((prev) => ({ ...prev, pdf: "" }))} className="text-red-500 hover:text-red-700 ml-1"><X size={14} /></button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-400 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              <span className="text-xs text-gray-400 mt-1">Upload PDF</span>
              <input type="file" accept="application/pdf" onChange={handlePdfUpload} className="hidden" />
            </label>
          )}
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm text-gray-600">Paragraphs</label>
            <button
              onClick={addParagraph}
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              <Plus size={14} /> Add Paragraph
            </button>
          </div>
          {form.paragraphs.map((para, idx) => (
            <div key={idx} className="flex items-start gap-2 mb-2">
              <textarea
                value={para}
                onChange={(e) => updateParagraph(idx, e.target.value)}
                placeholder={`Paragraph ${idx + 1}`}
                rows={3}
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              {form.paragraphs.length > 1 && (
                <button
                  onClick={() => removeParagraph(idx)}
                  className="mt-1 text-red-400 hover:text-red-600 cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
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
