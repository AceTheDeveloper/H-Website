import { promos } from "./promos";
import { moods, reasons, type MoodId } from "./reasons";
import {
  canReveal,
  decideReveal,
  manilaDateKey,
  type Reveal,
  type VisitorRecord,
} from "./revealRules";

// ---------------------------------------------------------------------------
// All persistence for the Promo page lives here, so it can later be swapped
// for API calls without touching the UI. No accounts and no personal data:
// one anonymous visitor record under a single localStorage key. If storage is
// blocked, the record lives in memory for the length of the visit and
// `canSave()` tells the page to say so.
// ---------------------------------------------------------------------------

const KEY = "h-promo";
const VERSION = 2;

export type IssuedPromo = {
  date: string;
  promoId: string;
  code: string;
  expiresOn: string;
  expired: boolean;
};

let memory: VisitorRecord | null = null;
let saved = true;

function newId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    // randomUUID needs a secure context; fall back for plain-http previews.
    return `v-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  }
}

const isDateKey = (value: unknown): value is string =>
  typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);

/** Keeps only reveals that still make sense, one per reason. */
function cleanReveals(value: unknown): Reveal[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<number>();
  const out: Reveal[] = [];
  for (const item of value as Partial<Reveal>[]) {
    if (!item || !isDateKey(item.date)) continue;
    if (!reasons.some((r) => r.id === item.reasonId)) continue;
    if (seen.has(item.reasonId as number)) continue;
    seen.add(item.reasonId as number);
    const promo =
      promos.some((p) => p.id === item.promoId) &&
      typeof item.code === "string" &&
      isDateKey(item.expiresOn);
    out.push({
      date: item.date,
      reasonId: item.reasonId as number,
      promoId: promo ? (item.promoId as string) : null,
      code: promo ? (item.code as string) : null,
      expiresOn: promo ? (item.expiresOn as string) : null,
    });
  }
  return out;
}

function write(record: VisitorRecord) {
  memory = record;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(record));
    saved = true;
  } catch {
    // Storage blocked or full: keep going with the in-memory copy.
    saved = false;
  }
}

/** The visitor record, created silently on the first visit. */
export function getRecord(): VisitorRecord {
  if (memory) return memory;

  let stored: Partial<VisitorRecord> | null = null;
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if (parsed && parsed.version === VERSION) stored = parsed;
  } catch {
    // Storage blocked or the saved value is corrupt: start fresh.
  }

  if (stored && typeof stored.visitorId === "string" && stored.visitorId) {
    memory = {
      version: VERSION,
      visitorId: stored.visitorId,
      firstVisitDate: isDateKey(stored.firstVisitDate)
        ? stored.firstVisitDate
        : manilaDateKey(new Date()),
      lastRevealDate: isDateKey(stored.lastRevealDate)
        ? stored.lastRevealDate
        : null,
      mood: moods.some((m) => m.id === stored.mood)
        ? (stored.mood as MoodId)
        : null,
      reveals: cleanReveals(stored.reveals),
    };
    return memory;
  }

  write({
    version: VERSION,
    visitorId: newId(),
    firstVisitDate: manilaDateKey(new Date()),
    lastRevealDate: null,
    mood: null,
    reveals: [],
  });
  return memory as unknown as VisitorRecord;
}

/** False when the browser is blocking storage and progress can't be kept. */
export function canSave(): boolean {
  getRecord();
  return saved;
}

export function canRevealToday(now: Date = new Date()): boolean {
  return canReveal(getRecord(), manilaDateKey(now));
}

/**
 * Makes today's reveal for the chosen mood and saves it. Returns null when
 * today's reveal is already used or all 30 are found.
 */
export function revealToday(mood: MoodId, now: Date = new Date()): Reveal | null {
  const record = getRecord();
  const today = manilaDateKey(now);
  const reveal = decideReveal(record, mood, today, Math.random);
  if (!reveal) return null;
  write({
    ...record,
    mood,
    lastRevealDate: today,
    reveals: [...record.reveals, reveal],
  });
  return reveal;
}

/** Promos issued to this device, newest first. */
export function getIssuedPromos(now: Date = new Date()): IssuedPromo[] {
  const today = manilaDateKey(now);
  return getRecord()
    .reveals.flatMap((r) =>
      r.promoId && r.code && r.expiresOn
        ? [
            {
              date: r.date,
              promoId: r.promoId,
              code: r.code,
              expiresOn: r.expiresOn,
              expired: r.expiresOn < today,
            },
          ]
        : [],
    )
    .reverse();
}

const manilaClock = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Manila",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hourCycle: "h23",
});

/** Milliseconds until midnight in Manila, when the next reveal opens. */
export function getCountdownToReset(now: Date = new Date()): number {
  const parts = manilaClock.formatToParts(now);
  const get = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value ?? 0);
  const elapsed = get("hour") * 3600 + get("minute") * 60 + get("second");
  return (86400 - elapsed) * 1000 - now.getMilliseconds();
}
