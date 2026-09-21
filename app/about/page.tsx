import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import DayRhythm from "@/components/DayRhythm";
import Values from "@/components/Values";
import Gallery from "@/components/Gallery";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "About Us — H Breakfast to Bar",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="A breakfast counter that never quite closed"
        description="How three tables and a short morning menu turned into a full day-to-night restaurant and bar."
      />

      <section className="page-shell grid gap-10 py-20 md:grid-cols-[1fr_1.1fr] md:gap-16">
        <img
          src="https://placehold.co/640x760/DDDDDD/242024?text=Our+Story"
          alt="H Breakfast to Bar founders"
          className="w-full object-cover"
        />
        <div className="max-w-lg">
          <h2 className="font-display text-3xl sm:text-4xl">Our story</h2>
          <p className="mt-5 leading-relaxed text-ink/70">
            H Breakfast to Bar started as a five-table breakfast spot with a
            short menu and a long line on weekends. We kept hearing the same
            question from regulars: what happens after lunch? So we found
            out. The kitchen stayed open, the bar went in where the extra
            storage used to be, and the same crew that flips your pancakes
            in the morning is often the one closing out the bar at night.
          </p>
          <p className="mt-4 leading-relaxed text-ink/70">
            Nothing about the food changed in spirit — it&apos;s still
            simple, made from scratch, and meant to be eaten with people you
            like. We just stopped closing at 2pm.
          </p>
        </div>
      </section>

      <DayRhythm />
      <Values />
      <Gallery />

      <CtaBanner
        title="Come see the room for yourself"
        description="Full menu, opening hours and directions, whenever you're ready."
        href="/menu"
        linkLabel="View the menu"
      />
    </>
  );
}
