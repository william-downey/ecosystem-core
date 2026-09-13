import { dispatchAutomation } from "@/lib/automation/runner";
import { listAutomationTriggers, logAutomationTrigger } from "@/lib/backend/store";
import { assertAutomationTriggerSource } from "@/lib/governance";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({ triggers: listAutomationTriggers() });
}

export async function POST(request: Request) {
  const body = await request.json();
  try {
    assertAutomationTriggerSource(body.source);
    if (body.event_type && body.entity_id) {
      const result = await dispatchAutomation({
        source: body.source,
        event_type: body.event_type,
        entity_id: body.entity_id,
      });
      return Response.json({ result });
    }
    const trigger = logAutomationTrigger({
      source: body.source,
      event_type: body.event_type,
      payload: body.payload ?? {},
      meta: body.meta ?? {},
    });
    return Response.json({ trigger }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "invalid" }, { status: 400 });
  }
}
