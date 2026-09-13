import { sendTemplatedEmail } from "@/lib/email/send";
import { listEmailLog } from "@/lib/backend/store";
import { emailFlowMap } from "@/lib/spec";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({ profiles: emailFlowMap.profiles, log: listEmailLog() });
}

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const entry = await sendTemplatedEmail({
      template: body.template,
      to: body.to,
      vars: body.vars ?? {},
    });
    return Response.json({ email: entry }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "failed" }, { status: 400 });
  }
}
