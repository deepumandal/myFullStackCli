import { Step } from "../../types";

export const addUtilitySteps: Step = {
  name: "utilCategory",
  type: "select",
  message: "Choose Utility Type",
  choices: [
    { title: "State Management", value: "state" },
    { title: "API Handling", value: "api" },
    { title: "Date Libraries", value: "date" },
    { title: "Go Back", value: "back" }
  ]
};
