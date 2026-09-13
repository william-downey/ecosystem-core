import { notFound } from "next/navigation";
import { ShellLayout } from "@/components/ShellLayout";
import { Badge } from "@/components/ui/badge";
import { getSignal } from "@/lib/backend/store";
import { RECORD_LABEL_GOVERNANCE_NAME } from "@/lib/brands";
import { isSignalWindow } from "@/lib/temporal";

export const dynamic = "force-dynamic";

export default async function SignalPage({
  params,
}: {
  params: Promise<{ signal_id: string }>;
}) {
  const { signal_id } = await params;
  const signal = getSignal(signal_id);
  if (!signal || signal.brand !== RECORD_LABEL_GOVERNANCE_NAME) notFound();
  const active = isSignalWindow(signal);

  return (
    <ShellLayout brand={RECORD_LABEL_GOVERNANCE_NAME} veil="signal">
      <section className="mx-auto max-w-3xl px-4 py-16">
        <p className="font-mono text-xs tracking-[0.22em] text-accent-foreground uppercase">
          {signal.type}
        </p>
        <div className="mt-4 flex items-center gap-3">
          <h1 className="font-heading text-5xl">{String(signal.payload.title ?? "Signal")}</h1>
          {active ? <Badge>Signal window</Badge> : <Badge variant="outline">Closed</Badge>}
        </div>
        <p className="mt-6 text-lg text-muted-foreground">{String(signal.payload.body ?? "")}</p>
        <p className="mt-8 font-mono text-xs text-muted-foreground">{signal.id}</p>
      </section>
    </ShellLayout>
  );
}
