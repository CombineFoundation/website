"use client";

import { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";

interface MOUFormData {
  title: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
}

interface AddMOUModalProps {
  onCancel: () => void;
  onSave: (data: MOUFormData) => void;
}

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function AddMOUModal({ onCancel, onSave }: AddMOUModalProps) {
  const [form, setForm] = useState<MOUFormData>({
    title: "",
    paragraphs: [""],
    image: "",
    imageAlt: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const dataUrl = await readFileAsDataURL(file);
      setForm((prev) => ({ ...prev, image: dataUrl }));
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

  const isValid = form.title.trim() && form.image && form.paragraphs.some((p) => p.trim());

  const handleSave = () => {
    if (!isValid) return;
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
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
          />
          {form.image && (
            <img src={form.image} alt="Preview" className="mt-2 h-32 w-auto object-cover rounded" />
          )}
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
                ? "bg-gradient-to-r from-secondary-600 via-primary-500 to-secondary-600 hover:brightness-110"
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
