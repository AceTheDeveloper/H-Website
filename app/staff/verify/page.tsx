import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import VerifyForm from "@/components/VerifyForm";

export const metadata: Metadata = {
  title: "Verify voucher",
  robots: { index: false, follow: false },
};

export default function VerifyPage() {
  return (
    <>
      <PageHeader
        title="Verify voucher"
        description="For staff. Scan the QR code on the guest's coupon and confirm redemption."
      />
      <section className="band bg-chalk">
        <div className="page-shell">
          <VerifyForm />
        </div>
      </section>
    </>
  );
}
