import { NextResponse } from "next/server";
import { seedYouthLeaders } from "@/lib/seed-youth-leaders";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const result = await seedYouthLeaders();
    return NextResponse.json({ success: true, ...result });
  } catch (error: any) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}
