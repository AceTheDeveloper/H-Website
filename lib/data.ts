// ---------------------------------------------------------------------------
// Placeholder content for H Breakfast to Bar.
// Swap image URLs, copy, prices and hours for the real thing whenever it's
// ready — everything here is shaped so the rest of the app doesn't need to
// change when you do.
// ---------------------------------------------------------------------------

export const nav = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Menu", href: "/menu" },
  { label: "Vouchers", href: "/vouchers" },
  { label: "Location", href: "/location" },
];

export type PriceOption = {
  /** e.g. "Solo", "Sharing", "Cup", "250g". Omit for a single plain price. */
  label?: string;
  price: string;
};

export type MenuItem = {
  id: string;
  name: string;
  prices?: PriceOption[];
  description?: string;
  /** Path under /public/menu. Dishes without a photo show a branded tile. */
  image?: string;
  tag?: "New" | "Chef's Pick" | "Bar Favorite" | "Vegetarian";
};

export type MenuCategory = {
  id: string;
  label: string;
  timeNote?: string;
  items: MenuItem[];
};

// Prices are in Philippine pesos. Dishes with no `prices` yet simply show
// their name — add them here when they're ready.
const peso = (n: number) =>
  `₱${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

const one = (n: number): PriceOption[] => [{ price: peso(n) }];
const solo = (soloPrice: number, sharingPrice: number): PriceOption[] => [
  { label: "Solo", price: peso(soloPrice) },
  { label: "Sharing", price: peso(sharingPrice) },
];
// Two plain prices with no labels, shown as "₱258 / ₱388".
const either = (a: number, b: number): PriceOption[] => [
  { price: peso(a) },
  { price: peso(b) },
];
const sized = (...entries: [string, number][]): PriceOption[] =>
  entries.map(([label, n]) => ({ label, price: peso(n) }));

const item = (
  id: string,
  name: string,
  opts: {
    image?: string;
    prices?: PriceOption[];
    tag?: MenuItem["tag"];
  } = {},
): MenuItem => ({
  id,
  name,
  image: opts.image ? `/menu/${opts.image}.png` : undefined,
  prices: opts.prices,
  tag: opts.tag,
});

export const menu: MenuCategory[] = [
  {
    id: "allday",
    label: "All Day Breakfast",
    timeNote: "Served all day",
    items: [
      item("b1", "H Pancakes", { image: "HPancakes", prices: one(218) }),
      item("b2", "The Breakfast Fold", { image: "TheBreakfastFold", prices: one(288) }),
      item("b3", "Chicken and Waffles", { image: "ChickenAndWaffles", prices: one(288) }),
      item("b4", "Daing Bangus", { image: "DaingBangus", prices: one(288) }),
      item("b5", "Chorizo Hubad", { image: "ChorizoHubad", prices: one(288) }),
      item("b6", "Honey Glazed Bacon", { image: "HoneyGlazedBacon", prices: one(318) }),
      item("b7", "Tapa Bits", { image: "TapaBits", prices: one(358) }),
      item("b8", "Big Breakfast", { image: "BigBreakfast", prices: one(528), tag: "Chef's Pick" }),
    ],
  },
  {
    id: "sandwiches",
    label: "Sandwiches & Wraps",
    timeNote: "Served all day",
    items: [
      item("w1", "Breakfast Sandwich", { image: "BreakfastSandwich", prices: one(258) }),
      item("w2", "Salami Sandwich", { image: "SalamiSandwich", prices: one(328) }),
      item("w3", "Chicken Wrap", { image: "ChickenWrap", prices: one(288) }),
      item("w4", "Morta Pesto Sandwich", { image: "MortaPestoSandwich", prices: one(388) }),
      item("w5", "Crispy Chicken Sandwich", { image: "CrispyChickenSandwich", tag: "Chef's Pick" }),
    ],
  },
  {
    id: "sides",
    label: "Sides, Salads & Sweets",
    timeNote: "Served all day",
    items: [
      item("d1", "H Garlic Bread", { image: "GarlicBread", prices: one(188), tag: "Vegetarian" }),
      item("d2", "H Salad", { image: "HSalad", prices: one(228), tag: "Vegetarian" }),
      item("d3", "Caesar Salad", { prices: one(228) }),
      item("d4", "Mango Sticky Rice", { image: "MangoStickRice", prices: one(226), tag: "Vegetarian" }),
      item("d5", "French Toast", { prices: one(218) }),
    ],
  },
  {
    id: "filipino",
    label: "Filipino Sets",
    timeNote: "Solo or sharing",
    items: [
      item("f1", "Sisig Supremo", { image: "SisigSupremo", prices: solo(228, 428), tag: "Bar Favorite" }),
      item("f2", "Lengua Bakareta", { image: "LenguaBakareta", prices: solo(388, 688) }),
      item("f3", "Inasal at Buro", { image: "InasalAtBuro", prices: solo(358, 858) }),
      item("f4", "Golden Pritong Manok", {
        image: "GoldenPritongManokSharing",
        prices: solo(338, 508),
        tag: "New",
      }),
      item("f5", "Classic Ox Tongue", { prices: solo(338, 558) }),
      item("f6", "Pork Cordon Bleu", { prices: solo(358, 568) }),
      item("f7", "Chicken Asia Max", { prices: solo(258, 538) }),
    ],
  },
  {
    id: "asian",
    label: "Asian Plates",
    timeNote: "Solo or sharing",
    items: [
      item("a1", "Asian Spring Rolls", { prices: solo(288, 508) }),
      item("a2", "Salted Egg Chicken", { image: "SaltedEggChicken", prices: solo(388, 688) }),
      item("a3", "Spiced Coconut Curry", { prices: solo(288, 488) }),
      item("a4", "Kare Chicken Satay", { image: "KareChickenPorkSatay", prices: solo(258, 508) }),
    ],
  },
  {
    id: "meat",
    label: "Meat Plates",
    timeNote: "Steaks priced by weight",
    items: [
      item("m1", "H Steak", {
        image: "HSteakTenderloin",
        prices: sized(["250g", 1688]),
        tag: "Chef's Pick",
      }),
      item("m2", "USDA Lechon Baka", {
        image: "USDALechonBaka",
        prices: sized(["250g", 788], ["500g", 1588]),
        tag: "New",
      }),
      item("m3", "Sausage Steak", { prices: one(688) }),
      item("m4", "Pork Chop Steak", { image: "PorkChopSteak", prices: one(788) }),
    ],
  },
  {
    id: "soup",
    label: "Soup",
    items: [item("u1", "Laksa", { prices: one(388) })],
  },
  {
    id: "rice",
    label: "Rice",
    timeNote: "Cup or platter",
    items: [
      item("r1", "Plain Rice", { prices: sized(["Cup", 48], ["Platter", 208]) }),
      item("r2", "Garlic Rice", { prices: sized(["Cup", 68], ["Platter", 288]) }),
    ],
  },
  {
    id: "bites",
    label: "Quick Bites",
    timeNote: "Served 11:30am – close",
    items: [
      item("t1", "BBQ Fries", { image: "BBQFries", prices: either(258, 388) }),
      item("t2", "Hero Dog", { prices: one(358) }),
      item("t3", "Dirty Tacos", { image: "DirtyTacos", prices: one(588), tag: "New" }),
      item("t4", "Burger Sliders", { prices: one(388) }),
      item("t5", "Chicharon", { image: "Chicharon", tag: "Bar Favorite" }),
    ],
  },
  {
    id: "pasta",
    label: "Pasta",
    timeNote: "Served 11:30am – close",
    items: [
      item("n1", "Spicy Peanut Noodles", { image: "SpicyPeanutNoddles", prices: one(598) }),
      item("n2", "Pad Thai", { image: "PadThai", prices: one(488) }),
      item("n3", "Lasagna", { image: "Lasagna", prices: one(688) }),
      item("n4", "Tagliatelle", { image: "Tagliatelle", prices: one(588) }),
      item("n5", "Squid Fried Rice", { image: "SquidFriedRice" }),
    ],
  },
  {
    id: "pizza",
    label: "Pizza",
    timeNote: "Served 11:30am – close",
    items: [
      item("z1", "Puting Keso with Aragula", { image: "PutingKesoWithAragula", prices: one(608) }),
      item("z2", "Quattro Formaggi", { image: "QuatroFormagi", prices: one(658), tag: "Chef's Pick" }),
      item("z3", "Pepperoni", { image: "Pepperoni", prices: one(658) }),
      item("z4", "Truffle Pizza", { prices: one(688) }),
      item("z5", "Supreme Pizza"),
      item("z6", "Blue Cheese Pizza"),
      item("z7", "Morta Pizza", { image: "MortaPista" }),
    ],
  },
];

// Designed voucher artwork (in /public/vouchers). The image carries all the
// details, so only a title (used as alt text) is needed here.
export type ImageVoucher = {
  id: string;
  brand: string;
  title: string;
  image: string;
};

export type Voucher = ImageVoucher;

const imageVouchers: ImageVoucher[] = [
  { id: "img1", brand: "H Breakfast to Bar", title: "Basic Carwash Voucher", image: "/vouchers/h-basic-carwash.png" },
  { id: "img2", brand: "H Breakfast to Bar", title: "Americano Voucher", image: "/vouchers/h-americano.png" },
  { id: "img3", brand: "H Breakfast to Bar", title: "Breakfast & Business Voucher", image: "/vouchers/h-breakfast-business.png" },
  { id: "img4", brand: "H Breakfast to Bar", title: "Pizza Voucher", image: "/vouchers/h-pizza.png" },
  { id: "img5", brand: "H Breakfast to Bar", title: "Solo Meal Voucher", image: "/vouchers/h-solo-meal.png" },
  { id: "img6", brand: "H Breakfast to Bar", title: "₱500 Voucher", image: "/vouchers/h-500-off.png" },
  { id: "img7", brand: "H Breakfast to Bar", title: "A Gift for You — Christmas Voucher ₱500", image: "/vouchers/h-christmas-500.png" },
  { id: "img8", brand: "H Breakfast to Bar", title: "Pad Thai Voucher", image: "/vouchers/h-pad-thai.png" },
  { id: "img9", brand: "H Breakfast to Bar", title: "H Sandwich Voucher", image: "/vouchers/h-sandwich.png" },
  { id: "img10", brand: "H Breakfast to Bar", title: "Any Drink Voucher", image: "/vouchers/h-any-drink.png" },
];

export const vouchers: Voucher[] = imageVouchers;

export const hours = [
  { day: "Monday – Friday", time: "7:00 am – 12:00 am" },
  { day: "Saturday – Sunday", time: "8:00 am – 1:00 am" },
];

export const contact = {
  address: "Diversion Road, Mandurriao, Iloilo City",
  phone: "+63 945 538 8889",
  phoneHref: "tel:+639455388889",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=H+Breakfast+to+Bar+Mandurriao+Iloilo+City",
};

export const dayRhythm = [
  {
    time: "7 AM",
    title: "Breakfast opens",
    description: "Coffee, eggs, pastries — the kitchen wakes up before you do.",
  },
  {
    time: "12 PM",
    title: "The menu shifts",
    description:
      "All-day plates and small bites take over from the breakfast board.",
  },
  {
    time: "4 PM",
    title: "The bar opens",
    description: "House cocktails, wine and beer join the food menu.",
  },
  {
    time: "Late",
    title: "Last call",
    description: "Kitchen and bar run late for the ones still at the table.",
  },
];
