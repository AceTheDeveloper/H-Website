import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import Tabs from "./Tabs";
import { contact } from "@/lib/data";
import dining from "@/assets/dining.jpg";
import kitchen from "@/assets/kitchen.jpg";
import bar from "@/assets/bar.jpg";

type Action = { label: string; href: string };

const slots: {
  id: string;
  tab: string;
  time: string;
  title: string;
  description: string;
  image: StaticImageData;
  alt: string;
  primary: Action;
  secondary?: Action;
}[] = [
  {
    id: "morning",
    tab: "6 AM · Breakfast",
    time: "6 AM",
    title: "Breakfast, all day",
    description:
      "Pancakes, waffles, tapa and the Big Breakfast. Order them any time the kitchen is open.",
    image: dining,
    alt: "The dining room, with the painted mural and steel tables",
    primary: { label: "See breakfast", href: "/menu#allday" },
  },
  {
    id: "midday",
    tab: "11:30 AM · Plates to share",
    time: "11:30 AM",
    title: "Plates to share",
    description:
      "Pizza, pasta and quick bites start at 11:30 am, next to the Filipino sets and Asian plates made for the middle of the table.",
    image: kitchen,
    alt: "The coffee bar and kitchen pass, with red LED signs overhead",
    primary: { label: "View the full menu", href: "/menu" },
  },
  {
    id: "night",
    tab: "9 PM · The bar",
    time: "9 PM",
    title: "After 9 pm, the bar takes over",
    description:
      "House cocktails, wine and beer join the food menu. The bar runs from 9 pm to 2 am, kitchen included.",
    image: bar,
    alt: "Guests at their tables inside the bar at night, lit red",
    primary: { label: `Call ${contact.phone}`, href: contact.phoneHref },
    secondary: { label: "Find us", href: "/location" },
  },
];

function ActionLink({
  action,
  className,
}: {
  action: Action;
  className: string;
}) {
  return action.href.startsWith("tel:") ? (
    <a href={action.href} className={className}>
      {action.label}
    </a>
  ) : (
    <Link href={action.href} className={className}>
      {action.label}
    </Link>
  );
}

/**
 * The home page's middle section: the short story, then three clicks through
 * the day (morning, midday, night). Replaces the old scroll of dishes and
 * vouchers.
 */
export default function DayTabs() {
  return (
    <section className="bg-chalk py-12 md:py-16">
      <div className="page-shell">
        <div className="max-w-4xl">
          <p className="heading text-2xl leading-[1.15] sm:text-3xl md:text-4xl">
            H Breakfast to Bar started as a breakfast counter with a short menu
            and a long weekend line. The regulars asked what happens after
            lunch, so the kitchen stayed open and the bar went in.
          </p>
          <Link href="/about" className="text-link mt-6 inline-block">
            Read our story
          </Link>
        </div>

        <Tabs
          label="Through the day"
          className="mt-10"
          tabs={slots.map((s) => ({
            id: s.id,
            label: s.tab,
            content: (
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14">
                <div className="relative aspect-[4/3] border-2 border-ink">
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="poster text-5xl text-brick sm:text-6xl">
                    {s.time}
                  </p>
                  <h2 className="heading mt-3 text-3xl sm:text-4xl md:text-5xl">
                    {s.title}
                  </h2>
                  <p className="lede mt-4 max-w-md text-ink/80">
                    {s.description}
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <ActionLink
                      action={s.primary}
                      className="btn btn-primary"
                    />
                    {s.secondary && (
                      <ActionLink
                        action={s.secondary}
                        className="btn btn-outline"
                      />
                    )}
                  </div>
                </div>
              </div>
            ),
          }))}
        />
      </div>
    </section>
  );
}
