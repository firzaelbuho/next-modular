import * as fs from "fs";
import * as path from "path";

// ----------------------------------------------------------
// Helpers (LOCAL, PURE)
// ----------------------------------------------------------

function toKebab(input: string): string {
  return input.trim().toLowerCase().replace(/[\s_]+/g, "-");
}

function toPascal(input: string): string {
  return input
    .split(/[-/]/g)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}

function timestamp(): string {
  const d = new Date();
  const pad = (n: number) => (n < 10 ? "0" + n : n);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
    d.getDate()
  )} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

// ----------------------------------------------------------
// Public API
// ----------------------------------------------------------

export function generateNextPageModule(moduleName: string): void {
  const rawModuleName = toKebab(moduleName);
  const pascal = toPascal(rawModuleName);

  // --------------------------------------------------------
  // Paths (STRICT)
  // --------------------------------------------------------

  const SRC = "src";

  const modulePath = path.join(SRC, "modules", rawModuleName);
  const moduleIndexPath = path.join(modulePath, "index.tsx");

  const pageDir = path.join(SRC, "pages", rawModuleName);
  const pageIndexPath = path.join(pageDir, "index.tsx");

  const logFile = "module.log";
  const jsonFile = "module.json";

  // --------------------------------------------------------
  // Guard: prevent overwrite
  // --------------------------------------------------------

  if (fs.existsSync(modulePath)) {
    throw new Error(`Module "${rawModuleName}" already exists.`);
  }

  // --------------------------------------------------------
  // Create folders
  // --------------------------------------------------------

  fs.mkdirSync(path.join(modulePath, "components"), { recursive: true });
  fs.mkdirSync(pageDir, { recursive: true });

  // --------------------------------------------------------
  // store.ts (Zustand – dumb)
  // --------------------------------------------------------

  fs.writeFileSync(
    path.join(modulePath, "store.ts"),
    `import { create } from "zustand";
import type { ${pascal}State } from "./types";
import { DEFAULT_${pascal.toUpperCase()}_STATE } from "./values";

export const use${pascal}Store = create<${pascal}State>(() => ({
  ...DEFAULT_${pascal.toUpperCase()}_STATE
}));
`
  );

  // --------------------------------------------------------
  // types.ts
  // --------------------------------------------------------

  fs.writeFileSync(
    path.join(modulePath, "types.ts"),
    `export type ${pascal}State = {
  count: number;
};
`
  );

  // --------------------------------------------------------
  // values.ts
  // --------------------------------------------------------

  fs.writeFileSync(
    path.join(modulePath, "values.ts"),
    `export const DEFAULT_${pascal.toUpperCase()}_STATE = {
  count: 0
};
`
  );

  // --------------------------------------------------------
  // service.ts (ALL MUTATION HERE)
  // --------------------------------------------------------

  fs.writeFileSync(
    path.join(modulePath, "service.ts"),
    `import { use${pascal}Store } from "./store";

export function increment(): void {
  const { count } = use${pascal}Store.getState();
  use${pascal}Store.setState({ count: count + 1 });
}

export function decrement(): void {
  const { count } = use${pascal}Store.getState();
  use${pascal}Store.setState({ count: count - 1 });
}
`
  );

  // --------------------------------------------------------
  // modules/<name>/index.tsx (DUMB UI ROOT)
  // --------------------------------------------------------

  fs.writeFileSync(
    moduleIndexPath,
    `import { use${pascal}Store } from "./store";
import { increment, decrement } from "./service";

export default function ${pascal}Page() {
  const count = use${pascal}Store((s) => s.count);

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 space-y-4">
      <h1 className="text-3xl font-bold">
        Hello, this is ${pascal} module
      </h1>

      <p className="text-base-content opacity-80">
        Count: {count}
      </p>

      <div className="flex gap-2">
        <button className="btn btn-primary" onClick={increment}>
          Increase
        </button>
        <button className="btn btn-secondary" onClick={decrement}>
          Decrease
        </button>
      </div>
    </main>
  );
}
`
  );

  // --------------------------------------------------------
  // pages/<name>/index.tsx (ROUTE ONLY)
  // --------------------------------------------------------

  fs.writeFileSync(
    pageIndexPath,
    `import ${pascal}Page from "@/modules/${rawModuleName}";

export default function Page() {
  return <${pascal}Page />;
}
`
  );

  // --------------------------------------------------------
  // Logging
  // --------------------------------------------------------

  const logLine = `[${timestamp()}] Created module (page router): ${rawModuleName}\n`;
  fs.appendFileSync(logFile, logLine);

  // --------------------------------------------------------
  // module.json
  // --------------------------------------------------------

  type ModuleEntry = { name: string; route: string; router: "page" };

  let jsonData: { modules: ModuleEntry[] } = { modules: [] };

  if (fs.existsSync(jsonFile)) {
    try {
      const content = fs.readFileSync(jsonFile, "utf8");
      jsonData = JSON.parse(content);
    } catch {
      // ignore, regenerate
    }
  }

  jsonData.modules = jsonData.modules.filter(
    (m) => m.name !== rawModuleName
  );

  jsonData.modules.push({
    name: rawModuleName,
    route: `/${rawModuleName}`,
    router: "page"
  });

  fs.writeFileSync(jsonFile, JSON.stringify(jsonData, null, 2));
}
