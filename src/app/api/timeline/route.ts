import { createTimelineEvent, listTimelineEvents } from "@/lib/backend/store";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const brand = new URL(request.url).searchParams.get("brand") ?? undefined;
  return Response.json({ events: listTimelineEvents(brand) });
}

export async function POST(request: Request) {
  const body = await request.json();
  const event = createTimelineEvent({
    brand: body.brand,
    title: body.title,
    description: body.description ?? "",
    timestamp: body.timestamp ?? new Date().toISOString(),
    meta: body.meta ?? {},
  });
  return Response.json({ event }, { status: 201 });
}
