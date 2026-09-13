import { AdminShell } from "@/components/admin/AdminShell";
import { listClients } from "@/lib/backend/store";

export const dynamic = "force-dynamic";

export default function AdminUsersPage() {
  const clients = listClients();
  return (
    <AdminShell title="User management" active="/admin/users">
      <p className="mb-6 text-sm text-muted-foreground">
        The backend master list does not define a users table. Clients from mastering_jobs.clients
        are the operational identity records.
      </p>
      <div className="grid gap-3">
        {clients.map((client) => (
          <div key={client.id} className="rounded-lg border border-border bg-card p-4">
            <p className="font-medium">{client.name}</p>
            <p className="font-mono text-xs text-muted-foreground">
              {client.email} · {client.brand}
            </p>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
