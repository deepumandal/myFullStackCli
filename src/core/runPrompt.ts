// promptHandler.ts
import prompts from "prompts";
import { AnyType, Step } from "../types";

export async function runPrompts(
  step: Step,
  answers: Record<string, AnyType> = {}
): Promise<Record<string, AnyType>> {
  let currentStep: Step | undefined = step;
  const stack: Step[] = [];

  while (currentStep) {
    const response = await prompts(currentStep);

    const key = currentStep.name;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const userChoice = response[key];

    if (userChoice === "exit") {
      console.log("👋 Exiting...");
      process.exit(0);
    }

    if (userChoice === "back") {
      currentStep = stack.pop();
      continue;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    answers[key] = userChoice;

    let nextStep: Step | undefined;

    // Allow dynamic step from action
    if (currentStep.action) {
      const result = await currentStep.action(answers);
      if (result && typeof result === "object" && result.name) {
        nextStep = result;
      }
    }

    // Prioritize: action > next[userChoice] > defaultNext
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!nextStep && currentStep.next && currentStep.next[userChoice]) {
      nextStep = currentStep.next[userChoice];
    }

    if (!nextStep && currentStep.defaultNext) {
      nextStep = currentStep.defaultNext;
    }

    if (nextStep) {
      stack.push(currentStep);
    }

    // console.table(stack)
    currentStep = nextStep;
  }

  return answers;
}
