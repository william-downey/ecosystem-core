import { snapshotStore, resetStore } from "@/lib/backend/store";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({ store: snapshotStore() });
}

export async function POST() {
  return Response.json({ store: resetStore() });
}
