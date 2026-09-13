import { ShellLayout } from "@/components/ShellLayout";
import { getStaticBlock } from "@/lib/backend/store";
import { FIFTY_SEVEN_MASTERING } from "@/lib/brands";

export const dynamic = "force-dynamic";

export default function FaqPage() {
  const faq = getStaticBlock(FIFTY_SEVEN_MASTERING, "fsm_faq_turnaround");
  return (
    <ShellLayout brand={FIFTY_SEVEN_MASTERING}>
      <section className="mx-auto max-w-3xl px-4 py-16">
        <p className="font-mono text-xs tracking-[0.28em] text-primary uppercase">FAQ</p>
        <h1 className="mt-3 font-heading text-5xl">Questions</h1>
        <div className="mt-8 space-y-6 text-muted-foreground">
          <div>
            <h2 className="text-foreground">How long does it take?</h2>
            <p className="mt-2">{faq?.content}</p>
          </div>
          <div>
            <h2 className="text-foreground">Where do files come back?</h2>
            <p className="mt-2">
              Dropbox under /Fifty-Seven Mastering/Clients, then a Samply link for client playback.
              Links are client_delivery_only and versioned per_job.
            </p>
          </div>
        </div>
      </section>
    </ShellLayout>
  );
}
