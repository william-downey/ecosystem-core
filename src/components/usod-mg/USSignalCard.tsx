import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Signal } from "@/lib/backend/types";
import { isSignalWindow } from "@/lib/temporal";

export function USSignalCard({ signal }: { signal: Signal }) {
  const windowActive = isSignalWindow(signal);
  const title = String(signal.payload.title ?? "Untitled signal");
  const body = String(signal.payload.body ?? "");
  return (
    <Link
      href={`/usod-mg/signals/${signal.id}`}
      className="block rounded-2xl border border-border bg-card/80 p-5 transition hover:border-primary/50"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[11px] tracking-[0.22em] text-accent-foreground uppercase">
          {signal.type}
        </p>
        {windowActive ? <Badge>Signal window</Badge> : <Badge variant="outline">Inactive</Badge>}
      </div>
      <h3 className="mt-4 font-heading text-3xl">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
    </Link>
  );
}
