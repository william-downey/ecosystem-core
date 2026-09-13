"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function FBLabPanel({ optedIn }: { optedIn: boolean }) {
  const router = useRouter();

  return (
    <div className="border border-primary/40 bg-card p-6">
      <p className="font-mono text-xs tracking-[0.2em] text-accent-foreground uppercase">
        experimental_opt_in
      </p>
      <h2 className="mt-3 font-heading text-4xl">Lab asset manager</h2>
      <p className="mt-3 max-w-xl text-sm text-muted-foreground">
        Fourth Brand library visibility is experimental and opt-in. Nothing from the sandbox catalog
        is shown until this flag is on.
      </p>
      <Button
        className="mt-6"
        variant={optedIn ? "secondary" : "default"}
        onClick={() => router.push(optedIn ? "/fourth-brand/lab" : "/fourth-brand/lab?opt_in=1")}
      >
        {optedIn ? "Opt out of experimental library" : "Opt in to experimental library"}
      </Button>
    </div>
  );
}
