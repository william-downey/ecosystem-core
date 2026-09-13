"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Job } from "@/lib/backend/types";
import { toast } from "sonner";
import { useState } from "react";

const STATUSES = ["received", "in_progress", "ready_for_delivery", "delivered"];

export function JobStatusControls({ job }: { job: Job }) {
  const router = useRouter();
  const [status, setStatus] = useState(job.status);
  const [pending, setPending] = useState(false);

  async function save() {
    setPending(true);
    const response = await fetch(`/api/jobs/${job.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data = await response.json();
    setPending(false);
    if (!response.ok) {
      toast.error(data.error ?? "Update failed");
      return;
    }
    toast.success(`Status → ${status}`);
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <Select value={status} onValueChange={(value) => setStatus(String(value ?? job.status))}>
        <SelectTrigger className="w-56">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {STATUSES.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button size="sm" onClick={save} disabled={pending}>
        Update status
      </Button>
    </div>
  );
}
