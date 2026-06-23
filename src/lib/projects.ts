import { collection, getDocs, query, orderBy } from "firebase/firestore/lite";
import { db } from "@/lib/firebase";
import projectsData from "@/data/projects.json";

export interface ProjectStat {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  images: string[];
  description: string;
  goal: string;
  stats: ProjectStat[];
  beforeImage: string;
  afterImage: string;
  futurePlans: string;
  partners: string[];
  location: string;
  coordinates: string;
}

export async function getAllProjects(): Promise<Project[]> {
  if (!db) {
    // Fallback if Firebase not initialized
    return (projectsData as any[]).map((p) => ({ ...p, id: String(p.id) })) as Project[];
  }
  try {
    const snap = await getDocs(
      query(collection(db, "projects"), orderBy("createdAt", "desc"))
    );
    if (snap.empty) {
      // Fallback if Firestore is empty
      return (projectsData as any[]).map((p) => ({ ...p, id: String(p.id) })) as Project[];
    }
    return snap.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
      } as Project;
    });
  } catch (error) {
    console.error("Error fetching projects from Firebase:", error);
    return (projectsData as any[]).map((p) => ({ ...p, id: String(p.id) })) as Project[];
  }
}
