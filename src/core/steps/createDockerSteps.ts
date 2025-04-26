import { Step } from "../../types";
import { choicesConstants, messagesConstants } from "../../utils/constants";

const { dockerize: dockerizeName } = choicesConstants;
const { frontend, backend, goBack } = choicesConstants;
const { dockerizeProject: dockerizeSetupMessage } = messagesConstants;

export const createDockerSteps: Step = {
  name: dockerizeName,
  type: "select",
  message: dockerizeSetupMessage,
  choices: [
    { title: frontend, value: frontend },
    { title: backend, value: backend },
    { title: goBack, value: goBack }
  ]
};
