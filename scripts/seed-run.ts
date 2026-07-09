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
  const { auth } = await import("../src/lib/firebase");
  const { signInWithEmailAndPassword } = await import("firebase/auth");

  const email = process.env.ADMIN_EMAIL || process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD || process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  if (auth && email && password) {
    console.log(`Attempting admin login for ${email}...`);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in successfully. Bypassing security rules!");
    } catch (authError: any) {
      console.warn("Authentication failed. Seeding will run unauthenticated:", authError.message);
    }
  } else {
    console.log("No ADMIN_EMAIL/ADMIN_PASSWORD found in .env.local. Running unauthenticated (might fail if security rules block it)...");
  }

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
