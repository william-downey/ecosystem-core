import Link from "next/link";
import { ShellLayout } from "@/components/ShellLayout";
import { Button } from "@/components/ui/button";
import { PARENT_BRAND } from "@/lib/brands";
import { fallbackRoute } from "@/lib/governance";

export default function RouteNotFoundPage() {
  return (
    <ShellLayout brand={PARENT_BRAND}>
      <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col justify-center px-4 py-16">
        <p className="font-mono text-xs tracking-[0.22em] text-muted-foreground uppercase">
          {fallbackRoute()}
        </p>
        <h1 className="mt-4 font-heading text-5xl">This route is not registered.</h1>
        <p className="mt-4 text-muted-foreground">
          Governance disallows orphaned routes. Dynamic paths also require an explicit brand
          context.
        </p>
        <div className="mt-8">
          <Button render={<Link href="/" />}>Return to Ugly Side of Drama</Button>
        </div>
      </section>
    </ShellLayout>
  );
}
