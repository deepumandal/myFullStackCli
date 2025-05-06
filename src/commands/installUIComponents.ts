import fs from "fs";
import chalk from "chalk";
import { runPrompts } from "../core/runPrompt";
import {
  chooseProjectRootStep,
  chooseUIComponentsStep,
  chooseUIStyleComponentsStep
} from "../core/steps/chooseProjectRootStep";
import { join, resolve } from "path";
import { UIComponentsPaths, UIStylesPaths } from "../utils/constants";
import { selectMultipleOptionsSteps } from "../core/steps/addUIComponentsSteps";
import { UIConfigs } from "../templates/extra-templates/config";
import { AnyType, Step, UIConfigInterface } from "../types";
import { templateGenerator } from "../core/templateGenerator";
import { installDeps } from "../core/installDeps";
import { choosePackageManagerStep } from "../core/choosePackageManagerStep";
import prompts from "prompts";
import { stringify } from "querystring";
// import { flushStdin } from "../utils/flushStdin";

const seperatespace = async () => {
  const rootAnswer = await runPrompts(chooseProjectRootStep);
  const pkgAnswer = await runPrompts(choosePackageManagerStep);

  const finalProjectRoot = rootAnswer.chooseProjectRoot as string;
  const finalPackageManager = pkgAnswer.packageManager as string;
  return { finalPackageManager, finalProjectRoot };
};

export const addUIComponentsCMD = async (projectRoot?: string, pkgManager?: string) => {
  let finalProjectRoot = projectRoot;
  let finalPackageManager = pkgManager;
  let selectedComponents: string[] = [];

  const multiSelectStep = selectMultipleOptionsSteps(UIConfigs);

  if (!finalProjectRoot || !finalPackageManager) {
    const space  = await seperatespace() 
    finalProjectRoot = space.finalProjectRoot
    finalPackageManager = space.finalPackageManager 
  }
  const answer = await runPrompts(multiSelectStep);
  selectedComponents = answer.addUIComponentsMultiSelectSteps;

  console.log(chalk.blue("📂 Project Root:"), finalProjectRoot);
  console.log(chalk.green(`✅ Package manager: ${chalk.bold(finalPackageManager)}`));
  console.log(chalk.yellow("🎯 Selected components:"), selectedComponents);

  const cwd = process.cwd();
  const targetPath = finalProjectRoot === "." ? cwd : resolve(cwd, finalProjectRoot);
  const UITargetPath = join(targetPath, UIComponentsPaths);

};
// await installUIComponent(UITargetPath, targetPath, finalPackageManager, selectedComponents);

export const installUIComponent = async (
  targetTemplate: string,
  projectRoot: string,
  packageManager: string,
  selectedComponents: string[]
) => {
  let targetUiPath;
  const templatePath: string = resolve(__dirname, "../templates/extra-templates");

  try {
    await fs.promises.access(targetTemplate);
    targetUiPath = targetTemplate;
  } catch (error) {
    console.error(chalk.red("❌ UI directory not found:"));
    const userInput: Record<string, string> = await runPrompts(chooseUIComponentsStep);
    console.log(chalk.blue("📂 New UI Components Path: ", userInput.chooseUIComponentsPath));
    targetUiPath = userInput.chooseUIComponentsPath;
  }

  console.log(chalk.green("✅ UI Components Installed in:", targetUiPath));
  console.log("🧩 Config Debug:", {
    UIConfigs,
    targetTemplate,
    projectRoot,
    packageManager,
    selectedComponents
  });

  // Use a `for...of` loop to handle async work in sequence
  for (const element of selectedComponents) {
    const currentElement: UIConfigInterface = UIConfigs[element];
    const sourcePath = join(templatePath, currentElement.path);
    const targetDir = join(targetUiPath, element);

    await templateGenerator(sourcePath, targetDir);

    console.log("📦 Installing dependencies:", currentElement.deps);
    if (currentElement.deps.length) {
      await installDeps(projectRoot, packageManager, currentElement.deps);
    }

    console.log("🔧 Installing dev dependencies:", currentElement.devDeps);
    if (currentElement.devDeps.length) {
      await installDeps(projectRoot, packageManager, currentElement.devDeps);
    }
  }

  console.log(chalk.green("✅ All selected UI components have been installed successfully!"));
};
