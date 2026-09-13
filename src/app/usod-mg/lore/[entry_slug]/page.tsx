import { notFound } from "next/navigation";
import { ShellLayout } from "@/components/ShellLayout";
import { USLoreEntry } from "@/components/usod-mg/USLoreEntry";
import { getLibraryItem } from "@/lib/backend/store";
import { RECORD_LABEL_GOVERNANCE_NAME } from "@/lib/brands";

export const dynamic = "force-dynamic";

export default async function LoreEntryPage({
  params,
}: {
  params: Promise<{ entry_slug: string }>;
}) {
  const { entry_slug } = await params;
  const entry = getLibraryItem(RECORD_LABEL_GOVERNANCE_NAME, entry_slug);
  if (!entry || entry.type !== "lore") notFound();

  return (
    <ShellLayout brand={RECORD_LABEL_GOVERNANCE_NAME} veil="signal">
      <section className="mx-auto max-w-3xl px-4 py-16">
        <USLoreEntry entry={entry} full />
      </section>
    </ShellLayout>
  );
}
