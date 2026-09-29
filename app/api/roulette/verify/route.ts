import { NextResponse } from "next/server";
import { verifyCode } from "@/lib/voucherCode";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** POST /api/roulette/verify  { code } -> { valid, title? } */
export async function POST(request: Request) {
  let code = "";
  try {
    const body = await request.json();
    if (typeof body?.code === "string") code = body.code.slice(0, 64);
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  try {
    const voucher = verifyCode(code);
    return NextResponse.json(
      voucher ? { valid: true, title: voucher.title } : { valid: false },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
}
