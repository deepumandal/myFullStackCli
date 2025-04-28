import { commandsGenerator } from "../core/commandsGenerator";
import { runPrompts } from "../core/runPrompt";
import { createProjectSteps } from "../core/steps/createProjectSteps";

export const createProjectCMD = async () => {
  console.log("Creating a new project...");

  const answers = await runPrompts(createProjectSteps);

  console.log("\n📝 Answers:");
  console.log(answers);
  const commands = await commandsGenerator(answers);

  console.log("\n📝 Answers: 2");
  console.log("commands", commands);

  // console.log("testing log cmds", commands);
  // comment this cmd if you don't want to run the commands
  // await executeCommands(commands);

  console.log("would you like to add code quality?");

  // add code quality here
  //   const { doYouWantToAddCodeQuality: codeQuality } = await runPrompts(doYouWantToAddCodeQuality);

  //   if (codeQuality === "yes") {
  //     AddCodeQuality();
  //   }

  console.log("Setup Completed!");

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

  console.log("Project created successfully!");
  console.log("You can now start developing your project.");
  console.log("Happy coding! 🚀");
};
