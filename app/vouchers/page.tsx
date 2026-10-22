import type { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";
import PageHeader from "@/components/PageHeader";
import VoucherGrid from "@/components/VoucherGrid";
import CtaBanner from "@/components/CtaBanner";

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
        title="Ways to say “on us”"
        description="Pick your craving, bring your voucher, and enjoy."
      />

      <section className="bg-chalk py-10 md:py-14">
        <div className="page-shell grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <h2 className="heading text-3xl">How vouchers work</h2>
              <ul className="mt-5 space-y-3 text-ink/85">
                <li>Show your voucher before ordering.</li>
                <li>One voucher per group, table, or transaction.</li>
                <li>Non-transferable and valid for one use.</li>
              </ul>
            </div>
          </aside>

          <div className="lg:col-span-9">
            <VoucherGrid initial={4} />
          </div>
        </div>
      </section>

      <CtaBanner
        title="Ready to redeem?"
        description="Show your voucher before you order."
        href="/location"
        linkLabel="Find Us"
      />
    </>
  );
}
