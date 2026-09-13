import { createMasteringDeliveryLinks, northernAfterlightDropboxPath } from "@/lib/delivery";
import { getClient, getJob, updateJob } from "@/lib/backend/store";
import { deliveryMap } from "@/lib/spec";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({ delivery_map: deliveryMap });
}

export async function POST(request: Request) {
  const body = await request.json();
  if (body.brand === "Northern Afterlight") {
    return Response.json({
      dropbox: northernAfterlightDropboxPath({ project_name: body.project_name }),
    });
  }
  const job = body.job_id ? getJob(body.job_id) : null;
  const client = job ? getClient(job.client_id) : null;
  try {
    const links = createMasteringDeliveryLinks({
      client_name: body.client_name ?? client?.name ?? "Client",
      project_name:
        body.project_name ?? String(job?.intake_form_data.project_name ?? "Project"),
      job_id: body.job_id ?? "unassigned",
    });
    if (job) updateJob(job.id, { delivery_links: links });
    return Response.json({ delivery_links: links });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "failed" }, { status: 409 });
  }
}
