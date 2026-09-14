import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import type Database from "better-sqlite3";
import {
  ROLES,
  type NewSpecies,
  type Role,
  deleteSpecies,
  insertSpecies,
  listSpecies,
} from "./db.js";

function validateNewSpecies(body: unknown): { value?: NewSpecies; error?: string } {
  if (typeof body !== "object" || body === null) {
    return { error: "Request body must be a JSON object" };
  }
  const { name, role, population } = body as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length === 0) {
    return { error: "`name` is required and must be a non-empty string" };
  }
  if (typeof role !== "string" || !ROLES.includes(role as Role)) {
    return { error: `\`role\` must be one of: ${ROLES.join(", ")}` };
  }
  if (
    typeof population !== "number" ||
    !Number.isInteger(population) ||
    population < 0
  ) {
    return { error: "`population` must be a non-negative integer" };
  }

  return { value: { name: name.trim(), role: role as Role, population } };
}

export function createApp(db: Database.Database): Express {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  app.get("/api/species", (_req: Request, res: Response) => {
    res.json(listSpecies(db));
  });

  app.post("/api/species", (req: Request, res: Response) => {
    const { value, error } = validateNewSpecies(req.body);
    if (error || !value) {
      res.status(400).json({ error });
      return;
    }
    const created = insertSpecies(db, value);
    res.status(201).json(created);
  });

  app.delete("/api/species/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ error: "`id` must be a positive integer" });
      return;
    }
    const removed = deleteSpecies(db, id);
    if (!removed) {
      res.status(404).json({ error: `No species with id ${id}` });
      return;
    }
    res.status(204).end();
  });

  return app;
}
