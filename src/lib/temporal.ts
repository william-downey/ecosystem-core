import { temporalLayers } from "@/lib/spec";
import type { Job, LibraryItem, Signal } from "@/lib/backend/types";

export const TIME_ZONE = temporalLayers.global.time_zone;

export type ZonedParts = {
  day_of_week: string;
  hour: number;
  iso: string;
};

export function zonedNow(date = new Date()): ZonedParts {
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    weekday: "long",
  }).format(date);
  const hourRaw = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    hour: "numeric",
    hourCycle: "h23",
  }).format(date);
  return {
    day_of_week: weekday,
    hour: Number.parseInt(hourRaw, 10),
    iso: date.toISOString(),
  };
}

export function activeMaintenanceWindows(date = new Date()) {
  const now = zonedNow(date);
  return temporalLayers.global.maintenance_windows.filter((window) => {
    return (
      window.day_of_week === now.day_of_week &&
      now.hour >= window.start_hour &&
      now.hour < window.end_hour
    );
  });
}

export function maintenanceAffects(layer: "automation" | "delivery", date = new Date()) {
  return activeMaintenanceWindows(date).some((window) =>
    (window.affects as string[]).includes(layer),
  );
}

export function isInReleaseWindow(releaseDateIso: string, date = new Date()) {
  const mode = temporalLayers.brand_modes["Northern Afterlight"].modes[0];
  const release = new Date(releaseDateIso).getTime();
  const now = date.getTime();
  const day = 24 * 60 * 60 * 1000;
  const before = mode.conditions.days_before_release * day;
  const after = mode.conditions.days_after_release * day;
  return now >= release - before && now <= release + after;
}

export function applyNorthernAfterlightReleaseWindow<T extends LibraryItem>(
  items: T[],
  date = new Date(),
) {
  const mode = temporalLayers.brand_modes["Northern Afterlight"].modes[0];
  return items.map((item) => {
    const releaseDate = item.meta.release_date;
    const active = typeof releaseDate === "string" && isInReleaseWindow(releaseDate, date);
    return {
      ...item,
      in_release_window: active,
      highlight_in_library: active && mode.effects.highlight_in_library,
      pin_to_home: active && mode.effects.pin_to_home,
    };
  });
}

export function isRushMode(job: Pick<Job, "rush" | "status">) {
  const mode = temporalLayers.brand_modes["Fifty-Seven Mastering"].modes[0];
  return job.rush === true && job.status === mode.conditions.status;
}

export function prioritizeMasteringQueue<T extends Job>(jobs: T[]) {
  return [...jobs].sort((a, b) => {
    const aRush = isRushMode(a) ? 0 : 1;
    const bRush = isRushMode(b) ? 0 : 1;
    if (aRush !== bRush) return aRush - bRush;
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  });
}

export function isSignalWindow(signal: Signal, date = new Date()) {
  const mode = temporalLayers.brand_modes["USoD MG"].modes[0];
  const active = signal.active === mode.conditions.active;
  const typeMatch = signal.type === mode.conditions.signal_type;
  const unexpired = !signal.expires_at || new Date(signal.expires_at).getTime() > date.getTime();
  return active && typeMatch && unexpired;
}

export function seasonalModeLabel(date = new Date()) {
  if (!temporalLayers.global.seasonal_modes_enabled) return null;
  const month = Number(
    new Intl.DateTimeFormat("en-US", { timeZone: TIME_ZONE, month: "numeric" }).format(date),
  );
  if (month === 12 || month === 1 || month === 2) return "Winter cycle";
  if (month >= 3 && month <= 5) return "Thaw cycle";
  if (month >= 6 && month <= 8) return "High-light cycle";
  return "Afterlight cycle";
}

export function temporalStatus(date = new Date()) {
  const windows = activeMaintenanceWindows(date);
  return {
    time_zone: TIME_ZONE,
    seasonal_modes_enabled: temporalLayers.global.seasonal_modes_enabled,
    seasonal_mode: seasonalModeLabel(date),
    zoned: zonedNow(date),
    maintenance_windows_active: windows,
    automation_paused: maintenanceAffects("automation", date),
    delivery_paused: maintenanceAffects("delivery", date),
  };
}
