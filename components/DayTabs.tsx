import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import Tabs from "./Tabs";
import bigBreakfast from "@/public/menu/BigBreakfast.png";
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
  contain?: boolean;
  primary: Action;
  secondary?: Action;
}[] = [
  {
    id: "morning",
    tab: "6 AM · Breakfast",
    time: "6 AM",
    title: "Breakfast, all day",
    description:
      "Pancakes, waffles, tapa, and the Big Breakfast. Order your morning favorites anytime the kitchen is open.",
    image: bigBreakfast,
    alt: "The Big Breakfast plate with garlic toast, bacon, sausages and eggs",
    contain: true,
    primary: { label: "See breakfast", href: "/menu#allday" },
  },
  {
    id: "midday",
    tab: "11:30 AM · Lunch & dinner",
    time: "11:30 AM",
    title: "Meals worth sharing",
    description:
      "Pizza, pasta, quick bites, Filipino sets, and Asian plates join the menu, made for easy lunches and meals worth sharing.",
    image: kitchen,
    alt: "The coffee bar and kitchen pass, with red LED signs overhead",
    primary: { label: "View the full menu", href: "/menu" },
  },
  {
    id: "night",
    tab: "9 PM · Drinks",
    time: "9 PM",
    title: "Drinks after dark",
    description:
      "House cocktails, wine, and beer join the menu. The bar runs until 2 AM, with the kitchen still going.",
    image: bar,
    alt: "Guests at their tables inside the bar at night, lit red",
    primary: { label: "See the cocktails menu", href: "/menu#drinks" },
    secondary: { label: "Find Us", href: "/location" },
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
 * The home page's middle section: the story in two lines, then three clicks
 * through the day (breakfast, lunch and dinner, drinks).
 */
export default function DayTabs() {
  return (
    <section className="bg-chalk py-12 md:py-16">
      <div className="page-shell">
        <p className="heading max-w-3xl text-2xl leading-[1.15] sm:text-3xl md:text-4xl">
          H started with breakfast and a short menu. As regulars asked for
          more, the menu grew and the bar followed.
        </p>

        <Tabs
          label="Through the day"
          className="mt-8"
          tabs={slots.map((s) => ({
            id: s.id,
            label: s.tab,
            content: (
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14">
                <div
                  className={`relative aspect-[4/3] border-2 border-ink ${s.contain ? "bg-white" : ""}`}
                >
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    placeholder={s.contain ? "empty" : "blur"}
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className={
                      s.contain ? "object-contain p-4" : "object-cover"
                    }
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
