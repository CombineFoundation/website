import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Program, Application, Message } from "./collections";

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
      const docRef = await addDoc(collection(db, "programs"), prog);
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
      const docRef = await addDoc(collection(db, "applications"), app);
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
      const docRef = await addDoc(collection(db, "messages"), msg);
      console.log(`Message added with ID: ${docRef.id}`);
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
