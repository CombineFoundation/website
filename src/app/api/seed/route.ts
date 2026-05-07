import { seedDatabase } from "@/lib/seed";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await seedDatabase();
    return NextResponse.json({ message: "Database seeded successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Seeding failed", details: error }, { status: 500 });
  }
}
