"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { governanceSuite } from "@/lib/spec";
import { PARENT_BRAND } from "@/lib/brands";
import { cn } from "@/lib/utils";

const brandHomes = governanceSuite.routing.brand_home_routes;

export function BrandSwitcher({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname();
  const items = [
    { href: "/", label: PARENT_BRAND },
    { href: brandHomes["Northern Afterlight"], label: "Northern Afterlight" },
    { href: brandHomes["Fifty-Seven Mastering"], label: "Fifty-Seven Mastering" },
    { href: brandHomes["USoD MG"], label: "USoD MG" },
    { href: brandHomes["Fourth Brand"], label: "Fourth Brand" },
  ];

  if (compact) {
    return (
      <Sheet>
        <SheetTrigger render={<Button variant="outline" size="sm" />}>Brands</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Brand switcher</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-2 p-4">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm",
                  pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-muted",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => {
        const active =
          item.href === "/"
            ? pathname === "/" || pathname === "/brands" || pathname === "/about"
            : pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Button key={item.href} variant={active ? "default" : "outline"} size="sm" render={<Link href={item.href} />}>
            {item.label}
          </Button>
        );
      })}
    </div>
  );
}
