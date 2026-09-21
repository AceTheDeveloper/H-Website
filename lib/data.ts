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

const img = (seed: string, w = 480, h = 360) =>
  `https://placehold.co/${w}x${h}/242024/F3F4F5?text=${encodeURIComponent(seed)}`;

export const menu: MenuCategory[] = [
  {
    id: "morning",
    label: "Morning Menu",
    timeNote: "Served 7 – 11:30am",
    items: [
      {
        id: "m1",
        name: "The H Breakfast Plate",
        price: "$14",
        description: "Two eggs your way, smoked bacon, roasted tomato, sourdough.",
        image: img("Breakfast Plate"),
        tag: "Chef's Pick",
      },
      {
        id: "m2",
        name: "Shakshuka",
        price: "$13",
        description: "Baked eggs in a spiced tomato sauce, feta, grilled flatbread.",
        image: img("Shakshuka"),
        tag: "Vegetarian",
      },
      {
        id: "m3",
        name: "Buttermilk Pancakes",
        price: "$12",
        description: "Stacked three high, whipped honey butter, seasonal fruit.",
        image: img("Pancakes"),
      },
      {
        id: "m4",
        name: "Avocado Toast",
        price: "$11",
        description: "Crushed avocado, chili oil, radish, lemon, rye or sourdough.",
        image: img("Avocado Toast"),
        tag: "Vegetarian",
      },
      {
        id: "m5",
        name: "Breakfast Burrito",
        price: "$13",
        description: "Scrambled eggs, chorizo, black beans, cheddar, salsa verde.",
        image: img("Breakfast Burrito"),
      },
      {
        id: "m6",
        name: "House Granola Bowl",
        price: "$10",
        description: "Toasted oats, yoghurt, stone fruit, honey, mixed seeds.",
        image: img("Granola Bowl"),
        tag: "Vegetarian",
      },
    ],
  },
  {
    id: "allday",
    label: "All-Day Plates",
    timeNote: "Served 11:30am – close",
    items: [
      {
        id: "a1",
        name: "H Smash Burger",
        price: "$17",
        description: "Double smashed patty, American cheese, pickles, burger sauce.",
        image: img("Smash Burger"),
        tag: "Bar Favorite",
      },
      {
        id: "a2",
        name: "Grilled Chicken Salad",
        price: "$16",
        description: "Charred chicken, little gem, avocado, pumpkin seed, citrus dressing.",
        image: img("Chicken Salad"),
      },
      {
        id: "a3",
        name: "Truffle Mushroom Pasta",
        price: "$19",
        description: "Fresh tagliatelle, wild mushroom, parmesan, black truffle oil.",
        image: img("Mushroom Pasta"),
        tag: "Vegetarian",
      },
      {
        id: "a4",
        name: "Beer-Battered Fish & Chips",
        price: "$18",
        description: "Fresh catch, hand-cut fries, mushy peas, tartare sauce.",
        image: img("Fish and Chips"),
      },
      {
        id: "a5",
        name: "8oz Steak Frites",
        price: "$26",
        description: "Grilled sirloin, herb butter, crisp fries, peppercorn jus.",
        image: img("Steak Frites"),
        tag: "Chef's Pick",
      },
    ],
  },
  {
    id: "shares",
    label: "Small Bites & Shares",
    timeNote: "Served 11:30am – close",
    items: [
      {
        id: "s1",
        name: "Loaded Fries",
        price: "$9",
        description: "Crispy fries, queso, jalapeño, spring onion, chipotle mayo.",
        image: img("Loaded Fries"),
      },
      {
        id: "s2",
        name: "Buffalo Cauliflower",
        price: "$10",
        description: "Crispy florets, buffalo glaze, blue cheese dip, celery.",
        image: img("Buffalo Cauliflower"),
        tag: "Vegetarian",
      },
      {
        id: "s3",
        name: "Crispy Calamari",
        price: "$12",
        description: "Lightly fried squid, lemon aioli, chili flake, herbs.",
        image: img("Calamari"),
      },
      {
        id: "s4",
        name: "H Sharing Board",
        price: "$22",
        description: "Cured meats, house pickles, whipped ricotta, grilled bread.",
        image: img("Sharing Board"),
        tag: "New",
      },
    ],
  },
  {
    id: "cocktails",
    label: "Handcrafted Cocktails",
    timeNote: "Bar opens 4pm",
    items: [
      {
        id: "c1",
        name: "H Old Fashioned",
        price: "$15",
        description: "Bourbon, demerara, orange bitters, smoked orange peel.",
        image: img("Old Fashioned"),
        tag: "Bar Favorite",
      },
      {
        id: "c2",
        name: "Red Room Spritz",
        price: "$14",
        description: "Aperitivo rosso, prosecco, soda, blood orange.",
        image: img("Red Spritz"),
        tag: "New",
      },
      {
        id: "c3",
        name: "Espresso Martini",
        price: "$15",
        description: "Vodka, coffee liqueur, fresh double espresso, cacao.",
        image: img("Espresso Martini"),
      },
      {
        id: "c4",
        name: "Smoky Paloma",
        price: "$14",
        description: "Mezcal, grapefruit, lime, chili salt rim.",
        image: img("Smoky Paloma"),
      },
      {
        id: "c5",
        name: "Midnight Negroni",
        price: "$15",
        description: "Barrel-aged gin, sweet vermouth, campari, orange oil.",
        image: img("Midnight Negroni"),
        tag: "Chef's Pick",
      },
    ],
  },
  {
    id: "coffee",
    label: "Coffee & Softs",
    timeNote: "Served all day",
    items: [
      {
        id: "d1",
        name: "Flat White",
        price: "$5",
        description: "Double ristretto, steamed milk, house-roasted beans.",
        image: img("Flat White"),
      },
      {
        id: "d2",
        name: "Iced Vanilla Latte",
        price: "$6",
        description: "Espresso, house vanilla syrup, cold milk, over ice.",
        image: img("Iced Latte"),
      },
      {
        id: "d3",
        name: "Fresh Orange Press",
        price: "$6",
        description: "Cold-pressed oranges, nothing added.",
        image: img("Orange Press"),
        tag: "Vegetarian",
      },
      {
        id: "d4",
        name: "Sparkling Berry Soda",
        price: "$5",
        description: "House berry cordial, soda, fresh mint.",
        image: img("Berry Soda"),
      },
    ],
  },
];

export type Voucher = {
  id: string;
  title: string;
  badge: string;
  description: string;
  code: string;
  expiry: string;
};

export const vouchers: Voucher[] = [
  { id: "v1", title: "Welcome offer", badge: "10% off", description: "10% off your first visit, any time of day.", code: "H-WELCOME10", expiry: "Ongoing" },
  { id: "v2", title: "Brunch for two", badge: "BOGO 50%", description: "Buy one brunch plate, get the second half price.", code: "H-BRUNCH2", expiry: "31 Dec" },
  { id: "v3", title: "Coffee's on us", badge: "Free coffee", description: "A free coffee with any full breakfast order.", code: "H-FREECOFFEE", expiry: "31 Dec" },
  { id: "v4", title: "Happy hour", badge: "2-for-1", description: "Two cocktails for the price of one, 4 – 6pm daily.", code: "H-HAPPY2", expiry: "Ongoing" },
  { id: "v5", title: "On your birthday", badge: "Free dessert", description: "A dessert on the house during your birthday month.", code: "H-BDAY", expiry: "Ongoing" },
  { id: "v6", title: "Big table energy", badge: "$15 off", description: "$15 off orders over $75, dine-in only.", code: "H-SPEND75", expiry: "30 Nov" },
  { id: "v7", title: "Group booking", badge: "Free starter", description: "A free starter platter for bookings of 6 or more.", code: "H-GROUP6", expiry: "Ongoing" },
  { id: "v8", title: "Student discount", badge: "15% off", description: "15% off with a valid student ID, Mon – Thu.", code: "H-STUDY15", expiry: "Ongoing" },
  { id: "v9", title: "Sunday family bundle", badge: "20% off", description: "20% off family-style orders every Sunday.", code: "H-FAMSUN", expiry: "Ongoing" },
  { id: "v10", title: "Date night", badge: "Set menu", description: "Two mains and a bottle of house wine for $65.", code: "H-DATENIGHT", expiry: "31 Dec" },
  { id: "v11", title: "Late night bites", badge: "25% off", description: "25% off the small bites menu after 10pm.", code: "H-LATE25", expiry: "Ongoing" },
  { id: "v12", title: "Refer a friend", badge: "$10 credit", description: "Get $10 credit when a friend's first order is on you.", code: "H-REFER10", expiry: "Ongoing" },
  { id: "v13", title: "Loyalty card", badge: "10th free", description: "Collect ten coffee stamps, the eleventh is free.", code: "In-store card", expiry: "Ongoing" },
  { id: "v14", title: "Weekday lunch", badge: "$12 special", description: "A rotating lunch special for $12, Mon – Fri.", code: "H-LUNCH12", expiry: "Ongoing" },
  { id: "v15", title: "Bottomless brunch", badge: "Add-on save", description: "$5 off any bottomless brunch add-on, weekends.", code: "H-BOTTOMLESS", expiry: "31 Dec" },
  { id: "v16", title: "Anniversary special", badge: "Free platter", description: "A dessert platter on us for table anniversaries.", code: "H-ANNIV", expiry: "Ongoing" },
  { id: "v17", title: "First order online", badge: "10% off", description: "10% off your first online order for pickup.", code: "H-ONLINE10", expiry: "Ongoing" },
  { id: "v18", title: "Group bar tab", badge: "15% off", description: "15% off bar tabs for parties of eight or more.", code: "H-BARTAB15", expiry: "Ongoing" },
  { id: "v19", title: "Live music night", badge: "Drink deal", description: "Free entry plus a drink deal on live music nights.", code: "At the door", expiry: "Weekly" },
  { id: "v20", title: "New menu launch", badge: "Try it for $9", description: "Try any new seasonal dish for $9 in its first week.", code: "H-SEASONAL9", expiry: "Rotating" },
  { id: "v21", title: "Newsletter exclusive", badge: "10% off", description: "10% off your next visit when you join the list.", code: "H-NEWS10", expiry: "Ongoing" },
];

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
    description: "All-day plates and small bites take over from the breakfast board.",
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
