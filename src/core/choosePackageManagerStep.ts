import { choicesConstants, messagesConstants, namesConstants } from "../utils/constants";
import { Step } from "../types";

const { packageManager } = namesConstants;
const { packageManager: packageManagerMessage } = messagesConstants;
const { yarn, npm, pnpm, bun } = choicesConstants;

export const choosePackageManagerStep: Step = {
  name: packageManager,
  type: "select",
  message: packageManagerMessage,
  choices: [
    { title: npm, value: npm },
    { title: yarn, value: yarn },
    { title: pnpm, value: pnpm }
    // { title: bun, value: bun }
  ]
};
