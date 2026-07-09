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
  const { fetchProjects } = await import("../src/lib/admin-actions");
  console.log("Fetching projects from database...");
  try {
    const projects = await fetchProjects();
    console.log("PROJECTS_JSON_START");
    console.log(JSON.stringify(projects, null, 2));
    console.log("PROJECTS_JSON_END");
  } catch (error) {
    console.error("Failed to fetch projects:", error);
  }
  process.exit(0);
}

main();
