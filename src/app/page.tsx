import Hero from "@/components/home/Hero";
import OurImpact from "@/components/home/OurImpact";
import OurProject from "@/components/home/OurProject";
import FounderInfo from "@/components/home/FounderInfo";
import FaqSection from "@/components/home/FaqSection"; 
import BlogSection from "@/components/home/BlogSection";
export default function Home() {
  return (
    <div>
      <Hero />
      <OurImpact />
      <OurProject />
      <FounderInfo />
      <FaqSection />
      <BlogSection />
    </div>
  );
}
