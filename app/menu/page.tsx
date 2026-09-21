import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import MenuBrowser from "@/components/MenuBrowser";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Menu — H Breakfast to Bar",
};

export default function MenuPage() {
  return (
    <>
      <PageHeader
        title="The menu"
        description="Five boards that carry the day — breakfast in the morning, a full bar by evening. Tap a category to browse."
      />

      <MenuBrowser />

      <div className="page-shell pb-16">
        <p className="border-t border-mist pt-6 text-sm text-ink/50">
          New — recently added · Chef&apos;s Pick — a kitchen favourite ·
          Bar Favorite — most ordered at the bar · Vegetarian — no meat or
          fish. Ask your server about other dietary needs.
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
