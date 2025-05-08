import fs from "fs";
import chalk from "chalk";
import { runPrompts } from "../../core/runPrompt";
import { Step } from "../../types";

export const ensureValidPath = async (
  initialPath: string,
  step: Step,
  label: string,
  destinationFolder?: string
): Promise<{ isNewPath: boolean; path: string }> => {
  let currentPath = initialPath;

  while (true) {
    try {
      await fs.promises.access(currentPath);
      return { path: currentPath, isNewPath: false }; // ✅ Existing path
    } catch {
      console.log(chalk.yellow(`⚠️ ${label} directory not found at: ${currentPath}`));

      const { [step.name]: name } = await runPrompts(step);
      currentPath = name.trim();

      // ✅ Accept user's custom path regardless of existence
      if (currentPath) {
        console.log(chalk.green(`📦 Using user-provided path: ${currentPath}`));
        return { path: currentPath, isNewPath: true }; // Append destination folder if provided
      }

      console.log(chalk.red("❌ Path cannot be empty. Please try again."));
    }
  }
};
