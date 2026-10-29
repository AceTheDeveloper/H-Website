import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { db } from "@/lib/supabase";
import { buildSchedule, manilaToday } from "@/lib/stampCard";
import { issueCode } from "@/lib/voucherCode";
import { TOTAL_STAMPS } from "@/lib/reasons";
import type { StampState } from "@/lib/reasons";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const headers = { "Cache-Control": "no-store" };

type CardRow = {
  id: string;
  email: string | null;
  phone: string | null;
  promo_schedule: Record<string, string>;
};
type StampRow = {
  stamp_no: number;
  stamped_on: string;
  voucher_id: string | null;
  code: string | null;
  redeemed_at: string | null;
};

async function findCard(token: string): Promise<CardRow | null> {
  const { data } = await db()
    .from("stamp_cards")
    .select("id, email, phone, promo_schedule")
    .eq("token", token)
    .maybeSingle();
  return (data as CardRow | null) ?? null;
}

async function loadStamps(cardId: string): Promise<StampRow[]> {
  const { data } = await db()
    .from("stamps")
    .select("stamp_no, stamped_on, voucher_id, code, redeemed_at")
    .eq("card_id", cardId)
    .order("stamp_no");
  return (data ?? []) as StampRow[];
}

function toState(card: CardRow, rows: StampRow[]): StampState {
  const today = manilaToday();
  return {
    total: TOTAL_STAMPS,
    stampedToday: rows.some((r) => r.stamped_on === today),
    hasContact: Boolean(card.email && card.phone),
    stamps: rows.map((r) => ({
      no: r.stamp_no,
      date: r.stamped_on,
      voucherId: r.voucher_id,
      code: r.code,
      redeemed: Boolean(r.redeemed_at),
    })),
  };
}

/** GET /api/stamps?token=...  -> { state } (state is null if no card yet) */
export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token") ?? "";
  if (!token || token.length > 100)
    return NextResponse.json({ state: null }, { headers });
  try {
    const card = await findCard(token);
    if (!card) return NextResponse.json({ state: null }, { headers });
    return NextResponse.json(
      { state: toState(card, await loadStamps(card.id)) },
      { headers },
    );
  } catch {
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
}

/** POST /api/stamps  { token? } -> stamps today (creates the card on first use) */
export async function POST(request: Request) {
  let token = "";
  try {
    const body = await request.json();
    if (typeof body?.token === "string") token = body.token.slice(0, 100);
  } catch {
    /* no body: treat as a new guest */
  }

  try {
    const supabase = db();
    let card = token ? await findCard(token) : null;

    if (!card) {
      token = randomBytes(24).toString("base64url");
      const { data, error } = await supabase
        .from("stamp_cards")
        .insert({ token, promo_schedule: buildSchedule() })
        .select("id, email, phone, promo_schedule")
        .single();
      if (error) throw error;
      card = data as CardRow;
    }

    if (!card) throw new Error("Could not load or create stamp card.");

    let activeCard: CardRow = card;
    const rows = await loadStamps(activeCard.id);
    const schedule = buildSchedule();
    for (const row of rows) {
      if (row.voucher_id) schedule[String(row.stamp_no)] = row.voucher_id;
    }
    const scheduleChanged =
      Object.entries(schedule).some(
        ([day, voucherId]) => activeCard.promo_schedule[day] !== voucherId,
      ) ||
      Object.keys(activeCard.promo_schedule).length !==
        Object.keys(schedule).length;
    if (scheduleChanged) {
      const { error } = await supabase
        .from("stamp_cards")
        .update({ promo_schedule: schedule })
        .eq("id", activeCard.id);
      if (error) throw error;
      activeCard = { ...activeCard, promo_schedule: schedule };
    }

    const today = manilaToday();

    if (
      rows.length >= TOTAL_STAMPS ||
      rows.some((r) => r.stamped_on === today)
    ) {
      return NextResponse.json(
        { token, state: toState(activeCard, rows), newStampNo: null },
        { headers },
      );
    }

    const no = rows.length + 1;
    const voucherId = activeCard.promo_schedule[String(no)] ?? null;
    const code = voucherId ? issueCode(voucherId) : null;

    const { error } = await supabase.from("stamps").insert({
      card_id: card.id,
      stamp_no: no,
      stamped_on: today,
      voucher_id: voucherId,
      code,
    });
    // 23505 = unique violation: a double tap already stamped today.
    if (error && error.code !== "23505") throw error;

    const fresh = await loadStamps(activeCard.id);
    return NextResponse.json(
      {
        token,
        state: toState(activeCard, fresh),
        newStampNo: error ? null : no,
      },
      { headers },
    );
  } catch {
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
}
