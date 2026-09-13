import { AdminShell } from "@/components/admin/AdminShell";
import { listLibraryItems } from "@/lib/backend/store";
import { FOURTH_BRAND } from "@/lib/brands";

export const dynamic = "force-dynamic";

export default function AdminFourthPage() {
  const experiments = listLibraryItems({
    brand: FOURTH_BRAND,
    type: "experiment",
    experimentalOptIn: true,
  });
  return (
    <AdminShell title="Fourth Brand" active="/admin/fourth-brand">
      <section>
        <h2 className="mb-3 text-sm tracking-[0.16em] text-muted-foreground uppercase">
          Experiment manager / lab asset manager
        </h2>
        <ul className="grid gap-2 text-sm">
          {experiments.map((item) => (
            <li key={item.id} className="rounded-md border border-border px-3 py-2">
              {item.title} · {item.slug}
            </li>
          ))}
        </ul>
      </section>
    </AdminShell>
  );
}
