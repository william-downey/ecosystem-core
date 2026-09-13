import { ShellLayout } from "@/components/ShellLayout";
import { RECORD_LABEL_DIRECTORY_NAME, RECORD_LABEL_GOVERNANCE_NAME } from "@/lib/brands";
import { brandDirectory } from "@/lib/spec";

export default function UsodAboutPage() {
  return (
    <ShellLayout brand={RECORD_LABEL_GOVERNANCE_NAME} veil="signal">
      <section className="mx-auto max-w-3xl px-4 py-16">
        <p className="text-xs tracking-[0.28em] text-accent-foreground uppercase">About</p>
        <h1 className="mt-3 font-heading text-5xl">USoD MG</h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Introduced as {RECORD_LABEL_DIRECTORY_NAME}. Governed as {RECORD_LABEL_GOVERNANCE_NAME}.
        </p>
        <p className="mt-4 text-muted-foreground">{brandDirectory["USoD Music Group"].role}</p>
      </section>
    </ShellLayout>
  );
}
