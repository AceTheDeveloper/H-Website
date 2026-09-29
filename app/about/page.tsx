import type { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";
import Image from "next/image";
import CtaBanner from "@/components/CtaBanner";
import AboutSlideshow from "@/components/AboutSlideshow";
import Tabs from "@/components/Tabs";
import dining from "@/assets/dining.jpg";
import guests from "@/assets/abawt.jpg";
import kitchen from "@/assets/kitchen.jpg";
import bar from "@/assets/bar.jpg";
import guestsDining1 from "@/assets/guests-dining-1.jpg";
import guestsDining2 from "@/assets/guests-dining-2.jpg";
import guestsDining3 from "@/assets/guests-dining-3.jpg";

const slideshowImages = [
  { src: guestsDining1, alt: "Friends sharing a meal at H Breakfast to Bar" },
  { src: guestsDining2, alt: "A full house of guests at H Breakfast to Bar" },
  {
    src: dining,
    alt: "The dining room, with the painted mural and steel tables",
  },
  { src: guestsDining3, alt: "Guests at the counter during the day" },
  { src: bar, alt: "The bar at night, lit red, with guests at the tables" },
];

export const metadata: Metadata = {
  title: "About Us",
  description:
    "From a small breakfast counter to a full day-to-night restaurant and bar. The story behind H Breakfast to Bar in Mandurriao, Iloilo City.",
  alternates: { canonical: "/about" },
  openGraph: pageOpenGraph("/about"),
};

const values = [
  {
    title: "Cooked from scratch",
    description:
      "Sauces, dressings and bread are made in-house daily. Nothing comes out of a bag.",
  },
  {
    title: "Sourced close by",
    description:
      "Produce and coffee come from growers and roasters within a few hours of the kitchen.",
  },
  {
    title: "One table, all day",
    description:
      "You can sit down for breakfast and still be there for last call. Nobody rushes you.",
  },
  {
    title: "Behind the bar",
    description:
      "Our bartenders build the cocktail list the same way the kitchen builds the menu.",
  },
];

const room = [
  {
    src: dining,
    alt: "The dining room, with the painted mural and steel tables",
    sizes: "(min-width: 768px) 33vw, 100vw",
  },
  {
    src: kitchen,
    alt: "The coffee bar and kitchen pass, with red LED signs overhead",
    sizes: "(min-width: 768px) 33vw, 100vw",
  },
  {
    src: bar,
    alt: "The bar at night, lit red, with guests at the tables",
    sizes: "(min-width: 768px) 33vw, 100vw",
  },
];

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
    id: "iloilo",
    label: "Made for Iloilo",
    content: (
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-6">
          <h2 className="heading text-3xl sm:text-4xl md:text-5xl">
            Made for the way Iloilo eats.
          </h2>
          <p className="lede mt-5 text-ink/85">
            We don&apos;t believe good food has to belong to one cuisine. We
            serve what Iloilo loves to eat — from breakfast and comfort food to
            pizza, pasta, steak, coffee and cocktails.
          </p>
          <p className="lede mt-5 text-ink/85">
            A place for breakfast meetings, family lunches, quick coffees, long
            dinners, and drinks after a good day. Iloilo lives here.
          </p>
          <p className="heading mt-8 text-2xl sm:text-3xl">
            The heart of H is Iloilo.
          </p>
          <p className="mt-2 max-w-md text-ink/80">
            Local people. Local stories. Everyday moments. From breakfast to
            bar, H is here for all of them.
          </p>
        </div>
        <ul className="heading divide-y-2 divide-ink border-y-2 border-ink text-xl sm:text-2xl lg:col-span-6 lg:self-start">
          <li className="py-4">Come for a meal.</li>
          <li className="py-4">Meet someone.</li>
          <li className="py-4">Get some work done.</li>
          <li className="py-4">Catch up with an old friend.</li>
          <li className="py-4">
            Even get your car washed while you&apos;re here.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "values",
    label: "How we work",
    content: (
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-14">
        <h2 className="heading text-3xl sm:text-4xl md:text-5xl lg:col-span-4">
          Simple food, made properly
        </h2>
        <dl className="divide-y-2 divide-ink border-y-2 border-ink lg:col-span-8">
          {values.map((value) => (
            <div
              key={value.title}
              className="grid grid-cols-1 gap-2 py-5 md:grid-cols-[minmax(0,14rem)_1fr] md:gap-10"
            >
              <dt className="heading text-xl sm:text-2xl">{value.title}</dt>
              <dd className="max-w-xl text-ink/80">{value.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    ),
  },
  {
    id: "room",
    label: "The room",
    content: (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        {room.map((photo) => (
          <figure
            key={photo.alt}
            className="relative aspect-[4/3] border-2 border-ink md:aspect-[3/4]"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              placeholder="blur"
              sizes={photo.sizes}
              className="object-cover"
            />
          </figure>
        ))}
      </div>
    ),
  },
];

// Hero, one tabbed section, closing banner: about three screens, with the
// rest of the story one click away.
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
