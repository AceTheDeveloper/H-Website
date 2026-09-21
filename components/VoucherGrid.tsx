import { vouchers } from "@/lib/data";
import VoucherCard from "./VoucherCard";
import Reveal from "./Reveal";

export default function VoucherGrid() {
  return (
    <section className="section page-shell">
      <div className="flex items-baseline justify-between gap-6 border-b border-ink pb-5">
        <h2 className="display text-2xl sm:text-3xl">All vouchers</h2>
        <span className="text-sm tracking-[0.12em] text-brown">
          {vouchers.length} available
        </span>
      </div>

      <div className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-2">
        {vouchers.map((voucher, i) => (
          <Reveal key={voucher.id} delay={(i % 2) * 100}>
            <VoucherCard voucher={voucher} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
