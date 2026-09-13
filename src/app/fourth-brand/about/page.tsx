import { ShellLayout } from "@/components/ShellLayout";
import { FOURTH_BRAND } from "@/lib/brands";
import { brandDirectory } from "@/lib/spec";

export default function FourthAboutPage() {
  return (
    <ShellLayout brand={FOURTH_BRAND} veil="lab">
      <section className="mx-auto max-w-3xl px-4 py-16">
        <p className="font-mono text-xs tracking-[0.28em] text-primary uppercase">About</p>
        <h1 className="mt-3 font-heading text-5xl">Fourth Brand</h1>
        <p className="mt-6 text-muted-foreground">{brandDirectory["Fourth Brand"].role}</p>
      </section>
    </ShellLayout>
  );
}
