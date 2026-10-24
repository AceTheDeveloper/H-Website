"use client";

import { useState } from "react";

type Result =
  | { status: "available"; title: string }
  | { status: "redeemed"; title: string }
  | { status: "used"; title: string; usedAt: string | null }
  | { status: "invalid" }
  | { status: "error" }
  | null;

/** Auto-uppercase and group as the staff member types: ABCD-EFGH-IJKL-MNOP */
function pretty(value: string) {
  const clean = value
    .toUpperCase()
    .replace(/[^0-9A-Z]/g, "")
    .slice(0, 16);
  return clean.match(/.{1,4}/g)?.join("-") ?? "";
}

function when(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleString("en-PH", {
    timeZone: "Asia/Manila",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function VerifyForm() {
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Result>(null);

  async function call(redeem: boolean) {
    if (busy || !code) return;
    setBusy(true);
    try {
      const res = await fetch("/api/stamps/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, redeem }),
      });
      if (!res.ok) throw new Error();
      const d = await res.json();
      if (!d.valid) setResult({ status: "invalid" });
      else if (d.justRedeemed)
        setResult({ status: "redeemed", title: d.title });
      else if (d.used)
        setResult({ status: "used", title: d.title, usedAt: d.usedAt ?? null });
      else setResult({ status: "available", title: d.title });
    } catch {
      setResult({ status: "error" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setResult(null);
          call(false);
        }}
        className="border-2 border-ink bg-white p-6 md:p-8"
      >
        <label
          htmlFor="code"
          className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/60"
        >
          Voucher code
        </label>
        <input
          id="code"
          value={code}
          onChange={(e) => {
            setCode(pretty(e.target.value));
            setResult(null);
          }}
          placeholder="XXXX-XXXX-XXXX-XXXX"
          inputMode="text"
          autoCapitalize="characters"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          className="mt-2 w-full border-2 border-ink bg-chalk px-4 py-3 font-mono text-xl font-bold tracking-[0.06em] sm:text-2xl sm:tracking-[0.1em] placeholder:text-ink/25"
        />
        <button
          type="submit"
          disabled={busy || code.length < 19}
          className="btn btn-primary mt-5 w-full disabled:opacity-50"
        >
          {busy ? "Checking…" : "Check code"}
        </button>
      </form>

      <div className="mt-6" aria-live="polite">
        {result?.status === "available" && (
          <div className="border-2 border-ink bg-ink p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#FF6A48]">
              Genuine · not used yet
            </p>
            <p className="heading mt-2 text-3xl">{result.title}</p>
            <button
              type="button"
              onClick={() => call(true)}
              disabled={busy}
              className="btn btn-primary mt-5 w-full disabled:opacity-50"
            >
              {busy ? "Saving…" : "Mark as used"}
            </button>
            <p className="mt-3 text-sm text-white/70">
              Only tap this once the guest has been given the promo.
            </p>
          </div>
        )}
        {result?.status === "redeemed" && (
          <div className="border-2 border-ink bg-ink p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#FF6A48]">
              Marked as used
            </p>
            <p className="heading mt-2 text-3xl">{result.title}</p>
          </div>
        )}
        {result?.status === "used" && (
          <div className="border-2 border-red bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brick">
              Already used
            </p>
            <p className="heading mt-2 text-3xl">{result.title}</p>
            <p className="mt-2 text-ink/75">
              {result.usedAt ? `Redeemed ${when(result.usedAt)}. ` : ""}Do not
              honour this voucher again.
            </p>
          </div>
        )}
        {result?.status === "invalid" && (
          <div className="border-2 border-red bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brick">
              Not valid
            </p>
            <p className="heading mt-2 text-3xl">Code not recognised</p>
            <p className="mt-2 text-ink/75">
              Check the characters and try again. Do not honour this voucher.
            </p>
          </div>
        )}
        {result?.status === "error" && (
          <p className="border-2 border-ink bg-white p-4 text-ink/80">
            Couldn&apos;t reach the server. Check your connection and try again.
          </p>
        )}
      </div>
    </div>
  );
}
