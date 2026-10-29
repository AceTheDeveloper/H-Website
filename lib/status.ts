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

const OPEN_AT = 6 * 60;
const WEEKDAY_CLOSE = 22 * 60;
const WEEKEND_CLOSE = 26 * 60;
const PLATES_FROM = 11 * 60 + 30;
const BAR_FROM = 21 * 60;

export type OpenStatus = {
  open: boolean;
  /** Index into `hours` for today's opening hours (Manila time). */
  todayIndex: number;
  /** Lines for the LED sign. */
  messages: string[];
};

/** Neutral text shown until the browser calculates the live status. */
export const defaultMessages = [
  "Open daily from 6 AM",
  "Breakfast, meals and drinks",
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
  const value = (type: string) => parts.find((part) => part.type === type)?.value;
  const weekday = value("weekday");
  const hour = value("hour");
  const minute = value("minute");
  const day = weekday ? DAY_INDEX[weekday] : undefined;
  if (day === undefined || hour === undefined || minute === undefined) {
    throw new Error("Unable to determine the current time in Asia/Manila");
  }
  return { day, minutes: Number(hour) * 60 + Number(minute) };
}

function scheduleIndexFor(day: number) {
  const index = hours.findIndex((entry) => entry.days.includes(day));
  if (index < 0) throw new Error(`Missing opening hours for weekday ${day}`);
  return index;
}

function clock(totalMinutes: number) {
  const minutes = ((totalMinutes % 1440) + 1440) % 1440;
  const hour24 = Math.floor(minutes / 60);
  const hour12 = hour24 % 12 || 12;
  const suffix = hour24 < 12 ? "AM" : "PM";
  return minutes % 60 === 0
    ? `${hour12} ${suffix}`
    : `${hour12}:${String(minutes % 60).padStart(2, "0")} ${suffix}`;
}

/** Opening status for the current time in Manila, independent of server timezone. */
export function getOpenStatus(now: Date = new Date()): OpenStatus {
  const { day, minutes } = manilaNow(now);
  const todayIndex = scheduleIndexFor(day);
  const isWeekendOvernight = minutes < 2 * 60 && (day === 6 || day === 0);

  let elapsed: number | null = null;
  let closesAt = 0;
  if (isWeekendOvernight) {
    elapsed = minutes + 1440;
    closesAt = WEEKEND_CLOSE;
  } else if (minutes >= OPEN_AT) {
    const close = day === 5 || day === 6 ? WEEKEND_CLOSE : WEEKDAY_CLOSE;
    if (minutes < close) {
      elapsed = minutes;
      closesAt = close;
    }
  }

  if (elapsed === null) {
    const opensToday = minutes < OPEN_AT;
    return {
      open: false,
      todayIndex,
      messages: [
        "Closed right now",
        `Opens ${opensToday ? "today" : "tomorrow"} at ${clock(OPEN_AT)}`,
        "Diversion Road · Mandurriao · Iloilo City",
      ],
    };
  }

  const part =
    elapsed < PLATES_FROM
      ? ["Breakfast plates all day", "Pizza, pasta and quick bites from 11:30 AM"]
      : elapsed < BAR_FROM
        ? ["Pizza, pasta and quick bites are on", "Bar opens at 9 PM"]
        : ["The bar is open", "Kitchen and bar run until closing"];

  return {
    open: true,
    todayIndex,
    messages: [
      `Open now until ${clock(closesAt)}`,
      ...part,
      "Diversion Road · Mandurriao · Iloilo City",
    ],
  };
}
