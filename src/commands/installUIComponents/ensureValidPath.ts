import fs from "fs";
import chalk from "chalk";
import { runPrompts } from "src/core/runPrompt";
import { Step } from "src/types";

export const ensureValidPath = async (path: string, step: Step, label: string) => {
  try {
    await fs.promises.access(path);
    return path;
  } catch {
    console.error(chalk.red(`❌ ${label} directory not found at path:`), path);
    const { chooseUIComponentsPath } = await runPrompts(step);
    console.log(chalk.blue(`📂 Updated ${label} Path:`), chooseUIComponentsPath);
    return chooseUIComponentsPath;
  }
};
