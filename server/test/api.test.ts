import { afterEach, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import type { Express } from "express";
import type Database from "better-sqlite3";
import { createApp } from "../src/app.js";
import { createDatabase } from "../src/db.js";

describe("species API", () => {
  let db: Database.Database;
  let app: Express;

  beforeEach(() => {
    db = createDatabase(":memory:");
    app = createApp(db);
  });

  afterEach(() => {
    db.close();
  });

  it("reports health", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });

  it("starts with an empty species list", async () => {
    const res = await request(app).get("/api/species");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("creates and persists a species", async () => {
    const create = await request(app)
      .post("/api/species")
      .send({ name: "Honey Bee", role: "herbivore", population: 60000 });

    expect(create.status).toBe(201);
    expect(create.body).toMatchObject({
      name: "Honey Bee",
      role: "herbivore",
      population: 60000,
    });
    expect(create.body.id).toBeGreaterThan(0);

    const list = await request(app).get("/api/species");
    expect(list.body).toHaveLength(1);
    expect(list.body[0].name).toBe("Honey Bee");
  });

  it("rejects invalid input", async () => {
    const badName = await request(app)
      .post("/api/species")
      .send({ name: "", role: "herbivore", population: 10 });
    expect(badName.status).toBe(400);

    const badRole = await request(app)
      .post("/api/species")
      .send({ name: "Alien", role: "predator", population: 10 });
    expect(badRole.status).toBe(400);

    const badPop = await request(app)
      .post("/api/species")
      .send({ name: "Ghost", role: "carnivore", population: -5 });
    expect(badPop.status).toBe(400);
  });

  it("deletes a species", async () => {
    const create = await request(app)
      .post("/api/species")
      .send({ name: "Gray Wolf", role: "carnivore", population: 300 });
    const id = create.body.id as number;

    const del = await request(app).delete(`/api/species/${id}`);
    expect(del.status).toBe(204);

    const list = await request(app).get("/api/species");
    expect(list.body).toHaveLength(0);
  });

  it("returns 404 when deleting a missing species", async () => {
    const del = await request(app).delete("/api/species/99999");
    expect(del.status).toBe(404);
  });
});
