import Link from "next/link";
import { vouchers } from "@/lib/data";
import VoucherCard from "./VoucherCard";

const featured = vouchers.slice(0, 3);

export default function VoucherPromo() {
  return (
    <section className="bg-paper">
      <div className="page-shell border-t border-mist py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl">{vouchers.length} ways to save</h2>
            <p className="mt-3 max-w-md text-ink/65">
              From a free birthday dessert to two-for-one cocktails at happy
              hour — there&apos;s a voucher for however you visit.
            </p>
          </div>
          <Link href="/vouchers" className="btn btn-primary">
            See all {vouchers.length} vouchers
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((voucher) => (
            <VoucherCard key={voucher.id} voucher={voucher} />
          ))}
        </div>
      </div>
    </section>
  );
}
