"use client";

import { useState } from "react";
import { fetchProjects, updateProject } from "@/lib/admin-actions";

const FUTURE_PLANS: Record<string, string> = {
  "RAISE (Rising Ambitions in Skills & Education)":
    "RAISE (Rising Ambitions in Skills & Education) is an initiative by the Combine Foundation which wants to enable " +
    "the youth through good education and career training. In future, the project will seek to increase its coverage " +
    "through industry-specific courses, collaboration with educational institutions and employers, and creation of more " +
    "internship, certification, and employment opportunities for youth. Through the promotion of digital literacy, " +
    "innovation, and lifelong learning, RAISE aims at developing a competent and independent workforce that can handle " +
    "the challenges of the modern world and contribute to the development of society.",

  "CSC Scholarship Program":
    "Future goals of the CSC Scholarship Program by the Combine Foundation include ensuring that more needy and " +
    "deserving students get access to scholarships so that there will be no talented individual who misses his " +
    "education because of financial difficulties. It is expected that the program will try to work with educational " +
    "institutes, donors, corporates, and other organizations to extend the range of scholarships and to provide full " +
    "academic assistance. With the help of these partnerships, the CSC Scholarship Program will ensure success in the " +
    "career and life of students in the future.",

  "Volunteer program":
    "The Volunteer Program by the Combine Foundation is expected to increase its volunteer network and provide more " +
    "chances for students to get involved in activities that will help them make their contribution to society. The " +
    "program is designed to join hands with educational institutes, and non-profit organizations to provide various " +
    "volunteering opportunities that will allow students to develop their practical skills, leadership, teamwork, and " +
    "individual qualities. Through engaging more youth in beneficial projects, the Volunteer Program seeks to develop " +
    "socially conscious, competent, and responsible people who will benefit society.",

  "Youth Leadership Program":
    "The future goal of the Youth Leadership Program by the Combine Foundation is to expand its network by engaging " +
    "more students from universities and educational institutions across the country and providing them with " +
    "opportunities to develop leadership and professional skills. The program aims to collaborate with universities, " +
    "organizations, industry professionals, and other partners to expand this leadership program and give mentorship " +
    "to the youth along with practical experience in projects. By raising responsible and socially aware youth leaders, " +
    "so that they would be able to make an impact at the national and international level.",

  "Healthy Lifestyle Awareness Program":
    "The future goal of the Healthy Lifestyle Awareness Program by the Combine Foundation is to reach out to a greater " +
    "number of people and help more individuals become aware of healthy and balanced living. The program will be " +
    "working with educational institutions, health practitioners, fitness professionals in organizing awareness " +
    "campaigns, training sessions, and activities to promote health awareness and benefits of healthy living. The " +
    "program hopes to empower people with necessary information and good health practices in their lives for healthier " +
    "living and productivity.",

  "One Follower One Plant: Plantation Drives":
    "The future goal of the \u201COne Follower, One Plant\u201D plantation drive by the Combine Foundation is to expand " +
    "its environmental impact by planting thousands of trees and encouraging individual people, educational institutes, " +
    "organizations, and communities to become involved in making the world greener. This initiative intends to partner " +
    "with schools, colleges, universities, environmental groups, and communities to arrange mass plantation drives and " +
    "environmental awareness campaigns. Through promoting environmental responsibility and collective efforts, the " +
    "organization wants to create greener space and promote sustainability in the environment for coming generations.",

  "\u201CPacket Palto Phir Kharido\u201D Awareness Campaign":
    "In the future, the target of the \u201CPacket Palto Phir Kharido\u201D Awareness Campaign by the Combine Foundation " +
    "will be to expand its reach so that people can make smarter and healthier decisions about their food consumption. " +
    "Through this awareness campaign, there is a desire to partner with schools, doctors, nutritionists, non-profits " +
    "organizations, and businesses to organize awareness programs and campaigns to understand food labels and make " +
    "healthy purchases. Through the expansion of the reach of the campaign and promoting conscious food consumption, " +
    "this initiative hopes to bring better health and eliminate the consumption of harmful food products.",

  "SMIU FYP Evaluation and Pilot project design":
    "The future goal of the SMIU FYP Evaluation & Pilot Project Design, a joint initiative of Sindh Madarssatul Islam " +
    "University (SMIU) and the Combine Foundation, is to support a greater number of students in developing innovative, " +
    "practical, and industry-relevant Final Year Projects. The project aims to build strong collaboration with " +
    "universities, industry experts, research organizations, and technology partners to enhance project evaluation, " +
    "validation, and pilot implementation.",

  "Beach Cleanup drive with Hammad Foundation":
    "In the future, the objective of the Beach Clean-up Drive which is a collaborative effort between the Combine " +
    "Foundation and the Hammad Foundation will be increase the extent of the environmental benefits that can be " +
    "achieved through volunteering and the organization of frequent clean-up drives on the beaches. The efforts will " +
    "be aimed at working in collaboration with educational institutions, environmental organizations, governmental " +
    "authorities, and other community organizations to raise awareness about environmental sustainability. The " +
    "objective is to encourage youth participation and respect for nature.",

  "Ramadan Bachat camp and Ration Drive with Hammad Foundation":
    "The future goal of the Ramadan Bachat Camp & Ration Drive which is a collaboration between Combine Foundation " +
    "and the Hammad Foundation is to reach out to a larger number of deserving families through community cooperation " +
    "and partnership. This plan aims to work with donors, companies, NGOs, and volunteers to offer affordable " +
    "necessities to people in need during Ramadan and other hard times.",
};

export default function SeedFuturePlansPage() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const matchTitle = (title: string): string | undefined => {
    return FUTURE_PLANS[title] ?? FUTURE_PLANS[title.replace(/["\u201C\u201D]/g, "")];
  };

  const handleSeed = async () => {
    setLoading(true);
    setResult(null);
    try {
      const projects = await fetchProjects();
      const lines: string[] = [];

      for (const p of projects) {
        const plans = matchTitle(p.title);
        if (plans) {
          await updateProject(p.id!, { futurePlans: plans });
          lines.push(`${p.title} → ✅ futurePlans updated`);
        } else {
          lines.push(`${p.title} → ➖ skipped (no mapping)`);
        }
      }

      setResult(lines.join("\n"));
    } catch (e: any) {
      setResult(`Error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Seed Future Plans</h1>
      <p className="text-sm text-gray-600 mb-4">Updates <code>futurePlans</code> for mapped projects. Others are skipped.</p>
      <ul className="list-disc pl-6 mb-6 text-sm space-y-1">
        <li>RAISE (Rising Ambitions in Skills & Education)</li>
        <li>CSC Scholarship Program</li>
        <li>Volunteer program</li>
        <li>Youth Leadership Program</li>
        <li>Healthy Lifestyle Awareness Program</li>
        <li>One Follower One Plant: Plantation Drives</li>
        <li>&ldquo;Packet Palto Phir Kharido&rdquo; Awareness Campaign</li>
        <li>SMIU FYP Evaluation and Pilot project design</li>
        <li>Beach Cleanup drive with Hammad Foundation</li>
        <li>Ramadan Bachat camp and Ration Drive with Hammad Foundation</li>
      </ul>
      <button
        onClick={handleSeed}
        disabled={loading}
        className="bg-secondary-500 text-white px-6 py-2 rounded-lg font-medium hover:brightness-90 disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Updating..." : "Update Future Plans"}
      </button>
      {result && (
        <pre className="mt-6 text-sm whitespace-pre-wrap bg-gray-100 p-4 rounded-lg">{result}</pre>
      )}
    </div>
  );
}
