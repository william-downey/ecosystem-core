import { temporalStatus } from "@/lib/temporal";
import { temporalLayers } from "@/lib/spec";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    spec: temporalLayers,
    status: temporalStatus(),
  });
}
