import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import VoucherGrid from "@/components/VoucherGrid";
import CtaBanner from "@/components/CtaBanner";
import { vouchers } from "@/lib/data";

export const metadata: Metadata = {
  title: "Vouchers — H Breakfast to Bar",
};

export default function VouchersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Vouchers"
        title={`${vouchers.length} ways to say “on us.”`}
        description="Present a voucher to our staff on your visit. Tap any voucher to view it full size."
      />

      <VoucherGrid />

      <div className="page-shell pb-20">
        <p className="border-t border-sand pt-6 text-sm leading-relaxed text-ink/55">
          Non-transferable. One-time use only. Only one voucher may be redeemed
          per group, table, or transaction.
        </p>
      </div>

      <CtaBanner
        title="Ready to redeem?"
        description="We're on Diversion Road, Mandurriao — open daily."
        href="/location"
        linkLabel="Find us"
      />
    </>
  );
}
