import { getDb } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Program, Application, Message, Job } from "./collections";

export const seedDatabase = async () => {
  try {
    console.log("Starting database seeding...");

    // 1. Seed Programs
    const programs: Omit<Program, 'id'>[] = [
      {
        title: "Web Development Bootcamp",
        description: "A comprehensive guide to modern web development.",
        published: true,
        createdAt: serverTimestamp(),
      },
      {
        title: "Data Science Specialization",
        description: "Learn Python, R, and Machine Learning from scratch.",
        published: true,
        createdAt: serverTimestamp(),
      },
      {
        title: "Advanced AI Ethics",
        description: "Exploring the social implications of AI.",
        published: false,
        createdAt: serverTimestamp(),
      }
    ];

    const programIds: string[] = [];
    for (const prog of programs) {
      const docRef = await addDoc(collection(getDb(), "programs"), prog);
      programIds.push(docRef.id);
      console.log(`Program added with ID: ${docRef.id}`);
    }

    // 2. Seed Applications
    const applications: Omit<Application, 'id'>[] = [
      {
        userId: "user_001",
        programId: programIds[0],
        status: "pending",
        appliedAt: serverTimestamp(),
      },
      {
        userId: "user_002",
        programId: programIds[1],
        status: "approved",
        appliedAt: serverTimestamp(),
      }
    ];

    for (const app of applications) {
      const docRef = await addDoc(collection(getDb(), "applications"), app);
      console.log(`Application added with ID: ${docRef.id}`);
    }

    // 3. Seed Messages
    const messages: Omit<Message, 'id'>[] = [
      {
        name: "John Doe",
        email: "john@example.com",
        message: "Hello, I have a question about the bootcamp.",
        sentAt: serverTimestamp(),
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        message: "When does the next cohort start?",
        sentAt: serverTimestamp(),
      }
    ];

    for (const msg of messages) {
      const docRef = await addDoc(collection(getDb(), "messages"), msg);
      console.log(`Message added with ID: ${docRef.id}`);
    }

    // 4. Seed Jobs
    const jobs: Omit<Job, 'id'>[] = [
      {
        title: "Front-End Developer",
        department: "Technology",
        location: "Karachi (Hybrid)",
        type: "Full-time",
        description: "We are looking for a skilled Front-End Developer with React/Next.js experience to help build and maintain our digital platforms and tools.",
        requirements: [
          "Proficiency in HTML, CSS, JavaScript/TypeScript",
          "1+ years of experience with React and Next.js",
          "Familiarity with Tailwind CSS and responsive design",
          "Good communication skills and teamwork mindset"
        ],
        active: true,
        createdAt: serverTimestamp(),
      },
      {
        title: "Social Media Manager",
        department: "Marketing",
        location: "Karachi, Pakistan",
        type: "Part-time",
        description: "Help us expand our reach by managing our social media profiles, creating engaging content, and interacting with our community.",
        requirements: [
          "Experience running social media campaigns (Facebook, Instagram, LinkedIn)",
          "Strong copywriting and content creation skills in Urdu and English",
          "Basic graphic design skills (Canva/Photoshop) is a plus",
          "Passion for social work and community development"
        ],
        active: true,
        createdAt: serverTimestamp(),
      },
      {
        title: "Graphic Designer",
        department: "Design",
        location: "Remote",
        type: "Internship",
        description: "Design brochures, banner images, and social media posts for our programs.",
        requirements: [
          "Knowledge of Adobe Illustrator, Photoshop, or Canva",
          "Creative eye for branding and design layouts",
          "Ability to deliver projects within deadlines"
        ],
        active: false, // inactive job for testing
        createdAt: serverTimestamp(),
      }
    ];

    for (const job of jobs) {
      const docRef = await addDoc(collection(getDb(), "jobs"), job);
      console.log(`Job added with ID: ${docRef.id}`);
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
