import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Job } from "@/lib/backend/types";
import { isRushMode } from "@/lib/temporal";

export function FSMJobStatusCard({
  job,
  clientName,
}: {
  job: Job;
  clientName?: string;
}) {
  const rush = isRushMode(job);
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-xs text-muted-foreground">{job.id}</p>
          <div className="flex gap-2">
            {rush ? <Badge>Rush mode</Badge> : null}
            <Badge variant="secondary">{job.status}</Badge>
          </div>
        </div>
        <CardTitle className="font-heading text-3xl">
          {String(job.intake_form_data.project_name ?? "Untitled project")}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2 text-sm text-muted-foreground">
        <p>{clientName ?? job.client_id}</p>
        <p>
          {String(job.intake_form_data.track_count ?? "—")} tracks ·{" "}
          {String(job.intake_form_data.sample_rate ?? "")} ·{" "}
          {String(job.intake_form_data.bit_depth ?? "")}
        </p>
        <div className="flex gap-3 pt-2">
          <Link className="text-primary underline-offset-4 hover:underline" href={`/fifty-seven-mastering/status/${job.id}`}>
            Status
          </Link>
          <Link className="text-primary underline-offset-4 hover:underline" href={`/fifty-seven-mastering/delivery/${job.id}`}>
            Delivery
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
