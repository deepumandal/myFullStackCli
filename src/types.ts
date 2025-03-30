import { PromptObject } from "prompts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyType = any;

export interface Step extends PromptObject {
  name: string;
  next?: Record<string, Step>;
  defaultNext?: Step;
  action?: (answers: Record<string, AnyType>) => void | Step | Promise<Step | void>;
}
