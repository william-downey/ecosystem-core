import { JobLookup } from "@/components/fifty-seven-mastering/JobLookup";
import { ShellLayout } from "@/components/ShellLayout";
import { FIFTY_SEVEN_MASTERING } from "@/lib/brands";

export default function DeliveryIndexPage() {
  return (
    <ShellLayout brand={FIFTY_SEVEN_MASTERING}>
      <section className="mx-auto max-w-3xl px-4 py-16">
        <p className="font-mono text-xs tracking-[0.28em] text-primary uppercase">Delivery</p>
        <h1 className="mt-3 font-heading text-5xl">Collect files</h1>
        <p className="mt-4 text-muted-foreground">
          Delivery links are generated only after status is ready_for_delivery.
        </p>
        <div className="mt-8">
          <JobLookup kind="delivery" />
        </div>
      </section>
    </ShellLayout>
  );
}
