import Link from "next/link";
import type { LibraryItem } from "@/lib/backend/types";

export function NAHighlightBanner({ items }: { items: LibraryItem[] }) {
  if (items.length === 0) return null;
  const lead = items[0];
  return (
    <div className="overflow-hidden rounded-3xl border border-primary/30 bg-secondary/60 p-6 md:p-8">
      <p className="text-xs tracking-[0.24em] text-primary uppercase">Release window</p>
      <h2 className="mt-3 font-heading text-4xl md:text-5xl">{lead.title}</h2>
      <p className="mt-3 max-w-xl text-muted-foreground">{lead.description}</p>
      <Link
        href={`/northern-afterlight/library/${lead.slug}`}
        className="mt-6 inline-flex text-sm text-primary underline-offset-4 hover:underline"
      >
        Open in library
      </Link>
    </div>
  );
}
