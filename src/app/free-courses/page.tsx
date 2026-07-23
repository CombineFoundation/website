import Hero from "@/components/UI/hero";
import AboutCourses from "@/components/free-courses/AboutCourses";
import CoursesOffered from "@/components/free-courses/CoursesOffered";
import SuccessStories from "@/components/free-courses/SuccessStories";
import FaqSection from "@/components/home/FaqSection";
import { getAllCourses, SuccessStory } from "@/lib/freeCourses";

export const dynamic = "force-dynamic";

export default async function Home() {
  const courses = await getAllCourses();

  const stories = courses
    .flatMap((c) =>
      (c.successStories || []).map((s: SuccessStory) => ({
        name: s.studentName,
        description: s.testimonial,
        course: c.title,
        videoUrl: s.videoUrl,
      }))
    )
    .filter((s) => s.name && s.description);

  return (
  <main>
    <Hero text1="Free" text2="Courses" image1="/home/image1.avif" image2="/home/image1.avif"
    mobileTitle="Free Courses" text1Size = "big"
    text2Size="big"
    />
    <AboutCourses />
    <CoursesOffered courses={courses} />
    <SuccessStories stories={stories} />
    <FaqSection />

  </main>
)}