import { PROMO_CHANCE, PROMO_VALID_DAYS, promos } from "./promos";
import { reasons, type MoodId } from "./reasons";

// ---------------------------------------------------------------------------
// The rules for the daily reveal on the Promo page. Nothing here touches the
// browser, storage or the clock, so it can move to a server route unchanged.
// Dates are "YYYY-MM-DD" keys in Manila time, which compare correctly as
// plain strings.
// ---------------------------------------------------------------------------

export type Reveal = {
  date: string;
  reasonId: number;
  promoId: string | null;
  code: string | null;
  expiresOn: string | null;
};

export type VisitorRecord = {
  version: 2;
  visitorId: string;
  firstVisitDate: string;
  lastRevealDate: string | null;
  mood: MoodId | null;
  reveals: Reveal[];
};

const manilaDate = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Manila" });

/** Today's date key in Manila, whatever timezone the device is set to. */
export function manilaDateKey(now: Date): string {
  return manilaDate.format(now);
}

export function addDays(dateKey: string, days: number): string {
  const date = new Date(`${dateKey}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

/**
 * One reveal per Manila day. A stored date later than today means the clock
 * was wound back, so that counts as already revealed too.
 */
export function canReveal(record: VisitorRecord, today: string): boolean {
  return !record.lastRevealDate || record.lastRevealDate < today;
}

export function isComplete(record: VisitorRecord): boolean {
  return reasons.every((r) => record.reveals.some((v) => v.reasonId === r.id));
}

// No 0/O or 1/I, so a code is easy to read out across the counter.
const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function pickFrom<T>(list: T[], random: () => number): T {
  return list[Math.floor(random() * list.length)];
}

// TODO(production): this code is made up on the device, so staff cannot check
// that it is real, unused or unexpired. Issuing and redeeming promos has to
// happen on the server before any code is honoured for real.
function makeCode(random: () => number): string {
  let code = "H-";
  for (let i = 0; i < 6; i++) code += pickFrom(CODE_CHARS.split(""), random);
  return code;
}

/**
 * Decides today's reveal for a visitor: which reason, and whether a promo
 * comes with it. Returns null when there is nothing to reveal (already
 * revealed today, or all 30 found). `random` is passed in so the caller owns
 * the dice.
 */
export function decideReveal(
  record: VisitorRecord,
  mood: MoodId,
  today: string,
  random: () => number,
): Reveal | null {
  if (!canReveal(record, today)) return null;

  const unrevealed = reasons.filter(
    (r) => !record.reveals.some((v) => v.reasonId === r.id),
  );
  if (unrevealed.length === 0) return null;

  const matching = unrevealed.filter((r) => r.moods.includes(mood));
  const reason = pickFrom(matching.length > 0 ? matching : unrevealed, random);

  // The first ever reveal is the welcome promo; after that it's a roll.
  const withPromo = record.reveals.length === 0 || random() < PROMO_CHANCE;
  if (!withPromo) {
    return { date: today, reasonId: reason.id, promoId: null, code: null, expiresOn: null };
  }

  const fresh = promos.filter(
    (p) => !record.reveals.some((v) => v.promoId === p.id),
  );
  const promo = pickFrom(fresh.length > 0 ? fresh : promos, random);
  return {
    date: today,
    reasonId: reason.id,
    promoId: promo.id,
    code: makeCode(random),
    expiresOn: addDays(today, PROMO_VALID_DAYS),
  };
}
