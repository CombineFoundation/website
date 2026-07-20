"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";

interface EventFormData {
  name: string;
  description: string;
  location: string;
  date: string;
  registrationLink: string;
  post: string;
  bulletPoints: string;
  endTime: string;
}

interface AddEventModalProps {
  onCancel: () => void;
  onSave: (data: EventFormData) => Promise<void> | void;
}

export default function AddEventModal({ onCancel, onSave }: AddEventModalProps) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [isTBA, setIsTBA] = useState(false);
  const [form, setForm] = useState<EventFormData>({
    name: "",
    description: "",
    location: "",
    date: "",
    registrationLink: "",
    post: "",
    bulletPoints: "",
    endTime: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isValid =
    form.name.trim() &&
    form.description.trim() &&
    form.location.trim() &&
    (isTBA || form.date.trim()) &&
    form.registrationLink.trim();

  const handleSave = async () => {
    if (!isValid) return;
    setSaving(true);
    setError("");
    try {
      await onSave({
        ...form,
        date: isTBA ? "To be announced" : form.date,
      });
    } catch (err: any) {
      console.error("Save event error:", err);
      setError(err.message || "Failed to save event. Ensure you are signed in.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-gray-900">Add Event</h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <p className="text-sm font-medium text-gray-700 mb-4">Information</p>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Event Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Hammad Foundation..."
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Event Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="This event was hosted by ..."
            rows={4}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Event location"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Date</label>
          <input
            type="datetime-local"
            name="date"
            value={isTBA ? "" : form.date}
            onChange={handleChange}
            disabled={isTBA}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <label className="flex items-center gap-2 mt-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isTBA}
              onChange={(e) => {
                setIsTBA(e.target.checked);
                if (e.target.checked) {
                  setForm((prev) => ({ ...prev, date: "" }));
                }
              }}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <span className="text-xs text-gray-600 font-medium">To be announced (TBA)</span>
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Registration Link</label>
          <input
            type="url"
            name="registrationLink"
            value={form.registrationLink}
            onChange={handleChange}
            placeholder="https://example.com/register"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Post URL (optional — for completed events)</label>
          <input
            type="url"
            name="post"
            value={form.post}
            onChange={handleChange}
            placeholder="https://example.com/event-recap"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">End Time (Optional)</label>
          <input
            type="text"
            name="endTime"
            value={form.endTime}
            onChange={handleChange}
            placeholder="e.g. 6:00 PM or to be announced"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">Highlights/Bullet Points (One per line)</label>
          <textarea
            name="bulletPoints"
            value={form.bulletPoints}
            onChange={handleChange}
            placeholder="Highlight 1&#10;Highlight 2&#10;Highlight 3"
            rows={4}
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
