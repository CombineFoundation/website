"use client";

import { useState } from "react";
import { fetchProjects, updateProject } from "@/lib/admin-actions";

const GOALS: Record<string, string> = {
  "RAISE (Rising Ambitions in Skills & Education)":
    "RAISE (Rising Ambitions in Skills & Education) is a project of the Combine Foundation that aims to empower students as well as employees with all the information, skills, and opportunities to excel in today\u2019s fast-paced environment. The aim of this project is to connect learners to practical training modules relevant to the industries which can help them secure their future employment. The RAISE project offers a variety of courses like Python with AI, Web Development, Basic Computer Skills, Quantitative Finance, Meta Ads Marketing, as well as programs designed to foster growth in personal qualities of learners. With a focus on building digital literacy, innovation, and a passion for learning, this project can help learners pursue freelancing jobs and improve their income and self-reliance.",

  "Healthy Lifestyle Awareness Program":
    "The Healthy Lifestyle Awareness Program by Combine Foundation promotes preventive wellness, healthy habits, and positive lifestyle choices through interactive awareness sessions and educational activities. In these sessions, we guide individuals to gradually improve their daily routines according to their personal lifestyle in a practical and sustainable way, making it easier for them to follow and maintain healthy habits for the long-term. Through this awareness program we guide them about importance of balanced nutrition, regular physical activity, disciplined routines, and mindful living practices to improve overall well-being and productivity. Many individuals have benefited from these sessions and are now living healthier, more balanced, and wellness-focused lives.",

  "\u201CPacket Palto Phir Kharido\u201D Awareness Campaign":
    "The \u201CPacket Palto Phir Kharido\u201D Awareness Campaign by Combine Foundation is a unique consumer awareness initiative that encourages people to make smarter and healthier food choices. Through this campaign, individuals are educated on the importance of reading product labels, understanding ingredients, avoiding harmful processed foods, and choosing healthier alternatives before making a purchase. This campaign is a reminder for people to make smarter food choices by understanding what they consume daily by reading product labels for smarter buying decisions, making healthy food choices, avoiding harmful processed ingredients, and choosing healthier and safer alternatives.",

  "One Follower One Plant: Plantation Drives":
    "Through our \u201COne Follower, One Plant\u201D plantation drive by Combine Foundation, we are actively working to promote environmental sustainability and climate awareness. Our mission is to create a greener, cleaner, and healthier future for upcoming generations. We plant a tree for every new supporter to help improve air quality, reduce climate impact, and build a more sustainable future. We also organize plantation activities and awareness programs that highlight the importance of trees in maintaining ecological balance and protecting the environment.",

  "Youth Leadership Program":
    "The Youth Leadership Program by Combine Foundation is a 6-month leadership development program designed to empower young individuals to become confident and responsible future leaders. Through different activities, real-world projects, teamwork, and social initiatives, students actively participate in decision-making and program execution while also improving their leadership, communication, and strategic thinking skills. This program helps youth to build confidence, personal growth, and strong community engagement skills for the future. We have a strong network for Youth leadership programs where many students from different universities are part of this program either as a youth leader or youth leader volunteer.",

  "Volunteer program":
    "The Volunteer Program of Combine Foundation provides students with opportunities to work on real-world projects and gain practical experience through community involvement. This program has different niches on which volunteers can work. Through volunteering, skills like leadership, teamwork, responsibility, and communication skills are developed while it also encourages students to actively contribute to social and educational initiatives.",

  "Beach Cleanup drive with Hammad Foundation":
    "To organize community-driven beach cleanup drives in collaboration with Hammad Foundation, mobilizing youth volunteers to clear trash from coastal areas, distribute environmental awareness materials, and promote sustainable practices for cleaner and healthier marine ecosystems.",
};

export default function SeedFixGoalsPage() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const matchKey = (raw: string): string | undefined => {
    if (GOALS[raw]) return raw;
    const stripped = raw.replace(/["\u201C\u201D]/g, "").trim();
    if (GOALS[stripped]) return stripped;
    for (const key of Object.keys(GOALS)) {
      if (key.toLowerCase() === raw.toLowerCase()) return key;
      if (key.toLowerCase() === stripped.toLowerCase()) return key;
      if (key.toLowerCase().includes(raw.toLowerCase()) || raw.toLowerCase().includes(key.toLowerCase())) return key;
    }
    return undefined;
  };

  const handleSeed = async () => {
    setLoading(true);
    setResult(null);
    try {
      const projects = await fetchProjects();
      const lines: string[] = [];

      for (const p of projects) {
        const label = p.title || (p as any).name || "(untitled)";
        const matched = matchKey(label);
        if (matched) {
          await updateProject(p.id!, { goal: GOALS[matched] });
          lines.push(`${label} \u2192 \u2705 goal updated`);
        } else {
          lines.push(`${label} \u2192 \u2796 skipped (no mapping)`);
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
      <h1 className="text-2xl font-bold mb-8">Seed Fix Goals</h1>
      <p className="text-sm text-gray-600 mb-4">Restores <code>goal</code> field for these projects (futurePlans untouched):</p>
      <ul className="list-disc pl-6 mb-6 text-sm space-y-1">
        <li>RAISE (Rising Ambitions in Skills & Education)</li>
        <li>Healthy Lifestyle Awareness Program</li>
        <li>&ldquo;Packet Palto Phir Kharido&rdquo; Awareness Campaign</li>
        <li>One Follower One Plant: Plantation Drives</li>
        <li>Youth Leadership Program</li>
        <li>Volunteer program</li>
        <li>Beach Cleanup drive with Hammad Foundation</li>
      </ul>
      <button
        onClick={handleSeed}
        disabled={loading}
        className="bg-secondary-500 text-white px-6 py-2 rounded-lg font-medium hover:brightness-90 disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Updating..." : "Update Goals"}
      </button>
      {result && (
        <pre className="mt-6 text-sm whitespace-pre-wrap bg-gray-100 p-4 rounded-lg">{result}</pre>
      )}
    </div>
  );
}
