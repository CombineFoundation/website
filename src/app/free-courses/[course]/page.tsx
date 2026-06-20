import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllCourseSlugs, getCourseBySlug } from "@/lib/freeCourses";
import CourseHero from "@/components/free-courses/CourseHero";
import Modules from "@/components/free-courses/Modules";
import SuccessStories from "@/components/free-courses/SuccessStories";
import MeetInstructors from "@/components/free-courses/MeetInstructors";
import CtaSection from "@/components/UI/CtaSection";

interface CoursePageProps {
  params: Promise<{
    course: string;
  }>;
}

export function generateStaticParams() {
  return getAllCourseSlugs();
}
export const dynamic = "force-dynamic";

export default async function CoursePage({ params }: CoursePageProps) {
  const { course: slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    return notFound();
  }

  return (
    <>
      <CourseHero course={course} />
      <hr className="w-[95vw] text-gray-500 m-auto" />
      <Modules modules={course.modules} />
      <SuccessStories />
      <MeetInstructors />
      <CtaSection
        text="Ready to Level Up Your Skills ? "
        buttonText="Enroll Now"
        url="/free-courses"
      />
      
    </>
  );
}
