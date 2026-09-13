import {
  listBrandPages,
  listPages,
  listPosts,
  listStaticBlocks,
} from "@/lib/backend/store";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const brand = new URL(request.url).searchParams.get("brand") ?? undefined;
  return Response.json({
    pages: listPages(brand),
    posts: listPosts(brand),
    brand_pages: listBrandPages(brand),
    static_content_blocks: listStaticBlocks(brand),
  });
}
