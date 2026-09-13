import { listClients, upsertClient } from "@/lib/backend/store";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const brand = new URL(request.url).searchParams.get("brand") ?? undefined;
  return Response.json({ clients: listClients(brand) });
}

export async function POST(request: Request) {
  const body = await request.json();
  const client = upsertClient({
    name: body.name,
    email: body.email,
    brand: body.brand,
  });
  return Response.json({ client }, { status: 201 });
}
