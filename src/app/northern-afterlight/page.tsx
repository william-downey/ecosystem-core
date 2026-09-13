import Link from "next/link";
import { NAHighlightBanner } from "@/components/northern-afterlight/NAHighlightBanner";
import { NALibraryGrid } from "@/components/northern-afterlight/NALibraryGrid";
import { NAProjectCard } from "@/components/northern-afterlight/NAProjectCard";
import { ShellLayout } from "@/components/ShellLayout";
import { Button } from "@/components/ui/button";
import { listLibraryItems, listPosts } from "@/lib/backend/store";
import { NORTHERN_AFTERLIGHT } from "@/lib/brands";
import { applyNorthernAfterlightReleaseWindow } from "@/lib/temporal";
import { brandDirectory } from "@/lib/spec";

export const dynamic = "force-dynamic";

export default function NorthernAfterlightHome() {
  const tracks = applyNorthernAfterlightReleaseWindow(
    listLibraryItems({ brand: NORTHERN_AFTERLIGHT, type: "track" }),
  );
  const pinned = tracks.filter((item) => item.pin_to_home);
  const projects = listLibraryItems({ brand: NORTHERN_AFTERLIGHT, type: "project" });
  const journal = listPosts(NORTHERN_AFTERLIGHT)[0];

  return (
    <ShellLayout brand={NORTHERN_AFTERLIGHT} veil="aurora">
      <section className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-xs tracking-[0.28em] text-primary uppercase">Cinematic library</p>
        <h1 className="mt-4 font-heading text-5xl md:text-7xl">Northern Afterlight</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          {brandDirectory["Northern Afterlight"].role}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button render={<Link href="/northern-afterlight/library" />}>Open library</Button>
          <Button variant="outline" render={<Link href="/northern-afterlight/projects" />}>
            Projects
          </Button>
        </div>
        <div className="mt-12">
          <NAHighlightBanner items={pinned} />
        </div>
        <div className="mt-12">
          <div className="mb-4 flex items-end justify-between">
            <h2 className="font-heading text-3xl">Catalog</h2>
            <Link href="/northern-afterlight/library" className="text-sm text-primary">
              All cues
            </Link>
          </div>
          <NALibraryGrid items={tracks.slice(0, 4)} />
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <NAProjectCard key={project.id} project={project} />
          ))}
        </div>
        {journal ? (
          <p className="mt-12 text-sm text-muted-foreground">
            From the journal: {journal.title}
          </p>
        ) : null}
      </section>
    </ShellLayout>
  );
}
