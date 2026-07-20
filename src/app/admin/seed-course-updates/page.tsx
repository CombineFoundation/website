"use client";

import { useState } from "react";
import { fetchCourses, addCourse, updateCourse, type FirestoreCourse } from "@/lib/admin-actions";

const ENROLL_URL = "https://www.combinefoundationportal.com";
const INSTRUCTOR_MALIHA = "Syeda Maliha Naz";
const INSTRUCTOR_ESHA = "Esha";
const INSTRUCTOR_UMAR = "Muhammad Umar";
const INSTRUCTOR_RIDA = "Rida Fatima";

interface CourseData {
  name: string;
  instructor: string;
  price: string;
  originalPrice: number;
  status: "Ongoing" | "Completed" | "Launch";
  category: string;
  description: string;
  lessons: number;
  duration: string;
  mode: string;
  requirements: string;
  guidelineCta: string;
  enrollmentLink: string;
  guidelineFile: string;
  heroImage1: string;
  heroImage2: string;
  modules: { title: string; bullets: string[] }[];
  successStories: { studentName: string; testimonial: string; videoUrl: string }[];
}

const NEW_COURSES: CourseData[] = [
  {
    name: "Artificial Intelligence & Python Program",
    instructor: INSTRUCTOR_ESHA,
    price: "1000",
    originalPrice: 15000,
    status: "Ongoing",
    category: "Technology",
    description: "Learn Python the smart way with this complete, beginner-friendly course designed to take you from zero coding knowledge to building real-world projects. This course covers core programming concepts, data structures, problem-solving, and practical applications including automation and AI basics. Perfect for students, beginners, and anyone looking to start a career in programming.",
    lessons: 3,
    duration: "8 Hours 30 Minutes",
    mode: "",
    requirements: "Laptop + Internet Access",
    guidelineCta: "Want to Master Python? Download the Complete Course Guideline Now!",
    enrollmentLink: ENROLL_URL,
    guidelineFile: "",
    heroImage1: "",
    heroImage2: "",
    modules: [
      {
        title: "Module 1",
        bullets: [
          "Introduction to Python",
          "What is Python & Features",
          "Why Learn Python & Applications",
          "Installing Python & IDEs",
          "First Python Program",
          "Comments in Python",
          "Python Versatility & Real-world Uses",
          "Python in AI & Automation",
          "Input & Output Operations",
          "Variables and Data Types",
          "Arithmetic Operators",
          "Conditional Statements (if-else)",
          "Loops (for loop, while loop)",
          "Indentation Rules & Best Practices",
          "Beginner Python Exercises & Practice",
        ],
      },
      {
        title: "Module 2",
        bullets: [
          "Functions in Python",
          "Function Arguments & Return Values",
          "Lists, Tuples & Dictionaries",
          "Sets & Set Operations",
          "Strings & String Methods",
          "Type Casting & Dynamic Typing",
          "Control Flow & Logic Building",
          "Exception Handling (try, except, finally)",
          "File Handling Basics",
          "Introduction to Artificial Intelligence",
          "Chatbot Basics",
          "Prompt Engineering",
          "LMS AI Tools Exploration",
          "Streamlit Basics for UI Development",
          "GitHub Introduction & Deployment",
          "Practice Activities & Mini Tasks",
        ],
      },
      {
        title: "Module 3",
        bullets: [
          "Python Time Module",
          "Countdown Timer Application",
          "pyautogui Basics",
          "Automation Scripts with Python",
          "Project Planning & App Logic",
          "Logic Testing & Debugging",
          "User Interface Improvements",
          "Mini Projects & Hands-on Practice",
          "Project Showcase & Presentation",
          "GitHub Project Submission",
          "Final Practice & Revision",
          "Career Guidance & Learning Path",
        ],
      },
    ],
    successStories: [],
  },
  {
    name: "WEB DEVELOPMENT COURSE – Batch 01",
    instructor: INSTRUCTOR_MALIHA,
    price: "1000",
    originalPrice: 15000,
    status: "Completed",
    category: "Technology",
    description: "Start your journey into web development with this easy and practical course made for beginners. You will learn how to create real websites using HTML, CSS, Tailwind CSS, and JavaScript step by step. Build your own projects, design a personal portfolio, and publish your website live. This course helps you gain real skills, confidence, and a strong start for freelancing or a tech career.",
    lessons: 18,
    duration: "1.5 Month",
    mode: "",
    requirements: "Laptop + Internet Access",
    guidelineCta: "Ready to Build Websites? Download the Course Guideline",
    enrollmentLink: ENROLL_URL,
    guidelineFile: "",
    heroImage1: "",
    heroImage2: "",
    modules: [
      {
        title: "Module 1",
        bullets: [
          "Introduction to Web Development",
          "Understanding Websites (static vs dynamic, frontend vs backend)",
          "Setting Up VS Code & Development Environment",
          "Creating Your First HTML File",
          "HTML Basics (headings, paragraphs, images, links, lists)",
          "Forms, Tables & Semantic HTML",
          "Introduction to CSS (inline, internal, external)",
          "Styling with Colors, Fonts & Text Properties",
          "CSS Box Model (margin, padding, borders)",
          "Layouts using Flexbox",
          "Responsive Web Design with Media Queries",
        ],
      },
      {
        title: "Module 2",
        bullets: [
          "Tailwind CSS Basics & Utility-First Styling",
          "Converting CSS Projects into Tailwind",
          "Version Control with GitHub",
          "Uploading Projects & Managing Repositories",
          "Understanding Commits & Code Management",
          "Website Deployment using GitHub Pages & Netlify",
          "JavaScript Introduction (console, variables, data types)",
          "Conditionals & Functions (if/else, logic building)",
          "Arrays & Loops (for loop, while loop)",
        ],
      },
      {
        title: "Module 3",
        bullets: [
          "DOM Manipulation (getElementById, querySelector, innerText)",
          "Event Handling (click, hover, submit events)",
          "Building Interactive Features",
          "Mini Projects (To-Do List, Quiz App)",
          "Designing Personal Portfolio Website",
          "Structuring Pages (About, Skills, Projects, Contact)",
          "Adding Styling with Tailwind/CSS",
          "Adding Interactivity using JavaScript",
          "Testing & Optimizing for Mobile and Desktop",
          "Deploying Live Website (GitHub Pages, Netlify)",
          "Creating GitHub Portfolio Repository",
          "Freelancing Basics (Fiverr, Upwork)",
          "Building Resume & Sharing Projects on LinkedIn",
        ],
      },
    ],
    successStories: [
      {
        studentName: "Ali Sohail",
        testimonial: "Assalam o alaikum, my name is Ali Sohail. Under combine foundation I am doing a web development course. When I started this course, I only knew a few basics of computer but today I am pro at coding and all of these made possible by my teachers' mentors and sir. As they support me in every step and make me capable of doing coding. All the queries that I had, they always solved them. Today just because of them I can do coding.",
        videoUrl: "",
      },
      {
        studentName: "Eshal Subhan",
        testimonial: "Assalam o alaikum. This is me, Eshal Subhan. Today I am going to tell you guys about the experience of the course that I have learned. So, the course's name is web development. In which I have learned how to use the website, how it works and how to generate that. For this course I already knew about html and CSS. I just got to know JavaScript. It was very interesting journey it was very fun to learn. Now after learning a course I can confidently make the web pages websites many more even though I am very proud of myself that I have learned these things and thankyou to the teachers and combine foundations for this amazing course. JazakAllah.",
        videoUrl: "",
      },
    ],
  },
  {
    name: "WEB DEVELOPMENT COURSE – Batch 02",
    instructor: INSTRUCTOR_MALIHA,
    price: "1000",
    originalPrice: 15000,
    status: "Completed",
    category: "Technology",
    description: "Start your journey into web development with this easy and practical course made for beginners. You will learn how to create real websites using HTML, CSS, Tailwind CSS, and JavaScript step by step. Build your own projects, design a personal portfolio, and publish your website live. This course helps you gain real skills, confidence, and a strong start for freelancing or a tech career.",
    lessons: 18,
    duration: "1.5 Month",
    mode: "",
    requirements: "Laptop + Internet Access",
    guidelineCta: "Ready to Build Websites? Download the Course Guideline",
    enrollmentLink: ENROLL_URL,
    guidelineFile: "",
    heroImage1: "",
    heroImage2: "",
    modules: [
      {
        title: "Module 1",
        bullets: [
          "Introduction to Web Development",
          "Understanding Websites (static vs dynamic, frontend vs backend)",
          "Setting Up VS Code & Development Environment",
          "Creating Your First HTML File",
          "HTML Basics (headings, paragraphs, images, links, lists)",
          "Forms, Tables & Semantic HTML",
          "Introduction to CSS (inline, internal, external)",
          "Styling with Colors, Fonts & Text Properties",
          "CSS Box Model (margin, padding, borders)",
          "Layouts using Flexbox",
          "Responsive Web Design with Media Queries",
        ],
      },
      {
        title: "Module 2",
        bullets: [
          "Tailwind CSS Basics & Utility-First Styling",
          "Converting CSS Projects into Tailwind",
          "Version Control with GitHub",
          "Uploading Projects & Managing Repositories",
          "Understanding Commits & Code Management",
          "Website Deployment using GitHub Pages & Netlify",
          "JavaScript Introduction (console, variables, data types)",
          "Conditionals & Functions (if/else, logic building)",
          "Arrays & Loops (for loop, while loop)",
        ],
      },
      {
        title: "Module 3",
        bullets: [
          "DOM Manipulation (getElementById, querySelector, innerText)",
          "Event Handling (click, hover, submit events)",
          "Building Interactive Features",
          "Mini Projects (To-Do List, Quiz App)",
          "Designing Personal Portfolio Website",
          "Structuring Pages (About, Skills, Projects, Contact)",
          "Adding Styling with Tailwind/CSS",
          "Adding Interactivity using JavaScript",
          "Testing & Optimizing for Mobile and Desktop",
          "Deploying Live Website (GitHub Pages, Netlify)",
          "Creating GitHub Portfolio Repository",
          "Freelancing Basics (Fiverr, Upwork)",
          "Building Resume & Sharing Projects on LinkedIn",
        ],
      },
    ],
    successStories: [
      {
        studentName: "Rahib Khan",
        testimonial: "Assalamu Alaikum Sir, you taught and guided us in an excellent way, patiently clearing all our doubts and helping us fully understand each concept. You explained everything from the basics to advanced topics and also showed us how to explore further in the field. You provided us with a clear pathway for learning, which I will never forget in my life. Thank you so much for this opportunity and for helping me evolve my IT skills in the world of computers.",
        videoUrl: "",
      },
    ],
  },
];

const EXISTING_UPDATES: { nameMatch: string; updates: Partial<FirestoreCourse> & { originalPrice?: number; requirements?: string; guidelineCta?: string } }[] = [
  {
    nameMatch: "WEB DEVELOPMENT COURSE – Batch 03",
    updates: {
      status: "Ongoing",
    },
  },
  {
    nameMatch: "Quantitative Finance Course",
    updates: {
      instructor: INSTRUCTOR_RIDA,
      price: "1000",
      category: "Finance",
      duration: "1–2 Months",
      lessons: 13,
      description: "Start your journey into the world of finance and data analysis with this beginner-friendly Quantitative Finance Course. Learn the basics of analytical finance, financial data interpretation, and modern quantitative techniques used in today's financial industry. You will also get an introduction to Python in Finance and understand how technology is transforming the finance world. This course is designed to help students and professionals build practical financial and analytical skills for future career growth.",
      successStories: [
        {
          studentName: "Hussain Naqvi",
          testimonial: "My journey with the Quantitative Finance & Business Analytics Bootcamp 2025 by Combine Foundation has been very rewarding. In the very first session, I was able to build a Financial Calculator (NPV & IRR) in Python on Google Collab, which calculates values and provides investment recommendations. The hands-on approach makes learning both practical and impactful. I'm excited to continue exploring upcoming topics like Risk, Derivatives, and Portfolio Optimization.",
          videoUrl: "",
        },
      ],
    },
  },
  {
    nameMatch: "Digital Empowerment Course",
    updates: {
      instructor: INSTRUCTOR_UMAR,
      category: "Technology",
      duration: "1 Month",
      mode: "Onsite",
      description: "Step into the digital world with confidence through this beginner-friendly Digital Empowerment Course. Learn essential computer skills, digital tools, and productivity platforms that are important for education, freelancing, and everyday professional work. This course is designed for beginners who want to improve their digital knowledge, build confidence, and become comfortable using modern technology. You will also get an introduction to AI tools and learn how to communicate confidently on camera.",
      modules: [
        {
          title: "Introduction to System and Software",
          bullets: [],
        },
        {
          title: "MS Office (Word & Excel)",
          bullets: [],
        },
        {
          title: "Google Classroom Introduction",
          bullets: [],
        },
        {
          title: "Introduction to AI",
          bullets: [],
        },
        {
          title: "How to Face Camera with Confidence",
          bullets: [],
        },
      ],
    },
  },
];

export default function SeedCourseUpdatesPage() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSeed = async () => {
    setLoading(true);
    setResult(null);
    const lines: string[] = [];

    try {
      const existing = await fetchCourses();

      for (const course of NEW_COURSES) {
        const exists = existing.find((c) => c.name === course.name);
        if (exists) {
          lines.push(`${course.name}: ⏭ already exists (skipped)`);
        } else {
          await addCourse(course);
          lines.push(`${course.name}: ✅ added`);
        }
      }

      for (const { nameMatch, updates } of EXISTING_UPDATES) {
        const match = existing.find((c) => c.name === nameMatch);
        if (match) {
          await updateCourse(match.id!, updates);
          lines.push(`${nameMatch}: ✅ updated`);
        } else {
          lines.push(`${nameMatch}: ⚠ not found in Firestore`);
        }
      }

      setResult(lines.join("\n"));
    } catch (e: any) {
      setResult(`Error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Seed Course Updates</h1>
      <p className="text-sm text-gray-600 mb-2">Click to execute all updates at once.</p>

      <ul className="list-disc pl-6 mb-6 text-sm space-y-1 text-gray-700">
        <li><strong>Add:</strong> Artificial Intelligence & Python Program (Ongoing)</li>
        <li><strong>Add:</strong> WEB DEVELOPMENT COURSE – Batch 01 (Completed)</li>
        <li><strong>Add:</strong> WEB DEVELOPMENT COURSE – Batch 02 (Completed)</li>
        <li><strong>Update:</strong> Batch 03 → Ongoing</li>
        <li><strong>Update:</strong> Quantitative Finance Course (content + success story)</li>
        <li><strong>Update:</strong> Digital Empowerment Course (content)</li>
      </ul>

      <button
        onClick={handleSeed}
        disabled={loading}
        className="bg-secondary-500 text-white px-6 py-2 rounded-lg font-medium hover:brightness-90 disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Processing..." : "Execute All Updates"}
      </button>

      {result && (
        <pre className="mt-6 text-sm whitespace-pre-wrap bg-gray-100 p-4 rounded-lg font-mono">{result}</pre>
      )}
    </div>
  );
}
