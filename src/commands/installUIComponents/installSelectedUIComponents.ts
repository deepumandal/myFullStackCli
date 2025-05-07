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
} from "src/core/steps/chooseProjectRootStep";
import { UIConfigInterface } from "src/types";
import { UIConfigs } from "src/templates/UI-templates/config";
import { templateGenerator } from "src/core/templateGenerator";
import { installDeps } from "src/core/installDeps";

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
  const templatePath = resolve(__dirname, "../templates/UI-templates");

  const actualComponentPath = await ensureValidPath(
    targetPath,
    chooseUIComponentsStep,
    "UI components"
  );
  const actualStylesPath = await ensureValidPath(
    stylePath,
    chooseUIStyleComponentsStep,
    "UI styles"
  );

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
