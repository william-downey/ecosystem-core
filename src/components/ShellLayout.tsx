import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { themeIdForBrand } from "@/lib/brands";
import { temporalStatus } from "@/lib/temporal";
import { cn } from "@/lib/utils";

export function ShellLayout({
  brand,
  children,
  veil,
}: {
  brand: string;
  children: React.ReactNode;
  veil?: "copper" | "aurora" | "signal" | "lab" | "none";
}) {
  const status = temporalStatus();
  const theme = themeIdForBrand(brand);
  const veilClass =
    veil === "copper"
      ? "copper-veil"
      : veil === "aurora"
        ? "aurora-veil"
        : veil === "signal"
          ? "signal-veil"
          : veil === "lab"
            ? "lab-grid"
            : "";

  return (
    <div data-brand={theme} className={cn("brand-shell flex min-h-dvh flex-col", veilClass)}>
      {status.automation_paused || status.delivery_paused ? (
        <div className="border-b border-border bg-accent px-4 py-2 text-center text-xs tracking-wide text-accent-foreground">
          Maintenance window is active in {status.time_zone}. Automation
          {status.automation_paused ? " paused" : ""}
          {status.delivery_paused ? " · delivery paused" : ""}.
        </div>
      ) : null}
      <NavBar brand={brand} />
      <main className="flex-1">{children}</main>
      <Footer brand={brand} />
    </div>
  );
}
