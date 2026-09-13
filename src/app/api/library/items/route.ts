import { listLibraryCollections, listLibraryItems, createLibraryItem } from "@/lib/backend/store";
import { assertLibraryBrandBinding } from "@/lib/governance";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const brand = url.searchParams.get("brand");
  const type = url.searchParams.get("type") ?? undefined;
  const clientId = url.searchParams.get("client_id") ?? undefined;
  const experimentalOptIn = url.searchParams.get("opt_in") === "1";
  if (!brand) {
    return Response.json({ error: "brand query is required" }, { status: 400 });
  }
  return Response.json({
    items: listLibraryItems({ brand, type, clientId, experimentalOptIn }),
    collections: listLibraryCollections(brand),
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  try {
    assertLibraryBrandBinding(body);
    const item = createLibraryItem({
      brand: body.brand,
      type: body.type ?? "track",
      slug: body.slug,
      title: body.title,
      description: body.description ?? "",
      status: body.status ?? "draft",
      visibility: body.visibility ?? "public",
      meta: body.meta ?? {},
    });
    return Response.json({ item }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "invalid" }, { status: 400 });
  }
}
