# ecosystem-core

A small full-stack **species registry** for tracking organisms in an ecosystem.
Built as a modern TypeScript monorepo: an Express + SQLite REST API and a
Vite + React single-page frontend.

## Stack

| Layer    | Technology                                  |
| -------- | ------------------------------------------- |
| Frontend | Vite, React 18, TypeScript                  |
| Backend  | Node.js, Express, TypeScript (ESM)          |
| Storage  | SQLite (via `better-sqlite3`), file-backed  |
| Tooling  | npm workspaces, ESLint, Vitest, `tsx`       |

## Project layout

```
.
├── client/           # Vite + React frontend
├── server/           # Express + SQLite API
└── package.json      # npm workspaces root
```

## Getting started

Requires Node.js >= 20.

```bash
npm install        # install all workspace dependencies
npm run dev        # start API (:3000) and web (:5173) together
```

Then open http://localhost:5173. The Vite dev server proxies `/api/*` to the
API on port 3000.

## Common commands

| Command             | Description                                    |
| ------------------- | ---------------------------------------------- |
| `npm run dev`       | Run API + client concurrently (dev)            |
| `npm run dev:server`| Run just the API with hot reload               |
| `npm run dev:client`| Run just the Vite dev server                   |
| `npm run build`     | Type-check and build server + client for prod  |
| `npm run start`     | Run the built API (serves on :3000)            |
| `npm test`          | Run the server test suite (Vitest + Supertest) |
| `npm run lint`      | Lint server and client                         |
| `npm run typecheck` | Type-check server and client                   |

## API

| Method   | Route                | Description                  |
| -------- | -------------------- | ---------------------------- |
| `GET`    | `/api/health`        | Health check                 |
| `GET`    | `/api/species`       | List all species             |
| `POST`   | `/api/species`       | Create a species             |
| `DELETE` | `/api/species/:id`   | Delete a species by id       |

A species has a `name`, a `role` (`producer`, `herbivore`, `carnivore`,
`omnivore`, or `decomposer`), and a non-negative integer `population`.

Data is persisted to `server/data/ecosystem.sqlite` (git-ignored). Override the
location with `DATABASE_PATH` and the API port with `PORT`.
