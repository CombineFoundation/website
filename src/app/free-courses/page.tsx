import Hero from "@/components/UI/hero";
import AboutCourses from "@/components/free-courses/AboutCourses"; 
import SuccessStories from "@/components/free-courses/SuccessStories";
import FaqSection from "@/components/home/FaqSection";
import { getAllCourses } from "@/lib/freeCourses";

export const dynamic = "force-dynamic";

export default async function Home() {
  const courses = await getAllCourses();

  return (
  <main>
    <Hero text1="Free" text2="Courses" image1="/home/image1.avif" image2="/home/image1.avif"
    mobileTitle="Free Courses" text1Size = "big"
    text2Size="big"
    />
    <AboutCourses courses={courses} />
    <SuccessStories />
    <FaqSection />

  </main>
)}