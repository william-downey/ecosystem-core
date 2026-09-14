import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  ROLES,
  type NewSpecies,
  type Role,
  type Species,
  createSpecies,
  deleteSpecies,
  fetchSpecies,
} from "./api.js";

const ROLE_EMOJI: Record<Role, string> = {
  producer: "\u{1F331}",
  herbivore: "\u{1F407}",
  carnivore: "\u{1F98A}",
  omnivore: "\u{1F43B}",
  decomposer: "\u{1F344}",
};

export function App() {
  const [species, setSpecies] = useState<Species[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [role, setRole] = useState<Role>("producer");
  const [population, setPopulation] = useState("0");
  const [submitting, setSubmitting] = useState(false);

  async function refresh() {
    try {
      setSpecies(await fetchSpecies());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refresh();
  }, []);

  const totalPopulation = useMemo(
    () => species.reduce((sum, s) => sum + s.population, 0),
    [species],
  );

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    const payload: NewSpecies = {
      name: name.trim(),
      role,
      population: Number(population),
    };
    try {
      await createSpecies(payload);
      setName("");
      setRole("producer");
      setPopulation("0");
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: number) {
    setError(null);
    try {
      await deleteSpecies(id);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  }

  return (
    <div className="page">
      <header className="header">
        <h1>
          <span aria-hidden="true">{"\u{1F30D}"}</span> Ecosystem Core
        </h1>
        <p className="subtitle">Species registry for a living ecosystem</p>
      </header>

      <section className="stats">
        <div className="stat">
          <span className="stat-value">{species.length}</span>
          <span className="stat-label">species tracked</span>
        </div>
        <div className="stat">
          <span className="stat-value">{totalPopulation.toLocaleString()}</span>
          <span className="stat-label">total population</span>
        </div>
      </section>

      <form className="card form" onSubmit={handleSubmit}>
        <h2>Add a species</h2>
        <div className="fields">
          <label>
            Name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Monarch Butterfly"
              required
            />
          </label>
          <label>
            Role
            <select value={role} onChange={(e) => setRole(e.target.value as Role)}>
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {ROLE_EMOJI[r]} {r}
                </option>
              ))}
            </select>
          </label>
          <label>
            Population
            <input
              type="number"
              min="0"
              step="1"
              value={population}
              onChange={(e) => setPopulation(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit" disabled={submitting || name.trim().length === 0}>
          {submitting ? "Adding\u2026" : "Add species"}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      <section className="card">
        <h2>Registry</h2>
        {loading ? (
          <p className="muted">Loading{"\u2026"}</p>
        ) : species.length === 0 ? (
          <p className="muted">No species yet. Add the first one above.</p>
        ) : (
          <ul className="species-list">
            {species.map((s) => (
              <li key={s.id} className="species">
                <span className="role-badge" data-role={s.role}>
                  {ROLE_EMOJI[s.role]} {s.role}
                </span>
                <span className="species-name">{s.name}</span>
                <span className="species-pop">
                  {s.population.toLocaleString()}
                </span>
                <button
                  className="delete"
                  onClick={() => handleDelete(s.id)}
                  aria-label={`Delete ${s.name}`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
