"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
      <Input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Job UUID"
        className="font-mono"
      />
      <Button type="submit">Open {kind}</Button>
    </form>
  );
}
