import type { Voucher } from "@/lib/data";

export default function VoucherCard({ voucher }: { voucher: Voucher }) {
  return (
    <a
      href={voucher.image}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col border border-mist bg-paper"
      aria-label={`${voucher.title} (opens full size)`}
    >
      <img
        src={voucher.image}
        alt={`${voucher.brand} — ${voucher.title}`}
        width={1654}
        height={709}
        loading="lazy"
        decoding="async"
        className="aspect-[1654/709] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
      />
      <div className="border-t border-mist px-4 py-3">
        <h3 className="text-sm font-medium">{voucher.title}</h3>
      </div>
    </a>
  );
}
