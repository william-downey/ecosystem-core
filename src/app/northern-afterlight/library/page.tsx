import { NALibraryGrid } from "@/components/northern-afterlight/NALibraryGrid";
import { ShellLayout } from "@/components/ShellLayout";
import { listLibraryCollections, listLibraryItems } from "@/lib/backend/store";
import { NORTHERN_AFTERLIGHT } from "@/lib/brands";
import { applyNorthernAfterlightReleaseWindow } from "@/lib/temporal";

export const dynamic = "force-dynamic";

export default function LibraryPage() {
  const items = applyNorthernAfterlightReleaseWindow(
    listLibraryItems({ brand: NORTHERN_AFTERLIGHT, type: "track" }),
  );
  const collections = listLibraryCollections(NORTHERN_AFTERLIGHT);

  return (
    <ShellLayout brand={NORTHERN_AFTERLIGHT} veil="aurora">
      <section className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-xs tracking-[0.28em] text-primary uppercase">Supabase.library</p>
        <h1 className="mt-3 font-heading text-5xl">Library</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Public with curated highlights. Items inside a release window are pinned and marked.
        </p>
        <div className="mt-6 flex flex-wrap gap-2 text-xs text-muted-foreground">
          {collections.map((collection) => (
            <span key={collection.id} className="rounded-full border border-border px-3 py-1">
              {collection.name}
            </span>
          ))}
        </div>
        <div className="mt-10">
          <NALibraryGrid items={items} />
        </div>
      </section>
    </ShellLayout>
  );
}
