import { AdminShell } from "@/components/admin/AdminShell";
import { brandDirectory } from "@/lib/spec";
import { listAutomationTriggers, listJobs, listLibraryItems, listSignals } from "@/lib/backend/store";
import { NORTHERN_AFTERLIGHT, RECORD_LABEL_GOVERNANCE_NAME } from "@/lib/brands";

export const dynamic = "force-dynamic";

export default function AdminOverviewPage() {
  const stats = [
    {
      label: "Brands",
      value: Object.keys(brandDirectory).length,
    },
    {
      label: "NA library items",
      value: listLibraryItems({ brand: NORTHERN_AFTERLIGHT }).length,
    },
    {
      label: "Mastering jobs",
      value: listJobs("Fifty-Seven Mastering").length,
    },
    {
      label: "Active signals",
      value: listSignals(RECORD_LABEL_GOVERNANCE_NAME).filter((signal) => signal.active).length,
    },
    {
      label: "Automation events",
      value: listAutomationTriggers().length,
    },
  ];

  return (
    <AdminShell title="Brand overview" active="/admin">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-border bg-card p-5">
            <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">{stat.label}</p>
            <p className="mt-2 font-heading text-4xl">{stat.value}</p>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
