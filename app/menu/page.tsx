import type { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";
import PageHeader from "@/components/PageHeader";
import MenuNav from "@/components/MenuNav";
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
        description="Pick a category, or scroll the whole menu. Prices are in pesos."
      />

      <div className="page-shell pb-20 lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-14 lg:pt-14">
        <MenuNav categories={menu.map(({ id, label }) => ({ id, label }))} />

        <div className="mt-10 space-y-20 lg:mt-0">
          <p className="max-w-2xl text-[0.95rem] leading-relaxed text-ink/80">
            <strong className="font-semibold text-ink">Chef&apos;s Pick</strong>{" "}
            is a kitchen favourite.{" "}
            <strong className="font-semibold text-ink">Bar Favorite</strong> is
            most ordered at the bar.{" "}
            <strong className="font-semibold text-ink">Vegetarian</strong> means
            no meat or fish. Ask your server about other dietary needs.
          </p>

          {menu.map((category) => (
            <MenuSection key={category.id} category={category} />
          ))}
        </div>
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
