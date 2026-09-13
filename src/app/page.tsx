import Link from "next/link";
import { ShellLayout } from "@/components/ShellLayout";
import { Button } from "@/components/ui/button";
import { brandDirectory } from "@/lib/spec";
import { PARENT_BRAND } from "@/lib/brands";
import { temporalStatus } from "@/lib/temporal";
import { governanceSuite } from "@/lib/spec";

export const dynamic = "force-dynamic";

const homes = governanceSuite.routing.brand_home_routes;

export default function ParentHomePage() {
  const status = temporalStatus();
  const brands = [
    {
      name: "Northern Afterlight",
      href: homes["Northern Afterlight"],
      role: brandDirectory["Northern Afterlight"].role,
    },
    {
      name: "Fifty-Seven Mastering",
      href: homes["Fifty-Seven Mastering"],
      role: brandDirectory["Fifty-Seven Mastering"].role,
    },
    {
      name: "USoD MG",
      href: homes["USoD MG"],
      role: brandDirectory["USoD Music Group"].role,
    },
    {
      name: "Fourth Brand",
      href: homes["Fourth Brand"],
      role: brandDirectory["Fourth Brand"].role,
    },
  ];

  return (
    <ShellLayout brand={PARENT_BRAND} veil="copper">
      <section className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 md:py-24">
        <div className="max-w-3xl">
          <p className="text-xs tracking-[0.28em] text-primary uppercase">Parent brand</p>
          <h1 className="mt-4 font-heading text-5xl leading-[0.95] md:text-7xl">
            Ugly Side of Drama
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            {brandDirectory["Ugly Side of Drama"].role} Routing, identity, and governance live
            here. The other brands occupy their own homes, catalogs, and queues.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button render={<Link href="/brands" />}>Brand directory</Button>
            <Button variant="outline" render={<Link href="/about" />}>
              About the ecosystem
            </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {brands.map((brand) => (
            <Link
              key={brand.href}
              href={brand.href}
              className="rounded-lg border border-border bg-card/70 p-6 transition hover:border-primary/50"
            >
              <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
                Enter
              </p>
              <h2 className="mt-3 font-heading text-4xl">{brand.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{brand.role}</p>
            </Link>
          ))}
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          {status.time_zone} · {status.seasonal_mode} · automation{" "}
          {status.automation_paused ? "paused" : "live"} · delivery{" "}
          {status.delivery_paused ? "paused" : "live"}
        </p>
      </section>
    </ShellLayout>
  );
}
