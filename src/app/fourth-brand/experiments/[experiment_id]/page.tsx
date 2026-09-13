import { notFound } from "next/navigation";
import { ShellLayout } from "@/components/ShellLayout";
import { getLibraryItemById } from "@/lib/backend/store";
import { FOURTH_BRAND } from "@/lib/brands";

export const dynamic = "force-dynamic";

export default async function ExperimentPage({
  params,
}: {
  params: Promise<{ experiment_id: string }>;
}) {
  const { experiment_id } = await params;
  const experiment = getLibraryItemById(experiment_id);
  if (!experiment || experiment.brand !== FOURTH_BRAND || experiment.type !== "experiment") {
    notFound();
  }

  return (
    <ShellLayout brand={FOURTH_BRAND} veil="lab">
      <section className="mx-auto max-w-3xl px-4 py-16">
        <p className="font-mono text-xs text-primary">{experiment.slug}</p>
        <h1 className="mt-3 font-heading text-5xl">{experiment.title}</h1>
        <p className="mt-6 text-lg text-muted-foreground">{experiment.description}</p>
      </section>
    </ShellLayout>
  );
}
