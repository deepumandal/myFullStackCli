// core/promptHandler.ts
import enquirer from "enquirer";
import { Step, AnyType } from "../types";

const { prompt } = enquirer;

export async function runPrompts(
  step: Step,
  answers: Record<string, AnyType> = {}
): Promise<Record<string, AnyType>> {
  let currentStep: Step | undefined = step;
  const stack: Step[] = [];

  while (currentStep) {
    const { name, type, message, choices, initial, validate } = currentStep;

    const promptConfig: {
      name: string;
      type: string;
      message: string;
      initial?: string;
      validate?: (value: string) => boolean | string;
      choices?: { name: string; message: string }[];
    } = {
      name,
      type,
      message
    };

    if (choices) {
      promptConfig.choices = choices.map((choice) => ({
        name: choice.value,
        message: choice.title
      }));
    }

    if (initial) promptConfig.initial = initial;
    if (validate) promptConfig.validate = validate;

    const response = await prompt<Record<string, AnyType>>(promptConfig);
    const userChoice = response[name];

    if (userChoice === "exit") {
      process.exit(0);
    }

    if (userChoice === "back") {
      currentStep = stack.pop();
      continue;
    }

    answers[name] = userChoice;

    let nextStep: Step | undefined;

    if (currentStep.action) {
      const result = await currentStep.action(answers);
      if (result && typeof result === "object" && result.name) {
        nextStep = result;
      }
    }

    if (!nextStep && currentStep.next && currentStep.next[userChoice]) {
      nextStep = currentStep.next[userChoice];
    }

    if (!nextStep && currentStep.defaultNext) {
      nextStep = currentStep.defaultNext;
    }

    if (nextStep) {
      stack.push(currentStep);
    }

    currentStep = nextStep;
  }
  return answers;
}
