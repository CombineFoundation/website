import * as fs from "fs";
import * as path from "path";

const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envStr = fs.readFileSync(envPath, "utf8");
  for (const line of envStr.split("\n")) {
    if (line.trim() && !line.startsWith("#")) {
      const idx = line.indexOf("=");
      if (idx !== -1) {
        const k = line.slice(0, idx).trim();
        const v = line.slice(idx + 1).trim().replace(/^"|"$/g, "");
        if (k && v && !process.env[k]) {
          process.env[k] = v;
        }
      }
    }
  }
}

async function main() {
  const { seedAllCollections } = await import("../src/lib/seed");

  console.log("Starting database seed...");
  try {
    await seedAllCollections();
    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Seeding failed:", error);
  }
  process.exit(0);
}

main();
