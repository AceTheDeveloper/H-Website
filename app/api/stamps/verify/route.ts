import { NextResponse } from "next/server";
import { db } from "@/lib/supabase";
import { normalizeCode, verifyCode } from "@/lib/voucherCode";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const headers = { "Cache-Control": "no-store" };

/**
 * POST /api/stamps/verify  { code, redeem? }
 *  - checks the signature, then looks the code up in the database
 *  - with redeem: true it marks the code as used (only once, atomically)
 */
export async function POST(request: Request) {
  let code = "";
  let redeem = false;
  try {
    const body = await request.json();
    if (typeof body?.code === "string") code = body.code.slice(0, 64);
    redeem = body?.redeem === true;
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  try {
    const raw = normalizeCode(code);
    const voucher = raw.length === 16 ? verifyCode(code) : null;
    if (!voucher) return NextResponse.json({ valid: false }, { headers });

    const formatted = raw.match(/.{4}/g)!.join("-");
    const supabase = db();

    if (redeem) {
      const { data, error } = await supabase
        .from("stamps")
        .update({ redeemed_at: new Date().toISOString() })
        .eq("code", formatted)
        .is("redeemed_at", null)
        .select("code")
        .maybeSingle();
      if (error) throw error;
      if (data)
        return NextResponse.json(
          {
            valid: true,
            title: voucher.title,
            used: false,
            justRedeemed: true,
          },
          { headers },
        );
    }

    const { data: row, error } = await supabase
      .from("stamps")
      .select("redeemed_at")
      .eq("code", formatted)
      .maybeSingle();
    if (error) throw error;
    if (!row) return NextResponse.json({ valid: false }, { headers });

    const usedAt = (row as { redeemed_at: string | null }).redeemed_at;
    return NextResponse.json(
      { valid: true, title: voucher.title, used: Boolean(usedAt), usedAt },
      { headers },
    );
  } catch {
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
}
