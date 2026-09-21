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

export type MenuItem = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  tag?: "New" | "Chef's Pick" | "Bar Favorite" | "Vegetarian";
};

export type MenuCategory = {
  id: string;
  label: string;
  timeNote: string;
  items: MenuItem[];
};

// Images live in /public/menu. Prices and descriptions are placeholders.
const img = (file: string) => `/menu/${file}.png`;
const PRICE = "₱000";
const DESC = "Placeholder description — swap in the real dish details.";

const item = (
  id: string,
  name: string,
  file: string,
  tag?: MenuItem["tag"],
): MenuItem => ({
  id,
  name,
  price: PRICE,
  description: DESC,
  image: img(file),
  tag,
});

export const menu: MenuCategory[] = [
  {
    id: "breakfast",
    label: "Breakfast",
    timeNote: "Served 7 – 11:30am",
    items: [
      item("b1", "Big Breakfast", "BigBreakfast", "Chef's Pick"),
      item("b2", "The Breakfast Fold", "TheBreakfastFold"),
      item("b3", "H Pancakes", "HPancakes"),
      item("b4", "Chicken and Waffles", "ChickenAndWaffles"),
      item("b5", "Honey Glazed Bacon", "HoneyGlazedBacon"),
      item("b6", "Chorizo Hubad", "ChorizoHubad"),
    ],
  },
  {
    id: "sandwiches",
    label: "Sandwiches & Wraps",
    timeNote: "Served all day",
    items: [
      item("s1", "Breakfast Sandwich", "BreakfastSandwich"),
      item(
        "s2",
        "Crispy Chicken Sandwich",
        "CrispyChickenSandwich",
        "Chef's Pick",
      ),
      item("s3", "Morta Pesto Sandwich", "MortaPestoSandwich"),
      item("s4", "Salami Sandwich", "SalamiSandwich"),
      item("s5", "Chicken Wrap", "ChickenWrap"),
    ],
  },
  {
    id: "mains",
    label: "Mains",
    timeNote: "Served 11:30am – close",
    items: [
      item("m1", "Sisig Supremo", "SisigSupremo", "Bar Favorite"),
      item("m2", "Tapa Bits", "TapaBits"),
      item("m3", "Daing Bangus", "DaingBangus"),
      item("m4", "Inasal at Buro", "InasalAtBuro"),
      item("m5", "Lengua Bakareta", "LenguaBakareta"),
      item("m6", "Salted Egg Chicken", "SaltedEggChicken"),
      item("m7", "H Steak Tenderloin", "HSteakTenderloin", "Chef's Pick"),
      item("m8", "USDA Lechon Baka", "USDALechonBaka", "New"),
      item("m9", "Pork Chop Steak", "PorkChopSteak"),
    ],
  },
  {
    id: "sharing",
    label: "Sharing Platters",
    timeNote: "Served 11:30am – close",
    items: [
      item("p1", "Sisig Supremo (Sharing)", "SisigSupremoSharing"),
      item("p2", "Inasal at Buro (Sharing)", "InsalAtBuroSharing"),
      item("p3", "Lengua Bakareta (Sharing)", "LenguaBakaretaSharing"),
      item(
        "p4",
        "Golden Pritong Manok (Sharing)",
        "GoldenPritongManokSharing",
        "New",
      ),
    ],
  },
  {
    id: "bites",
    label: "Small Bites",
    timeNote: "Served 11:30am – close",
    items: [
      item("t1", "BBQ Fries", "BBQFries"),
      item("t2", "Chicharon", "Chicharon", "Bar Favorite"),
      item("t3", "Dirty Tacos", "DirtyTacos", "New"),
      item("t4", "Kare Chicken Pork Satay", "KareChickenPorkSatay"),
    ],
  },
  {
    id: "pizza",
    label: "Pizza",
    timeNote: "Served 11:30am – close",
    items: [
      item("z1", "Pepperoni", "Pepperoni"),
      item("z2", "Quatro Formagi", "QuatroFormagi", "Chef's Pick"),
      item("z3", "Morta Pista", "MortaPista"),
      item("z4", "Puting Keso with Aragula", "PutingKesoWithAragula"),
    ],
  },
  {
    id: "pasta",
    label: "Pasta & Noodles",
    timeNote: "Served 11:30am – close",
    items: [
      item("n1", "Lasagna", "Lasagna"),
      item("n2", "Tagliatelle", "Tagliatelle"),
      item("n3", "Pad Thai", "PadThai"),
      item("n4", "Spicy Peanut Noodles", "SpicyPeanutNoddles"),
      item("n5", "Squid Fried Rice", "SquidFriedRice"),
    ],
  },
  {
    id: "sides",
    label: "Sides, Salad & Dessert",
    timeNote: "Served all day",
    items: [
      item("d1", "H Salad", "HSalad", "Vegetarian"),
      item("d2", "Garlic Bread", "GarlicBread", "Vegetarian"),
      item("d3", "Mango Stick Rice", "MangoStickRice", "Vegetarian"),
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
  address: "45 Market Street, Riverside District",
  phone: "(555) 014 7788",
  email: "hello@hbreakfasttobar.com",
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
