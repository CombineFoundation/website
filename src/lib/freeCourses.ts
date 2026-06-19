export interface Module {
  id: number;
  title: string;
  bullets: string[];
}

export interface SuccessStory {
  studentName: string;
  testimonial: string;
  videoUrl: string;
}

export interface Course {
  id: number;
  name: string;
  description: string;
  duration: string;
  lessons: number;
  price: number;
  originalPrice: number;
  instructor: string;
  status: string;
  requirements: string;
  guidelineCta: string;
  mode?: string;
  heroImage1: string;
  heroImage2: string;
  enrollmentLink: string;
  guidelineFile: string;
  modules: Module[];
  successStories: SuccessStory[];
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getCourseBySlug(slug: string) {
  return COURSES.find((course) => slugify(course.name) === slug);
}

export function getAllCourseSlugs() {
  return COURSES.map((course) => ({ course: slugify(course.name) }));
}

import rawCourses from "@/data/courses.json";

export const COURSES: Course[] = (rawCourses as any[]).map((c) => ({
  ...c,
  price: Number(c.price),
  modules: c.modules.map((m: any, i: number) => ({
    ...m,
    id: i + 1,
  })),
}));
