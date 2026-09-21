import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import MenuBrowser from "@/components/MenuBrowser";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Menu — H Breakfast to Bar",
  description:
    "Browse our full menu — breakfast plates, pizza, pasta and sharing platters, served all day at H Breakfast to Bar in Mandurriao, Iloilo.",
};

export default function MenuPage() {
  return (
    <>
      <PageHeader
        eyebrow="The menu"
        title="Breakfast, plates and everything after."
        description="Browse by category — from morning plates to pizza, pasta and sharing platters."
      />

      <MenuBrowser />

      <div className="page-shell pb-20">
        <p className="border-t border-sand pt-6 text-sm leading-relaxed text-ink/55">
          <strong className="font-semibold text-ink/70">New</strong> — recently
          added ·{" "}
          <strong className="font-semibold text-ink/70">
            Chef&apos;s Pick
          </strong>{" "}
          — a kitchen favourite ·{" "}
          <strong className="font-semibold text-ink/70">Bar Favorite</strong> —
          most ordered at the bar ·{" "}
          <strong className="font-semibold text-ink/70">Vegetarian</strong> — no
          meat or fish. Ask your server about other dietary needs.
        </p>
      </div>

      <CtaBanner
        title="Ready to book a table?"
        description="Find our hours, address and directions on the location page."
        href="/location"
        linkLabel="Find us"
      />
    </>
  );
}
