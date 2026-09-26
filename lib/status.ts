import { hours } from "./data";

const DAY_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

// Minutes since midnight when each part of the day starts.
const PLATES_FROM = 11 * 60 + 30;
const BAR_FROM = 16 * 60;

export type OpenStatus = {
  open: boolean;
  /** Index into `hours` for today's opening hours (Manila time). */
  todayIndex: number;
  /** Lines for the LED sign. */
  messages: string[];
};

/** Hours shown when JavaScript hasn't run yet (server render). */
export const defaultMessages = [
  "Open daily from 6 AM",
  "Fri and Sat until 2 AM",
  "Diversion Road · Mandurriao · Iloilo City",
];

function manilaNow(now: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "0";
  return {
    day: DAY_INDEX[get("weekday")] ?? 0,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

function scheduleFor(day: number) {
  const index = hours.findIndex((h) => h.days.includes(day));
  return { index, entry: hours[index] };
}

function clock(totalMinutes: number) {
  const m = ((totalMinutes % 1440) + 1440) % 1440;
  const h24 = Math.floor(m / 60);
  const mm = m % 60;
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  const suffix = h24 < 12 ? "AM" : "PM";
  return mm === 0 ? `${h12} ${suffix}` : `${h12}:${String(mm).padStart(2, "0")} ${suffix}`;
}

/** Opening status in Manila time, using the hours in lib/data.ts. */
export function getOpenStatus(now: Date = new Date()): OpenStatus {
  const { day, minutes } = manilaNow(now);
  const today = scheduleFor(day);
  const yesterday = scheduleFor((day + 6) % 7);

  // Fri/Sat hours run past midnight, so early morning can belong to yesterday.
  let elapsed: number | null = null;
  let closes = 0;
  if (yesterday.entry && minutes + 1440 < yesterday.entry.close) {
    elapsed = minutes + 1440;
    closes = yesterday.entry.close;
  } else if (today.entry && minutes >= today.entry.open && minutes < today.entry.close) {
    elapsed = minutes;
    closes = today.entry.close;
  }

  if (elapsed === null) {
    const opensToday = today.entry && minutes < today.entry.open;
    const next = opensToday ? today.entry : scheduleFor((day + 1) % 7).entry;
    return {
      open: false,
      todayIndex: today.index,
      messages: [
        `Closed right now`,
        `Opens ${opensToday ? "today" : "tomorrow"} at ${clock(next.open)}`,
        "Diversion Road · Mandurriao · Iloilo City",
      ],
    };
  }

  const part =
    elapsed < PLATES_FROM
      ? ["Breakfast plates all day", "Pizza, pasta and quick bites from 11:30 AM"]
      : elapsed < BAR_FROM
        ? ["Pizza, pasta and quick bites are on", "Bar opens at 4 PM"]
        : ["The bar is open", "Kitchen and bar run until closing"];

  return {
    open: true,
    todayIndex: today.index,
    messages: [
      `Open now until ${clock(closes)}`,
      ...part,
      "Diversion Road · Mandurriao · Iloilo City",
    ],
  };
}
