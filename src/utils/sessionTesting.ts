/* eslint-disable @typescript-eslint/restrict-template-expressions */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { execaCommand } from "execa";
import fs from "fs-extra";
import path from "path";
import os from "os";
import prompts from "prompts";
import { globby } from "globby";

export const sessionTest = async (command: string): Promise<void> => {
  const cwd = process.cwd();

  // ✅ Create safe test directory OUTSIDE the project
  const sessionDir = path.join(os.tmpdir(), `session-test-${Date.now()}`);

  console.log(`🧪 Creating isolated temp folder at: ${sessionDir}`);
  await fs.remove(sessionDir);
  await fs.copy(cwd, sessionDir, {
    filter: (src) => !src.includes("node_modules") && !src.includes(".git")
  });

  console.log(`🚀 Running command inside session: ${command}`);
  try {
    await execaCommand(command, { cwd: sessionDir, stdio: "inherit" });
  } catch (error) {
    if (error instanceof Error) {
      console.error(`❌ Command failed: ${error.message}`);
    } else {
      console.error(`❌ Unknown error while running command.`);
    }
  }

  // Compare files
  const originalFiles = await globby(["**/*"], {
    cwd,
    dot: true,
    gitignore: true,
    onlyFiles: true
  });

  const sessionFiles = await globby(["**/*"], {
    cwd: sessionDir,
    dot: true,
    gitignore: true,
    onlyFiles: true
  });

  const newOrChangedFiles: string[] = sessionFiles.filter((file) => {
    const originalPath = path.join(cwd, file);
    const sessionPath = path.join(sessionDir, file);

    if (!originalFiles.includes(file)) return true;
    if (!fs.existsSync(originalPath) || !fs.existsSync(sessionPath)) return true;

    const original = fs.readFileSync(originalPath);
    const session = fs.readFileSync(sessionPath);

    return !original.equals(session);
  });

  console.log("\n📦 Files added/changed in session:");
  if (newOrChangedFiles.length === 0) {
    console.log("✅ No changes detected.");
  } else {
    newOrChangedFiles.forEach((file) => {
      console.log(`• ${file}`);
    });
  }

  const { keep } = await prompts({
    type: "confirm",
    name: "keep",
    message: "Do you want to apply these changes to your actual project?",
    initial: false
  });

  if (keep) {
    console.log("✅ Applying changes...");
    await fs.copy(sessionDir, cwd, { overwrite: true });
  } else {
    console.log("🗑️ Reverting — session changes discarded.");
  }

  await fs.remove(sessionDir);
  console.log("🧪 Session test complete.\n");
};
