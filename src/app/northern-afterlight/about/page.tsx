import { ShellLayout } from "@/components/ShellLayout";
import { getStaticBlock } from "@/lib/backend/store";
import { NORTHERN_AFTERLIGHT } from "@/lib/brands";
import { brandDirectory } from "@/lib/spec";

export const dynamic = "force-dynamic";

export default function NorthernAboutPage() {
  const note = getStaticBlock(NORTHERN_AFTERLIGHT, "na_sync_note");
  return (
    <ShellLayout brand={NORTHERN_AFTERLIGHT} veil="aurora">
      <section className="mx-auto max-w-3xl px-4 py-16">
        <p className="text-xs tracking-[0.28em] text-primary uppercase">About</p>
        <h1 className="mt-3 font-heading text-5xl">Northern Afterlight</h1>
        <p className="mt-6 text-lg text-muted-foreground">
          {brandDirectory["Northern Afterlight"].role}
        </p>
        <p className="mt-6 text-muted-foreground">{note?.content}</p>
      </section>
    </ShellLayout>
  );
}
