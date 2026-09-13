import { ShellLayout } from "@/components/ShellLayout";
import { USTimelineView } from "@/components/usod-mg/USTimelineView";
import { listTimelineEvents } from "@/lib/backend/store";
import { RECORD_LABEL_GOVERNANCE_NAME } from "@/lib/brands";

export const dynamic = "force-dynamic";

export default function TimelinePage() {
  const events = listTimelineEvents(RECORD_LABEL_GOVERNANCE_NAME);
  return (
    <ShellLayout brand={RECORD_LABEL_GOVERNANCE_NAME} veil="signal">
      <section className="mx-auto max-w-3xl px-4 py-16">
        <p className="text-xs tracking-[0.28em] text-accent-foreground uppercase">
          supabase.meta.timeline_events
        </p>
        <h1 className="mt-3 font-heading text-5xl">Timeline</h1>
        <div className="mt-10">
          <USTimelineView events={events} />
        </div>
      </section>
    </ShellLayout>
  );
}
