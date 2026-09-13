import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { LibraryItem } from "@/lib/backend/types";

export function FBExperimentCard({ experiment }: { experiment: LibraryItem }) {
  return (
    <Link
      href={`/fourth-brand/experiments/${experiment.id}`}
      className="block border border-primary/30 bg-card p-5 hover:bg-secondary"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-xs text-primary">{experiment.slug}</p>
        <Badge variant="outline">{experiment.status}</Badge>
      </div>
      <h3 className="mt-3 font-heading text-3xl">{experiment.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{experiment.description}</p>
    </Link>
  );
}
