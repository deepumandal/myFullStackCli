// promptHandler.ts
import prompts from "prompts";
import { AnyType, Step } from "../types";

export async function runPrompts(
  step: Step,
  answers: Record<string, AnyType> = {}
): Promise<Record<string, AnyType>> {
  let currentStep: Step | undefined = step;
  const stack: Step[] = [];

  console.log("🔍 Initial Step:", currentStep.name); // Debug log

  while (currentStep) {
    console.log(`🟢 Current Step: ${currentStep.name}`); // Debug log
    console.log(`🔵 Stack:`, stack.map((s) => s.name)); // Debug log

    const response = await prompts(currentStep);
    console.log(`🟡 User Response:`, response); // Debug log

    const key = currentStep.name;
    const userChoice = response[key];

    if (userChoice === "exit") {
      console.log("👋 Exiting...");
    process.exit(0);
    }

    if (userChoice === "back") {
      console.log("🔙 Going back to the previous step...");
      currentStep = stack.pop();
      continue;
    }

    answers[key] = userChoice;

    let nextStep: Step | undefined;

    if (currentStep.action) {
      console.log(`⚙️ Executing action for step: ${currentStep.name}`); // Debug log
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

  console.log("✅ Final Answers:", answers); // Debug log
  return answers;
}
