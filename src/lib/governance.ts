import { governanceSuite } from "@/lib/spec";
import { backendBrandName, isRecordLabelName } from "@/lib/brands";
import type { LibraryItem } from "@/lib/backend/types";

export type GovernanceBrandName =
  | "Northern Afterlight"
  | "Fifty-Seven Mastering"
  | "USoD MG"
  | "Fourth Brand";

export function governanceBrand(name: string): GovernanceBrandName | null {
  const resolved = backendBrandName(name);
  if (resolved === "Northern Afterlight") return "Northern Afterlight";
  if (resolved === "Fifty-Seven Mastering") return "Fifty-Seven Mastering";
  if (resolved === "USoD MG") return "USoD MG";
  if (resolved === "Fourth Brand") return "Fourth Brand";
  return null;
}

export function brandRules(name: string) {
  const key = governanceBrand(name);
  if (!key) return null;
  return governanceSuite.brand_specific[key];
}

export function assertLibraryBrandBinding(item: Pick<LibraryItem, "brand">) {
  if (!governanceSuite.global.safety.require_explicit_brand_binding_for_library_items) {
    return;
  }
  if (!item.brand || item.brand.trim() === "") {
    throw new Error("Library items require an explicit brand binding.");
  }
}

export function assertAutomationTriggerSource(source: string) {
  if (!governanceSuite.global.safety.disallow_automation_without_explicit_trigger_source) {
    return;
  }
  if (!source || source.trim() === "") {
    throw new Error("Automation requires an explicit trigger source.");
  }
}

export function filterLibraryForBrand(
  items: LibraryItem[],
  brand: string,
  options?: { clientId?: string; experimentalOptIn?: boolean },
) {
  const rules = brandRules(brand);
  const bound = items.filter((item) => backendBrandName(item.brand) === backendBrandName(brand));
  if (!rules) return bound;

  switch (rules.library_visibility) {
    case "public_with_curated_highlights":
      return bound.filter(
        (item) => item.visibility === "public" || item.visibility === "highlight",
      );
    case "private_per_client":
      if (!options?.clientId) return [];
      return bound.filter((item) => item.meta.client_id === options.clientId);
    case "curated_meta_only":
      return bound.filter((item) => {
        return (
          item.meta.curated === true ||
          item.meta.overlay === true ||
          item.type === "lore"
        );
      });
    case "experimental_opt_in":
      if (!options?.experimentalOptIn) return [];
      return bound;
    default:
      return bound;
  }
}

export function allowMetaOverlays(brand: string) {
  return brandRules(brand)?.meta_overlays_allowed === true;
}

export function serviceFlows(brand: string) {
  return brandRules(brand)?.service_flows ?? "none";
}

export function requireBrandContextForDynamicRoutes() {
  return governanceSuite.routing.require_brand_context_for_dynamic_routes;
}

export function fallbackRoute() {
  return governanceSuite.routing.fallback_route;
}

export function recordLabelNames() {
  return {
    directory: "USoD Music Group",
    governance: "USoD MG",
    sameBrand: isRecordLabelName("USoD MG"),
  };
}
