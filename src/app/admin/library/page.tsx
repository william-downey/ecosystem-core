import { AdminShell } from "@/components/admin/AdminShell";
import { listLibraryItems } from "@/lib/backend/store";
import { FOURTH_BRAND, NORTHERN_AFTERLIGHT, RECORD_LABEL_GOVERNANCE_NAME } from "@/lib/brands";

export const dynamic = "force-dynamic";

export default function AdminLibraryPage() {
  const items = [
    ...listLibraryItems({ brand: NORTHERN_AFTERLIGHT }),
    ...listLibraryItems({ brand: RECORD_LABEL_GOVERNANCE_NAME }),
    ...listLibraryItems({ brand: FOURTH_BRAND, experimentalOptIn: true }),
  ];

  return (
    <AdminShell title="Library management" active="/admin/library">
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <thead className="bg-muted/40 font-mono text-xs text-muted-foreground uppercase">
            <tr>
              <th className="px-3 py-2">Brand</th>
              <th className="px-3 py-2">Title</th>
              <th className="px-3 py-2">Type</th>
              <th className="px-3 py-2">Visibility</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-border">
                <td className="px-3 py-3">{item.brand}</td>
                <td className="px-3 py-3">{item.title}</td>
                <td className="px-3 py-3">{item.type}</td>
                <td className="px-3 py-3">{item.visibility}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
