import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy
} from "firebase/firestore";
import { getDb } from "./firebase";
import {
  Program,
  Application,
  Message,
  TeamMember,
  AnnualReport,
  MOU,
  Certificate
} from "@/types/database";

// Programs
export const addProgram = async (program: Omit<Program, 'id' | 'createdAt'>) => {
  return await addDoc(collection(getDb(), "programs"), {
    ...program,
    createdAt: serverTimestamp(),
  });
};


// Applications
export const addApplication = async (application: Omit<Application, 'id' | 'createdAt'>) => {
  return await addDoc(collection(getDb(), "applications"), {
    ...application,
    createdAt: serverTimestamp(),
  });
};

// Messages
export const addMessage = async (message: Omit<Message, 'id' | 'createdAt'>) => {
  return await addDoc(collection(getDb(), "messages"), {
    ...message,
    createdAt: serverTimestamp(),
  });
};

// Fetch actions with safety catch for fallback and 2-second timeout
export const fetchTeamMembers = async (): Promise<TeamMember[]> => {
  try {
    const db = getDb();
    const q = query(collection(db, "team_members"), orderBy("order", "asc"));
    const querySnapshot = await Promise.race([
      getDocs(q),
      new Promise<any>((_, reject) => setTimeout(() => reject(new Error("Timeout connecting to Firestore")), 2000))
    ]);
    const members: TeamMember[] = [];
    querySnapshot.forEach((doc) => {
      members.push({ id: doc.id, ...doc.data() } as TeamMember);
    });
    return members;
  } catch (error) {
    console.warn("Failed to fetch team members from Firestore, falling back to static data:", error);
    return [];
  }
};

export const fetchAnnualReports = async (): Promise<AnnualReport[]> => {
  try {
    const db = getDb();
    const q = query(collection(db, "annual_reports"), orderBy("order", "asc"));
    const querySnapshot = await Promise.race([
      getDocs(q),
      new Promise<any>((_, reject) => setTimeout(() => reject(new Error("Timeout connecting to Firestore")), 2000))
    ]);
    const reports: AnnualReport[] = [];
    querySnapshot.forEach((doc) => {
      reports.push({ id: doc.id, ...doc.data() } as AnnualReport);
    });
    return reports;
  } catch (error) {
    console.warn("Failed to fetch annual reports from Firestore, falling back to static data:", error);
    return [];
  }
};

export const fetchMOUs = async (): Promise<MOU[]> => {
  try {
    const db = getDb();
    const q = query(collection(db, "mous"), orderBy("order", "asc"));
    const querySnapshot = await Promise.race([
      getDocs(q),
      new Promise<any>((_, reject) => setTimeout(() => reject(new Error("Timeout connecting to Firestore")), 2000))
    ]);
    const mous: MOU[] = [];
    querySnapshot.forEach((doc) => {
      mous.push({ id: doc.id, ...doc.data() } as MOU);
    });
    return mous;
  } catch (error) {
    console.warn("Failed to fetch MOUs from Firestore, falling back to static data:", error);
    return [];
  }
};

export const fetchCertificates = async (): Promise<Certificate[]> => {
  try {
    const db = getDb();
    const q = query(collection(db, "certificates"), orderBy("order", "asc"));
    const querySnapshot = await Promise.race([
      getDocs(q),
      new Promise<any>((_, reject) => setTimeout(() => reject(new Error("Timeout connecting to Firestore")), 2000))
    ]);
    const certificates: Certificate[] = [];
    querySnapshot.forEach((doc) => {
      certificates.push({ id: doc.id, ...doc.data() } as Certificate);
    });
    return certificates;
  } catch (error) {
    console.warn("Failed to fetch certificates from Firestore, falling back to static data:", error);
    return [];
  }
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

