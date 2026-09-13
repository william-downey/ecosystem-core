import { ShellLayout } from "@/components/ShellLayout";
import { FIFTY_SEVEN_MASTERING } from "@/lib/brands";

export default function ServicesPage() {
  return (
    <ShellLayout brand={FIFTY_SEVEN_MASTERING}>
      <section className="mx-auto max-w-3xl px-4 py-16">
        <p className="font-mono text-xs tracking-[0.28em] text-primary uppercase">Services</p>
        <h1 className="mt-3 font-heading text-5xl">What the desk does</h1>
        <ul className="mt-8 grid gap-6 text-muted-foreground">
          <li>
            <strong className="text-foreground">Stereo mastering</strong> — streaming, archival, and
            notes against your references.
          </li>
          <li>
            <strong className="text-foreground">EP / album sequences</strong> — gaps, side splits,
            vinyl parts.
          </li>
          <li>
            <strong className="text-foreground">Rush</strong> — flagged on the job, prioritized in
            the queue, extra status mail while in progress.
          </li>
        </ul>
      </section>
    </ShellLayout>
  );
}
