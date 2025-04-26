// utils/steps/index.ts
import { Step } from "../../types";
import { choicesConstants, messagesConstants, namesConstants } from "../../utils/constants";
import { createCodeQualitySteps } from "./createCodeQualitySteps";
import { createDockerSteps } from "./createDockerSteps";
import { createProjectSteps } from "./createProjectSteps";

const { create, dockerize, codeQuality } = choicesConstants;
const { main } = namesConstants;

const {
  mainCMDMessage,
  main: {
    createProject: createProjectMessage,
    setupCodeQuality: setupCodeQualityMessage,
    dockerizeProject: dockerizeProjectMessage
  }
} = messagesConstants;

export const choices = {
  [create]: createProjectSteps,
  [dockerize]: createDockerSteps,
  [codeQuality]: createCodeQualitySteps
  //   [addUi]: addUiSteps,
  //   [addUtils]: addUtilitySteps,
  //   [syncPaths]: syncPathsSteps,
  //   [scan]: scanProjectSteps,
};

export const mainStep: Step = {
  name: main,
  type: "select",
  message: mainCMDMessage,
  choices: [
    { title: createProjectMessage, value: create },
    { title: setupCodeQualityMessage, value: codeQuality },
    { title: dockerizeProjectMessage, value: dockerize }
    // { title: Messages.main.addUiComponents, value: mainConstants.addUi },
    // { title: Messages.main.addCustomHooks, value: mainConstants.addHooks },
    // { title: Messages.main.addUtilityComponents, value: mainConstants.addUtils },
    // { title: Messages.main.syncPaths, value: mainConstants.syncPaths },
    // { title: Messages.main.scanProject, value: mainConstants.scan },
    // { title: Messages.main.exitCli, value: mainConstants.exit }
  ]
};
