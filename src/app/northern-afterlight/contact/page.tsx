import { ShellLayout } from "@/components/ShellLayout";
import { NORTHERN_AFTERLIGHT } from "@/lib/brands";

export default function NorthernContactPage() {
  return (
    <ShellLayout brand={NORTHERN_AFTERLIGHT} veil="aurora">
      <section className="mx-auto max-w-3xl px-4 py-16">
        <p className="text-xs tracking-[0.28em] text-primary uppercase">Contact</p>
        <h1 className="mt-3 font-heading text-5xl">Sync and licensing</h1>
        <p className="mt-6 text-muted-foreground">
          Sync clients and creatives reach the library through this brand. Delivery uses the
          Northern Afterlight Dropbox asset tree. Samply is disabled for this brand.
        </p>
        <p className="mt-4 font-mono text-sm">library@northernafterlight.example</p>
      </section>
    </ShellLayout>
  );
}
