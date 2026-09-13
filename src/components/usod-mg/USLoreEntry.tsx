import Link from "next/link";
import type { LibraryItem } from "@/lib/backend/types";

export function USLoreEntry({ entry, full = false }: { entry: LibraryItem; full?: boolean }) {
  return (
    <article className="rounded-2xl border border-border bg-card/70 p-6">
      <p className="text-xs tracking-[0.22em] text-accent-foreground uppercase">
        Chapter {String(entry.meta.chapter ?? "—")}
      </p>
      <h2 className="mt-2 font-heading text-4xl">
        {full ? entry.title : <Link href={`/usod-mg/lore/${entry.slug}`}>{entry.title}</Link>}
      </h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">{entry.description}</p>
    </article>
  );
}
