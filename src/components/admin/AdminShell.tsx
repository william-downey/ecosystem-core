import Link from "next/link";
import { ShellLayout } from "@/components/ShellLayout";
import { adminNav } from "@/lib/routing";
import { PARENT_BRAND } from "@/lib/brands";
import { cn } from "@/lib/utils";

export function AdminShell({
  title,
  children,
  active,
}: {
  title: string;
  children: React.ReactNode;
  active: string;
}) {
  return (
    <ShellLayout brand={PARENT_BRAND}>
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 md:flex-row">
        <aside className="md:w-56">
          <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Admin tools</p>
          <nav className="mt-4 grid gap-1">
            {adminNav().map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground",
                  active === item.href && "bg-accent text-accent-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <section className="min-w-0 flex-1">
          <h1 className="font-heading text-4xl">{title}</h1>
          <div className="mt-8">{children}</div>
        </section>
      </div>
    </ShellLayout>
  );
}
