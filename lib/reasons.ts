export const TOTAL_STAMPS = 30;

// Edit the wording freely. Order = stamp number.
export const reasons: string[] = [
  "Breakfast doesn't watch the clock. Pancakes are served all day.",
  "The Big Breakfast. Come hungry.",
  "Chicken and Waffles, any time you like.",
  "Sisig Supremo, a bar favorite.",
  "We open at 6 AM. First coffee is on the early side.",
  "Quattro Formaggi pizza, made for sharing from 11:30 am.",
  "Pad Thai when you want something different.",
  "After 9 pm the bar takes over, kitchen included.",
  "Salted Egg Chicken. Enough said.",
  "Lengua Bakareta, a Filipino set worth the trip.",
  "Fridays and Saturdays we stay open until 2 am.",
  "Inasal at Buro, solo or for the whole table.",
  "Golden Pritong Manok, new on the menu.",
  "Our sauces, dressings and bread are made in-house daily.",
  "Dirty Tacos, also new.",
  "Mango Sticky Rice, because dessert counts.",
  "Sit down for breakfast, stay until last call. Nobody rushes you.",
  "H Garlic Bread to start the table.",
  "USDA Lechon Baka, 250g or 500g.",
  "Tapa Bits for a proper Filipino breakfast.",
  "The same crew flips your pancakes and closes the bar.",
  "Lasagna, when you want comfort on a plate.",
  "Daing Bangus with garlic rice.",
  "Chicharon at the bar, perfect with a drink.",
  "H Steak, 250g, when it's a celebration.",
  "BBQ Fries to share while you talk.",
  "Kare Chicken Satay, bold Asian flavors.",
  '"Live live local daily." Read it on our dining room wall.',
  "Morta Pista, the big pizza for the big table.",
  "Day 30. You made it. Come celebrate with the crew.",
];

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
