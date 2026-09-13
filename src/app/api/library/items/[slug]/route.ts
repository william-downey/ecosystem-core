import { getLibraryItem } from "@/lib/backend/store";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const brand = new URL(request.url).searchParams.get("brand");
  if (!brand) {
    return Response.json({ error: "brand query is required for dynamic library routes" }, { status: 400 });
  }
  const item = getLibraryItem(brand, slug, {
    experimentalOptIn: new URL(request.url).searchParams.get("opt_in") === "1",
    clientId: new URL(request.url).searchParams.get("client_id") ?? undefined,
  });
  if (!item) return Response.json({ error: "not_found" }, { status: 404 });
  return Response.json({ item });
}
