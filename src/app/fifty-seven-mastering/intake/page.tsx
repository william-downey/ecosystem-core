import { FSMIntakeForm } from "@/components/fifty-seven-mastering/FSMIntakeForm";
import { ShellLayout } from "@/components/ShellLayout";
import { FIFTY_SEVEN_MASTERING } from "@/lib/brands";

export default function IntakePage() {
  return (
    <ShellLayout brand={FIFTY_SEVEN_MASTERING}>
      <section className="mx-auto max-w-3xl px-4 py-16">
        <p className="font-mono text-xs tracking-[0.28em] text-primary uppercase">Intake</p>
        <h1 className="mt-3 font-heading text-5xl">Open a job</h1>
        <p className="mt-4 text-muted-foreground">
          Creating a job writes to Supabase.jobs, then Make.com scenario
          mastering_intake_confirmation sends the Postmark template fsm_intake_confirmation.
        </p>
        <div className="mt-8">
          <FSMIntakeForm />
        </div>
      </section>
    </ShellLayout>
  );
}
