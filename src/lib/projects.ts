import { collection, getDocs, query, orderBy } from "firebase/firestore/lite";
import { db } from "@/lib/firebase";

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

let cachedProjects: Project[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 30000;

export async function getAllProjects(): Promise<Project[]> {
  const now = Date.now();
  if (cachedProjects && (now - cacheTimestamp < CACHE_TTL)) {
    return cachedProjects;
  }

  const fetchAndCache = async (): Promise<Project[]> => {
    if (!db) {
      return [];
    }
    try {
      const snap = await getDocs(
        query(collection(db, "projects"), orderBy("createdAt", "desc"))
      );
      if (snap.empty) {
        return [];
      }
      return snap.docs.map((doc) => {
        const data = doc.data();
        const { createdAt, ...rest } = data;
        return {
          id: doc.id,
          ...rest,
        } as Project;
      });
    } catch (error) {
      console.error("Error fetching projects from Firebase:", error);
      return [];
    }
  };

  const data = await fetchAndCache();
  cachedProjects = data;
  cacheTimestamp = Date.now();
  return data;
}
