import { createLibraryCollection, listLibraryCollections } from "@/lib/backend/store";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const brand = new URL(request.url).searchParams.get("brand");
  if (!brand) return Response.json({ error: "brand query is required" }, { status: 400 });
  return Response.json({ collections: listLibraryCollections(brand) });
}

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const collection = createLibraryCollection({
      brand: body.brand,
      name: body.name,
      slug: body.slug,
      description: body.description ?? "",
      meta: body.meta ?? {},
    });
    return Response.json({ collection }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "invalid" }, { status: 400 });
  }
}
