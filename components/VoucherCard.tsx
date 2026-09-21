import type { Voucher } from "@/lib/data";

export default function VoucherCard({ voucher }: { voucher: Voucher }) {
  return (
    <div className="ticket flex">
      <div className="flex-1 p-5">
        <span className="font-display text-xl text-red">{voucher.badge}</span>
        <h3 className="mt-2 text-base font-medium">{voucher.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/65">{voucher.description}</p>
      </div>
      <div className="ticket-stub flex w-24 shrink-0 flex-col items-center justify-center gap-2 px-3 py-5 text-center">
        <span className="text-[0.65rem] font-medium leading-tight text-ink/55">
          {voucher.code}
        </span>
        <span className="text-[0.65rem] text-ink/45">{voucher.expiry}</span>
      </div>
    </div>
  );
}
