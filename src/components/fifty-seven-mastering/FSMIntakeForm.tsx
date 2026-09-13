"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const fieldClass = cn(
  "h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none",
  "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
);

type IntakeFields = {
  client_name: string;
  email: string;
  project_name: string;
  track_count: string;
  sample_rate: string;
  bit_depth: string;
  notes: string;
  rush: boolean;
};

export function FSMIntakeForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [fields, setFields] = useState<IntakeFields>({
    client_name: "",
    email: "",
    project_name: "",
    track_count: "1",
    sample_rate: "48kHz",
    bit_depth: "24-bit",
    notes: "",
    rush: false,
  });

  useEffect(() => {
    setHydrated(true);
  }, []);

  function update<K extends keyof IntakeFields>(key: K, value: IntakeFields[K]) {
    setFields((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const client_name = fields.client_name.trim();
    const email = fields.email.trim();
    const project_name = fields.project_name.trim();
    if (!client_name || !email || !project_name) {
      setError("Client name, email, and project name are required.");
      return;
    }
    setPending(true);
    setError(null);
    const response = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        brand: "Fifty-Seven Mastering",
        client_name,
        email,
        rush: fields.rush,
        intake_form_data: {
          project_name,
          track_count: Number(fields.track_count || 1),
          sample_rate: fields.sample_rate,
          bit_depth: fields.bit_depth,
          notes: fields.notes,
        },
      }),
    });
    const data = await response.json();
    setPending(false);
    if (!response.ok) {
      setError(data.error ?? "Intake failed.");
      return;
    }
    toast.success("Intake received. Confirmation queued.");
    router.push(`/fifty-seven-mastering/status/${data.job.id}`);
    router.refresh();
  }

  return (
    <form
      onSubmit={onSubmit}
      method="post"
      action="#"
      autoComplete="off"
      data-ready={hydrated ? "true" : "false"}
      className="grid gap-4 rounded-lg border border-border bg-card p-5 md:p-6"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="client_name">Client name</Label>
          <input
            id="client_name"
            name="fsm_client_name"
            autoComplete="off"
            value={fields.client_name}
            onChange={(event) => update("client_name", event.target.value)}
            required
            placeholder="Harbor Records"
            className={fieldClass}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <input
            id="email"
            name="fsm_email"
            type="email"
            autoComplete="off"
            value={fields.email}
            onChange={(event) => update("email", event.target.value)}
            required
            placeholder="studio@harbor.example"
            className={fieldClass}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="project_name">Project name</Label>
          <input
            id="project_name"
            name="fsm_project_name"
            autoComplete="off"
            value={fields.project_name}
            onChange={(event) => update("project_name", event.target.value)}
            required
            placeholder="Harbor EP"
            className={fieldClass}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="track_count">Track count</Label>
          <input
            id="track_count"
            name="fsm_track_count"
            type="number"
            min={1}
            autoComplete="off"
            value={fields.track_count}
            onChange={(event) => update("track_count", event.target.value)}
            className={fieldClass}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="sample_rate">Sample rate</Label>
          <input
            id="sample_rate"
            name="fsm_sample_rate"
            autoComplete="off"
            value={fields.sample_rate}
            onChange={(event) => update("sample_rate", event.target.value)}
            className={fieldClass}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="bit_depth">Bit depth</Label>
          <input
            id="bit_depth"
            name="fsm_bit_depth"
            autoComplete="off"
            value={fields.bit_depth}
            onChange={(event) => update("bit_depth", event.target.value)}
            className={fieldClass}
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="notes">Notes</Label>
        <textarea
          id="notes"
          name="fsm_notes"
          rows={4}
          autoComplete="off"
          value={fields.notes}
          onChange={(event) => update("notes", event.target.value)}
          placeholder="References, loudness, vinyl parts..."
          className="min-h-24 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="fsm_rush"
          checked={fields.rush}
          onChange={(event) => update("rush", event.target.checked)}
          className="size-4 accent-orange-500"
        />
        Rush — prioritize in queue and send additional status emails
      </label>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      <button type="submit" disabled={pending || !hydrated} className={buttonVariants()}>
        {pending ? "Sending intake…" : "Submit intake"}
      </button>
    </form>
  );
}
