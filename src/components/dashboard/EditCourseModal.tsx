"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface CourseFormData {
  name: string;
  instructor: string;
  classesTaken: number;
  classesLeft: number;
  price: string;
  status: "Ongoing" | "Completed";
}

interface EditCourseModalProps {
  course: {
    name: string;
    instructor: string;
    classesTaken: number;
    classesLeft: number;
    price: string;
    status: "Ongoing" | "Completed";
  };
  onCancel: () => void;
  onSave: (data: CourseFormData) => void;
}

export default function EditCourseModal({ course, onCancel, onSave }: EditCourseModalProps) {
  const [form, setForm] = useState<CourseFormData>({
    name: course.name,
    instructor: course.instructor,
    classesTaken: course.classesTaken,
    classesLeft: course.classesLeft,
    price: course.price,
    status: course.status,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const val = e.target.type === "number" ? Number(e.target.value) : e.target.value;
    setForm((prev) => {
      const updated = { ...prev, [e.target.name]: val };
      if (e.target.name === "classesTaken" && updated.classesTaken >= updated.classesLeft) {
        updated.status = "Completed";
      }
      return updated;
    });
  };

  const isValid =
    form.name.trim() &&
    form.instructor.trim() &&
    form.price.trim() &&
    form.classesTaken > 0 &&
    form.classesLeft > 0 &&
    form.classesTaken <= form.classesLeft;

  const handleSave = () => {
    if (!isValid) return;
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-gray-900">Edit Course</h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <p className="text-sm font-medium text-gray-700 mb-4">Information</p>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Course Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Quantum Computing Workshop"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Instructor</label>
          <input
            type="text"
            name="instructor"
            value={form.instructor}
            onChange={handleChange}
            placeholder="Ali Raza"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">Classes Taken</label>
            <input
              type="number"
              name="classesTaken"
              value={form.classesTaken || ""}
              onChange={handleChange}
              min="1"
              max={form.classesLeft}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">Total Classes</label>
            <input
              type="number"
              name="classesLeft"
              value={form.classesLeft || ""}
              onChange={(e) => {
                const total = Number(e.target.value);
                setForm((prev) => ({
                  ...prev,
                  classesLeft: total,
                  classesTaken: Math.min(prev.classesTaken, total),
                }));
              }}
              min="1"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">Price</label>
            <input
              type="text"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="40"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
            >
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
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
