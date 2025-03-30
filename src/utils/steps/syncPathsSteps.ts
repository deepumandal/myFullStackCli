import { Step } from "../../types";

export const syncPathsSteps: Step = {
  name: "syncPathsStart",
  type: "select",
  message: "Start sync paths flow?",
  choices: [
    { title: "Yes", value: "yes" },
    { title: "Go Back", value: "back" }
  ]
};
