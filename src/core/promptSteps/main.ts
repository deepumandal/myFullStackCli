import { Step } from "../../types";
import { choicesConstants, messagesConstants, namesConstants } from "../../utils/constants";
import { createCodeQualitySteps } from "../steps/createCodeQualitySteps";
import { createDockerSteps } from "../steps/createDockerSteps";
import { createProjectSteps } from "../steps/createProjectSteps";

const { createProject, setupCodeQuality, dockerizeProject, mainCMDMessage } = messagesConstants;

export const choices = {
  [choicesConstants.create]: createProjectSteps,
  [choicesConstants.dockerize]: createDockerSteps,
  [choicesConstants.codeQuality]: createCodeQualitySteps
  //   [mainConstants.addUi]: addUiSteps,
  //   [mainConstants.addUtils]: addUtilitySteps,
  //   [mainConstants.syncPaths]: syncPathsSteps,
  //   [mainConstants.scan]: scanProjectSteps,
};

export const steps: { main: Step } = {
  main: {
    name: namesConstants.main, // Updated to use mainConstants
    type: "select",
    message: mainCMDMessage, // Updated to use Messages
    choices: [
      { title: createProject, value: choicesConstants.create }, // Updated title and value
      { title: setupCodeQuality, value: choicesConstants.codeQuality },
      { title: dockerizeProject, value: choicesConstants.dockerize }
      //   { title: Messages.main.addUiComponents, value: choicesConstants.addUi },
      //   { title: Messages.main.addCustomHooks, value: choicesConstants.addHooks },
      //   { title: Messages.main.addUtilityComponents, value: choicesConstants.addUtils },
      //   { title: Messages.main.syncPaths, value: choicesConstants.syncPaths },
      //   { title: Messages.main.scanProject, value: choicesConstants.scan },
      //   { title: Messages.main.exitCli, value: choicesConstants.exit }
    ]
  }
};
