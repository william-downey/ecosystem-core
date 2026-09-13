import { specs } from "@/lib/spec";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const section = new URL(request.url).searchParams.get("section");
  if (section && section in specs) {
    return Response.json(specs[section as keyof typeof specs]);
  }
  return Response.json(specs);
}
