import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { vouchers } from "@/lib/data";
import VoucherGrid from "@/components/VoucherGrid";

export const metadata: Metadata = {
  title: "Vouchers — H Breakfast to Bar",
};

export default function VouchersPage() {
  return (
    <>
      <PageHeader
        title={`${vouchers.length} ways to save`}
        description="Show a voucher at the table or quote the code online. One voucher per visit unless stated otherwise."
      />

      <VoucherGrid />

      <div className="page-shell pb-20">
        <p className="border-t border-mist pt-6 text-sm text-ink/50">
          Vouchers cannot be combined with other offers. Availability and
          expiry dates shown are placeholders — confirm final terms before
          publishing.
        </p>
      </div>
    </>
  );
}
