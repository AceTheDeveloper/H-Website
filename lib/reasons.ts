// ---------------------------------------------------------------------------
// The "30 reasons to come to H" on the Promo page. Placeholder copy, to be
// approved by the client. Visitors reveal one a day; whether a reveal comes
// with a promo is decided in lib/revealRules.ts, not here.
// ---------------------------------------------------------------------------

export const moods = [
  { id: "slow-morning", label: "Slow morning" },
  { id: "coffee-first", label: "Coffee first" },
  { id: "crew", label: "With the crew" },
  { id: "work-mode", label: "Get work done" },
  { id: "treat-myself", label: "Treat myself" },
  { id: "night-out", label: "Night out" },
] as const;

export type MoodId = (typeof moods)[number]["id"];

export type Reason = {
  id: number;
  title: string;
  line: string;
  moods: MoodId[];
};

export const reasons: Reason[] = [
  { id: 1, title: "First coffee, no waiting", line: "Doors open at 6 AM, so your morning never has to wait.", moods: ["coffee-first", "slow-morning"] },
  { id: 2, title: "Pancakes are a good enough reason", line: "Stacked, syrupy, zero explanation needed.", moods: ["slow-morning", "treat-myself"] },
  { id: 3, title: "Waffles, because it's a day that ends in y", line: "Crisp edges, soft middle, your call on the rest.", moods: ["slow-morning", "treat-myself"] },
  { id: 4, title: "The Big Breakfast exists", line: "For mornings when one egg is not a plan.", moods: ["slow-morning", "crew"] },
  { id: 5, title: "Tapa and rice, the Filipino way to start", line: "A proper plate before a proper day.", moods: ["slow-morning"] },
  { id: 6, title: "Breakfast doesn't end at noon", line: "Order it any time the kitchen is open.", moods: ["slow-morning", "work-mode"] },
  { id: 7, title: "A breakfast meeting that doesn't feel like one", line: "Coffee, a real plate, and room to talk.", moods: ["work-mode"] },
  { id: 8, title: "A table for one is never awkward here", line: "Solo meals are welcome, and loved.", moods: ["treat-myself", "work-mode"] },
  { id: 9, title: "Plates made for the middle of the table", line: "Share everything, argue about the last piece.", moods: ["crew"] },
  { id: 10, title: "Pizza at 11:30", line: "Lunch, sorted.", moods: ["crew", "treat-myself"] },
  { id: 11, title: "Pasta when you need a hug in a bowl", line: "Warm, saucy, and exactly enough.", moods: ["treat-myself"] },
  { id: 12, title: "Filipino sets for home-cooking cravings", line: "Familiar flavors, no cooking required.", moods: ["crew"] },
  { id: 13, title: "Asian plates for the table that can't agree", line: "Something for everyone, in one order.", moods: ["crew"] },
  { id: 14, title: "The painted mural is worth a photo", line: "Bring your phone, you'll want it.", moods: ["crew", "treat-myself"] },
  { id: 15, title: "Red LED signs over the coffee bar", line: "The glow looks good on everyone.", moods: ["night-out", "treat-myself"] },
  { id: 16, title: "Steel tables, loud laughter", line: "A room that likes company.", moods: ["crew", "night-out"] },
  { id: 17, title: "A full house is a good sign", line: "When every table is taken, you know you picked right.", moods: ["crew"] },
  { id: 18, title: "We started as a breakfast counter", line: "The regulars asked what happens after lunch, so we stayed open.", moods: ["crew", "slow-morning"] },
  { id: 19, title: "A slow morning is allowed", line: "No rush, refill the coffee.", moods: ["slow-morning", "coffee-first"] },
  { id: 20, title: "Coffee between meals", line: "The in-between hours deserve a cup too.", moods: ["coffee-first", "work-mode"] },
  { id: 21, title: "The afternoon slump meets its match", line: "Reset with coffee and something small.", moods: ["coffee-first", "work-mode"] },
  { id: 22, title: "The kitchen stays open after 9 PM", line: "The bar takes over and the food keeps coming.", moods: ["night-out"] },
  { id: 23, title: "House cocktails", line: "Start with the one the bartender can't stop recommending.", moods: ["night-out", "treat-myself"] },
  { id: 24, title: "Wine after a long week", line: "You earned the pour.", moods: ["night-out", "treat-myself"] },
  { id: 25, title: "Cold beer, warm food", line: "The oldest good idea there is.", moods: ["night-out", "crew"] },
  { id: 26, title: "Open until 2 AM on Friday and Saturday", line: "Last call is later than you think.", moods: ["night-out"] },
  { id: 27, title: "First coffee to last call, one room", line: "Come for breakfast, stay for the bar.", moods: ["crew", "night-out"] },
  { id: 28, title: "Easy to find on Diversion Road", line: "Mandurriao's all-day spot, no hunting for it.", moods: ["crew", "work-mode"] },
  { id: 29, title: "Celebrate the small wins", line: "A promotion, a Friday, a Tuesday. All count.", moods: ["crew", "treat-myself"] },
  { id: 30, title: "Because you're hungry and we're open", line: "The simplest reason is still a reason.", moods: ["crew", "treat-myself", "slow-morning", "night-out", "coffee-first", "work-mode"] },
];

/**
 * A mood to start on, from the time of day in Manila. Early evening has no
 * obvious pick, so it returns null and the visitor chooses.
 */
export function suggestMood(now: Date = new Date()): MoodId | null {
  const hour = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Manila",
      hour: "numeric",
      hourCycle: "h23",
    }).format(now),
  );
  if (hour >= 21 || hour < 2) return "night-out";
  if (hour < 11) return "slow-morning";
  if (hour < 17) return "crew";
  return null;
}
