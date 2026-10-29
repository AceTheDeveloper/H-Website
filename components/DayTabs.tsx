import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import Tabs from "./Tabs";
import FoodBackdrop from "./FoodBackdrop";
import pancakes from "@/public/home/HPancakes.png";
import dirtyTacos from "@/public/home/DirtyTacos.png";
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
  activeTabClassName: string;
  contain: boolean;
  flip?: boolean;
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
    image: pancakes,
    alt: "A stack of H pancakes with butter",
    activeTabClassName: "border-[#d49a16] bg-[#f5b82e] text-ink",
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
    image: dirtyTacos,
    alt: "H Dirty Tacos, a shareable plate from the all-day menu",
    activeTabClassName: "border-[#e21e02] bg-[#e21e02] text-white",
    contain: true,
    flip: true,
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
    activeTabClassName: "border-[#1a1a1a] bg-[#1a1a1a] text-white",
    contain: false,
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
    <section className="overflow-hidden bg-chalk py-12 md:py-16">
      <div className="page-shell">
        <p className="heading max-w-3xl text-2xl leading-[1.15] sm:text-3xl md:text-4xl">
          H started with breakfast and a short menu. As regulars asked for more,
          the menu grew and the bar followed.
        </p>

        <Tabs
          label="Through the day"
          className="day-tabs mt-8"
          panelClassName="mt-20 mb-16"
          tabs={slots.map((s) => ({
            id: s.id,
            label: s.tab,
            activeClassName: s.activeTabClassName,
            content: (
              <div
                className={`grid grid-cols-1 items-center gap-y-[72px] lg:gap-x-24 lg:gap-y-0 ${
                  s.flip
                    ? "lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]"
                    : "lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]"
                }`}
              >
                <div
                  className={`relative mx-auto aspect-square w-[69vw] max-w-[560px] md:w-[70vw] lg:w-[92%] lg:max-w-[560px] ${s.flip ? "lg:order-2" : ""}`}
                >
                  <FoodBackdrop variant="dynamic" />
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    placeholder={s.image === bar ? "blur" : "empty"}
                    sizes="(min-width: 1280px) 560px, (min-width: 1024px) 40vw, (min-width: 768px) 70vw, 69vw"
                    className={
                      s.contain
                        ? s.id === "midday"
                          ? "relative z-10 scale-[1.02] object-contain transition-transform duration-300 hover:scale-[1.04] motion-reduce:transition-none"
                          : "relative z-10 scale-[1.02] object-contain transition-transform duration-300 hover:scale-[1.04] motion-reduce:transition-none"
                        : "relative z-10 rounded-xl object-contain"
                    }
                  />
                </div>
                <div className={s.flip ? "lg:order-1" : ""}>
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
