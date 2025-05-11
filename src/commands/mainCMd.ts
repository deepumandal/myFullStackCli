import { runPrompts } from "../core/runPrompt";
import { mainStep } from "../core/steps/mainSteps";
import { AnyType } from "../types";
import { choicesConstants, namesConstants } from "../utils/constants";
import { AddCodeQualityCMD } from "./addCodeQualityCMd";
import { dockerizeProjectCMd } from "./createDockerSetupCMD";
import { createProjectCMD } from "./createProjectCMD";
import { addUIComponentsCMD } from "./installUIComponents";
import { addUtilsCMD } from "./installUtilsCMD";

const { create, dockerize, codeQuality, addUIComponents, addUtils } = choicesConstants;
const { main } = namesConstants;

export const mainCMd = async () => {
  const answers: AnyType = await runPrompts(mainStep);

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
    case addUIComponents:
      await addUIComponentsCMD();
      break;
    case addUtils:
      await addUtilsCMD();
      break;
    default:
      return null;
  }
};
