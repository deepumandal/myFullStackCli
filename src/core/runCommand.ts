import { execa } from "execa";
import { AnyType } from "../types";

export async function runCommand(cmd: string) {
  try {
    const { stdout } = await execa(cmd);
    console.log(stdout); // Output: Hello, World!
  } catch (error: AnyType) {
    console.error("❌ Error executing command:", error.message);
  }
}
