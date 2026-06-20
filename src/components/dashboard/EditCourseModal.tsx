"use client";

import { useState } from "react";
import { X, Upload, Plus, Trash2, GripVertical } from "lucide-react";

interface CourseModule {
  title: string;
  bullets: string[];
}

interface SuccessStory {
  studentName: string;
  testimonial: string;
  videoUrl: string;
}

interface CourseFormData {
  name: string;
  instructor: string;
  price: string;
  originalPrice: number;
  status: "Ongoing" | "Completed" | "Launch";
  description: string;
  heroImage1: string;
  heroImage2: string;
  lessons: number;
  duration: string;
  requirements: string;
  guidelineCta: string;
  mode?: string;
  enrollmentLink: string;
  guidelineFile: string;
  modules: CourseModule[];
  successStories: SuccessStory[];
}

interface EditCourseModalProps {
  course: CourseFormData & { id: string };
  onCancel: () => void;
  onSave: (data: CourseFormData) => void;
}

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function EditCourseModal({ course, onCancel, onSave }: EditCourseModalProps) {
  const [form, setForm] = useState<CourseFormData>({
    name: course.name,
    instructor: course.instructor,
    price: course.price,
    originalPrice: (course as any).originalPrice || 0,
    status: course.status,
    description: course.description || "",
    heroImage1: course.heroImage1 || "",
    heroImage2: course.heroImage2 || "",
    lessons: course.lessons || 0,
    duration: course.duration || "",
    requirements: (course as any).requirements || "",
    guidelineCta: (course as any).guidelineCta || "",
    mode: (course as any).mode || "",
    enrollmentLink: course.enrollmentLink || "",
    guidelineFile: course.guidelineFile || "",
    modules: course.modules?.length > 0 ? course.modules : [
      { title: "", bullets: [""] },
      { title: "", bullets: [""] },
      { title: "", bullets: [""] },
    ],
    successStories: course.successStories || [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const val = e.target.type === "number" ? Number(e.target.value) : e.target.value;
    setForm((prev) => ({ ...prev, [e.target.name]: val }));
  };

  const handleImageUpload = async (field: "heroImage1" | "heroImage2", e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await readFileAsDataURL(file);
    setForm((prev) => ({ ...prev, [field]: dataUrl }));
  };

  const handleGuidelineUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type === "application/pdf" || file.type.startsWith("image/")) {
      const dataUrl = await readFileAsDataURL(file);
      setForm((prev) => ({ ...prev, guidelineFile: dataUrl }));
    }
  };

  const handleModuleChange = (index: number, field: "title" | "bullets", value: string) => {
    setForm((prev) => {
      const modules = [...prev.modules];
      if (field === "bullets") {
        modules[index] = { ...modules[index], bullets: value.split("\n") };
      } else {
        modules[index] = { ...modules[index], [field]: value };
      }
      return { ...prev, modules };
    });
  };

  const addModules = () => {
    setForm((prev) => ({
      ...prev,
      modules: [...prev.modules, { title: "", bullets: [""] }, { title: "", bullets: [""] }, { title: "", bullets: [""] }],
    }));
  };

  const removeModule = (index: number) => {
    setForm((prev) => ({
      ...prev,
      modules: prev.modules.filter((_, i) => i !== index),
    }));
  };

  const handleStoryChange = (index: number, field: "studentName" | "testimonial" | "videoUrl", value: string) => {
    setForm((prev) => {
      const stories = [...prev.successStories];
      stories[index] = { ...stories[index], [field]: value };
      return { ...prev, successStories: stories };
    });
  };

  const addStory = () => {
    setForm((prev) => ({
      ...prev,
      successStories: [...prev.successStories, { studentName: "", testimonial: "", videoUrl: "" }],
    }));
  };

  const removeStory = (index: number) => {
    setForm((prev) => ({
      ...prev,
      successStories: prev.successStories.filter((_, i) => i !== index),
    }));
  };

  const isValid =
    form.name.trim() &&
    form.instructor.trim() &&
    form.price.trim() &&
    form.originalPrice > 0 &&
    form.description.trim() &&
    form.lessons > 0 &&
    form.duration.trim() &&
    form.requirements.trim() &&
    form.guidelineCta.trim() &&
    form.enrollmentLink.trim() &&
    form.heroImage1.trim() &&
    form.heroImage2.trim() &&
    form.guidelineFile.trim() &&
    form.modules.length > 0 &&
    form.modules.every(m => m.title.trim() && m.bullets.some(b => b.trim()));

  const handleSave = () => {
    if (!isValid) return;
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-gray-900">Edit Course</h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <p className="text-sm font-medium text-gray-700 mb-4">Basic Information</p>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Course Title</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Quantitative Finance Course"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="A practical introduction to the course..."
            rows={3}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        <div className="flex gap-4 mb-4">
          <div className="flex-1">
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
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">Duration</label>
            <input
              type="text"
              name="duration"
              value={form.duration}
              onChange={handleChange}
              placeholder="8 weeks"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">Lessons</label>
            <input
              type="number"
              name="lessons"
              value={form.lessons || ""}
              onChange={handleChange}
              placeholder="16"
              min="1"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
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
            <label className="block text-sm text-gray-600 mb-1">Original Price</label>
            <input
              type="number"
              name="originalPrice"
              value={form.originalPrice || ""}
              onChange={handleChange}
              placeholder="15000"
              min="0"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex gap-4 mb-4">
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
              <option value="Launch">Launch</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">Enrollment Link</label>
            <input
              type="url"
              name="enrollmentLink"
              value={form.enrollmentLink}
              onChange={handleChange}
              placeholder="https://example.com/enroll"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">Requirements</label>
            <input
              type="text"
              name="requirements"
              value={form.requirements}
              onChange={handleChange}
              placeholder="Laptop + Internet Access"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">Mode</label>
            <input
              type="text"
              name="mode"
              value={form.mode}
              onChange={handleChange}
              placeholder="e.g. Onsite, Online"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Guideline CTA</label>
          <input
            type="text"
            name="guidelineCta"
            value={form.guidelineCta}
            onChange={handleChange}
            placeholder="Want to Master This Course? Download the Complete Course Guideline Now!"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <hr className="my-5 border-gray-200" />
        <p className="text-sm font-medium text-gray-700 mb-4">Hero Images</p>

        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">Hero Image 1</label>
            {form.heroImage1 ? (
              <div className="relative">
                <img src={form.heroImage1} alt="Hero 1 preview" className="w-full h-32 object-cover rounded-md border border-gray-200" />
                <button onClick={() => setForm((prev) => ({ ...prev, heroImage1: "" }))} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full">
                  <X size={14} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-400 transition-colors">
                <Upload size={20} className="text-gray-400" />
                <span className="text-xs text-gray-400 mt-1">Upload Image</span>
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload("heroImage1", e)} className="hidden" />
              </label>
            )}
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">Hero Image 2</label>
            {form.heroImage2 ? (
              <div className="relative">
                <img src={form.heroImage2} alt="Hero 2 preview" className="w-full h-32 object-cover rounded-md border border-gray-200" />
                <button onClick={() => setForm((prev) => ({ ...prev, heroImage2: "" }))} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full">
                  <X size={14} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-400 transition-colors">
                <Upload size={20} className="text-gray-400" />
                <span className="text-xs text-gray-400 mt-1">Upload Image</span>
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload("heroImage2", e)} className="hidden" />
              </label>
            )}
          </div>
        </div>

        <hr className="my-5 border-gray-200" />
        <p className="text-sm font-medium text-gray-700 mb-4">Course Guideline</p>

        <div className="mb-6">
          {form.guidelineFile ? (
            <div className="relative flex items-center gap-2 p-3 bg-gray-50 rounded-md border border-gray-200">
              <span className="text-sm text-gray-700 truncate flex-1">{form.guidelineFile.startsWith("data:application/pdf") ? "Guideline PDF" : "Guideline Image"}</span>
              <button onClick={() => setForm((prev) => ({ ...prev, guidelineFile: "" }))} className="text-red-500 hover:text-red-700">
                <X size={16} />
              </button>
            </div>
          ) : (
            <label className="flex items-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-400 transition-colors">
              <Upload size={18} className="text-gray-400" />
              <span className="text-sm text-gray-500">Upload Course Guideline (PDF or Image)</span>
              <input type="file" accept="image/*,application/pdf" onChange={handleGuidelineUpload} className="hidden" />
            </label>
          )}
        </div>

        <hr className="my-5 border-gray-200" />
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-medium text-gray-700">Course Modules</p>
          <button
            onClick={addModules}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
          >
            <Plus size={16} /> Add 3 More
          </button>
        </div>

        {form.modules.map((mod, i) => (
          <div key={i} className="mb-3 p-3 bg-gray-50 rounded-md border border-gray-100 relative">
            <div className="flex items-center gap-2 mb-2">
              <GripVertical size={16} className="text-gray-400 shrink-0" />
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Module {i + 1}</span>
              {form.modules.length > 3 && (
                <button onClick={() => removeModule(i)} className="ml-auto text-red-400 hover:text-red-600 cursor-pointer">
                  <Trash2 size={14} />
                </button>
              )}
            </div>
            <input
              type="text"
              value={mod.title}
              onChange={(e) => handleModuleChange(i, "title", e.target.value)}
              placeholder="Module title e.g. Foundations of Finance"
              className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
            />
            <textarea
              value={mod.bullets.join("\n")}
              onChange={(e) => handleModuleChange(i, "bullets", e.target.value)}
              placeholder={"Key point 1\nKey point 2\nKey point 3"}
              rows={4}
              className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>
        ))}

        <hr className="my-5 border-gray-200" />
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-medium text-gray-700">Success Stories <span className="text-gray-400 font-normal">(optional)</span></p>
          <button
            onClick={addStory}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
          >
            <Plus size={16} /> Add Story
          </button>
        </div>

        {form.successStories.length === 0 && (
          <p className="text-xs text-gray-400 mb-4">No success stories added yet. If added, they will appear on the course page.</p>
        )}

        {form.successStories.map((story, i) => (
          <div key={i} className="mb-3 p-3 bg-gray-50 rounded-md border border-gray-100 relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Story {i + 1}</span>
              <button onClick={() => removeStory(i)} className="text-red-400 hover:text-red-600 cursor-pointer">
                <Trash2 size={14} />
              </button>
            </div>
            <input
              type="text"
              value={story.studentName}
              onChange={(e) => handleStoryChange(i, "studentName", e.target.value)}
              placeholder="Student Name"
              className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
            />
            <textarea
              value={story.testimonial}
              onChange={(e) => handleStoryChange(i, "testimonial", e.target.value)}
              placeholder="What the student says about this course..."
              rows={2}
              className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none mb-2"
            />
            <input
              type="text"
              value={story.videoUrl}
              onChange={(e) => handleStoryChange(i, "videoUrl", e.target.value)}
              placeholder="Instagram/YouTube embed URL"
              className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        ))}

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
