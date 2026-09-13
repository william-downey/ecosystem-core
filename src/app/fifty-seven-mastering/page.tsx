import Link from "next/link";
import { ShellLayout } from "@/components/ShellLayout";
import { Button } from "@/components/ui/button";
import { FIFTY_SEVEN_MASTERING } from "@/lib/brands";
import { brandDirectory } from "@/lib/spec";

export default function FiftySevenHome() {
  return (
    <ShellLayout brand={FIFTY_SEVEN_MASTERING}>
      <section className="mx-auto max-w-6xl px-4 py-16">
        <p className="font-mono text-xs tracking-[0.28em] text-primary uppercase">Studio</p>
        <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h1 className="font-heading text-6xl md:text-8xl">Fifty-Seven</h1>
          <p className="max-w-md text-muted-foreground">
            {brandDirectory["Fifty-Seven Mastering"].role}
          </p>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button render={<Link href="/fifty-seven-mastering/intake" />}>Start intake</Button>
          <Button variant="outline" render={<Link href="/fifty-seven-mastering/status" />}>
            Check status
          </Button>
        </div>
        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {[
            ["Intake", "A named job, not a form that disappears."],
            ["Queue", "Rush jobs rise while they are in_progress."],
            ["Delivery", "Dropbox folder + Samply link, per job."],
          ].map(([title, body]) => (
            <div key={title} className="rounded-lg border border-border bg-card p-5">
              <h2 className="font-heading text-3xl">{title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </ShellLayout>
  );
}
