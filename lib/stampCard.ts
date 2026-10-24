import { randomInt } from "node:crypto";
import { vouchers } from "@/lib/data";
import { TOTAL_STAMPS } from "@/lib/reasons";

/** Today's date in Manila, as YYYY-MM-DD. */
export function manilaToday(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Manila" });
}

function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Decides, once per card, which stamps carry a promo.
 * Every voucher is used once. Stamp 1 and the last stamp always have one;
 * the rest land on random days in between.
 */
export function buildSchedule(): Record<string, string> {
  const promoCount = Math.min(vouchers.length, TOTAL_STAMPS);
  const middle = shuffle(
    Array.from({ length: TOTAL_STAMPS - 2 }, (_, i) => i + 2),
  ).slice(0, promoCount - 2);
  const days = [1, ...middle, TOTAL_STAMPS];
  const ids = shuffle(vouchers.map((v) => v.id));
  const schedule: Record<string, string> = {};
  days.forEach((day, i) => {
    schedule[String(day)] = ids[i];
  });
  return schedule;
}
