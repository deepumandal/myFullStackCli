import chalk from "chalk";
import { runPrompts } from "../core/runPrompt";
import { chooseUIComponentsStep } from "../core/steps/chooseProjectRootStep";

export const addUtilsCMD = async () => {
  const userInput: Record<string, string> = await runPrompts(chooseUIComponentsStep);
  console.log(chalk.green("🚀 Adding UI components to \n", userInput.chooseProjectRoot));
  await addUtilsScript(userInput.chooseProjectRoot);
};

export const addUtilsScript = async (targetTemplate: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async operation
};
