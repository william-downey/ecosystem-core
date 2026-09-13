import { NAProjectCard } from "@/components/northern-afterlight/NAProjectCard";
import { ShellLayout } from "@/components/ShellLayout";
import { listLibraryItems } from "@/lib/backend/store";
import { NORTHERN_AFTERLIGHT } from "@/lib/brands";

export const dynamic = "force-dynamic";

export default function ProjectsPage() {
  const projects = listLibraryItems({ brand: NORTHERN_AFTERLIGHT, type: "project" });
  return (
    <ShellLayout brand={NORTHERN_AFTERLIGHT} veil="aurora">
      <section className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-xs tracking-[0.28em] text-primary uppercase">Projects</p>
        <h1 className="mt-3 font-heading text-5xl">Projects</h1>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <NAProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </ShellLayout>
  );
}
