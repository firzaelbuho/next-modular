#!/usr/bin/env bun

import { Command } from "commander";
import pc from "picocolors";

import { generateNextPageModule } from "./generators/next-page/create-module";
import { generateNextAppModule } from "./generators/next-app/create-module";

const version = "1.0.0";

const program = new Command();

program
  .name("nxt-modular")
  .description("CLI Generator for Next.js Modular Architecture")
  .version(version);

/* --------------------------------------------------
 * create (Page Router)
 * -------------------------------------------------- */
program
  .command("create")
  .description("Create module using Next.js Page Router")
  .argument("<name>", "Module name (kebab-case)")
  .option("--src", "Generate inside src/ directory")
  .action((name: string, options: { src?: boolean }) => {
    console.log(pc.cyan("→ Generating Next.js Page Router module..."));
    generateNextPageModule(name, {
      useSrcDir: Boolean(options.src),
    });
    console.log(pc.green("✔ Done"));
  });

/* --------------------------------------------------
 * create-app (App Router)
 * -------------------------------------------------- */
program
  .command("create-app")
  .description("Create module using Next.js App Router")
  .argument("<name>", "Module name (kebab-case)")
  .option("--src", "Generate inside src/ directory")
  .action((name: string, options: { src?: boolean }) => {
    console.log(pc.cyan("→ Generating Next.js App Router module..."));
    generateNextAppModule(name, {
      useSrcDir: Boolean(options.src),
    });
    console.log(pc.green("✔ Done"));
  });

program.parse(process.argv);
