Berikut **versi README.md yang sudah DIUPDATE** agar **konsisten dengan fitur flag `--src`** dan perilaku generator terbaru.

Perubahan utama:

* ❌ Tidak lagi mengasumsikan `src/` sebagai default
* ✅ Menjelaskan **dua mode struktur**: *root-based* dan *src-based*
* ✅ Menambahkan dokumentasi **flag `--src`** di semua bagian relevan
* ❌ Tidak mengubah filosofi / aturan inti

---

# 💎 nxt-modular

**The Strict Modular Architecture Generator for Next.js**

🔗 **Repository:** [https://github.com/firzaelbuho/nxt-modular](https://github.com/firzaelbuho/nxt-modular)
📦 **NPM:** [https://www.npmjs.com/package/nxt-modular](https://www.npmjs.com/package/nxt-modular)

---

## 📌 Overview

`nxt-modular` is a **CLI generator** for building a **strict modular architecture** in **Next.js**, supporting both the **Page Router** and the **App Router**.

This tool **enforces architectural discipline**, not just scaffolding:

* 1 page = 1 module
* Dumb store
* Dumb UI
* All mutations go through services
* No `any`
* No logic inside route files
* No cross-module imports

If you are looking for a “quick but messy” generator, **this tool is not for you**.

---

## 📋 Table of Contents

1. [Installation](#-installation)
2. [Quick Start](#-quick-start)
3. [CLI Commands](#-cli-commands)
4. [Directory Modes (`--src`)](#-directory-modes---src)
5. [Supported Routers](#-supported-routers)
6. [Architecture Philosophy](#-architecture-philosophy)
7. [Module Structure](#-module-structure)
8. [State Management Rules](#-state-management-rules)
9. [Routing Rules](#-routing-rules)
10. [Styling Rules](#-styling-rules)
11. [License](#-license)

---

## 📦 Installation

### Using Bun (Recommended)

```bash
# Run directly
bunx nxt-modular create home

# Or install globally
bun add -g nxt-modular
```

### Using NPM / PNPM

```bash
npm install -g nxt-modular
# or
pnpm add -g nxt-modular
```

---

## 🚀 Quick Start

### Create a Module (Page Router, default)

```bash
bunx nxt-modular create home
```

**Output (no `src/`):**

```
modules/home/
pages/home/index.tsx
```

---

### Create a Module (Page Router, with `src/`)

```bash
bunx nxt-modular create home --src
```

**Output:**

```
src/modules/home/
src/pages/home/index.tsx
```

---

### Create a Module (App Router, default)

```bash
bunx nxt-modular create-app home
```

**Output (no `src/`):**

```
modules/home/
app/home/page.tsx
```

---

### Create a Module (App Router, with `src/`)

```bash
bunx nxt-modular create-app home --src
```

**Output:**

```
src/modules/home/
src/app/home/page.tsx
```

---

## 🛠 CLI Commands

### `create <name>`

Generate a **Next.js Page Router module**.

```bash
nxt-modular create user-profile
nxt-modular create user-profile --src
```

**Generated:**

* `modules/user-profile/` **or** `src/modules/user-profile/`
* `pages/user-profile/index.tsx` **or** `src/pages/user-profile/index.tsx`

---

### `create-app <name>`

Generate a **Next.js App Router module**.

```bash
nxt-modular create-app dashboard
nxt-modular create-app dashboard --src
```

**Generated:**

* `modules/dashboard/` **or** `src/modules/dashboard/`
* `app/dashboard/page.tsx` **or** `src/app/dashboard/page.tsx`

---

## 📂 Directory Modes (`--src`)

`nxt-modular` supports **two official directory layouts**.

### 1️⃣ Root-based (default)

Used by many Next.js projects.

```
modules/
pages/
app/
```

Command:

```bash
nxt-modular create home
```

---

### 2️⃣ `src/`-based (opt-in)

Used by teams that prefer stricter separation.

```
src/
├── modules/
├── pages/
└── app/
```

Command:

```bash
nxt-modular create home --src
```

> `--src` is **explicit by design**.
> The generator does not auto-detect to avoid ambiguity.

---

## 🔀 Supported Routers

| Router Type            | Supported |
| ---------------------- | --------- |
| Page Router (`pages/`) | ✅         |
| App Router (`app/`)    | ✅         |

**Important:**

* Page Router → `index.tsx`
* App Router → `page.tsx`
* **Do not mix conventions**

---

## 🏛 Architecture Philosophy

`nxt-modular` enforces **Strict Modularity**:

1. **One Page = One Module**
2. **No Circular Dependencies**
3. **No Cross-Module Imports**
4. **Strict TypeScript (no `any`)**
5. **Unidirectional Data Flow**

### Mental Model

> **UI renders.**
> **Store stores.**
> **Service decides.**
> **Route loads only.**

---

## 🧱 Module Structure

Example: `home`

```text
modules/home/
├── index.tsx        <- Module UI root (client)
├── store.ts         <- Zustand store (state only)
├── service.ts       <- All mutations & logic
├── types.ts         <- UI state types
├── values.ts        <- Default state
└── components/      <- Module-only components
```

> When using `--src`, the same structure lives under `src/modules/`.

### Rules

* Modules **cannot import other modules**
* Shared code must live in `shared/` or `src/shared/`
* `index.tsx` is the **only UI entry point**

---

## 🧠 State Management Rules (Zustand)

### Store (`store.ts`)

* ❌ No logic
* ❌ No async
* ❌ No actions
* ✅ State only

### Service (`service.ts`)

* ✅ `setState`
* ✅ async / fetch
* ✅ business rules
* ✅ orchestration

### UI

* ❌ Mutate store
* ❌ Fetch data
* ❌ Business logic
* ✅ Call service functions

---

## 🧭 Routing Rules

### Page Router

```tsx
import HomePage from "@/modules/home";

export default function Page() {
  return <HomePage />;
}
```

### App Router

```tsx
import HomePage from "@/modules/home";

export default function Page() {
  return <HomePage />;
}
```

**Route files are dumb loaders. Period.**

---

## 🎨 Styling Rules

This architecture **mandates**:

* **TailwindCSS**
* **DaisyUI**

### Styling Rules

* ❌ Inline styles
* ❌ Hardcoded colors
* ❌ Random CSS
* ✅ Tailwind utilities
* ✅ DaisyUI components (`btn`, `card`, `modal`)

### Layout Guidelines

* Use `max-w-5xl mx-auto`
* Split UI into section components
* Mobile-first, responsive grids

---

## ❌ What This Tool Intentionally Does NOT Do

* ❌ Auto-generate API routes
* ❌ Manage databases
* ❌ Provide magic state shortcuts
* ❌ Allow architectural shortcuts

This tool **optimizes for long-term sanity**, not short-term speed hacks.

---

## 📄 License

MIT License © firzaelbuho

---

**nxt-modular**
*Strict architecture. No shortcuts.*
