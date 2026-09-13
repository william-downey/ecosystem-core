import { FBExperimentCard } from "@/components/fourth-brand/FBExperimentCard";
import { ShellLayout } from "@/components/ShellLayout";
import { listLibraryItems } from "@/lib/backend/store";
import { FOURTH_BRAND } from "@/lib/brands";
import { brandDirectory } from "@/lib/spec";

export const dynamic = "force-dynamic";

export default function FourthBrandHome() {
  const experiments = listLibraryItems({
    brand: FOURTH_BRAND,
    type: "experiment",
    experimentalOptIn: true,
  });
  return (
    <ShellLayout brand={FOURTH_BRAND} veil="lab">
      <section className="mx-auto max-w-6xl px-4 py-16">
        <p className="font-mono text-xs tracking-[0.28em] text-primary uppercase">Auxiliary</p>
        <h1 className="mt-4 font-heading text-5xl md:text-7xl">Fourth Brand</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          {brandDirectory["Fourth Brand"].role}
        </p>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {experiments.map((experiment) => (
            <FBExperimentCard key={experiment.id} experiment={experiment} />
          ))}
        </div>
      </section>
    </ShellLayout>
  );
}
