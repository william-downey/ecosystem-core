import Link from "next/link";
import { ShellLayout } from "@/components/ShellLayout";
import { USSignalCard } from "@/components/usod-mg/USSignalCard";
import { USTimelineView } from "@/components/usod-mg/USTimelineView";
import { Button } from "@/components/ui/button";
import { listSignals, listTimelineEvents } from "@/lib/backend/store";
import { RECORD_LABEL_GOVERNANCE_NAME } from "@/lib/brands";
import { brandDirectory } from "@/lib/spec";
import { isSignalWindow } from "@/lib/temporal";

export const dynamic = "force-dynamic";

export default function UsodMgHome() {
  const signals = listSignals(RECORD_LABEL_GOVERNANCE_NAME).filter((signal) =>
    isSignalWindow(signal),
  );
  const events = listTimelineEvents(RECORD_LABEL_GOVERNANCE_NAME).slice(0, 4);

  return (
    <ShellLayout brand={RECORD_LABEL_GOVERNANCE_NAME} veil="signal">
      <section className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-xs tracking-[0.28em] text-accent-foreground uppercase">
          USoD Music Group
        </p>
        <h1 className="mt-4 font-heading text-5xl md:text-7xl">USoD MG</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          {brandDirectory["USoD Music Group"].role} From the governance suite onward this brand is
          named USoD MG. Both names are the same record label.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button render={<Link href="/usod-mg/signals" />}>Signals</Button>
          <Button variant="outline" render={<Link href="/usod-mg/lore" />}>
            Lore
          </Button>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {signals.map((signal) => (
            <USSignalCard key={signal.id} signal={signal} />
          ))}
        </div>
        <div className="mt-16">
          <h2 className="mb-6 font-heading text-3xl">Timeline</h2>
          <USTimelineView events={events} />
        </div>
      </section>
    </ShellLayout>
  );
}
