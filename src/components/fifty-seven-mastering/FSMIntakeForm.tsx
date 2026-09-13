"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function FSMIntakeForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setPending(true);
    setError(null);
    const payload = {
      brand: "Fifty-Seven Mastering",
      client_name: String(formData.get("client_name") ?? ""),
      email: String(formData.get("email") ?? ""),
      rush: formData.get("rush") === "on",
      intake_form_data: {
        project_name: String(formData.get("project_name") ?? ""),
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
    <form action={onSubmit} className="grid gap-4 rounded-lg border border-border bg-card p-5 md:p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="client_name">Client name</Label>
          <Input id="client_name" name="client_name" required placeholder="Harbor Records" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required placeholder="studio@harbor.example" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="project_name">Project name</Label>
          <Input id="project_name" name="project_name" required placeholder="Harbor EP" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="track_count">Track count</Label>
          <Input id="track_count" name="track_count" type="number" min={1} defaultValue={1} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="sample_rate">Sample rate</Label>
          <Input id="sample_rate" name="sample_rate" defaultValue="48kHz" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="bit_depth">Bit depth</Label>
          <Input id="bit_depth" name="bit_depth" defaultValue="24-bit" />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" name="notes" rows={4} placeholder="References, loudness, vinyl parts..." />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="rush" className="size-4 accent-orange-500" />
        Rush — prioritize in queue and send additional status emails
      </label>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Sending intake…" : "Submit intake"}
      </Button>
    </form>
  );
}
