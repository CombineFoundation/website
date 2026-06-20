import Hero from "@/components/UI/hero";
import AboutCourses from "@/components/free-courses/AboutCourses";
import CoursesOffered from "@/components/free-courses/CoursesOffered";
import SuccessStories from "@/components/free-courses/SuccessStories";
import FaqSection from "@/components/home/FaqSection";

export default function Home() {
  return (
  <main>
    <Hero text1="Free" text2="Courses" image1="/home/image1.avif" image2="/home/image1.avif"
    mobileTitle="Free Courses" text1Size = "big"
    text2Size="big"
    />
    <AboutCourses />
    <CoursesOffered />
    <SuccessStories />
    <FaqSection />

  </main>
)}