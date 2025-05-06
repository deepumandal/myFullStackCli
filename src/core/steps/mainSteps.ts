// utils/steps/index.ts
import { Step } from "../../types";
import { choicesConstants, messagesConstants, namesConstants } from "../../utils/constants";
import { addUIComponentsSteps } from "./addUIComponentsSteps";
import { addUtilsSteps } from "./addUtilsSteps";
import { createCodeQualitySteps } from "./createCodeQualitySteps";
import { createDockerSteps } from "./createDockerSteps";
import { createProjectSteps } from "./createProjectSteps";

const { create, dockerize, codeQuality, addUIComponents, addUtils } = choicesConstants;
const { main } = namesConstants;

const {
  mainCMDMessage,
  main: {
    createProject: createProjectMessage,
    setupCodeQuality: setupCodeQualityMessage,
    dockerizeProject: dockerizeProjectMessage,
    addUIComponents: addUIComponentsMessage,
    addUtils: addUtilsMessage
  }
} = messagesConstants;

export const choices = {
  [create]: createProjectSteps,
  [dockerize]: createDockerSteps,
  [codeQuality]: createCodeQualitySteps,
  [addUIComponents]: addUIComponentsSteps,
  [addUtils]: addUtilsSteps
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
    { title: dockerizeProjectMessage, value: dockerize },
    { title: addUIComponentsMessage, value: addUIComponents },
    { title: addUtilsMessage, value: addUtils }
    // { title: Messages.main.addUiComponents, value: mainConstants.addUi },
    // { title: Messages.main.addCustomHooks, value: mainConstants.addHooks },
    // { title: Messages.main.addUtilityComponents, value: mainConstants.addUtils },
    // { title: Messages.main.syncPaths, value: mainConstants.syncPaths },
    // { title: Messages.main.scanProject, value: mainConstants.scan },
    // { title: Messages.main.exitCli, value: mainConstants.exit }
  ]
};
