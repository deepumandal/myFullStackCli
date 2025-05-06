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
import { runCommand } from "../core/runCommand";
import { installDeps } from "../core/installDeps";

const { chooseProjectName } = namesConstants;
const doYouWantToAddUIComponents = async (projectRoot: string, packageManager: string) => {
  const userInput = await runPrompts(doYouWantToAddUIComponentsSteps);

  if (userInput.doYouWantToAddUIComponents) {
    console.log(chalk.green("🚀 Adding UI components...\n"));
    await addUIComponentsCMD(projectRoot, packageManager)
    // await addUIComponentScript(projectRoot, packageManager);
    console.log(chalk.green("✅ UI components added successfully!\n"));
  }
};

const doYouWantToAddUtils = async (targetTemplate: string) => {
  const userInput = await runPrompts(doYouWantToAddUtilsSteps);

  if (userInput.doYouWantToAddUtils) {
    console.log(chalk.green("🚀 Adding UI Utils...\n"));
    await addUtilsScript(targetTemplate);
    console.log(chalk.green("✅ UI Utils added successfully!\n"));
  }
};

export const createProjectCMD = async () => {
  console.log(chalk.blueBright("🚀 Creating a new project...\n"));

  const answers: Record<string, string> = await runPrompts(createProjectSteps);
  const projectRoot: string = answers[chooseProjectName]; // The target template is the project name or current directory when initfs runs
  const sourceTemplate = await commandsGenerator(answers);

  console.log(chalk.cyan("🧠 Summary of your choices:\n"));
  console.log(`
    📁 Project Name:      ${chalk.yellow(answers[chooseProjectName])}
    🛠️  Project Type:     ${chalk.yellow(answers.createProject)}
    📦 Selected Template: ${chalk.yellow(answers.createFrontend || answers.createBackend)}
`);

  // await templateGenerator(sourceTemplate, projectRoot);

  const { packageManager } = await runPrompts(choosePackageManagerStep);
  console.log(
    chalk.green(`\n✅ You selected ${chalk.bold(packageManager)} as your package manager.\n`)
  );

  // await installDeps(projectRoot, packageManager as string);

  console.log(chalk.green("\n✅ Project created successfully!\n"));

  /*
--------------------------- Project Setup ---------------------------
  */

  await doYouWantToAddUIComponents(projectRoot, packageManager as string);
  // await doYouWantToAddUtils(projectRoot);

  console.log(`
    ${chalk.greenBright("🚀 Next steps:")}

      1. ${chalk.yellow(`cd ${answers[chooseProjectName]}`)}
      3. ${chalk.yellow("npm run dev")}

    ${chalk.gray("✨ Code quality tools installed: ESLint, Prettier, Husky, Commitlint, CSpell")}
    ${chalk.gray("💅 Styling powered by Tailwind CSS")}
`);

  console.log(chalk.greenBright("Happy coding! 💻🔥\n"));
};
