import { runSignalCreated } from "@/lib/automation/runner";
import { createSignal, listSignals } from "@/lib/backend/store";
import { RECORD_LABEL_GOVERNANCE_NAME } from "@/lib/brands";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const brand = new URL(request.url).searchParams.get("brand") ?? undefined;
  return Response.json({ signals: listSignals(brand) });
}

export async function POST(request: Request) {
  const body = await request.json();
  const signal = createSignal({
    brand: body.brand ?? RECORD_LABEL_GOVERNANCE_NAME,
    type: body.type ?? "timeboxed",
    payload: body.payload ?? {},
    active: body.active ?? true,
    expires_at: body.expires_at ?? null,
    meta: body.meta ?? {},
  });
  const automation = await runSignalCreated(signal);
  return Response.json({ signal, automation }, { status: 201 });
}
