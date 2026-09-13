import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { LibraryItem } from "@/lib/backend/types";

type Item = LibraryItem & {
  in_release_window?: boolean;
  highlight_in_library?: boolean;
  pin_to_home?: boolean;
};

export function NALibraryGrid({ items }: { items: Item[] }) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border px-6 py-16 text-center text-muted-foreground">
        No public library items are bound to Northern Afterlight yet.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <Link
          key={item.id}
          href={`/northern-afterlight/library/${item.slug}`}
          className="group rounded-2xl border border-border bg-card/80 p-5 transition hover:border-primary/40"
        >
          <div className="flex items-center justify-between gap-3 text-xs tracking-[0.18em] text-muted-foreground uppercase">
            <span>{String(item.meta.catalog_no ?? item.type)}</span>
            <span>{String(item.meta.duration ?? "")}</span>
          </div>
          <h3 className="mt-4 font-heading text-3xl">{item.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {item.highlight_in_library ? <Badge>Release window</Badge> : null}
            {item.visibility === "highlight" ? <Badge variant="secondary">Highlight</Badge> : null}
            <Badge variant="outline">{item.status}</Badge>
          </div>
        </Link>
      ))}
    </div>
  );
}
