import { getSignal } from "@/lib/backend/store";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const signal = getSignal(id);
  if (!signal) return Response.json({ error: "not_found" }, { status: 404 });
  return Response.json({ signal });
}
