/* eslint-disable @typescript-eslint/no-unsafe-argument */
// src/core/installSelectedUIComponents.ts

import fs from "fs";
import { join, resolve } from "path";
import chalk from "chalk";
import { ensureValidPath } from "./ensureValidPath";
import { writeCssFile } from "./writeCssFile";
import {
  chooseUIComponentsStep,
  chooseUIStyleComponentsStep
} from "../../core/steps/chooseProjectRootStep";
import { UIConfigInterface } from "../../types";
import { UIConfigs } from "../../templates/UI-templates/config";
import { templateGenerator } from "../../core/templateGenerator";
import { installDeps } from "../../core/installDeps";
import { resolveFromRoot } from "../../utils/resolveFromRoot";

interface InstallUIArgs {
  targetPath: string;
  stylePath: string;
  resolvedRoot: string;
  packageManager: string;
  selectedComponents: string[];
}

export const installSelectedUIComponents = async ({
  targetPath,
  stylePath,
  resolvedRoot,
  packageManager,
  selectedComponents
}: InstallUIArgs): Promise<void> => {
  const templatePath = resolveFromRoot("templates", "UI-templates");

  const UIPaths = await ensureValidPath(targetPath, chooseUIComponentsStep, "UI components");

  const actualComponentPath = UIPaths.path + (UIPaths.isNewPath ? "/UI" : "");

  const CSSPaths = await ensureValidPath(
    stylePath,
    chooseUIStyleComponentsStep,
    "UI styles"
  );

  const actualStylesPath = CSSPaths.path + (CSSPaths.isNewPath ? "/Styles" : "");

  console.log(chalk.green("🔧 Installing selected components to:"), {
    actualComponentPath,
    actualStylesPath
  });

  for (const component of selectedComponents) {
    const config: UIConfigInterface = UIConfigs[component];
    const sourcePath = join(templatePath, config.path);
    const cssSourcePath = join(templatePath, config.cssPath);

    await templateGenerator(sourcePath, join(actualComponentPath, component));
    await templateGenerator(cssSourcePath, join(actualStylesPath, component));

    if (config.deps.length) {
      console.log("📦 Installing dependencies for", component);
      await installDeps(resolvedRoot, packageManager, config.deps);
    }

    if (config.devDeps.length) {
      console.log("🛠️ Installing dev dependencies for", component);
      await installDeps(resolvedRoot, packageManager, config.devDeps);
    }
  }

  await writeCssFile(actualStylesPath, selectedComponents);
  console.log(chalk.green("✅ All selected UI components installed successfully!"));
};
