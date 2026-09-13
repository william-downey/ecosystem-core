"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const fieldClass = cn(
  "h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none",
  "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
);

export function FSMIntakeForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const client_name = String(formData.get("client_name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const project_name = String(formData.get("project_name") ?? "").trim();
    if (!client_name || !email || !project_name) {
      setError("Client name, email, and project name are required.");
      return;
    }
    setPending(true);
    setError(null);
    const payload = {
      brand: "Fifty-Seven Mastering",
      client_name,
      email,
      rush: formData.get("rush") === "on",
      intake_form_data: {
        project_name,
        track_count: Number(formData.get("track_count") ?? 1),
        sample_rate: String(formData.get("sample_rate") ?? "48kHz"),
        bit_depth: String(formData.get("bit_depth") ?? "24-bit"),
        notes: String(formData.get("notes") ?? ""),
      },
    };
    const response = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
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
    <form onSubmit={onSubmit} className="grid gap-4 rounded-lg border border-border bg-card p-5 md:p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="client_name">Client name</Label>
          <input id="client_name" name="client_name" required placeholder="Harbor Records" className={fieldClass} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="studio@harbor.example"
            className={fieldClass}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="project_name">Project name</Label>
          <input id="project_name" name="project_name" required placeholder="Harbor EP" className={fieldClass} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="track_count">Track count</Label>
          <input id="track_count" name="track_count" type="number" min={1} defaultValue={1} className={fieldClass} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="sample_rate">Sample rate</Label>
          <input id="sample_rate" name="sample_rate" defaultValue="48kHz" className={fieldClass} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="bit_depth">Bit depth</Label>
          <input id="bit_depth" name="bit_depth" defaultValue="24-bit" className={fieldClass} />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="notes">Notes</Label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          placeholder="References, loudness, vinyl parts..."
          className="min-h-24 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="rush" className="size-4 accent-orange-500" />
        Rush — prioritize in queue and send additional status emails
      </label>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      <button type="submit" disabled={pending} className={buttonVariants()}>
        {pending ? "Sending intake…" : "Submit intake"}
      </button>
    </form>
  );
}
