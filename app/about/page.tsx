import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import DayRhythm from "@/components/DayRhythm";
import Values from "@/components/Values";
import Gallery from "@/components/Gallery";
import CtaBanner from "@/components/CtaBanner";
import mural from "@/assets/about_not_teaser.jpg";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About Us — H Breakfast to Bar",
  description:
    "From a small breakfast counter to a full day-to-night restaurant and bar. Read the story behind H Breakfast to Bar in Mandurriao, Iloilo.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="A breakfast counter that never quite closed."
        description="How a short morning menu turned into a full day-to-night restaurant and bar."
      />

      <section className="section page-shell grid items-center gap-14 md:grid-cols-12 md:gap-10">
        <Reveal className="relative aspect-[4/5] overflow-hidden md:col-span-5">
          <Image
            src={mural}
            alt="The hand-painted Diversion Road mural inside H Breakfast to Bar"
            fill
            placeholder="blur"
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
          />
        </Reveal>
        <Reveal delay={150} className="md:col-span-6 md:col-start-7">
          <p className="eyebrow">Our story</p>
          <h2 className="display mt-5 text-3xl sm:text-4xl md:text-5xl">
            Same crew, from the first pour to last call.
          </h2>
          <p className="mt-7 leading-relaxed text-ink/70">
            H Breakfast to Bar started as a breakfast spot with a short menu and
            a long line on weekends. We kept hearing the same question from
            regulars: what happens after lunch? So we found out. The kitchen
            stayed open, the bar went in, and the same crew that flips your
            pancakes in the morning is often the one closing out the bar at
            night.
          </p>
          <p className="mt-5 leading-relaxed text-ink/70">
            Nothing about the food changed in spirit — it&apos;s still simple,
            made from scratch, and meant to be eaten with people you like. We
            just stopped closing at 2pm.
          </p>
        </Reveal>
      </section>

      <DayRhythm />
      <Values />
      <Gallery />

      <CtaBanner
        title="Come see the room for yourself."
        description="Full menu, opening hours and directions, whenever you're ready."
        href="/menu"
        linkLabel="View the menu"
      />
    </>
  );
}
