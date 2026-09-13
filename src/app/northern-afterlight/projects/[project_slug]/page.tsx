import { notFound } from "next/navigation";
import { ShellLayout } from "@/components/ShellLayout";
import { getLibraryItem } from "@/lib/backend/store";
import { NORTHERN_AFTERLIGHT } from "@/lib/brands";

export const dynamic = "force-dynamic";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ project_slug: string }>;
}) {
  const { project_slug } = await params;
  const project = getLibraryItem(NORTHERN_AFTERLIGHT, project_slug);
  if (!project || project.type !== "project") notFound();

  return (
    <ShellLayout brand={NORTHERN_AFTERLIGHT} veil="aurora">
      <section className="mx-auto max-w-3xl px-4 py-16">
        <p className="text-xs tracking-[0.28em] text-primary uppercase">
          {String(project.meta.year ?? "Project")}
        </p>
        <h1 className="mt-3 font-heading text-5xl">{project.title}</h1>
        <p className="mt-6 text-lg text-muted-foreground">{project.description}</p>
      </section>
    </ShellLayout>
  );
}
