"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";

export function JobLookup({ kind }: { kind: "status" | "delivery" }) {
  const router = useRouter();
  const [value, setValue] = useState("");

  return (
    <form
      className="flex flex-col gap-3 sm:flex-row"
      onSubmit={(event) => {
        event.preventDefault();
        if (!value.trim()) return;
        router.push(`/fifty-seven-mastering/${kind}/${value.trim()}`);
      }}
    >
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Job UUID"
        className="h-9 w-full rounded-lg border border-input bg-transparent px-2.5 font-mono text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      />
      <button type="submit" className={buttonVariants()}>
        Open {kind}
      </button>
    </form>
  );
}
