import { AdminShell } from "@/components/admin/AdminShell";
import { listJobs } from "@/lib/backend/store";
import { FIFTY_SEVEN_MASTERING } from "@/lib/brands";
import { deliveryMap } from "@/lib/spec";

export const dynamic = "force-dynamic";

export default function AdminDeliveryPage() {
  const jobs = listJobs(FIFTY_SEVEN_MASTERING);
  return (
    <AdminShell title="Delivery monitoring" active="/admin/delivery">
      <p className="mb-6 text-sm text-muted-foreground">
        Mastering root: {deliveryMap.fifty_seven_mastering.dropbox.root_folder}. Northern Afterlight
        assets: {deliveryMap.northern_afterlight.dropbox.root_folder}. Samply is disabled for
        Northern Afterlight.
      </p>
      <div className="grid gap-3">
        {jobs.map((job) => (
          <div key={job.id} className="rounded-lg border border-border bg-card p-4 text-sm">
            <p className="font-medium">{String(job.intake_form_data.project_name ?? job.id)}</p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              {String(job.delivery_links.dropbox_folder ?? "no dropbox folder")}
            </p>
            <p className="font-mono text-xs text-muted-foreground">
              {String(job.delivery_links.samply_link ?? "no samply link")}
            </p>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
