import { FSMPricingTable } from "@/components/fifty-seven-mastering/FSMPricingTable";
import { ShellLayout } from "@/components/ShellLayout";
import { FIFTY_SEVEN_MASTERING } from "@/lib/brands";

export default function PricingPage() {
  return (
    <ShellLayout brand={FIFTY_SEVEN_MASTERING}>
      <section className="mx-auto max-w-5xl px-4 py-16">
        <p className="font-mono text-xs tracking-[0.28em] text-primary uppercase">Pricing</p>
        <h1 className="mt-3 font-heading text-5xl">Desk rates</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Service flows are required for every job. Pricing below is the public table; the intake
          form is the contract.
        </p>
        <div className="mt-10">
          <FSMPricingTable />
        </div>
      </section>
    </ShellLayout>
  );
}
