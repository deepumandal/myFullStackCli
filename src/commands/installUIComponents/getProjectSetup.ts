import { choosePackageManagerStep } from "../../core/choosePackageManagerStep";
import { runPrompts } from "../../core/runPrompt";
import { chooseProjectRootStep } from "../../core/steps/chooseProjectRootStep";
import { validatePath } from "../../core/validatePath";

export const getProjectSetup = async () => {
  let projectRoot = "";
  while (true) {
    const { chooseProjectRoot } = await runPrompts(chooseProjectRootStep);
    projectRoot = chooseProjectRoot.trim();
    if (await validatePath(projectRoot)) break;
    console.log(`❌ The path "${projectRoot}" does not exist. Please try again.`);
  }

  const { packageManager } = await runPrompts(choosePackageManagerStep);
  return { projectRoot, packageManager: packageManager as string };
};
