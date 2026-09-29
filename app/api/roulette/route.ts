import { NextResponse } from "next/server";
import { randomInt } from "node:crypto";
import { vouchers } from "@/lib/data";
import { issueCode } from "@/lib/voucherCode";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/roulette
 * The server, not the browser, picks the prize and signs the code. The page
 * only animates the wheel to the slice we return.
 */
export async function POST() {
  try {
    const index = randomInt(vouchers.length);
    const voucher = vouchers[index];
    return NextResponse.json(
      {
        voucherId: voucher.id,
        code: issueCode(voucher.id),
        issuedAt: new Date().toISOString(),
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
}
