import { notFound } from "next/navigation";
import { FSMDeliveryPanel } from "@/components/fifty-seven-mastering/FSMDeliveryPanel";
import { ShellLayout } from "@/components/ShellLayout";
import { getJob } from "@/lib/backend/store";
import { FIFTY_SEVEN_MASTERING } from "@/lib/brands";

export const dynamic = "force-dynamic";

export default async function JobDeliveryPage({
  params,
}: {
  params: Promise<{ job_id: string }>;
}) {
  const { job_id } = await params;
  const job = getJob(job_id);
  if (!job || job.brand !== FIFTY_SEVEN_MASTERING) notFound();

  return (
    <ShellLayout brand={FIFTY_SEVEN_MASTERING}>
      <section className="mx-auto max-w-3xl px-4 py-16">
        <p className="font-mono text-xs tracking-[0.28em] text-primary uppercase">
          /delivery/:job_id
        </p>
        <h1 className="mt-3 font-heading text-5xl">Delivery</h1>
        <div className="mt-8">
          <FSMDeliveryPanel job={job} />
        </div>
      </section>
    </ShellLayout>
  );
}
