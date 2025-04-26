import { commandsGenerator } from "../utils/commandsGenerator";
import { executeCommands } from "../utils/executeCommand";
import { runPrompts } from "../utils/promptHandler";
import { createProjectSteps } from "../utils/steps/createProjectSteps";
import {
  doYouWantToAddCodeQuality,
  doYouWantToUIComponents,
  doYouWantToUtility
} from "../utils/steps/doYou";
import { AddUIComponents } from "./add-ui";
import { AddCodeQuality } from "./AddCodeQality";

export const createProject = async () => {
  console.log("Creating a new project...");
  const answers = await runPrompts(createProjectSteps);

  console.log("\n📝 Answers:");
  console.log(answers);
  const commands = await commandsGenerator(answers);

  console.log("\n📝 Answers:");
  console.log(commands);

  console.log("testing log cmds", commands);
  // comment this cmd if you don't want to run the commands
  await executeCommands(commands);

  // add code quality here
  // const { doYouWantToAddCodeQuality: codeQuality } = await runPrompts(doYouWantToAddCodeQuality);

  // if (codeQuality === "yes") {
  //   AddCodeQuality();
  // }

  // // add ui components here
  // const { doYouWantToUIComponents: AddUiComponentsAnswer } =
  //   await runPrompts(doYouWantToUIComponents);

  // if (AddUiComponentsAnswer === "yes") {
  //   await AddUIComponents();
  // }

  // // add utility here
  // const { doYouWantToAddUtility: AddUtilityAnswer } = await runPrompts(doYouWantToUtility);
  // if (AddUtilityAnswer === "yes") {
  //   // this contains hooks and utils
  //   await AddUIComponents();
  // }
};
