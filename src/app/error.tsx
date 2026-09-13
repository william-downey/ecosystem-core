"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div data-brand="ugly-side-of-drama" className="brand-shell copper-veil flex min-h-dvh items-center">
      <section className="mx-auto max-w-2xl px-4 py-16">
        <p className="font-mono text-xs tracking-[0.22em] text-muted-foreground uppercase">
          ErrorBoundary
        </p>
        <h1 className="mt-4 font-heading text-5xl">The presentation layer failed.</h1>
        <p className="mt-4 text-muted-foreground">{error.message}</p>
        <div className="mt-8">
          <Button onClick={reset}>Try again</Button>
        </div>
      </section>
    </div>
  );
}
