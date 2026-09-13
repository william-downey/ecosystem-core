import { AdminShell } from "@/components/admin/AdminShell";
import { listAutomationTriggers, listEmailLog } from "@/lib/backend/store";
import { automationMap } from "@/lib/spec";

export const dynamic = "force-dynamic";

export default function AdminAutomationPage() {
  const triggers = listAutomationTriggers();
  const emails = listEmailLog();
  return (
    <AdminShell title="Automation monitoring" active="/admin/automation">
      <h2 className="mb-3 text-sm tracking-[0.16em] text-muted-foreground uppercase">
        Make.com scenarios
      </h2>
      <ul className="mb-8 grid gap-2 text-sm">
        {automationMap.scenarios.map((scenario) => (
          <li key={scenario.name} className="rounded-md border border-border px-3 py-2">
            {scenario.name} ← {scenario.source} / {scenario.trigger}
          </li>
        ))}
      </ul>
      <h2 className="mb-3 text-sm tracking-[0.16em] text-muted-foreground uppercase">
        automation_triggers
      </h2>
      <div className="mb-8 grid gap-2">
        {triggers.length === 0 ? (
          <p className="text-sm text-muted-foreground">No trigger events logged.</p>
        ) : (
          triggers.slice(0, 12).map((trigger) => (
            <div key={trigger.id} className="rounded-md border border-border p-3 text-sm">
              <p className="font-mono text-xs text-muted-foreground">
                {trigger.source} · {trigger.event_type}
              </p>
              <p className="mt-1">{String(trigger.meta.scenario ?? "")}</p>
            </div>
          ))
        )}
      </div>
      <h2 className="mb-3 text-sm tracking-[0.16em] text-muted-foreground uppercase">Email log</h2>
      <div className="grid gap-2">
        {emails.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No emails sent yet. Provider calls are mocked unless Postmark or Brevo keys are set.
          </p>
        ) : (
          emails.slice(0, 8).map((email) => (
            <div key={email.id} className="rounded-md border border-border p-3 text-sm">
              {email.template} → {email.to} ({email.status})
            </div>
          ))
        )}
      </div>
    </AdminShell>
  );
}
