import { JobLookup } from "@/components/fifty-seven-mastering/JobLookup";
import { ShellLayout } from "@/components/ShellLayout";
import { FIFTY_SEVEN_MASTERING } from "@/lib/brands";
import { listJobs } from "@/lib/backend/store";

export const dynamic = "force-dynamic";

export default function StatusIndexPage() {
  const sample = listJobs(FIFTY_SEVEN_MASTERING)[0];
  return (
    <ShellLayout brand={FIFTY_SEVEN_MASTERING}>
      <section className="mx-auto max-w-3xl px-4 py-16">
        <p className="font-mono text-xs tracking-[0.28em] text-primary uppercase">Status</p>
        <h1 className="mt-3 font-heading text-5xl">Look up a job</h1>
        <p className="mt-4 text-muted-foreground">
          Status views are private per client and keyed by job id.
        </p>
        <div className="mt-8">
          <JobLookup kind="status" />
        </div>
        {sample ? (
          <p className="mt-6 font-mono text-xs text-muted-foreground">
            Seeded example: {sample.id}
          </p>
        ) : null}
      </section>
    </ShellLayout>
  );
}
