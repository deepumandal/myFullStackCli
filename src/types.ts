// types.ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyType = any;

export interface Choice {
  title: AnyType;
  value: AnyType;
}

export interface Step {
  name: AnyType;
  type: AnyType;
  message: AnyType;
  initial?: AnyType;
  choices?: Choice[];
  next?: Record<AnyType, Step>;
  defaultNext?: Step;
  default?: AnyType;
  validate?: (value: AnyType) => AnyType;
  action?: (answers: Record<AnyType, AnyType>) => void | Step | Promise<Step | void>;
}

export interface UIConfigInterface {
  path: string;
  cssPath: string;
  deps: string[];
  devDeps: string[];
}

export interface UIConfigsInterface {
  [key: string]: UIConfigInterface;
}
