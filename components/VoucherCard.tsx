import Image from "next/image";
import type { Voucher } from "@/lib/data";

export default function VoucherCard({ voucher }: { voucher: Voucher }) {
  return (
    <a
      href={voucher.image}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
      aria-label={`${voucher.title} — open full size`}
    >
      <div className="overflow-hidden border border-sand bg-white shadow-[0_1px_0_rgba(27,20,17,0.04)] transition-shadow duration-300 group-hover:shadow-[0_18px_40px_-18px_rgba(27,20,17,0.35)]">
        <Image
          src={voucher.image}
          alt={`${voucher.brand} — ${voucher.title}`}
          width={1654}
          height={709}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="aspect-[1654/709] w-full object-cover"
        />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="text-lg font-semibold">{voucher.title}</h3>
        <span className="shrink-0 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brown transition-colors group-hover:text-red">
          View
        </span>
      </div>
    </a>
  );
}
