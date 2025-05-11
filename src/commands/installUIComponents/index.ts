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

  await installSelectedUIComponents({
    targetPath: componentTargetPath,
    stylePath: styleTargetPath,
    resolvedRoot,
    packageManager,
    selectedComponents
  });
};
