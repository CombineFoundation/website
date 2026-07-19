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

  const stories = (course.successStories || []).map((s: any) => ({
    name: s.studentName,
    description: s.testimonial,
    course: course.title,
  })).filter((s) => s.name && s.description);

  return (
    <>
      <CourseHero course={course} />
      <hr className="w-[95vw] text-gray-500 m-auto" />
      <Modules modules={course.modules} guidelineCta={course.guidelineCta} />
      <SuccessStories stories={stories} />
      <MeetInstructors />
      <CtaSection
        text="Ready to Level Up Your Skills ? "
        buttonText="Enroll Now"
        url="/free-courses"
      />
      
    </>
  );
}
