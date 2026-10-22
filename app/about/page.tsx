import type { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";
import Image from "next/image";
import CtaBanner from "@/components/CtaBanner";
import AboutSlideshow from "@/components/AboutSlideshow";
import Tabs from "@/components/Tabs";
import TeamBand from "@/components/TeamBand";
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
  title: "Our Brand",
  description:
    "From a small breakfast counter to a full day-to-night restaurant and bar. The people and routines behind H Breakfast to Bar in Mandurriao, Iloilo City.",
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
            Come for breakfast.
          </h2>
          <p className="lede mt-5 text-ink/85">
            H started as a breakfast spot with a short menu and a long line on
            weekends. Regulars kept asking what happens after lunch, so the
            kitchen stayed open and the bar went in.
          </p>
          <p className="lede mt-4 text-ink/85">
            Some days call for breakfast. Some call for pizza. Some end with
            cocktails. H keeps up with all of them.
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:col-span-5">
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
        <p className="lede mt-5 text-ink/85">
          Local people. Local stories. Everyday moments. From breakfast to bar,
          H is here for all of them.
        </p>
      </div>
    ),
  },
];

// Slideshow hero, the statement with story and vision tabs, the crew, closing
// banner.
export default function AboutPage() {
  return (
    <>
      <AboutSlideshow images={slideshowImages} />

      <section className="bg-chalk py-12 md:py-16">
        <div className="page-shell">
          <p className="poster text-[clamp(1.75rem,4.5vw,3.25rem)]">
            Made for the way Iloilo lives.
          </p>
          <p className="lede mt-4 max-w-xl text-ink/85">
            Whatever your day looks like, there&apos;s a place for you at H.
          </p>

          <Tabs
            label="About H Breakfast to Bar"
            className="mt-10"
            tabs={tabs}
          />
        </div>
      </section>

      <TeamBand />

      <CtaBanner
        title="Make a day of it"
        description="See the menu, check the hours, and find your way to H."
        href="/menu"
        linkLabel="View the menu"
      />
    </>
  );
}
