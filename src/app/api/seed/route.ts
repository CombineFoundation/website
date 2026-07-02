import { seedDatabase, seedAllCollections } from "@/lib/seed";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// GET /api/seed — seeds original collections (programs, applications, messages, jobs)
export async function GET() {
  try {
    await seedDatabase();
    return NextResponse.json({ message: "Database seeded successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Seeding failed", details: error }, { status: 500 });
  }
}

// POST /api/seed — seeds all admin dashboard collections (events, courses, blogs, contacts, donations)
export async function POST() {
  try {
    await seedAllCollections();
    return NextResponse.json({ success: true, message: "All admin collections seeded successfully!" });
  } catch (error: any) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}
