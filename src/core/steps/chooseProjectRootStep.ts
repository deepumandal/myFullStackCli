import {
  messagesConstants,
  namesConstants,
  UIComponentsPaths,
  UIStylesPaths
} from "../../utils/constants";
import { Step } from "../../types";
import { promises as fs } from "fs";
import path from "path";

const { chooseProjectRoot, chooseUIRoot } = namesConstants;
const {
  enterProjectPath: enterProjectPathMessage,
  chooseUIRoot: chooseUIRootMessage,
  chooseUiCSSRoot: chooseUiCSSRootMessage
} = messagesConstants;

export const chooseProjectRootStep: Step = {
  name: chooseProjectRoot,
  type: "input",
  message: enterProjectPathMessage,
  validate: (value) => {
    if (value.trim().length === 0) {
      return "Please enter a project path.";
    }
    return true;
  }
};

export const chooseUIComponentsStep: Step = {
  name: chooseUIRoot,
  type: "input",
  message: chooseUIRootMessage,
  default: UIComponentsPaths,
  validate: async (value) => {
    if (value.trim().length === 0) {
      return "Please enter a UI Component Path.";
    }

    const resolvedPath = path.resolve(value.trim() as string);

    try {
      // Check if the path exists
      await fs.access(resolvedPath);
      return true; // Path exists
    } catch {
      // Path does not exist
      return `The path "${resolvedPath}" does not exist. Do you want to create it?`;
    }
  }
};

export const chooseUIStyleComponentsStep: Step = {
  name: chooseUIRoot,
  type: "input",
  message: chooseUiCSSRootMessage,
  default: UIStylesPaths,
  validate: async (value) => {
    if (value.trim().length === 0) {
      return "Please enter a UI Style Path.";
    }

    const resolvedPath = path.resolve(value.trim() as string);

    try {
      // Check if the path exists
      await fs.access(resolvedPath);
      return true; // Path exists
    } catch {
      // Path does not exist
      return `The path "${resolvedPath}" does not exist. Do you want to create it?`;
    }
  }
};
