import Link from "next/link";
import { contact, menu, vouchers } from "@/lib/data";
import HeroSlider, { type HeroSlide } from "./HeroSlider";
import LedSign from "./LedSign";

const dishes = menu.flatMap((category) =>
  category.items.map((item) => ({ item, category })),
);

/** A dish as a slide, with its first price ("From" when there are several). */
function dishSlide(id: string, label: string): HeroSlide {
  const found = dishes.find((d) => d.item.id === id);
  if (!found?.item.image) throw new Error(`Hero slide "${id}" needs a menu item with a photo`);
  const { item, category } = found;
  const prices = item.prices ?? [];
  return {
    id,
    label,
    title: item.name,
    price: prices.length
      ? `${prices.length > 1 ? "From " : ""}${prices[0].price}`
      : undefined,
    image: item.image!,
    alt: item.name,
    href: `/menu#${category.id}`,
    cta: "See it on the menu",
  };
}

const voucher = vouchers.find((v) => v.id === "img10");

// Best sellers, new dishes and a current offer. Swap the ids to change them.
const slides: HeroSlide[] = [
  dishSlide("b8", "Chef's Pick"),
  dishSlide("f4", "New"),
  dishSlide("t3", "New"),
  ...(voucher
    ? [
        {
          id: voucher.id,
          label: "Current offer",
          title: voucher.title,
          image: voucher.image,
          alt: `${voucher.brand}: ${voucher.title}`,
          href: "/vouchers",
          cta: "See vouchers",
        },
      ]
    : []),
];

/**
 * First thing on the page: what H is in one line, two buttons, and a slider of
 * what's worth ordering. The LED signboard hangs across the bottom.
 */
export default function Hero() {
  return (
    <section className="bg-plaster">
      <div className="page-shell grid grid-cols-1 items-center gap-8 py-8 md:py-12 lg:grid-cols-2 lg:gap-14">
        <div>
          <h1 className="poster text-[clamp(3rem,11vw,4.5rem)] md:text-[clamp(3.5rem,5.6vw,5rem)]">
            Made for Your <span className="text-brick">Everyday Kind</span>
          </h1>
          <p className="lede mt-5 max-w-md text-ink/85">
            An all-day restaurant and bar along Diversion Road, serving
            breakfast, comfort food, and drinks from morning through the
            evening.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/menu" className="btn btn-primary">
              View the menu
            </Link>
            <a
              href={contact.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              Get directions
            </a>
          </div>
        </div>

        <HeroSlider slides={slides} />
      </div>

      <LedSign />
    </section>
  );
}
