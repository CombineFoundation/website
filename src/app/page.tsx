import Hero from "@/components/home/Hero";
import OurImpact from "@/components/home/OurImpact";
import OurProject from "@/components/home/OurProject";
import FounderInfo from "@/components/home/FounderInfo";
import FaqSection from "@/components/home/FaqSection"; 
import BlogSection from "@/components/home/BlogSection";
import { getAllBlogs } from "@/lib/blogs";

export const dynamic = "force-dynamic";

export default async function Home() {
  const blogs = await getAllBlogs();
  return (
    <div>
      <Hero />
      <OurImpact />
      <OurProject />
      <FounderInfo />
      <FaqSection
      description = "Find answers to common questions about our mission, projects, and how you can get involved."
      />
      <BlogSection blogs={blogs} />
    </div>
  );
}
