import type { TimelineEvent } from "@/lib/backend/types";

export function USTimelineView({ events }: { events: TimelineEvent[] }) {
  if (events.length === 0) {
    return (
      <p className="text-muted-foreground">No timeline events are bound to USoD MG.</p>
    );
  }

  return (
    <ol className="relative space-y-8 border-l border-border pl-6">
      {events.map((event) => (
        <li key={event.id} className="relative">
          <span className="absolute top-1.5 -left-[31px] size-3 rounded-full bg-primary" />
          <p className="font-mono text-xs text-muted-foreground">
            {new Date(event.timestamp).toLocaleString("en-US", {
              timeZone: "America/New_York",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <h3 className="mt-1 font-heading text-2xl">{event.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{event.description}</p>
        </li>
      ))}
    </ol>
  );
}
