import { ShellLayout } from "@/components/ShellLayout";
import { getStaticBlock } from "@/lib/backend/store";
import { PARENT_BRAND } from "@/lib/brands";
import { blueprint } from "@/lib/spec";

export const dynamic = "force-dynamic";

export default function AboutPage() {
  const about = getStaticBlock(PARENT_BRAND, "parent_about");
  return (
    <ShellLayout brand={PARENT_BRAND} veil="copper">
      <section className="mx-auto max-w-3xl px-4 py-16">
        <p className="text-xs tracking-[0.28em] text-primary uppercase">About</p>
        <h1 className="mt-3 font-heading text-5xl">The governing brand</h1>
        <p className="mt-6 text-lg text-muted-foreground">{about?.content}</p>
        <div className="mt-10 grid gap-4 text-sm">
          <p>
            Presentation layer: {blueprint.frontend.platform}. Backend: {blueprint.backend.platform}.
            Automation: {blueprint.automation.platform}.
          </p>
          <p>
            Email: {blueprint.email.providers.join(" / ")}. Delivery:{" "}
            {blueprint.delivery.platforms.join(" / ")}.
          </p>
        </div>
      </section>
    </ShellLayout>
  );
}
