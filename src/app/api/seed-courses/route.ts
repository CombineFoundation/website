import { seedCourses } from "@/lib/seed-courses";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const result = await seedCourses();
    if (result.success) {
      return NextResponse.json({ message: "Courses seeded successfully", count: result.count });
    }
    return NextResponse.json({ error: "Seeding failed", details: result.error }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ error: "Seeding failed", details: error }, { status: 500 });
  }
}
