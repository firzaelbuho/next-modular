#!/usr/bin/env bun
import { Command } from "commander";
import pc from "picocolors";

import { generateNextPageModule } from "./generators/next-page/create-module";
import { generateNextAppModule } from "./generators/next-app/create-module";

const version = "1.0.0";

const program = new Command();

program
  .name("next-modular")
  .description("CLI Generator for Next.js Modular Architecture")
  .version(version);

/* --------------------------------------------------
 * COMMAND: create module (Next.js Page Router)
 * bunx next-modular create module home
 * -------------------------------------------------- */
program
  .command("create")
  .description("Create module (Next.js Page Router)")
  .command("module")
  .argument("<name>", "Module name (kebab-case)")
  .action((name: string) => {
    console.log(pc.cyan("→ Generating Next.js Page Router module..."));
    generateNextPageModule(name);
    console.log(pc.green("✔ Done"));
  });

/* --------------------------------------------------
 * COMMAND: create-app module (Next.js App Router)
 * bunx next-modular create-app module home
 * -------------------------------------------------- */
program
  .command("create-app")
  .description("Create module (Next.js App Router)")
  .command("module")
  .argument("<name>", "Module name (kebab-case)")
  .action((name: string) => {
    console.log(pc.cyan("→ Generating Next.js App Router module..."));
    generateNextAppModule(name);
    console.log(pc.green("✔ Done"));
  });

program.parse(process.argv);
