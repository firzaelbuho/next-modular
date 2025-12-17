
# 💎 nxt-modular

**The Strict Modular Architecture Generator for Next.js**

🔗 **Repository:** [https://github.com/firzaelbuho/nxt-modular](https://github.com/firzaelbuho/nxt-modular)
📦 **NPM:** [https://www.npmjs.com/package/nxt-modular](https://www.npmjs.com/package/nxt-modular)

---

## 📌 Overview

`nxt-modular` adalah **CLI generator** untuk membangun **arsitektur modular yang ketat** pada **Next.js**, baik menggunakan **Page Router** maupun **App Router**.

Tool ini **memaksa disiplin arsitektur**, bukan sekadar scaffold:

* 1 halaman = 1 module
* Store **dumb**
* UI **dumb**
* Semua mutasi lewat service
* Tidak ada `any`
* Tidak ada logic di route
* Tidak ada import silang antar module

Jika kamu mencari generator “cepat jadi tapi berantakan”, **ini bukan untukmu**.

---

## 📋 Table of Contents

1. [Installation](#-installation)
2. [Quick Start](#-quick-start)
3. [CLI Commands](#-cli-commands)
4. [Supported Routers](#-supported-routers)
5. [Architecture Philosophy](#-architecture-philosophy)
6. [Module Structure](#-module-structure)
7. [State Management Rules](#-state-management-rules)
8. [Routing Rules](#-routing-rules)
9. [Styling Rules](#-styling-rules)
10. [License](#-license)

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

### Create a Module (Page Router)

```bash
bunx nxt-modular create home
```

Output:

* `src/modules/home/`
* `src/pages/home/index.tsx`

---

### Create a Module (App Router)

```bash
bunx nxt-modular create-app home
```

Output:

* `src/modules/home/`
* `src/app/home/page.tsx`

---

## 🛠 CLI Commands

### `create <name>`

Generate a **Next.js Page Router module**.

```bash
nxt-modular create user-profile
```

**Generated:**

* `src/modules/user-profile/`
* `src/pages/user-profile/index.tsx`

---

### `create-app <name>`

Generate a **Next.js App Router module**.

```bash
nxt-modular create-app dashboard
```

**Generated:**

* `src/modules/dashboard/`
* `src/app/dashboard/page.tsx`

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
src/modules/home/
├── index.tsx        <- Module UI root (client)
├── store.ts         <- Zustand store (state only)
├── service.ts       <- All mutations & logic
├── types.ts         <- UI state types
├── values.ts        <- Default state
└── components/      <- Module-only components
```

### Rules

* Modules **cannot import other modules**
* Shared code goes to `src/shared/`
* `index.tsx` is the **only UI entry**

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

* ❌ mutate store
* ❌ fetch data
* ❌ business logic
* ✅ call service functions

---

## 🧭 Routing Rules

### Page Router

```text
src/pages/home/index.tsx
```

```tsx
import HomePage from "@/modules/home";

export default function Page() {
  return <HomePage />;
}
```

### App Router

```text
src/app/home/page.tsx
```

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
* ❌ Manage database
* ❌ Provide magic state shortcuts
* ❌ Allow architectural shortcuts

This tool **optimizes for long-term sanity**, not speed hacks.

---

## 📄 License

MIT License © firzaelbuho

---

**nxt-modular**
*Strict architecture. No shortcuts.*
