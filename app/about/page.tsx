import type { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";
import Image from "next/image";
import CtaBanner from "@/components/CtaBanner";
import AboutSlideshow from "@/components/AboutSlideshow";
import Tabs from "@/components/Tabs";
import dining from "@/assets/dining.jpg";
import guests from "@/assets/abawt.jpg";
import bar from "@/assets/bar.jpg";
import guestsDining1 from "@/assets/guests-dining-1.jpg";
import guestsDining2 from "@/assets/guests-dining-2.jpg";
import guestsDining3 from "@/assets/guests-dining-3.jpg";

const slideshowImages = [
  { src: guestsDining3, alt: "Guests at the counter during the day" },
  { src: guestsDining2, alt: "A full house of guests at H Breakfast to Bar" },
  {
    src: dining,
    alt: "The dining room, with the painted mural and steel tables",
  },
  { src: guestsDining1, alt: "Friends sharing a meal at H Breakfast to Bar" },
  { src: bar, alt: "The bar at night, lit red, with guests at the tables" },
];

export const metadata: Metadata = {
  title: "About Us",
  description:
    "From a small breakfast counter to a full day-to-night restaurant and bar. The story behind H Breakfast to Bar in Mandurriao, Iloilo City.",
  alternates: { canonical: "/about" },
  openGraph: pageOpenGraph("/about"),
};

const tabs = [
  {
    id: "story",
    label: "Our story",
    content: (
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <h2 className="heading text-3xl sm:text-4xl md:text-5xl">
            Same crew, from the first pour to last call
          </h2>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-ink/60">
            H Runs on People
          </p>
          <p className="lede mt-4 text-ink/85">
            H Breakfast to Bar started as a breakfast spot with a short menu and
            a long line on weekends. We kept hearing the same question from
            regulars: what happens after lunch? So we found out. The kitchen
            stayed open, the bar went in, and the same crew that flips your
            pancakes in the morning is often the one closing out the bar at
            night.
          </p>
          <p className="lede mt-5 text-ink/85">
            Nothing about the food changed in spirit. It&apos;s still simple,
            made from scratch, and meant to be eaten with people you like. We
            just stopped closing at 2pm.
          </p>
        </div>
        <div className="relative aspect-[4/3] border-2 border-ink lg:col-span-5">
          <Image
            src={guests}
            alt="Guests at their tables in the dining room during the day"
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    ),
  },
  {
    id: "vision",
    label: "Our Vision",
    content: (
      <div className="max-w-3xl">
        <h2 className="heading text-3xl sm:text-4xl md:text-5xl">
          The heart of H is Iloilo.
        </h2>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-ink/60">
          Our Vision
        </p>
        <p className="lede mt-4 text-ink/85">
          Local people. Local stories. Everyday moments. From breakfast to bar,
          H is here for all of them.
        </p>
      </div>
    ),
  },
];

// Slideshow hero, the statement with story and vision tabs, closing banner.
export default function AboutPage() {
  return (
    <>
      <AboutSlideshow images={slideshowImages} />

      <section className="bg-chalk py-12 md:py-16">
        <div className="page-shell">
          <p className="lede max-w-xl text-ink/85">
            Whatever your hustle looks like, there&apos;s a place for you here.
          </p>
          <p className="poster mt-4 text-[clamp(1.75rem,4.5vw,3.25rem)]">
            H. For our local heroes. From Breakfast to Bar. Made for the Ilonggo
            hustle.
          </p>

          <Tabs
            label="About H Breakfast to Bar"
            className="mt-10"
            tabs={tabs}
          />
        </div>
      </section>

      <CtaBanner
        title="Come see the room"
        description="Full menu, opening hours and directions, whenever you're ready."
        href="/menu"
        linkLabel="View the menu"
      />
    </>
  );
}
