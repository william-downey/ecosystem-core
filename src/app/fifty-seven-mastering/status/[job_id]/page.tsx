import { notFound } from "next/navigation";
import { FSMJobStatusCard } from "@/components/fifty-seven-mastering/FSMJobStatusCard";
import { ShellLayout } from "@/components/ShellLayout";
import { getClient, getJob } from "@/lib/backend/store";
import { FIFTY_SEVEN_MASTERING } from "@/lib/brands";

export const dynamic = "force-dynamic";

export default async function JobStatusPage({
  params,
}: {
  params: Promise<{ job_id: string }>;
}) {
  const { job_id } = await params;
  const job = getJob(job_id);
  if (!job || job.brand !== FIFTY_SEVEN_MASTERING) notFound();
  const client = getClient(job.client_id);

  return (
    <ShellLayout brand={FIFTY_SEVEN_MASTERING}>
      <section className="mx-auto max-w-3xl px-4 py-16">
        <p className="font-mono text-xs tracking-[0.28em] text-primary uppercase">
          /status/:job_id
        </p>
        <h1 className="mt-3 font-heading text-5xl">Job status</h1>
        <div className="mt-8">
          <FSMJobStatusCard job={job} clientName={client?.name} />
        </div>
      </section>
    </ShellLayout>
  );
}
