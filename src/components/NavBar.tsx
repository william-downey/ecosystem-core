"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandSwitcher } from "@/components/BrandSwitcher";
import { Button } from "@/components/ui/button";
import { PARENT_BRAND, themeIdForBrand } from "@/lib/brands";
import { navForBrand, parentNav } from "@/lib/routing";
import { cn } from "@/lib/utils";

function linksForBrand(brand: string) {
  if (brand === PARENT_BRAND) return parentNav();
  if (themeIdForBrand(brand) === "northern-afterlight") return navForBrand("Northern Afterlight");
  if (themeIdForBrand(brand) === "fifty-seven-mastering") return navForBrand("Fifty-Seven Mastering");
  if (themeIdForBrand(brand) === "usod-mg") return navForBrand("USoD MG");
  return navForBrand("Fourth Brand");
}

function mark(brand: string) {
  if (brand === PARENT_BRAND) return "USoD";
  if (themeIdForBrand(brand) === "northern-afterlight") return "NA";
  if (themeIdForBrand(brand) === "fifty-seven-mastering") return "57";
  if (themeIdForBrand(brand) === "usod-mg") return "MG";
  return "FB";
}

export function NavBar({ brand }: { brand: string }) {
  const pathname = usePathname();
  const links = linksForBrand(brand);
  const homeHref = links[0]?.href ?? "/";

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href={homeHref} className="flex items-center gap-3">
          <span className="flex size-8 items-center justify-center rounded-md bg-primary font-mono text-[11px] font-semibold text-primary-foreground">
            {mark(brand)}
          </span>
          <span className="font-heading text-lg leading-none">{brand === "USoD MG" ? "USoD MG" : brand}</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground",
                pathname === link.href && "bg-accent text-accent-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/admin"
            className={cn(
              "rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground",
              pathname.startsWith("/admin") && "bg-accent text-accent-foreground",
            )}
          >
            Admin
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <BrandSwitcher />
          </div>
          <div className="lg:hidden">
            <BrandSwitcher compact />
          </div>
          <Button className="md:hidden" variant="ghost" size="sm" render={<Link href={links[1]?.href ?? "/"} />}>
            Menu
          </Button>
        </div>
      </div>
    </header>
  );
}
