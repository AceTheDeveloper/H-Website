import type { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";
import PageHeader from "@/components/PageHeader";
import VoucherGrid from "@/components/VoucherGrid";
import CtaBanner from "@/components/CtaBanner";
import { vouchers } from "@/lib/data";

export const metadata: Metadata = {
  title: "Vouchers",
  description:
    "Current vouchers and promos, redeemable in person at H Breakfast to Bar in Mandurriao, Iloilo City. Drinks, meals, pizza and more.",
  alternates: { canonical: "/vouchers" },
  openGraph: pageOpenGraph("/vouchers"),
};

export default function VouchersPage() {
  return (
    <>
      <PageHeader
        title={`${vouchers.length} ways to say “on us”`}
        description="Show a voucher to our staff when you visit. Tap any voucher to see it full size."
      />

      <section className="band bg-chalk">
        <div className="page-shell grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <h2 className="heading text-3xl">How vouchers work</h2>
              <ul className="mt-5 space-y-3 text-ink/85">
                <li>Show the voucher to our staff before you order.</li>
                <li>One voucher per group, table or transaction.</li>
                <li>Non-transferable and good for one use only.</li>
              </ul>
            </div>
          </aside>

          <div className="lg:col-span-9">
            <VoucherGrid />
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
