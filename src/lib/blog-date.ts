export function blogDateISO(value: string): string | undefined {
  let raw: unknown = value;
  try { raw = JSON.parse(value); } catch { /* Plain date strings are supported too. */ }
  if (typeof raw !== "string" && typeof raw !== "number") return undefined;
  const date = new Date(raw);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

export function formatBlogDate(value: string): string {
  const iso = blogDateISO(value);
  return iso ? new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" }) : "";
}
