import { promotions, TOTAL_STAMPS } from "@/lib/reasons";

/** Today's date in Manila, as YYYY-MM-DD. */
export function manilaToday(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Manila" });
}

/** Assigns each stamp its matching offer from the 30-reasons campaign. */
export function buildSchedule(): Record<string, string> {
  return Object.fromEntries(
    promotions.slice(0, TOTAL_STAMPS).map((promotion, i) => [
      String(i + 1),
      promotion.id,
    ]),
  );
}
