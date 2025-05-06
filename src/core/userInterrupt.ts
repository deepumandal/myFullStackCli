import { Ora } from "ora";

export function handleUserInterrupt(spinner?: Ora) {
  process.on("SIGINT", () => {
    if (spinner) spinner.stop();
    console.log("\n❌ Setup cancelled by user.");
    process.exit(1);
  });

  process.on("SIGTERM", () => {
    if (spinner) spinner.stop();
    console.log("\n🛑 Setup terminated.");
    process.exit(1);
  });
}
