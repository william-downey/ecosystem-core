import { ShellLayout } from "@/components/ShellLayout";
import { USSignalCard } from "@/components/usod-mg/USSignalCard";
import { listSignals } from "@/lib/backend/store";
import { RECORD_LABEL_GOVERNANCE_NAME } from "@/lib/brands";

export const dynamic = "force-dynamic";

export default function SignalsPage() {
  const signals = listSignals(RECORD_LABEL_GOVERNANCE_NAME);
  return (
    <ShellLayout brand={RECORD_LABEL_GOVERNANCE_NAME} veil="signal">
      <section className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-xs tracking-[0.28em] text-accent-foreground uppercase">
          supabase.meta.signals
        </p>
        <h1 className="mt-3 font-heading text-5xl">Signals</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Timeboxed active signals occupy the signal window, appear on the meta timeline, and can
          trigger automation.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {signals.map((signal) => (
            <USSignalCard key={signal.id} signal={signal} />
          ))}
        </div>
      </section>
    </ShellLayout>
  );
}
