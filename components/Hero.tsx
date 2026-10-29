import Image from "next/image";
import Link from "next/link";
import { contact, menu, vouchers } from "@/lib/data";
import FoodBackdrop from "./FoodBackdrop";
import LedSign from "./LedSign";

const dishes = menu.flatMap((category) =>
  category.items.map((item) => ({ item, category })),
);

function findDish(id: string) {
  const found = dishes.find((dish) => dish.item.id === id);
  if (!found?.item.image)
    throw new Error(`Home highlight "${id}" needs a menu item with a photo`);
  return found;
}

const newDishes = ["f4", "t3"].map(findDish);
const voucher = vouchers.find((item) => item.id === "img10");
const highlights = [
  ...newDishes.map(({ item, category }) => ({
    id: item.id,
    title: item.name,
    href: `/menu#${category.id}`,
    image:
      item.id === "f4"
        ? "/home/GoldenPritongManok.png"
        : "/home/DirtyTacos.png",
    badge: "New",
    kind: "dish" as const,
  })),
  ...(voucher
    ? [
        {
          id: voucher.id,
          title: voucher.title,
          href: "/vouchers",
          image: null,
          badge: "Offer",
          kind: "voucher" as const,
        },
      ]
    : []),
];

export default function Hero() {
  return (
    <section className="overflow-hidden bg-plaster">
      <div className="page-shell grid grid-cols-1 items-center gap-y-14 py-14 sm:py-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-x-24 lg:gap-y-0 lg:py-20">
        <div className="relative z-20 min-w-0 lg:max-w-full">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-brick">
            Everyday People · Iloilo City
          </p>
          <h1 className="poster text-[clamp(2.5rem,5vw,5rem)] leading-[0.9]">
            <span className="block whitespace-nowrap">Made for your</span>
            <span className="block whitespace-nowrap text-brick">
              Everyday kind
            </span>
          </h1>
          <p className="lede mt-6 max-w-[55ch] text-lg leading-[1.6] text-ink/85 sm:text-xl">
            An all-day restaurant and bar along Diversion Road, serving
            breakfast, comfort food, and drinks from morning through the
            evening.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/menu"
              className="btn btn-primary min-h-[52px] px-7 py-3.5 text-base"
            >
              View the menu
            </Link>
            <a
              href={contact.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline min-h-[52px] px-7 py-3.5 text-base"
            >
              Get directions
            </a>
          </div>
        </div>

        <figure className="relative mx-auto w-[84vw] max-w-[640px] md:w-[70vw] lg:w-full lg:max-w-[640px]">
          <div className="relative aspect-square">
            <FoodBackdrop variant="red" />
            <Image
              src="/home/BigBreakfast.png"
              alt="H Big Breakfast with eggs, bacon, sausage, toast and sides"
              fill
              priority
              sizes="(min-width: 1280px) 46vw, (min-width: 1024px) 48vw, (min-width: 768px) 70vw, 84vw"
              className="relative z-10 scale-[1.02] object-contain transition-transform duration-300 hover:scale-[1.04] motion-reduce:transition-none"
            />
          </div>
          <figcaption className="relative z-20 -mt-2 ml-[4%] inline-flex flex-col border-2 border-ink bg-chalk px-4 py-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brick">
              Chef&apos;s Pick
            </span>
            <span className="heading text-xl">Big Breakfast · ₱528</span>
          </figcaption>
        </figure>
      </div>

      <div className="page-shell pb-10 sm:pb-12">
        <div className="grid gap-3 border-t border-ink/20 pt-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
          {highlights.map((highlight) => (
            <Link
              key={highlight.id}
              href={highlight.href}
              className="flex min-w-0 items-center gap-4 border border-ink/20 bg-white/70 p-3 transition-colors hover:bg-white sm:gap-5 sm:p-4"
            >
              {highlight.kind === "dish" ? (
                <span className="relative h-24 w-24 shrink-0 sm:h-28 sm:w-28">
                  <Image
                    src={highlight.image}
                    alt={highlight.title}
                    fill
                    sizes="(min-width: 1024px) 112px, 96px"
                    className="scale-[1.04] object-contain"
                  />
                </span>
              ) : (
                <span
                  aria-hidden="true"
                  className="flex h-24 w-24 shrink-0 flex-col items-center justify-center border border-[#d99a18] bg-[#fff0bd] text-brick sm:h-28 sm:w-28"
                >
                  <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none">
                    <path
                      d="M13 9h20l-2 31H15L13 9Z"
                      fill="#E21E02"
                      stroke="#17110e"
                      strokeWidth="2"
                    />
                    <path
                      d="M33 14h3a5 5 0 0 1 0 10h-3"
                      stroke="#17110e"
                      strokeWidth="2"
                    />
                    <path d="M18 5v4m7-4v4" stroke="#17110e" strokeWidth="2" />
                    <path d="M18 24h10" stroke="white" strokeWidth="2" />
                  </svg>
                  <span className="mt-1 text-[10px] font-bold uppercase tracking-wider">
                    Any drink
                  </span>
                </span>
              )}
              <span className="min-w-0">
                <span className="inline-flex rounded-full bg-brick px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-white">
                  {highlight.badge}
                </span>
                <span className="heading mt-2 block text-xl leading-tight sm:text-2xl">
                  {highlight.title}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>

      <LedSign />
    </section>
  );
}
