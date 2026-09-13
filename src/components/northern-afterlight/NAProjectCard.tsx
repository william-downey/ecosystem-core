import Link from "next/link";
import type { LibraryItem } from "@/lib/backend/types";

export function NAProjectCard({ project }: { project: LibraryItem }) {
  return (
    <Link
      href={`/northern-afterlight/projects/${project.slug}`}
      className="block rounded-2xl bg-card/70 p-5 ring-1 ring-foreground/10 transition hover:ring-primary/40"
    >
      <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
        {String(project.meta.year ?? "Project")}
      </p>
      <h3 className="mt-3 font-heading text-3xl">{project.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
    </Link>
  );
}
