export type Role =
  | "producer"
  | "herbivore"
  | "carnivore"
  | "omnivore"
  | "decomposer";

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

async function parseError(res: Response): Promise<never> {
  let message = `Request failed (${res.status})`;
  try {
    const body = await res.json();
    if (body && typeof body.error === "string") message = body.error;
  } catch {
    // ignore non-JSON error bodies
  }
  throw new Error(message);
}

export async function fetchSpecies(): Promise<Species[]> {
  const res = await fetch("/api/species");
  if (!res.ok) return parseError(res);
  return res.json();
}

export async function createSpecies(input: NewSpecies): Promise<Species> {
  const res = await fetch("/api/species", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) return parseError(res);
  return res.json();
}

export async function deleteSpecies(id: number): Promise<void> {
  const res = await fetch(`/api/species/${id}`, { method: "DELETE" });
  if (!res.ok && res.status !== 204) return parseError(res);
}
