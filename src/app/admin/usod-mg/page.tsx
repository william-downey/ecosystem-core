import { AdminShell } from "@/components/admin/AdminShell";
import { listLibraryItems, listSignals, listTimelineEvents } from "@/lib/backend/store";
import { RECORD_LABEL_GOVERNANCE_NAME } from "@/lib/brands";

export const dynamic = "force-dynamic";

export default function AdminUsodPage() {
  const signals = listSignals(RECORD_LABEL_GOVERNANCE_NAME);
  const lore = listLibraryItems({ brand: RECORD_LABEL_GOVERNANCE_NAME, type: "lore" });
  const events = listTimelineEvents(RECORD_LABEL_GOVERNANCE_NAME);

  return (
    <AdminShell title="USoD MG" active="/admin/usod-mg">
      <div className="grid gap-8">
        <section>
          <h2 className="mb-3 text-sm tracking-[0.16em] text-muted-foreground uppercase">
            Signal editor
          </h2>
          <ul className="grid gap-2 text-sm">
            {signals.map((signal) => (
              <li key={signal.id} className="rounded-md border border-border px-3 py-2">
                {String(signal.payload.title)} · {signal.active ? "active" : "inactive"} ·{" "}
                {signal.type}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="mb-3 text-sm tracking-[0.16em] text-muted-foreground uppercase">
            Meta timeline editor
          </h2>
          <ul className="grid gap-2 text-sm">
            {events.map((event) => (
              <li key={event.id}>{event.title}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="mb-3 text-sm tracking-[0.16em] text-muted-foreground uppercase">
            Lore entry manager
          </h2>
          <ul className="grid gap-2 text-sm">
            {lore.map((entry) => (
              <li key={entry.id}>{entry.title}</li>
            ))}
          </ul>
        </section>
      </div>
    </AdminShell>
  );
}
