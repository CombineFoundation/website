import { getDb } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore/lite";
import coursesData from "@/data/courses.json";

export interface CourseDocument {
  name: string;
  instructor: string;
  price: string;
  originalPrice: number;
  status: string;
  description: string;
  heroImage1: string;
  heroImage2: string;
  lessons: number;
  duration: string;
  requirements: string;
  guidelineCta: string;
  mode?: string;
  enrollmentLink: string;
  guidelineFile: string;
  modules: { title: string; bullets: string[] }[];
  successStories: { studentName: string; testimonial: string; videoUrl: string }[];
  createdAt: any;
}

export const seedCourses = async () => {
  try {
    console.log("Starting course seeding...");

    const courses: CourseDocument[] = coursesData.map((c) => ({
      ...c,
      createdAt: serverTimestamp(),
    }));

    const ids: string[] = [];
    for (const course of courses) {
      const docRef = await addDoc(collection(getDb(), "courses"), course);
      ids.push(docRef.id);
      console.log(`Course "${course.name}" added with ID: ${docRef.id}`);
    }

    console.log(`Successfully seeded ${ids.length} courses.`);
    return { success: true, count: ids.length };
  } catch (error) {
    console.error("Error seeding courses:", error);
    return { success: false, error };
  }
};
