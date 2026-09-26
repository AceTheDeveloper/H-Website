import Link from "next/link";
import { featuredVoucherIds, vouchers } from "@/lib/data";
import VoucherGrid from "./VoucherGrid";

export default function VoucherPromo() {
  return (
    <section className="band on-dark bg-espresso text-white">
      <div className="page-shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="heading max-w-xl text-4xl sm:text-5xl md:text-6xl">
              {vouchers.length} ways to say “on us”
            </h2>
            <p className="lede mt-5 max-w-lg text-white/75">
              From a free drink to a whole meal. Show a voucher to our staff on
              your next visit.
            </p>
          </div>
          <Link href="/vouchers" className="btn btn-outline">
            See all vouchers
          </Link>
        </div>

        <div className="mt-12">
          <VoucherGrid
            ids={featuredVoucherIds}
            columns="md:grid-cols-2 lg:grid-cols-3"
            tone="dark"
          />
        </div>
      </div>
    </section>
  );
}
