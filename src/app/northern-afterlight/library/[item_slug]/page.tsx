import { notFound } from "next/navigation";
import { ShellLayout } from "@/components/ShellLayout";
import { Badge } from "@/components/ui/badge";
import { getLibraryItem } from "@/lib/backend/store";
import { NORTHERN_AFTERLIGHT } from "@/lib/brands";
import { applyNorthernAfterlightReleaseWindow } from "@/lib/temporal";

export const dynamic = "force-dynamic";

export default async function LibraryItemPage({
  params,
}: {
  params: Promise<{ item_slug: string }>;
}) {
  const { item_slug } = await params;
  const item = getLibraryItem(NORTHERN_AFTERLIGHT, item_slug);
  if (!item || item.type !== "track") notFound();
  const [enriched] = applyNorthernAfterlightReleaseWindow([item]);

  return (
    <ShellLayout brand={NORTHERN_AFTERLIGHT} veil="aurora">
      <section className="mx-auto max-w-3xl px-4 py-16">
        <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
          {String(item.meta.catalog_no ?? "")} · {item.slug}
        </p>
        <h1 className="mt-3 font-heading text-5xl md:text-6xl">{item.title}</h1>
        <div className="mt-4 flex flex-wrap gap-2">
          {enriched.highlight_in_library ? <Badge>Release window</Badge> : null}
          <Badge variant="secondary">{item.status}</Badge>
          <Badge variant="outline">{String(item.meta.duration ?? "")}</Badge>
        </div>
        <p className="mt-6 text-lg text-muted-foreground">{item.description}</p>
      </section>
    </ShellLayout>
  );
}
