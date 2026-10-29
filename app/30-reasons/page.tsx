import type { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";
import PageHeader from "@/components/PageHeader";
import ReasonsCard from "@/components/ReasonsCard";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "30 Reasons to Come to H",
  description:
    "Stamp your card once a day for 30 days. Every stamp unlocks a coupon from H Breakfast to Bar.",
  alternates: { canonical: "/30-reasons" },
  openGraph: pageOpenGraph("/30-reasons"),
};

export default function ThirtyReasonsPage() {
  return (
    <>
      <PageHeader
        title="30 reasons to come to H"
        description="Tap once a day for 30 days. Every stamp unlocks a coupon for a reason to visit."
      />

      <section className="band bg-chalk">
        <div className="page-shell grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <h2 className="heading text-3xl">How it works</h2>
              <ul className="mt-5 space-y-3 text-ink/85">
                <li>One stamp per day, with that day&apos;s coupon.</li>
                <li>
                  Each of the 30 stamps unlocks its matching offer.
                </li>
                <li>
                  Show the coupon QR to staff. Each coupon works once.
                </li>
                <li>
                  Your card lives in this browser, so use the same phone each
                  day.
                </li>
              </ul>
            </div>
          </aside>
          <div className="lg:col-span-9">
            <ReasonsCard />
          </div>
        </div>
      </section>

      <CtaBanner
        title="Ready to redeem?"
        description="We're on Diversion Road, Mandurriao, open daily."
        href="/location"
        linkLabel="Find us"
      />
    </>
  );
}
