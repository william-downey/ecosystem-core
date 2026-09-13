import { runJobStatusChanged } from "@/lib/automation/runner";
import { getClient, getJob, updateJob } from "@/lib/backend/store";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const job = getJob(id);
  if (!job) return Response.json({ error: "not_found" }, { status: 404 });
  return Response.json({ job, client: getClient(job.client_id) });
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const body = await request.json();
  const result = updateJob(id, body);
  if (!result) return Response.json({ error: "not_found" }, { status: 404 });
  let automation = null;
  if (body.status && body.status !== result.previous.status) {
    automation = await runJobStatusChanged(result.next);
  }
  return Response.json({ job: result.next, automation });
}
