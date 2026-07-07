"use client";

import { useState } from "react";
import { X, Upload } from "lucide-react";

interface PartnerFormData {
  name: string;
  description: string;
  image: string;
}

interface AddPartnerModalProps {
  onCancel: () => void;
  onSave: (data: PartnerFormData) => void;
}

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function AddPartnerModal({ onCancel, onSave }: AddPartnerModalProps) {
  const [form, setForm] = useState<PartnerFormData>({
    name: "",
    description: "",
    image: "",
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

  const isValid = form.name.trim() && form.description.trim();

  const handleSave = () => {
    if (!isValid) return;
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
          {form.image ? (
            <div className="relative inline-block">
              <img src={form.image} alt="Preview" className="h-32 w-48 object-cover rounded-lg border border-gray-200" />
              <button
                onClick={() => setForm((prev) => ({ ...prev, image: "" }))}
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
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

        <div className="flex justify-end gap-3 mt-6">
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
