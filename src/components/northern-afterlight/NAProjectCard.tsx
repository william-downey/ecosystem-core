import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { LibraryItem } from "@/lib/backend/types";

export function NAProjectCard({ project }: { project: LibraryItem }) {
  return (
    <Card className="bg-card/70">
      <CardHeader>
        <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
          {String(project.meta.year ?? "Project")}
        </p>
        <CardTitle className="font-heading text-3xl">
          <Link href={`/northern-afterlight/projects/${project.slug}`}>{project.title}</Link>
        </CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
