import { promises as fs } from "fs";
import path from "path";

const src = path.resolve("src/templates");
const dest = path.resolve("dist/templates");
const skipDirs = ["node_modules", ".git", "dist", "pnpm-lock.yaml"];

async function copyDirectory(src, dest) {
  try {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      // Skip certain directories
      if (skipDirs.includes(entry.name)) {
        console.log(`⏩ Skipping '${entry.name}' directory: ${srcPath}`);
        continue;
      }

      if (entry.isDirectory()) {
        // Recursively copy the directory
        await copyDirectory(srcPath, destPath);
      } else {
        // Copy the file
        await fs.copyFile(srcPath, destPath);
      }
    }
  } catch (err) {
    console.error(`❌ Error copying templates: ${err.message}`);
  }
}

(async () => {
  console.log(`📂 Copying templates from '${src}' to '${dest}'...`);
  await copyDirectory(src, dest);
  console.log("✅ Templates copied successfully!");
})();
