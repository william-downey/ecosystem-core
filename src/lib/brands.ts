export const PARENT_BRAND = "Ugly Side of Drama";
export const RECORD_LABEL_DIRECTORY_NAME = "USoD Music Group";
export const RECORD_LABEL_GOVERNANCE_NAME = "USoD MG";
export const NORTHERN_AFTERLIGHT = "Northern Afterlight";
export const FIFTY_SEVEN_MASTERING = "Fifty-Seven Mastering";
export const FOURTH_BRAND = "Fourth Brand";

export type BrandKey =
  | typeof PARENT_BRAND
  | typeof RECORD_LABEL_DIRECTORY_NAME
  | typeof RECORD_LABEL_GOVERNANCE_NAME
  | typeof NORTHERN_AFTERLIGHT
  | typeof FIFTY_SEVEN_MASTERING
  | typeof FOURTH_BRAND;

export function isRecordLabelName(name: string) {
  return name === RECORD_LABEL_DIRECTORY_NAME || name === RECORD_LABEL_GOVERNANCE_NAME;
}

export function backendBrandName(name: string) {
  if (isRecordLabelName(name)) return RECORD_LABEL_GOVERNANCE_NAME;
  return name;
}

export function directoryBrandName(name: string) {
  if (isRecordLabelName(name)) return RECORD_LABEL_DIRECTORY_NAME;
  return name;
}

export const brandSlugs = {
  [PARENT_BRAND]: "ugly-side-of-drama",
  [RECORD_LABEL_DIRECTORY_NAME]: "usod-music-group",
  [RECORD_LABEL_GOVERNANCE_NAME]: "usod-mg",
  [NORTHERN_AFTERLIGHT]: "northern-afterlight",
  [FIFTY_SEVEN_MASTERING]: "fifty-seven-mastering",
  [FOURTH_BRAND]: "fourth-brand",
} as const;

export function brandFromSlug(slug: string) {
  if (slug === "ugly-side-of-drama") return PARENT_BRAND;
  if (slug === "usod-music-group" || slug === "usod-mg") return RECORD_LABEL_GOVERNANCE_NAME;
  if (slug === "northern-afterlight") return NORTHERN_AFTERLIGHT;
  if (slug === "fifty-seven-mastering") return FIFTY_SEVEN_MASTERING;
  if (slug === "fourth-brand") return FOURTH_BRAND;
  return null;
}

export type BrandThemeId =
  | "ugly-side-of-drama"
  | "northern-afterlight"
  | "fifty-seven-mastering"
  | "usod-mg"
  | "fourth-brand";

export function themeIdForBrand(brand: string): BrandThemeId {
  if (brand === PARENT_BRAND) return "ugly-side-of-drama";
  if (isRecordLabelName(brand)) return "usod-mg";
  if (brand === NORTHERN_AFTERLIGHT) return "northern-afterlight";
  if (brand === FIFTY_SEVEN_MASTERING) return "fifty-seven-mastering";
  return "fourth-brand";
}
