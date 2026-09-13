import { Badge } from "@/components/ui/badge";
import type { Job } from "@/lib/backend/types";

export function FSMDeliveryPanel({ job }: { job: Job }) {
  const folder = String(job.delivery_links.dropbox_folder ?? "");
  const samply = String(job.delivery_links.samply_link ?? "");
  const ready = job.status === "ready_for_delivery" && folder && samply;

  if (!ready) {
    return (
      <div className="rounded-lg border border-dashed border-border px-5 py-10">
        <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">Delivery</p>
        <h2 className="mt-3 font-heading text-3xl">Not ready</h2>
        <p className="mt-2 max-w-lg text-sm text-muted-foreground">
          Dropbox folders and Samply links are created when job status becomes ready_for_delivery.
          Current status: {job.status}.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card p-5 md:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
          client_delivery_only · per_job
        </p>
        <Badge>Ready</Badge>
      </div>
      <h2 className="mt-4 font-heading text-3xl">
        {String(job.intake_form_data.project_name ?? "Deliverables")}
      </h2>
      <dl className="mt-6 grid gap-4 text-sm">
        <div>
          <dt className="text-muted-foreground">Dropbox folder</dt>
          <dd className="mt-1 font-mono break-all">{folder}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Samply</dt>
          <dd className="mt-1">
            <a className="text-primary underline-offset-4 hover:underline" href={samply}>
              {samply}
            </a>
          </dd>
        </div>
      </dl>
    </div>
  );
}
