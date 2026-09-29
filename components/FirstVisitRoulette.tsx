"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { vouchers } from "@/lib/data";
import type { Voucher } from "@/lib/data";
import VoucherRoulette, { shortLabel } from "./VoucherRoulette";
import type { RouletteHandle } from "./VoucherRoulette";

/**
 * Welcome offer for first-time visitors.
 *
 * Flow: popup opens -> wheel spins by itself -> server picks the prize and
 * signs a unique code -> wheel lands on it -> the voucher is shown with its
 * code. The prize is saved in this browser so it can be reopened later from
 * the "Your voucher" tab, and so the popup never appears twice.
 *
 * Staff check codes at /staff/verify. Per browser only: clearing site data
 * counts as a new visitor (a real one-per-person rule needs a database).
 */

const PRIZE_KEY = "h-roulette-prize";
const DISMISS_KEY = "h-roulette-dismissed"; // sessionStorage: don't nag within a visit
const START_DELAY_MS = 900; // let the wheel appear before it starts turning
const RESULT_DELAY_MS = 1400; // let people see where it landed

type Prize = { voucherId: string; code: string; issuedAt: string };
type Phase = "idle" | "spinning" | "landed" | "result" | "error";

function readPrize(): Prize | null {
  try {
    const raw = localStorage.getItem(PRIZE_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw);
    if (
      typeof p?.voucherId === "string" &&
      typeof p?.code === "string" &&
      typeof p?.issuedAt === "string" &&
      vouchers.some((v) => v.id === p.voucherId)
    ) {
      return p as Prize;
    }
  } catch {
    /* ignore */
  }
  return null;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-PH", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** Draw the voucher + its code onto one PNG so it can be saved to the phone. */
async function saveVoucherImage(voucher: Voucher, prize: Prize) {
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new window.Image();
    el.onload = () => resolve(el);
    el.onerror = reject;
    el.src = voucher.image;
  });
  const W = img.naturalWidth;
  const unit = W / 1654;
  const stripH = Math.round(240 * unit);
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = img.naturalHeight + stripH;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.drawImage(img, 0, 0);
  ctx.fillStyle = "#17110E";
  ctx.fillRect(0, img.naturalHeight, W, stripH);

  const pad = 64 * unit;
  const y0 = img.naturalHeight;
  ctx.fillStyle = "#FF6A48";
  ctx.font = `700 ${28 * unit}px Arial, Helvetica, sans-serif`;
  ctx.fillText("VOUCHER CODE", pad, y0 + 64 * unit);
  ctx.fillStyle = "#FFFFFF";
  ctx.font = `700 ${92 * unit}px ui-monospace, Menlo, Consolas, monospace`;
  ctx.fillText(prize.code, pad, y0 + 158 * unit);
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.font = `400 ${28 * unit}px Arial, Helvetica, sans-serif`;
  ctx.fillText(
    `Issued ${formatDate(prize.issuedAt)}  ·  Show this code to our staff  ·  One use only`,
    pad,
    y0 + 212 * unit,
  );

  const blob = await new Promise<Blob | null>((r) =>
    canvas.toBlob(r, "image/png"),
  );
  if (!blob) return;
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `h-voucher-${prize.code}.png`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

const STYLE = `
@keyframes hfv-rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
.hfv-rise { animation: hfv-rise 0.5s ease both; }
@keyframes hfv-dots { 0%, 20% { opacity: 0.2; } 50% { opacity: 1; } 100% { opacity: 0.2; } }
.hfv-dot { animation: hfv-dots 1.2s infinite; }
.hfv-dot:nth-child(2) { animation-delay: 0.2s; }
.hfv-dot:nth-child(3) { animation-delay: 0.4s; }
@media (prefers-reduced-motion: reduce) { .hfv-rise, .hfv-dot { animation: none; } }
`;

function Check() {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className="mt-1 h-4 w-4 shrink-0 text-[#FF6A48]"
    >
      <path
        d="M4 10.5l4 4 8-9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

export default function FirstVisitRoulette() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const wheelRef = useRef<RouletteHandle>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const claimingRef = useRef(false);
  const resultTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [prize, setPrize] = useState<Prize | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dismissedNoPrize, setDismissedNoPrize] = useState(false);

  const isStaff = pathname?.startsWith("/staff") ?? false;
  const prizeIndex = prize
    ? vouchers.findIndex((v) => v.id === prize.voucherId)
    : -1;
  const prizeVoucher = prizeIndex >= 0 ? vouchers[prizeIndex] : null;

  // Decide once on mount: returning guest, or first visit?
  useEffect(() => {
    if (isStaff) return;
    try {
      localStorage.setItem("h-roulette-probe", "1");
      localStorage.removeItem("h-roulette-probe");
    } catch {
      return; // storage blocked: we could not remember them, so stay quiet
    }
    const saved = readPrize();
    setReady(true);
    if (saved) {
      setPrize(saved);
      return;
    }
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(DISMISS_KEY) === "1";
    } catch {
      /* ignore */
    }
    if (dismissed) setDismissedNoPrize(true);
    else {
      setPhase("idle");
      setOpen(true);
    }
  }, [isStaff]);

  // Show / hide the native modal, and stop the page scrolling behind it.
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      panelRef.current?.focus({ preventScroll: true });
    }
    if (!open && d.open) d.close();
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  const claim = useCallback(async () => {
    if (claimingRef.current) return;
    claimingRef.current = true;
    setPhase("spinning");
    try {
      const res = await fetch("/api/roulette", {
        method: "POST",
        cache: "no-store",
      });
      if (!res.ok) throw new Error("claim failed");
      const data = await res.json();
      const index = vouchers.findIndex((v) => v.id === data.voucherId);
      if (index < 0 || typeof data.code !== "string")
        throw new Error("bad response");

      const won: Prize = {
        voucherId: data.voucherId,
        code: data.code,
        issuedAt: data.issuedAt,
      };
      // Save straight away, so closing the popup mid-spin never loses the prize.
      try {
        localStorage.setItem(PRIZE_KEY, JSON.stringify(won));
      } catch {
        /* ignore */
      }
      setPrize(won);

      await wheelRef.current?.spinTo(index);
      setPhase("landed");
      resultTimer.current = setTimeout(
        () => setPhase("result"),
        RESULT_DELAY_MS,
      );
    } catch {
      setPhase("error");
    } finally {
      claimingRef.current = false;
    }
  }, []);

  // Auto-spin shortly after the popup opens with no prize yet.
  useEffect(() => {
    if (!open || prize || phase !== "idle") return;
    const t = setTimeout(claim, START_DELAY_MS);
    return () => clearTimeout(t);
  }, [open, prize, phase, claim]);

  useEffect(
    () => () => {
      if (resultTimer.current) clearTimeout(resultTimer.current);
    },
    [],
  );

  function openDialog() {
    setPhase(prize ? "result" : "idle");
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    if (!prize) {
      try {
        sessionStorage.setItem(DISMISS_KEY, "1");
      } catch {
        /* ignore */
      }
      setDismissedNoPrize(true);
    }
  }

  async function copyCode() {
    if (!prize) return;
    try {
      await navigator.clipboard.writeText(prize.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: the code is on screen anyway */
    }
  }

  async function save() {
    if (!prize || !prizeVoucher || saving) return;
    setSaving(true);
    try {
      await saveVoucherImage(prizeVoucher, prize);
    } catch {
      /* ignore: screenshot still works */
    } finally {
      setSaving(false);
    }
  }

  if (isStaff || !ready) return null;

  const showResult = phase === "result" && prize && prizeVoucher;
  const statusText =
    phase === "error"
      ? "We couldn't load your voucher."
      : phase === "landed"
        ? "You've got one!"
        : phase === "spinning"
          ? "Spinning"
          : "Get ready";

  return (
    <>
      <style>{STYLE}</style>

      {!open && (prize || dismissedNoPrize) && (
        <button
          type="button"
          onClick={openDialog}
          className="fixed bottom-4 left-4 z-40 inline-flex min-h-[2.75rem] items-center gap-2 border-2 border-ink bg-ink px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-red hover:border-red"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
            <path
              d="M3 8a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 000 4v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 000-4z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
          {prize ? "Your voucher" : "Spin for a voucher"}
        </button>
      )}

      <dialog
        ref={dialogRef}
        onClose={(e) => {
          if (e.target === dialogRef.current) handleClose();
        }}
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
        aria-labelledby="hfv-title"
        className="m-auto max-h-[94dvh] w-[min(96vw,900px)] max-w-none overflow-y-auto border-0 bg-transparent p-0 shadow-2xl backdrop:bg-ink/85 backdrop:backdrop-blur-sm"
      >
        {open && (
          <div ref={panelRef} tabIndex={-1} className="relative outline-none">
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close"
              className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center text-white/80 hover:bg-white/10 hover:text-white focus-visible:outline-white"
            >
              <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5">
                <path
                  d="M4 4l12 12M16 4L4 16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
            </button>

            {!showResult ? (
              /* ------------------------------ Stage 1: the wheel ------------------------------ */
              <div className="grid bg-espresso text-white md:grid-cols-[1fr_1.05fr]">
                <div className="flex flex-col justify-center px-6 pb-2 pt-8 md:px-10 md:py-12">
                  <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#FF6A48]">
                    <span
                      className="h-0.5 w-8 bg-[#FF6A48]"
                      aria-hidden="true"
                    />
                    Welcome offer
                  </p>
                  <h2
                    id="hfv-title"
                    className="heading mt-4 pr-8 text-4xl sm:text-5xl md:pr-0 md:text-6xl"
                  >
                    Spin for your welcome voucher
                  </h2>
                  <p className="mt-4 max-w-md text-white/75">
                    Every first-time guest gets one spin. Your voucher comes
                    with a unique code that our staff will verify.
                  </p>

                  <ul className="mt-6 hidden space-y-3 text-white/85 md:block">
                    <li className="flex gap-3">
                      <Check />
                      One spin per guest
                    </li>
                    <li className="flex gap-3">
                      <Check />
                      Unique, verifiable voucher code
                    </li>
                    <li className="flex gap-3">
                      <Check />
                      Redeem on your next visit
                    </li>
                  </ul>

                  <div
                    className="mt-6 flex min-h-[2.5rem] items-center gap-3 border-t border-white/15 pt-4 text-sm font-semibold uppercase tracking-[0.18em]"
                    aria-live="polite"
                  >
                    {phase === "error" ? (
                      <>
                        <span className="text-white/85 normal-case tracking-normal">
                          {statusText}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setPhase("idle");
                            claim();
                          }}
                          className="btn btn-primary !min-h-[2.25rem] !px-4 !py-1 text-sm"
                        >
                          Try again
                        </button>
                      </>
                    ) : (
                      <>
                        {statusText}
                        {(phase === "idle" || phase === "spinning") && (
                          <span className="flex gap-1" aria-hidden="true">
                            <span className="hfv-dot h-1.5 w-1.5 bg-[#FF6A48]" />
                            <span className="hfv-dot h-1.5 w-1.5 bg-[#FF6A48]" />
                            <span className="hfv-dot h-1.5 w-1.5 bg-[#FF6A48]" />
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <div
                  className="flex items-center justify-center px-5 pb-8 pt-4 md:px-8 md:py-10"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 45%, #3B2A22 0%, #17110E 72%)",
                  }}
                >
                  <div className="w-full max-w-[360px] md:max-w-[420px]">
                    <VoucherRoulette
                      ref={wheelRef}
                      items={vouchers}
                      highlight={
                        phase === "landed" && prizeIndex >= 0
                          ? prizeIndex
                          : null
                      }
                    />
                  </div>
                </div>
              </div>
            ) : (
              /* ------------------------------ Stage 2: the voucher ------------------------------ */
              <div className="hfv-rise bg-chalk text-ink">
                <div className="bg-ink px-6 py-6 pr-16 text-white md:px-10">
                  <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#FF6A48]">
                    <span
                      className="h-0.5 w-8 bg-[#FF6A48]"
                      aria-hidden="true"
                    />
                    Congratulations
                  </p>
                  <h2
                    id="hfv-title"
                    className="heading mt-2 text-3xl sm:text-4xl"
                  >
                    You won: {shortLabel(prizeVoucher.title)}
                  </h2>
                </div>

                <div className="p-4 md:p-8">
                  <div className="overflow-hidden border-2 border-ink bg-white">
                    <Image
                      src={prizeVoucher.image}
                      alt={`${prizeVoucher.brand}: ${prizeVoucher.title}`}
                      width={1654}
                      height={709}
                      sizes="(min-width: 900px) 836px, 92vw"
                      priority
                      className="h-auto w-full"
                    />
                    <div className="grid gap-4 border-t-2 border-dashed border-ink/40 bg-plaster p-4 sm:grid-cols-[1fr_auto] sm:items-center md:p-5">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">
                          Voucher code
                        </p>
                        <p className="mt-1 whitespace-nowrap font-mono text-[1.3rem] font-bold tracking-[0.06em] sm:text-3xl sm:tracking-[0.1em]">
                          {prize.code}
                        </p>
                        <p className="mt-1 text-sm text-ink/60">
                          Issued {formatDate(prize.issuedAt)}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={copyCode}
                          className="btn btn-outline !min-h-[2.75rem] !px-4"
                        >
                          {copied ? "Copied" : "Copy code"}
                        </button>
                        <button
                          type="button"
                          onClick={save}
                          disabled={saving}
                          className="btn btn-primary !min-h-[2.75rem] !px-4 disabled:opacity-60"
                        >
                          {saving ? "Saving…" : "Save as image"}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                    <p className="max-w-xl text-sm text-ink/70">
                      Show this code to our staff before you order. One use only
                      and non-transferable. Every code is checked at the
                      counter.
                    </p>
                    <button
                      type="button"
                      onClick={() => dialogRef.current?.close()}
                      className="btn btn-ink !min-h-[2.75rem]"
                    >
                      Done
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
