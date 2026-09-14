import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

export type Role = "producer" | "herbivore" | "carnivore" | "omnivore" | "decomposer";

export interface Species {
  id: number;
  name: string;
  role: Role;
  population: number;
  createdAt: string;
}

export interface NewSpecies {
  name: string;
  role: Role;
  population: number;
}

export const ROLES: Role[] = [
  "producer",
  "herbivore",
  "carnivore",
  "omnivore",
  "decomposer",
];

/**
 * Opens (and migrates) a SQLite database. Pass ":memory:" for an ephemeral
 * database, which is used by the test suite.
 */
export function createDatabase(path: string): Database.Database {
  if (path !== ":memory:") {
    mkdirSync(dirname(path), { recursive: true });
  }

  const db = new Database(path);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  db.exec(`
    CREATE TABLE IF NOT EXISTS species (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      population INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  return db;
}

function rowToSpecies(row: {
  id: number;
  name: string;
  role: string;
  population: number;
  created_at: string;
}): Species {
  return {
    id: row.id,
    name: row.name,
    role: row.role as Role,
    population: row.population,
    createdAt: row.created_at,
  };
}

export function listSpecies(db: Database.Database): Species[] {
  const rows = db
    .prepare("SELECT * FROM species ORDER BY created_at DESC, id DESC")
    .all() as Parameters<typeof rowToSpecies>[0][];
  return rows.map(rowToSpecies);
}

export function getSpecies(db: Database.Database, id: number): Species | undefined {
  const row = db.prepare("SELECT * FROM species WHERE id = ?").get(id) as
    | Parameters<typeof rowToSpecies>[0]
    | undefined;
  return row ? rowToSpecies(row) : undefined;
}

export function insertSpecies(db: Database.Database, input: NewSpecies): Species {
  const result = db
    .prepare("INSERT INTO species (name, role, population) VALUES (?, ?, ?)")
    .run(input.name, input.role, input.population);
  const created = getSpecies(db, Number(result.lastInsertRowid));
  if (!created) {
    throw new Error("Failed to load species immediately after insert");
  }
  return created;
}

export function deleteSpecies(db: Database.Database, id: number): boolean {
  const result = db.prepare("DELETE FROM species WHERE id = ?").run(id);
  return result.changes > 0;
}

/** Inserts a small demo dataset when the table is empty. */
export function seedIfEmpty(db: Database.Database): void {
  const count = (db.prepare("SELECT COUNT(*) AS n FROM species").get() as { n: number }).n;
  if (count > 0) return;

  const seed: NewSpecies[] = [
    { name: "Oak Tree", role: "producer", population: 1200 },
    { name: "Field Mouse", role: "herbivore", population: 5400 },
    { name: "Red Fox", role: "carnivore", population: 42 },
  ];
  const insert = db.prepare(
    "INSERT INTO species (name, role, population) VALUES (?, ?, ?)",
  );
  const tx = db.transaction((items: NewSpecies[]) => {
    for (const item of items) insert.run(item.name, item.role, item.population);
  });
  tx(seed);
}
