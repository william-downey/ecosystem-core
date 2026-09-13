import { AdminShell } from "@/components/admin/AdminShell";
import { JobStatusControls } from "@/components/admin/JobStatusControls";
import { listClients, listJobs } from "@/lib/backend/store";
import { FIFTY_SEVEN_MASTERING } from "@/lib/brands";
import { prioritizeMasteringQueue } from "@/lib/temporal";

export const dynamic = "force-dynamic";

export default function AdminFsmPage() {
  const jobs = prioritizeMasteringQueue(listJobs(FIFTY_SEVEN_MASTERING));
  const clients = listClients(FIFTY_SEVEN_MASTERING);
  const clientName = (id: string) => clients.find((client) => client.id === id)?.name ?? id;

  return (
    <AdminShell title="Fifty-Seven Mastering" active="/admin/fifty-seven-mastering">
      <div className="grid gap-8">
        <section>
          <h2 className="mb-3 text-sm tracking-[0.16em] text-muted-foreground uppercase">
            Intake queue / job status board
          </h2>
          <div className="grid gap-4">
            {jobs.map((job) => (
              <div key={job.id} className="rounded-lg border border-border bg-card p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-medium">
                      {String(job.intake_form_data.project_name ?? "Untitled")} ·{" "}
                      {clientName(job.client_id)}
                    </p>
                    <p className="font-mono text-xs text-muted-foreground">{job.id}</p>
                  </div>
                  <JobStatusControls job={job} />
                </div>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2 className="mb-3 text-sm tracking-[0.16em] text-muted-foreground uppercase">
            Delivery link manager
          </h2>
          <ul className="grid gap-2 text-sm">
            {jobs.map((job) => (
              <li key={`${job.id}-del`} className="rounded-md border border-border px-3 py-2">
                {String(job.intake_form_data.project_name)} —{" "}
                {String(job.delivery_links.samply_project ?? "no Samply project yet")}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="mb-3 text-sm tracking-[0.16em] text-muted-foreground uppercase">
            Client communication log
          </h2>
          <p className="text-sm text-muted-foreground">
            Email events for this brand appear under Automation monitoring after intake and delivery
            scenarios run.
          </p>
        </section>
      </div>
    </AdminShell>
  );
}
