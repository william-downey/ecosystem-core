import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { createApp } from "./app.js";
import { createDatabase, seedIfEmpty } from "./db.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const PORT = Number(process.env.PORT ?? 3000);
const DATABASE_PATH =
  process.env.DATABASE_PATH ?? resolve(__dirname, "../data/ecosystem.sqlite");

const db = createDatabase(DATABASE_PATH);
seedIfEmpty(db);

const app = createApp(db);

const server = app.listen(PORT, () => {
  console.log(`[ecosystem-core] API listening on http://localhost:${PORT}`);
  console.log(`[ecosystem-core] Database: ${DATABASE_PATH}`);
});

function shutdown(signal: string): void {
  console.log(`\n[ecosystem-core] Received ${signal}, shutting down...`);
  server.close(() => {
    db.close();
    process.exit(0);
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
