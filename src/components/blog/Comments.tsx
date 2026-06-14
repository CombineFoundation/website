"use client";

import { useState } from "react";
import type { CommentData } from "@/lib/blogs";

interface CommentsProps {
  initialComments: CommentData[];
}

export default function Comments({ initialComments }: CommentsProps) {
  const [comments, setComments] = useState<CommentData[]>(initialComments);
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const wordCount = response.trim() ? response.trim().split(/\s+/).length : 0;

  const handleSubmit = () => {
    const trimmed = response.trim();
    if (!trimmed) return;
    if (wordCount < 10) {
      setError(`Minimum 10 words required (${wordCount}/10)`);
      return;
    }
    setComments((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "You",
        date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
        text: trimmed,
        avatar: "",
      },
    ]);
    setResponse("");
    setError("");
  };

  return (
    <section className="w-full px-4 py-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Comments</h2>

      <textarea
        value={response}
        onChange={(e) => {
          setResponse(e.target.value);
          if (error) setError("");
        }}
        placeholder="Write a response (minimum 10 words)"
        rows={4}
        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none resize-none focus:border-gray-300 transition-colors mb-2"
      />

      {error && <p className="text-xs text-red-500 mb-2">{error}</p>}

      <div className="flex items-center gap-3 mb-6">
        {response.trim() && (
          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-full bg-[#F0632E] text-white text-xs font-semibold hover:bg-[#d9541f] transition-colors active:scale-95"
          >
            Post Comment
          </button>
        )}
        {response.trim() && (
          <span className="text-xs text-gray-400">{wordCount}/10 words</span>
        )}
      </div>

      <div className="divide-y divide-gray-200">
        {comments.map((c) => (
          <div key={c.id} className="py-5 flex gap-3">
            <div
              className="shrink-0 rounded-full overflow-hidden bg-gray-200"
              style={{ width: 40, height: 40 }}
            >
              {c.avatar ? (
                <img
                  src={c.avatar}
                  alt={c.name}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm font-bold">
                  {c.name[0]}
                </div>
              )}
            </div>

            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900 leading-tight">{c.name}</p>
              <p className="text-xs text-gray-400 mb-2">{c.date}</p>
              <p className="text-sm text-gray-700 leading-relaxed">{c.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
