// utils/steps/index.ts
import { createProjectSteps } from "./createProjectSteps";
import { dockerSteps } from "./dockerSteps";
import { addUiSteps } from "./addUiSteps";
import { addUtilitySteps } from "./addUtilitySteps";
import { syncPathsSteps } from "./syncPathsSteps";
import { scanProjectSteps } from "./scanProjectSteps";
import { codeQualitySteps } from "./codeQualitySteps";
import { Step } from "../../types";

export const choices = {
  create: createProjectSteps,
  dockerize: dockerSteps,
  "add-ui": addUiSteps,
  "add-utils": addUtilitySteps,
  "sync-paths": syncPathsSteps,
  scan: scanProjectSteps,
  "code-quality": codeQualitySteps
};

export const steps: { main: Step } = {
  main: {
    name: "mainChoice",
    type: "select",
    message: "🧩 Main Menu",
    choices: [
      { title: "Create Project", value: "create" },
      { title: "Dockerize My Project", value: "dockerize" },
      { title: "Add UI Components", value: "add-ui" },
      { title: "Add Custom Hooks", value: "Add-Hooks" },
      { title: "Add Utility Components", value: "add-utils" },
      { title: "Synchronize Absolute Path in Project", value: "sync-paths" },
      { title: "Scan My Project", value: "scan" },
      { title: "Setup Code Quality Tools", value: "code-quality" },
      { title: "Exit CLI", value: "exit" }
    ]
  }
};
