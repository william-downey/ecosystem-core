import { routingArchitecture } from "@/lib/spec";
import { fallbackRoute, requireBrandContextForDynamicRoutes } from "@/lib/governance";

const PARENT_ROUTES = ["/", "/brands", "/about"];
const ADMIN_PREFIX = "/admin";
const SLUG_REDIRECT = "/usod-music-group";

function compilePattern(pattern: string) {
  const source = pattern
    .split("/")
    .map((segment) => {
      if (segment.startsWith(":")) return "[^/]+";
      return segment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    })
    .join("/");
  return new RegExp(`^${source}$`);
}

export function registeredStaticRoutes() {
  const brandRoutes = Object.values(routingArchitecture.brand_routes).flatMap(
    (entry) => entry.routes,
  );
  return [
    ...routingArchitecture.global_shell.base_routes,
    ...routingArchitecture.global_shell.error_routes,
    ...brandRoutes,
    ...PARENT_ROUTES,
    SLUG_REDIRECT,
    ADMIN_PREFIX,
  ];
}

export function registeredDynamicPatterns() {
  return Object.values(routingArchitecture.brand_routes).flatMap(
    (entry) => entry.dynamic_routes,
  );
}

export function isRegisteredRoute(pathname: string) {
  const clean = pathname.replace(/\/$/, "") || "/";
  if (registeredStaticRoutes().includes(clean)) return true;
  if (clean === ADMIN_PREFIX || clean.startsWith(`${ADMIN_PREFIX}/`)) return true;
  return registeredDynamicPatterns().some((pattern) => compilePattern(pattern).test(clean));
}

export function matchDynamicRoute(pathname: string) {
  const clean = pathname.replace(/\/$/, "") || "/";
  for (const [brand, entry] of Object.entries(routingArchitecture.brand_routes)) {
    for (const pattern of entry.dynamic_routes) {
      if (compilePattern(pattern).test(clean)) {
        return { brand, pattern };
      }
    }
  }
  return null;
}

export function resolvePath(pathname: string) {
  const clean = pathname.replace(/\/$/, "") || "/";
  if (isRegisteredRoute(clean)) {
    if (requireBrandContextForDynamicRoutes() && matchDynamicRoute(clean)) {
      return { ok: true as const, pathname: clean };
    }
    return { ok: true as const, pathname: clean };
  }
  return { ok: false as const, pathname: fallbackRoute() };
}

export function navForBrand(brand: keyof typeof routingArchitecture.brand_routes) {
  return routingArchitecture.brand_routes[brand].routes.map((href) => {
    const parts = href.split("/").filter(Boolean);
    const last = parts[parts.length - 1] ?? "home";
    const label =
      parts.length === 1
        ? "Home"
        : last
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    return { href, label };
  });
}

export function parentNav() {
  return [
    { href: "/", label: "Home" },
    { href: "/brands", label: "Brands" },
    { href: "/about", label: "About" },
  ];
}

export function adminNav() {
  return [
    { href: "/admin", label: "Overview" },
    { href: "/admin/library", label: "Library" },
    { href: "/admin/users", label: "Users" },
    { href: "/admin/automation", label: "Automation" },
    { href: "/admin/delivery", label: "Delivery" },
    { href: "/admin/northern-afterlight", label: "Northern Afterlight" },
    { href: "/admin/fifty-seven-mastering", label: "Fifty-Seven Mastering" },
    { href: "/admin/usod-mg", label: "USoD MG" },
    { href: "/admin/fourth-brand", label: "Fourth Brand" },
  ];
}
