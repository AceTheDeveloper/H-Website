"use client";

import { useState } from "react";
import { vouchers } from "@/lib/data";
import VoucherCard from "./VoucherCard";

const INITIAL_COUNT = 9;

export default function VoucherGrid() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? vouchers : vouchers.slice(0, INITIAL_COUNT);

  return (
    <div className="page-shell py-16">
      <div className="flex items-baseline justify-between">
        <h2 className="font-display text-2xl">All vouchers</h2>
        <span className="text-sm text-ink/50">
          Showing {visible.length} of {vouchers.length}
        </span>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((voucher) => (
          <VoucherCard key={voucher.id} voucher={voucher} />
        ))}
      </div>

      {!expanded && vouchers.length > INITIAL_COUNT && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="btn btn-outline on-light"
          >
            See more vouchers ({vouchers.length - INITIAL_COUNT} more)
          </button>
        </div>
      )}
    </div>
  );
}
