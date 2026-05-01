import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  getDocs, 
  query, 
  where 
} from "firebase/firestore";
import { db } from "./firebase";
import { Program, Application, Message } from "@/types/database";

// Programs
export const addProgram = async (program: Omit<Program, 'id' | 'createdAt'>) => {
  return await addDoc(collection(db, "programs"), {
    ...program,
    createdAt: serverTimestamp(),
  });      
};


// Applications
export const addApplication = async (application: Omit<Application, 'id' | 'createdAt'>) => {
  return await addDoc(collection(db, "applications"), {
    ...application,
    createdAt: serverTimestamp(),
  });
};

// Messages
export const addMessage = async (message: Omit<Message, 'id' | 'createdAt'>) => {
  return await addDoc(collection(db, "messages"), {
    ...message,
    createdAt: serverTimestamp(),
  });
};

// Seed function for testing
export const seedDatabase = async () => {
  try {
    // Add a test program
    const programRef = await addProgram({
      title: "Web Development Bootcamp",
      description: "Learn Full Stack Web Development from scratch.",
      published: true,
    });
    console.log("Program added with ID: ", programRef.id);

    // Add a test application
    await addApplication({
      userId: "test-user-123",
      programId: programRef.id,
      status: "pending",
    });
    console.log("Application added");

    // Add a test message
    await addMessage({
      name: "John Doe",
      email: "john@example.com",
      message: "I am interested in your programs.",
    });
    console.log("Message added");

    return { success: true };
  } catch (error) {
    console.error("Error seeding database: ", error);
    return { success: false, error };
  }
};
