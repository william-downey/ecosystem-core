import { ShellLayout } from "@/components/ShellLayout";
import { USLoreEntry } from "@/components/usod-mg/USLoreEntry";
import { listLibraryItems } from "@/lib/backend/store";
import { RECORD_LABEL_GOVERNANCE_NAME } from "@/lib/brands";

export const dynamic = "force-dynamic";

export default function LorePage() {
  const entries = listLibraryItems({ brand: RECORD_LABEL_GOVERNANCE_NAME, type: "lore" });
  return (
    <ShellLayout brand={RECORD_LABEL_GOVERNANCE_NAME} veil="signal">
      <section className="mx-auto max-w-3xl px-4 py-16">
        <p className="text-xs tracking-[0.28em] text-accent-foreground uppercase">Lore</p>
        <h1 className="mt-3 font-heading text-5xl">Lore</h1>
        <p className="mt-3 text-muted-foreground">
          Curated meta overlays from Supabase.library, bound to USoD MG.
        </p>
        <div className="mt-10 grid gap-4">
          {entries.map((entry) => (
            <USLoreEntry key={entry.id} entry={entry} />
          ))}
        </div>
      </section>
    </ShellLayout>
  );
}
