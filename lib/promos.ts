// ---------------------------------------------------------------------------
// Promo artwork (in /public/vouchers) and the settings for how promos are
// handed out on the Promo page. The image carries all the details, so only a
// title is needed here.
// ---------------------------------------------------------------------------

/** Chance that a daily reveal comes with a promo, after the first one. */
export const PROMO_CHANCE = 0.33;

/** A promo can be used for this many days after the day it is issued. */
export const PROMO_VALID_DAYS = 7;

export type Promo = {
  id: string;
  title: string;
  /** Filename in /public/vouchers. */
  file: string;
};

export const promos: Promo[] = [
  { id: "americano", title: "Americano Promo", file: "h-americano.png" },
  { id: "breakfast-business", title: "Breakfast & Business Promo", file: "h-breakfast-business.png" },
  { id: "pizza", title: "Pizza Promo", file: "h-pizza.png" },
  { id: "solo-meal", title: "Solo Meal Promo", file: "h-solo-meal.png" },
  { id: "500-off", title: "₱500 Promo", file: "h-500-off.png" },
  { id: "christmas-500", title: "A Gift for You — Christmas Promo ₱500", file: "h-christmas-500.png" },
  { id: "pad-thai", title: "Pad Thai Promo", file: "h-pad-thai.png" },
  { id: "sandwich", title: "H Sandwich Promo", file: "h-sandwich.png" },
  { id: "any-drink", title: "Any Drink Promo", file: "h-any-drink.png" },
  { id: "basic-carwash", title: "Basic Carwash Promo", file: "h-basic-carwash.png" },
];

export function promoImage(promo: Promo) {
  return `/vouchers/${promo.file}`;
}
