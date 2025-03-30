// utils/steps/scanProjectSteps.ts
import { Step } from "../../types";

export const scanProjectSteps: Step = {
  name: "scanStart",
  type: "select",
  message: "What do you want to scan?",
  choices: [
    { title: "Unused CSS", value: "css" },
    { title: "Unused Code", value: "code" },
    { title: "SonarQube", value: "sonar" },
    { title: "Security Issues", value: "security" },
    { title: "Go Back", value: "back" }
  ]
};
