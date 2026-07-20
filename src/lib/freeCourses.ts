import { collection, getDocs, query, where, limit } from "firebase/firestore/lite";
import { db } from "@/lib/firebase";

export interface Module {
  id?: number;
  title: string;
  bullets: string[];
}

export interface SuccessStory {
  studentName: string;
  testimonial: string;
  videoUrl: string;
}

export interface Course {
  id: string;
  name?: string;
  title: string;
  slug: string;
  category?: string;
  bullets: string[];
  description: string;
  duration: string;
  lessons: number;
  price: number | string;
  originalPrice: number | string;
  image: string;
  imageBack: string;
  heroImage1?: string;
  heroImage2?: string;
  mode?: string;
  requirements?: string;
  guidelineCta?: string;
  guidelineFile?: string;
  status?: string;
  successStories?: any[];
  modules: Module[];
  instructor?: string;
  enrollmentLink?: string;
}

export async function getAllCourses(): Promise<Course[]> {
  if (!db) return [];
  try {
    const snap = await getDocs(collection(db, "courses"));
    return snap.docs.map(doc => {
      const d = doc.data();
      return {
        id: doc.id,
        title: d.name || d.title || "",
        slug: d.slug || doc.id,
        category: d.category || "",
        bullets: d.modules?.[0]?.bullets || [], // fallback to first module's bullets if not present at root
        description: d.description || "",
        duration: d.duration || "",
        level: d.level || "Beginner",
        lessons: Number(d.lessons) || 0,
        price: d.price || 0,
        originalPrice: d.originalPrice || d.price || 0,
        image: d.heroImage1 || d.image || "",
        imageBack: d.heroImage2 || d.imageBack || "",
        status: d.status || "",
        modules: d.modules || [],
        instructor: d.instructor || "",
        enrollmentLink: d.enrollmentLink || "",
      } as Course;
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
}

export async function getCourseBySlug(slug: string): Promise<Course | undefined> {
  const courses = await getAllCourses();
  // slug might be in firestore as 'slug' or we match from generated slug, but admin dashboard doesn't have slug field.
  // Actually, wait, Admin dashboard seed generated slugs from JSON? Yes, JSON had slugs. 
  // Wait, if a new course is added from Admin Dashboard, it doesn't have a slug field!
  // So we should generate slug from title if it's missing, or find by id.
  // Let's just find the course where (c.slug === slug || slugify(c.title) === slug)
  
  const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  
  return courses.find(c => {
    const computedSlug = c.slug || generateSlug(c.title);
    return computedSlug === slug || c.id === slug;
  });
}

export async function getAllCourseSlugs() {
  const courses = await getAllCourses();
  const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  
  return courses.map(course => ({ 
    course: course.slug && course.slug !== course.id ? course.slug : generateSlug(course.title) 
  }));
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
