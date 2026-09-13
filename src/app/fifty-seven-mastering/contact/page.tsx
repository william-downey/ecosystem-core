import { ShellLayout } from "@/components/ShellLayout";
import { FIFTY_SEVEN_MASTERING } from "@/lib/brands";

export default function FsmContactPage() {
  return (
    <ShellLayout brand={FIFTY_SEVEN_MASTERING}>
      <section className="mx-auto max-w-3xl px-4 py-16">
        <p className="font-mono text-xs tracking-[0.28em] text-primary uppercase">Contact</p>
        <h1 className="mt-3 font-heading text-5xl">The desk</h1>
        <p className="mt-6 text-muted-foreground">
          Artists, labels, and producers use intake for new work. This page is for questions that
          are not a job.
        </p>
        <p className="mt-4 font-mono text-sm">studio@fiftyseven.example</p>
      </section>
    </ShellLayout>
  );
}
