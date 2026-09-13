import Link from "next/link";
import { PARENT_BRAND } from "@/lib/brands";

export function Footer({ brand }: { brand: string }) {
  return (
    <footer className="border-t border-border/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>
          {brand} · governed by {PARENT_BRAND}
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/brands" className="hover:text-foreground">
            Brand directory
          </Link>
          <Link href="/admin" className="hover:text-foreground">
            Admin tools
          </Link>
          <Link href="/error/route-not-found" className="hover:text-foreground">
            Routing fallback
          </Link>
        </div>
      </div>
    </footer>
  );
}
