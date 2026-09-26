"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { vouchers } from "@/lib/data";
import type { Voucher } from "@/lib/data";

/**
 * Voucher tiles. Tapping one opens it full size in a native <dialog>, which
 * handles focus, Escape and the backdrop for us. Pass `limit` / `ids` to show
 * a subset (the home page shows three).
 */
export default function VoucherGrid({
  ids,
  columns = "md:grid-cols-2",
  tone = "light",
}: {
  ids?: string[];
  columns?: string;
  tone?: "light" | "dark";
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<Voucher | null>(null);

  const list = ids
    ? ids.flatMap((id) => vouchers.filter((v) => v.id === id))
    : vouchers;

  function open(voucher: Voucher) {
    setActive(voucher);
    dialogRef.current?.showModal();
  }

  return (
    <>
      <ul className={`grid grid-cols-1 gap-x-8 gap-y-10 ${columns}`}>
        {list.map((voucher) => (
          <li key={voucher.id}>
            <button
              type="button"
              onClick={() => open(voucher)}
              className="group block w-full text-left"
              aria-label={`${voucher.title}. View full size`}
            >
              <span
                className={`block overflow-hidden border-2 ${
                  tone === "dark" ? "border-white/80" : "border-ink"
                }`}
              >
                <Image
                  src={voucher.image}
                  alt=""
                  width={1654}
                  height={709}
                  sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
                  className="aspect-[1654/709] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </span>
              <span className="mt-3 flex items-baseline justify-between gap-4">
                <span className="heading text-2xl">{voucher.title}</span>
                <span className="shrink-0 underline decoration-red decoration-2 underline-offset-4 group-hover:decoration-current">
                  View
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => setActive(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
        aria-label={active?.title ?? "Voucher"}
        className="w-[min(96vw,1100px)] max-w-none border-2 border-ink bg-chalk p-0 backdrop:bg-ink/80"
      >
        {active && (
          <div>
            <Image
              src={active.image}
              alt={`${active.brand}: ${active.title}`}
              width={1654}
              height={709}
              sizes="96vw"
              className="h-auto w-full"
            />
            <form method="dialog" className="flex items-center justify-between gap-4 p-4">
              <p className="heading text-xl">{active.title}</p>
              <button className="btn btn-ink !min-h-[2.5rem]" autoFocus>
                Close
              </button>
            </form>
          </div>
        )}
      </dialog>
    </>
  );
}
