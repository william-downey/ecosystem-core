import { runJobCreated } from "@/lib/automation/runner";
import { createJob, listJobs, upsertClient } from "@/lib/backend/store";
import { FIFTY_SEVEN_MASTERING } from "@/lib/brands";
import { serviceFlows } from "@/lib/governance";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const brand = new URL(request.url).searchParams.get("brand") ?? undefined;
  return Response.json({ jobs: listJobs(brand) });
}

export async function POST(request: Request) {
  const body = await request.json();
  const brand = body.brand ?? FIFTY_SEVEN_MASTERING;
  if (serviceFlows(brand) === "required_for_all_jobs" && !body.intake_form_data) {
    return Response.json({ error: "service_flows required_for_all_jobs" }, { status: 400 });
  }
  const client = upsertClient({
    name: body.client_name,
    email: body.email,
    brand,
  });
  const job = createJob({
    brand,
    client_id: client.id,
    rush: Boolean(body.rush),
    intake_form_data: body.intake_form_data ?? {},
  });
  const automation = await runJobCreated(job);
  return Response.json({ job, client, automation }, { status: 201 });
}
