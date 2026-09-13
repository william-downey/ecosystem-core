import Link from "next/link";
import { ShellLayout } from "@/components/ShellLayout";
import { Button } from "@/components/ui/button";
import { PARENT_BRAND } from "@/lib/brands";

export default function SystemErrorPage() {
  return (
    <ShellLayout brand={PARENT_BRAND}>
      <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col justify-center px-4 py-16">
        <p className="font-mono text-xs tracking-[0.22em] text-muted-foreground uppercase">
          /error/system
        </p>
        <h1 className="mt-4 font-heading text-5xl">The shell hit a system error.</h1>
        <p className="mt-4 text-muted-foreground">
          This is the registered system error route. Use it when the presentation layer cannot
          recover from an unhandled failure.
        </p>
        <div className="mt-8">
          <Button render={<Link href="/" />}>Return home</Button>
        </div>
      </section>
    </ShellLayout>
  );
}
