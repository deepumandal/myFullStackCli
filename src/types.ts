import { PromptObject } from "prompts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyType = any;

// Custom type to enforce strings starting with a capital letter
export type CapitalizedString<T extends string> = T extends `${infer First}${infer Rest}`
  ? First extends Uppercase<First>
    ? `${First}${Rest}`
    : never
  : never;

export interface Step extends PromptObject {
  name: string;
  next?: Record<string, Step>;
  defaultNext?: Step;
  action?: (answers: Record<string, AnyType>) => void | Step | Promise<Step | void>;
}

export interface UIConfigInterface {
  // title: string; // Enforces the title to start with a capital letter
  path: string;
  cssPath: string;
  deps: string[];
  devDeps: string[];
}
export interface UIConfigsInterface {
  [key: string]: UIConfigInterface;
}
