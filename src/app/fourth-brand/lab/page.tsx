import { FBExperimentCard } from "@/components/fourth-brand/FBExperimentCard";
import { FBLabPanel } from "@/components/fourth-brand/FBLabPanel";
import { ShellLayout } from "@/components/ShellLayout";
import { listLibraryItems } from "@/lib/backend/store";
import { FOURTH_BRAND } from "@/lib/brands";

export const dynamic = "force-dynamic";

export default async function LabPage({
  searchParams,
}: {
  searchParams: Promise<{ opt_in?: string }>;
}) {
  const { opt_in } = await searchParams;
  const optedIn = opt_in === "1";
  const assets = listLibraryItems({
    brand: FOURTH_BRAND,
    experimentalOptIn: optedIn,
  });

  return (
    <ShellLayout brand={FOURTH_BRAND} veil="lab">
      <section className="mx-auto max-w-6xl px-4 py-16">
        <FBLabPanel optedIn={optedIn} />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {optedIn ? (
            assets
              .filter((asset) => asset.type === "experiment")
              .map((asset) => <FBExperimentCard key={asset.id} experiment={asset} />)
          ) : (
            <p className="text-sm text-muted-foreground">
              Experimental library is hidden until opt-in.
            </p>
          )}
        </div>
      </section>
    </ShellLayout>
  );
}
