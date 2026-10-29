export const TOTAL_STAMPS = 30;

export type StampPromotion = {
  id: string;
  title: string;
  offer: string;
};

// Order is the stamp number; each day unlocks its matching offer.
export const promotions: StampPromotion[] = [
  {
    id: "reason-01",
    title: "First time at H?",
    offer: "A welcome drink from our team!",
  },
  {
    id: "reason-02",
    title: "Need a quick break?",
    offer: "Tag us and redeem a refreshing iced tea.",
  },
  {
    id: "reason-03",
    title: "Feeling sleepy?",
    offer: "We will upgrade your coffee to a large.",
  },
  {
    id: "reason-04",
    title: "Meeting a friend?",
    offer: "Purchase a second coffee at 50% off.",
  },
  {
    id: "reason-05",
    title: "Date with Mom?",
    offer: "Here’s a cup of coffee for Mom from us.",
  },
  {
    id: "reason-06",
    title: "Bucket of beer to celebrate something?",
    offer: "Exchange your chip for a bar chow treat.",
  },
  {
    id: "reason-07",
    title: "Feeling under the weather?",
    offer:
      "Order a comforting bowl of laksa, we'll upgrade it with garlic bread on the side.",
  },
  {
    id: "reason-08",
    title: "Need comfort food?",
    offer: "Order tacos and redeem a blended iced drink to pair.",
  },
  {
    id: "reason-09",
    title: "Work not done yet?",
    offer: "Here’s a coffee refill to keep you going.",
  },
  {
    id: "reason-10",
    title: "Missed your breakfast?",
    offer:
      "Order any Filipino breakfast and we’ll complete it with garlic bread and brewed coffee.",
  },
  {
    id: "reason-11",
    title: "Going out to celebrate?",
    offer: "Bring a crew of 4 or more and enjoy 12% off your total bill.",
  },
  {
    id: "reason-12",
    title: "Need a workspace?",
    offer: "A coffee upgrade for your work session.",
  },
  {
    id: "reason-13",
    title: "Catching up with friends?",
    offer: "Redeem a sharing appetizer (minimum order of ₱1,500).",
  },
  {
    id: "reason-14",
    title: "Birthday month?",
    offer: "A pizza treat from H!",
  },
  {
    id: "reason-15",
    title: "Craving pizza?",
    offer: "Upgrade your drink to a pitcher with any of our pizza.",
  },
  {
    id: "reason-16",
    title: "Weekly team huddle?",
    offer: "Order 4 lunch sets to get a free large pitcher of iced tea.",
  },
  {
    id: "reason-17",
    title: "Midweek pick-me-up?",
    offer:
      "Show your work or student ID to get 15% off your total bill from 2:00 PM – 6:00 PM.",
  },
  {
    id: "reason-18",
    title: "Friday night out?",
    offer: "Bar chow with your beer bucket.",
  },
  {
    id: "reason-19",
    title: "Sundate with family and friends?",
    offer: "Redeem our BBQ fries to share.",
  },
  {
    id: "reason-20",
    title: "Just finished a run?",
    offer: "Enjoy our refreshing healthy blends!",
  },
  {
    id: "reason-21",
    title: "Carwash day?",
    offer: "A cup of coffee while we take care of your car.",
  },
  {
    id: "reason-22",
    title: "Date night?",
    offer: "Here’s a dessert to share after dinner.",
  },
  {
    id: "reason-23",
    title: "Felt like dropping by?",
    offer:
      "Show this to the counter and let our team surprise you with something from our bar.",
  },
  {
    id: "reason-24",
    title: "Craving something savory?",
    offer: "Order any of our sandwiches and redeem a Thai tea to pair.",
  },
  {
    id: "reason-25",
    title: "Need a morning boost?",
    offer:
      "Here’s an extra shot of espresso when you order any of our all-day breakfast.",
  },
  {
    id: "reason-26",
    title: "Girls' catch-up?",
    offer: "Order cocktails (minimum 4 pax) and pizza is on us!",
  },
  {
    id: "reason-27",
    title: "Boys' night?",
    offer: "Buy a beer bucket of 5, get a basket of BBQ fries for chows!",
  },
  {
    id: "reason-28",
    title: "Breakfast for one?",
    offer: "We got your coffee covered.",
  },
  {
    id: "reason-29",
    title: "Meeting over lunch?",
    offer:
      "Get Asian spring rolls to start the agenda (minimum order of ₱1,500).",
  },
  {
    id: "reason-30",
    title: "Just got back to Iloilo?",
    offer: "A welcome-back drink from H!",
  },
];

export const reasons = promotions.map(
  ({ title, offer }) => `${title} ${offer}`,
);

export type StampView = {
  no: number;
  date: string; // YYYY-MM-DD (Manila)
  voucherId: string | null;
  code: string | null;
  redeemed: boolean;
};

export type StampState = {
  total: number;
  stampedToday: boolean;
  hasContact: boolean;
  stamps: StampView[];
};
