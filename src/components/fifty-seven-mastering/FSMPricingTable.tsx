const rows = [
  {
    name: "Stereo master",
    turnaround: "5 working days",
    includes: "Streaming master, 24-bit archival, notes",
  },
  {
    name: "EP / album",
    turnaround: "7 working days",
    includes: "Sequence, gaps, vinyl + streaming parts",
  },
  {
    name: "Rush",
    turnaround: "48 hours when the queue allows",
    includes: "Priority in queue and additional status emails",
  },
];

export function FSMPricingTable() {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[32rem] text-left text-sm">
        <thead className="bg-muted/50 font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
          <tr>
            <th className="px-4 py-3">Service</th>
            <th className="px-4 py-3">Turnaround</th>
            <th className="px-4 py-3">Includes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-t border-border">
              <td className="px-4 py-4 font-medium">{row.name}</td>
              <td className="px-4 py-4 text-muted-foreground">{row.turnaround}</td>
              <td className="px-4 py-4 text-muted-foreground">{row.includes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
