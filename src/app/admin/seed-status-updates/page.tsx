"use client";

import { useState } from "react";
import { fetchCourses, updateCourse, addCourse } from "@/lib/admin-actions";

const PYTHON_BATCH_2 = {
  name: "Python & AI Chatbot Course — Batch 2",
  instructor: "Esha Shakeel",
  price: "1000",
  originalPrice: 15000,
  status: "Launch",
  category: "Technology",
  description:
    "Take your Python skills to the next level! This course builds on the fundamentals and focuses on building real AI chatbots using Python, Streamlit, and modern AI APIs. You will learn conversational AI, chatbot deployment, and practical automation. Perfect for students who have completed Batch 1 or have basic Python knowledge.",
  lessons: 4,
  duration: "6 Weeks",
  mode: "",
  requirements: "Laptop + Internet Access + Basic Python Knowledge",
  guidelineCta: "",
  enrollmentLink: "",
  guidelineFile: "",
  heroImage1: "",
  heroImage2: "",
  modules: [
    {
      title: "Module 1: Python Refresher & Advanced Concepts",
      bullets: [
        "Quick Python fundamentals recap",
        "Functions, lambda & list comprehensions",
        "Working with APIs in Python (requests library)",
        "JSON parsing & data handling",
        "Environment variables & .env files",
        "Error handling & debugging techniques",
      ],
    },
    {
      title: "Module 2: Introduction to AI & Chatbots",
      bullets: [
        "What are chatbots & how they work",
        "Rule-based vs AI-powered chatbots",
        "Introduction to OpenAI API & Gemini API",
        "Building your first AI chatbot in Python",
        "Prompt engineering for chatbot responses",
        "Handling conversation context & memory",
      ],
    },
    {
      title: "Module 3: Building Chatbot UI with Streamlit",
      bullets: [
        "Streamlit basics: layout & components",
        "Building a chat interface with Streamlit",
        "Session state & conversation history",
        "Adding typing indicators & message styling",
        "Deploying Streamlit apps to Streamlit Cloud",
      ],
    },
    {
      title: "Module 4: Automation & Final Project",
      bullets: [
        "Automating repetitive tasks with Python",
        "Building a custom automation bot",
        "Final project: AI Chatbot for a real use case",
        "Project presentation & code review",
        "Career guidance: next steps in AI & automation",
      ],
    },
  ],
  successStories: [],
};

const DIGITAL_EMP_BULLETS = {
  modules: [
    {
      title: "Introduction to System and Software",
      bullets: [
        "Understanding computer hardware & software",
        "Operating system basics (Windows)",
        "File management & organization",
        "Installing & uninstalling programs",
        "Keyboard shortcuts & productivity tips",
      ],
    },
    {
      title: "MS Office (Word & Excel)",
      bullets: [
        "Creating & formatting documents in Word",
        "Tables, images & layout in Word",
        "Excel basics: cells, formulas & functions",
        "Data sorting, filtering & charts",
        "Practical exercises & real-world tasks",
      ],
    },
    {
      title: "Google Classroom Introduction",
      bullets: [
        "Setting up a Google account",
        "Navigating Google Classroom interface",
        "Joining classes & submitting assignments",
        "Using Google Drive for file storage",
        "Collaborating with Google Docs & Sheets",
      ],
    },
    {
      title: "Introduction to AI",
      bullets: [
        "What is Artificial Intelligence?",
        "Everyday AI applications",
        "Introduction to AI chatbots (ChatGPT, Gemini)",
        "Using AI tools for learning & productivity",
        "Ethical considerations & responsible AI use",
      ],
    },
    {
      title: "How to Face Camera with Confidence",
      bullets: [
        "Overcoming camera fear & building confidence",
        "Lighting, framing & background setup",
        "Speaking clearly & engaging your audience",
        "Body language & eye contact techniques",
        "Practice exercises & self-recording tips",
      ],
    },
  ],
};

export default function SeedStatusUpdatesPage() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSeed = async () => {
    setLoading(true);
    setResult(null);
    const lines: string[] = [];

    try {
      const courses = await fetchCourses();

      // 1. Update AI & Python Program → Completed
      const aiPython = courses.find(
        (c) => c.name === "Artificial Intelligence & Python Program"
      );
      if (aiPython) {
        await updateCourse(aiPython.id!, { status: "Completed" });
        lines.push("Artificial Intelligence & Python Program → ✅ Completed");
      } else {
        lines.push("Artificial Intelligence & Python Program → ❌ not found");
      }

      // 2. Update Digital Empowerment with bullet content
      const digitalEmp = courses.find(
        (c) => c.name === "Digital Empowerment Course"
      );
      if (digitalEmp) {
        await updateCourse(digitalEmp.id!, DIGITAL_EMP_BULLETS);
        lines.push("Digital Empowerment Course → ✅ bullets added");
      } else {
        lines.push("Digital Empowerment Course → ❌ not found");
      }

      // 3. Create Python & AI Chatbot Course — Batch 2 (skip if exists)
      const existingBatch2 = courses.find(
        (c) => c.name === "Python & AI Chatbot Course — Batch 2"
      );
      if (existingBatch2) {
        await updateCourse(existingBatch2.id!, { status: "Launch" });
        lines.push("Python & AI Chatbot Course — Batch 2 → ✅ already exists, status set to Launch");
      } else {
        const id = await addCourse(PYTHON_BATCH_2 as any);
        lines.push(`Python & AI Chatbot Course — Batch 2 → ✅ created (${id}) with status Launch`);
      }

      // 4. Quantitative Finance: rename current to Batch 3, create Batch 2 & Batch 1 (all Completed)
      const qfCourse = courses.find(
        (c) => c.name === "Quantitative Finance Course"
      );
      if (qfCourse) {
        // Rename current → Batch 3, set Completed
        await updateCourse(qfCourse.id!, { name: "Quantitative Finance Course — Batch 3", status: "Completed" });
        lines.push("Quantitative Finance Course → ✅ renamed to Batch 3 & set Completed");

        // Build base data for new batches from existing course (exclude id/createdAt)
        const { id: _id, createdAt: _ca, name: _name, ...baseData } = qfCourse;

        // Batch 2
        const b2 = courses.find((c) => c.name === "Quantitative Finance Course — Batch 2");
        if (b2) {
          await updateCourse(b2.id!, { status: "Completed" });
          lines.push("Quantitative Finance Course — Batch 2 → ✅ already exists, status set to Completed");
        } else {
          const id2 = await addCourse({ ...baseData, name: "Quantitative Finance Course — Batch 2", status: "Completed" } as any);
          lines.push(`Quantitative Finance Course — Batch 2 → ✅ created (${id2}) with status Completed`);
        }

        // Batch 1
        const b1 = courses.find((c) => c.name === "Quantitative Finance Course — Batch 1");
        if (b1) {
          await updateCourse(b1.id!, { status: "Completed" });
          lines.push("Quantitative Finance Course — Batch 1 → ✅ already exists, status set to Completed");
        } else {
          const id1 = await addCourse({ ...baseData, name: "Quantitative Finance Course — Batch 1", status: "Completed" } as any);
          lines.push(`Quantitative Finance Course — Batch 1 → ✅ created (${id1}) with status Completed`);
        }
      } else {
        lines.push("Quantitative Finance Course → ❌ not found");
      }

      if (lines.length === 0) {
        setResult("No operations performed.");
      } else {
        setResult(lines.join("\n"));
      }
    } catch (e: any) {
      setResult(`Error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Seed Status Updates</h1>
      <p className="text-sm text-gray-600 mb-6">Performs course status and content updates:</p>
      <ul className="list-disc pl-6 mb-6 text-sm space-y-1">
        <li><strong>Update:</strong> Artificial Intelligence & Python Program → Completed</li>
        <li><strong>Update:</strong> Digital Empowerment Course → add bullet content</li>
        <li><strong>Create/Update:</strong> Python & AI Chatbot Course — Batch 2 → Launch</li>
        <li><strong>Rename:</strong> Quantitative Finance Course → Batch 3 (Completed)</li>
        <li><strong>Create/Update:</strong> Quantitative Finance Batch 2 & Batch 1 → Completed</li>
      </ul>

      <button
        onClick={handleSeed}
        disabled={loading}
        className="bg-secondary-500 text-white px-6 py-2 rounded-lg font-medium hover:brightness-90 disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Processing..." : "Execute Updates"}
      </button>

      {result && (
        <pre className="mt-6 text-sm whitespace-pre-wrap bg-gray-100 p-4 rounded-lg">{result}</pre>
      )}
    </div>
  );
}
