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
        description="For staff. Enter the code shown on the guest's voucher."
      />
      <section className="band bg-chalk">
        <div className="page-shell">
          <VerifyForm />
        </div>
      </section>
    </>
  );
}
