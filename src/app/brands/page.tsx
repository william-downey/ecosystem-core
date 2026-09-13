import Link from "next/link";
import { ShellLayout } from "@/components/ShellLayout";
import { brandDirectory } from "@/lib/spec";
import { PARENT_BRAND } from "@/lib/brands";
import { governanceSuite } from "@/lib/spec";

export default function BrandsPage() {
  const homes = governanceSuite.routing.brand_home_routes;
  const entries = Object.entries(brandDirectory);

  return (
    <ShellLayout brand={PARENT_BRAND} veil="copper">
      <section className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-xs tracking-[0.28em] text-primary uppercase">Directory</p>
        <h1 className="mt-3 font-heading text-5xl md:text-6xl">Every brand in the ecosystem</h1>
        <div className="mt-10 grid gap-5">
          {entries.map(([name, brand]) => {
            const href =
              name === "Ugly Side of Drama"
                ? "/"
                : name === "USoD Music Group"
                  ? homes["USoD MG"]
                  : homes[name as keyof typeof homes];
            return (
              <article key={brand.slug} className="rounded-lg border border-border bg-card/70 p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs text-muted-foreground">{brand.slug}</p>
                    <h2 className="mt-2 font-heading text-4xl">
                      <Link href={href}>{name}</Link>
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{brand.role}</p>
                  </div>
                  <p className="font-mono text-xs tracking-[0.16em] text-primary uppercase">
                    {brand.type}
                  </p>
                </div>
                <dl className="mt-6 grid gap-4 text-sm md:grid-cols-3">
                  <div>
                    <dt className="text-muted-foreground">Audience</dt>
                    <dd>{brand.audience.join(", ")}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Domains</dt>
                    <dd>{brand.domains.join(", ")}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Content sources</dt>
                    <dd>{brand.content_sources.join(", ")}</dd>
                  </div>
                </dl>
              </article>
            );
          })}
        </div>
      </section>
    </ShellLayout>
  );
}
