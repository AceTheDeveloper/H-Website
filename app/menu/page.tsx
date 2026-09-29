import type { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";
import PageHeader from "@/components/PageHeader";
import Tabs from "@/components/Tabs";
import MenuSection from "@/components/MenuSection";
import CtaBanner from "@/components/CtaBanner";
import { menu } from "@/lib/data";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "The full menu at H Breakfast to Bar: all-day breakfast, sandwiches, Filipino sets, Asian plates, steaks, pasta and pizza in Mandurriao, Iloilo City.",
  alternates: { canonical: "/menu" },
  openGraph: pageOpenGraph("/menu"),
};

export default function MenuPage() {
  return (
    <>
      <PageHeader
        title="Breakfast, plates and everything after"
        description="Pick a category to see what's in it. Prices are in pesos."
      />

      <div className="page-shell py-10 md:py-14">
        <p className="max-w-2xl text-[0.95rem] leading-relaxed text-ink/80">
          <strong className="font-semibold text-ink">Chef&apos;s Pick</strong>{" "}
          is a kitchen favourite.{" "}
          <strong className="font-semibold text-ink">Bar Favorite</strong> is
          most ordered at the bar.{" "}
          <strong className="font-semibold text-ink">Vegetarian</strong> means
          no meat or fish. Ask your server about other dietary needs.
        </p>

        <Tabs
          label="Menu categories"
          syncHash
          className="mt-8"
          tabs={menu.map((category) => ({
            id: category.id,
            label: category.label,
            content: <MenuSection category={category} />,
          }))}
        />
      </div>

      <CtaBanner
        title="Come hungry"
        description="Hours, address and directions are on the location page."
        href="/location"
        linkLabel="Find us"
      />
    </>
  );
}
