import { runPrompts } from "../core/runPrompt";
import { mainStep } from "../core/steps/mainSteps";
import { AnyType } from "../types";
import { choicesConstants, namesConstants } from "../utils/constants";
import { AddCodeQualityCMD } from "./addCodeQualityCMd";
import { dockerizeProjectCMd } from "./createDockerSetupCMD";
import { createProjectCMD } from "./createProjectCMD";

const { create, dockerize, codeQuality } = choicesConstants;
const { main } = namesConstants;

export const mainCMd = async () => {
  const answers: AnyType = await runPrompts(mainStep);

  console.log("answers", answers);

  switch (answers[main]) {
    case create:
      await createProjectCMD();
      break;
    case dockerize:
      await dockerizeProjectCMd();
      break;
    case codeQuality:
      await AddCodeQualityCMD();
      break;
    default:
      return null;
  }
};
