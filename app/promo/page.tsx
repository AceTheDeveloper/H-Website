import type { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";
import PageHeader from "@/components/PageHeader";
import ReasonsExplorer from "@/components/ReasonsExplorer";
import CtaBanner from "@/components/CtaBanner";
import { PROMO_VALID_DAYS } from "@/lib/promos";

export const metadata: Metadata = {
  title: "Promo",
  description:
    "30 reasons to come to H Breakfast to Bar in Mandurriao, Iloilo City. Pick a mood, reveal one reason a day, and some days come with a promo to show our staff when you visit.",
  alternates: { canonical: "/promo" },
  openGraph: pageOpenGraph("/promo"),
};

export default function PromoPage() {
  return (
    <>
      <PageHeader
        title="30 reasons to come to H"
        description="Pick a mood and reveal one reason a day. Some days come with a surprise."
      />

      <section className="bg-chalk py-10 md:py-14">
        <div className="page-shell grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:order-2 lg:col-span-9">
            <ReasonsExplorer />
          </div>

          <aside className="lg:order-1 lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <h2 className="heading text-3xl">How promos work</h2>
              <ul className="mt-5 space-y-3 text-ink/85">
                <li>Show the promo to our staff before you order.</li>
                <li>One promo per group, table or transaction.</li>
                <li>Non-transferable and good for one use only.</li>
                <li>
                  Valid for {PROMO_VALID_DAYS} days from the day you get it.
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <CtaBanner
        title="Found your reason?"
        description="We're on Diversion Road, Mandurriao, open daily."
        href="/location"
        linkLabel="Find us"
      />
    </>
  );
}
