import chalk from "chalk";
import { commandsGenerator } from "../core/commandsGenerator";
import { runPrompts } from "../core/runPrompt";
import { createProjectSteps } from "../core/steps/createProjectSteps";
import { templateGenerator } from "../core/templateGenerator";
import { choicesConstants, namesConstants } from "../utils/constants";
import { doYouWantToAddUIComponentsSteps } from "../core/steps/addUIComponentsSteps";
import { addUIComponentsCMD } from "./installUIComponents";
import { doYouWantToAddUtilsSteps } from "../core/steps/addUtilsSteps";
import { addUtilsScript } from "./installUtilsCMD";
import { choosePackageManagerStep } from "../core/choosePackageManagerStep";
import { installDeps } from "../core/installDeps";
import { basename } from "path";

const { chooseProjectName } = namesConstants;
const doYouWantToAddUIComponents = async (projectRoot: string, packageManager: string) => {
  const userInput = await runPrompts(doYouWantToAddUIComponentsSteps);

  if (userInput.doYouWantToAddUIComponents) {
    await addUIComponentsCMD(projectRoot, packageManager);
  }
};

const doYouWantToAddUtils = async (targetTemplate: string) => {
  const userInput = await runPrompts(doYouWantToAddUtilsSteps);

  if (userInput.doYouWantToAddUtils) {
    await addUtilsScript(targetTemplate);
  }
};

export const createProjectCMD = async () => {
  console.log(chalk.blueBright("🚀 Creating a new project...\n"));

  const answers: Record<string, string> = await runPrompts(createProjectSteps);
  const projectRoot: string = answers[chooseProjectName]; // The target template is the project name or current directory when initfs runs
  const sourceTemplate = await commandsGenerator(answers);

  console.log(chalk.cyan("🧠 Summary of your choices:"));
  console.log(`
    📁 Project Name:      ${chalk.yellow(answers[chooseProjectName] === "." ? basename(process.cwd()) : answers[chooseProjectName])}
    🛠️ Project Type:      ${chalk.yellow(answers.createProject)}
    📦 Selected Template: ${chalk.yellow(answers.createFrontend || answers.createBackend)}
`);

  await templateGenerator(sourceTemplate, projectRoot);

  const { packageManager } = await runPrompts(choosePackageManagerStep);

  await installDeps(projectRoot, packageManager as string);

  console.log(chalk.green("✅ Project created successfully!\n"));

  /*
--------------------------- Project Setup ---------------------------
  */

  await doYouWantToAddUIComponents(projectRoot, packageManager as string);
  await doYouWantToAddUtils(projectRoot);

  console.log(`
    ${chalk.greenBright("🚀 Next steps:")}

      1. ${chalk.yellow(`cd ${answers[chooseProjectName]}`)}
      2. ${chalk.yellow("npm run dev")}

    ${chalk.gray("✨ Code quality tools installed: ESLint, Prettier, Husky, Commitlint, CSpell")}
    ${chalk.gray("💅 Styling powered by Tailwind CSS")}
`);

  console.log(chalk.greenBright("Happy coding! 💻🔥\n"));
};
