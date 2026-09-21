import Link from "next/link";
import { vouchers } from "@/lib/data";
import VoucherCard from "./VoucherCard";
import { IconArrowRight } from "./Icons";
import Reveal from "./Reveal";

const featured = vouchers.slice(0, 3);

export default function VoucherPromo() {
  return (
    <section className="section page-shell">
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Vouchers</p>
          <h2 className="display mt-5 max-w-xl text-3xl sm:text-4xl md:text-5xl">
            {vouchers.length} ways to say <strong>&ldquo;on us.&rdquo;</strong>
          </h2>
          <p className="mt-5 max-w-md text-ink/70">
            From a complimentary coffee to a full meal for your guest. Show a
            voucher to our staff on your next visit.
          </p>
        </div>
        <Link href="/vouchers" className="link-arrow">
          See all vouchers <IconArrowRight />
        </Link>
      </Reveal>

      <div className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((voucher, i) => (
          <Reveal key={voucher.id} delay={i * 100}>
            <VoucherCard voucher={voucher} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
