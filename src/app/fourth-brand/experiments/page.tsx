import { FBExperimentCard } from "@/components/fourth-brand/FBExperimentCard";
import { ShellLayout } from "@/components/ShellLayout";
import { listLibraryItems } from "@/lib/backend/store";
import { FOURTH_BRAND } from "@/lib/brands";

export const dynamic = "force-dynamic";

export default function ExperimentsPage() {
  const experiments = listLibraryItems({
    brand: FOURTH_BRAND,
    type: "experiment",
    experimentalOptIn: true,
  });
  return (
    <ShellLayout brand={FOURTH_BRAND} veil="lab">
      <section className="mx-auto max-w-6xl px-4 py-16">
        <p className="font-mono text-xs tracking-[0.28em] text-primary uppercase">Experiments</p>
        <h1 className="mt-3 font-heading text-5xl">Experiments</h1>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {experiments.map((experiment) => (
            <FBExperimentCard key={experiment.id} experiment={experiment} />
          ))}
        </div>
      </section>
    </ShellLayout>
  );
}
