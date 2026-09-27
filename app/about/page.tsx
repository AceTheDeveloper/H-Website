import type { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import CtaBanner from "@/components/CtaBanner";
import dining from "@/assets/dining.jpg";
import guests from "@/assets/abawt.jpg";
import kitchen from "@/assets/kitchen.jpg";
import bar from "@/assets/bar.jpg";

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

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="A breakfast counter that never quite closed"
        description="How a short morning menu turned into a full day-to-night restaurant and bar."
      />

      <section className="band bg-plaster border-b-2 border-ink">
        <div className="page-shell">
          <p className="lede max-w-xl text-ink/85">
            Whatever your hustle looks like, there&apos;s a place for you here.
          </p>
          <p className="poster mt-6 text-[clamp(2.5rem,8vw,5.5rem)]">
            H. For our local heroes.
            <br />
            From Breakfast to Bar.
            <br />
            Made for the Ilonggo hustle.
          </p>
        </div>
      </section>

      <section className="band bg-chalk">
        <div className="page-shell grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <h2 className="heading text-4xl sm:text-5xl md:text-6xl">
              Same crew, from the first pour to last call
            </h2>
            <p className="lede mt-8 text-ink/85">
              H Breakfast to Bar started as a breakfast spot with a short menu
              and a long line on weekends. We kept hearing the same question
              from regulars: what happens after lunch? So we found out. The
              kitchen stayed open, the bar went in, and the same crew that flips
              your pancakes in the morning is often the one closing out the bar
              at night.
            </p>
            <p className="lede mt-5 text-ink/85">
              Nothing about the food changed in spirit. It&apos;s still simple,
              made from scratch, and meant to be eaten with people you like. We
              just stopped closing at 2pm.
            </p>
          </div>
          <div className="relative aspect-square border-2 border-ink lg:col-span-6">
            <Image
              src={guests}
              alt="Guests at their tables in the dining room during the day"
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="band bg-plaster">
        <div className="page-shell grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="heading text-4xl sm:text-5xl md:text-6xl">
              Made for the way Iloilo eats.
            </h2>
            <p className="lede mt-6 text-ink/85">
              We don&apos;t believe good food has to belong to one cuisine.
            </p>
            <p className="lede mt-5 text-ink/85">
              We serve what Iloilo loves to eat — from breakfast and comfort
              food to pizza, pasta, steak, coffee and cocktails.
            </p>
          </div>
          <ul className="heading divide-y-2 divide-ink border-y-2 border-ink text-2xl sm:text-3xl lg:col-span-7 lg:col-start-6">
            <li className="py-5">Come for a meal.</li>
            <li className="py-5">Meet someone.</li>
            <li className="py-5">Get some work done.</li>
            <li className="py-5">Catch up with an old friend.</li>
            <li className="py-5">
              Even get your car washed while you&apos;re here.
            </li>
          </ul>
        </div>
      </section>

      {/* The wall says it better than we can. */}
      <section className="on-red bg-red text-chalk">
        <div className="page-shell py-16 md:py-24">
          <p className="poster text-[clamp(3.5rem,13vw,10rem)]">
            Love Lives in
            <br />
            Iloilo
          </p>
          <p className="lede mt-8 max-w-md">
            It&apos;s painted on the wall of our dining room, and it&apos;s the
            short version of everything on this page.
          </p>
        </div>
      </section>

      <section className="band bg-chalk">
        <div className="page-shell">
          <h2 className="heading text-4xl sm:text-5xl md:text-6xl">
            Iloilo lives here.
          </h2>
          <p className="lede mt-6 max-w-2xl text-ink/85">
            A place for breakfast meetings, family lunches, quick coffees,
            long dinners, and drinks after a good day.
          </p>
        </div>
      </section>

      <section className="band bg-plaster">
        <div className="page-shell grid grid-cols-1 gap-10 lg:grid-cols-12">
          <h2 className="heading text-4xl sm:text-5xl md:text-6xl lg:col-span-4">
            Simple food, made properly
          </h2>
          <dl className="divide-y-2 divide-ink border-y-2 border-ink lg:col-span-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="grid grid-cols-1 gap-2 py-6 md:grid-cols-[minmax(0,14rem)_1fr] md:gap-10"
              >
                <dt className="heading text-2xl">{value.title}</dt>
                <dd className="max-w-xl text-ink/80">{value.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-chalk pb-16 pt-4 md:pb-24">
        <div className="page-shell grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          <figure className="relative aspect-square border-2 border-ink md:col-span-7 md:row-span-2 md:aspect-auto md:min-h-[640px]">
            <Image
              src={dining}
              alt="The dining room, with the painted mural and steel tables"
              fill
              placeholder="blur"
              sizes="(min-width: 768px) 58vw, 100vw"
              className="object-cover"
            />
          </figure>
          <figure className="relative aspect-[4/3] border-2 border-ink md:col-span-5">
            <Image
              src={kitchen}
              alt="The coffee bar and kitchen pass, with red LED signs overhead"
              fill
              placeholder="blur"
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </figure>
          <figure className="relative aspect-[4/3] border-2 border-ink md:col-span-5">
            <Image
              src={bar}
              alt="The bar at night, lit red, with guests at the tables"
              fill
              placeholder="blur"
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </figure>
        </div>
      </section>

      <section className="on-red bg-red text-chalk">
        <div className="page-shell py-16 md:py-24">
          <p className="poster text-[clamp(2.75rem,9vw,6.5rem)]">
            The heart of H
            <br />
            is Iloilo.
          </p>
          <p className="lede mt-8 max-w-md">
            Local people. Local stories. Everyday moments. From breakfast to
            bar, H is here for all of them.
          </p>
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
