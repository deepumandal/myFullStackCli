import { Step } from "../../types";

export const addUiSteps: Step = {
  name: "uiLibrary",
  type: "select",
  message: "Choose UI Library",
  choices: [
    { title: "Chakra UI", value: "chakra" },
    { title: "MUI", value: "mui" },
    { title: "Shadcn/UI", value: "shadcn" },
    { title: "Headless UI", value: "headless" },
    { title: "Go Back", value: "back" }
  ]
};
