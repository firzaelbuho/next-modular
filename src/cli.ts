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
 * COMMAND: create (Next.js Page Router)
 * bunx next-modular create home
 * -------------------------------------------------- */
program
  .command("create")
  .description("Create module using Next.js Page Router")
  .argument("<name>", "Module name (kebab-case)")
  .action((name: string) => {
    console.log(pc.cyan("→ Generating Next.js Page Router module..."));
    generateNextPageModule(name);
    console.log(pc.green("✔ Done"));
  });

/* --------------------------------------------------
 * COMMAND: create-app (Next.js App Router)
 * bunx next-modular create-app home
 * -------------------------------------------------- */
program
  .command("create-app")
  .description("Create module using Next.js App Router")
  .argument("<name>", "Module name (kebab-case)")
  .action((name: string) => {
    console.log(pc.cyan("→ Generating Next.js App Router module..."));
    generateNextAppModule(name);
    console.log(pc.green("✔ Done"));
  });

program.parse(process.argv);
