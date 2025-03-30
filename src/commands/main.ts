import { AnyType } from "../types";
import { runPrompts } from "../utils/promptHandler";
import { steps } from "../utils/steps";
import { createProject } from "./create";
import { dockerizeProject } from "./dockerize";

export const main = async () => {
  const answers: AnyType = await runPrompts(steps.main);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const mainChoice = answers.mainChoice;

  switch (mainChoice) {
    case "create":
      await createProject();
      break;
    case "dockerize":
      await dockerizeProject();
      break;
    default:
      return null;
  }
};
