// src/commands/addUIComponentsCMD.ts

import chalk from "chalk";
import { join, resolve } from "path";
import { getProjectSetup } from "./getProjectSetup";
import { selectMultipleOptionsSteps } from "../../core/steps/addUIComponentsSteps";
import { UIConfigs } from "../../templates/UI-templates/config";
import { runPrompts } from "../../core/runPrompt";
import { UIComponentsPaths, UIStylesPaths } from "../../utils/constants";
import { installSelectedUIComponents } from "./installSelectedUIComponents";

export const addUIComponentsCMD = async (
  providedRoot?: string,
  providedPkgMgr?: string
): Promise<void> => {
  const { projectRoot, packageManager } =
    providedRoot && providedPkgMgr
      ? { projectRoot: providedRoot, packageManager: providedPkgMgr }
      : await getProjectSetup();

  const { addUIComponentsMultiSelectSteps } = await runPrompts(
    selectMultipleOptionsSteps(UIConfigs)
  );
  const selectedComponents = addUIComponentsMultiSelectSteps as string[];

  const resolvedRoot = projectRoot === "." ? process.cwd() : resolve(process.cwd(), projectRoot);
  const componentTargetPath = join(resolvedRoot, UIComponentsPaths);
  const styleTargetPath = join(resolvedRoot, UIStylesPaths);

  console.log(chalk.blue("📂 Project Root:"), resolvedRoot);
  console.log(chalk.green(`✅ Package Manager: ${chalk.bold(packageManager)}`));
  console.log(chalk.yellow("🎯 Selected UI Components:"), selectedComponents);

  await installSelectedUIComponents({
    targetPath: componentTargetPath,
    stylePath: styleTargetPath,
    resolvedRoot,
    packageManager,
    selectedComponents
  });
};
