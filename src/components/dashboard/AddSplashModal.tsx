"use client";

import { useState } from "react";
import { X, Upload } from "lucide-react";
import Image from "next/image";

interface SplashFormData {
  image: string;
  linkUrl: string;
  alt: string;
}

interface AddSplashModalProps {
  onCancel: () => void;
  onSave: (data: SplashFormData) => void;
}

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function AddSplashModal({ onCancel, onSave }: AddSplashModalProps) {
  const [form, setForm] = useState<SplashFormData>({
    image: "",
    linkUrl: "",
    alt: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await readFileAsDataURL(file);
    setForm((prev) => ({ ...prev, image: dataUrl }));
  };

  const isValid = form.image.trim() && form.alt.trim();

  const handleSave = () => {
    if (!isValid) return;
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-gray-900">Add Splash Banner</h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <p className="text-sm font-medium text-gray-700 mb-4">Banner Details</p>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Banner Image</label>
          {form.image ? (
            <div className="relative w-full h-40 rounded-md overflow-hidden bg-gray-100 mb-2">
              <Image
                src={form.image}
                alt="Preview"
                fill
                className="object-contain"
              />
            </div>
          ) : null}
          <label className="flex flex-col items-center justify-center h-28 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-400 transition-colors">
            <Upload size={18} className="text-gray-400" />
            <span className="text-xs text-gray-400 mt-1">
              {form.image ? "Change Image" : "Upload Image"}
            </span>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Link URL (optional)</label>
          <input
            type="text"
            name="linkUrl"
            value={form.linkUrl}
            onChange={handleChange}
            placeholder="https://example.com/event-details"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">Alt Text</label>
          <input
            type="text"
            name="alt"
            value={form.alt}
            onChange={handleChange}
            placeholder="Announcement description"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
