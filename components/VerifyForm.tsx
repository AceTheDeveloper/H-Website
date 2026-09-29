"use client";

import { useState } from "react";

type Result =
  | { status: "valid"; title: string }
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

export default function VerifyForm() {
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Result>(null);

  async function check(e: React.FormEvent) {
    e.preventDefault();
    if (busy || !code) return;
    setBusy(true);
    setResult(null);
    try {
      const res = await fetch("/api/roulette/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setResult(
        data.valid
          ? { status: "valid", title: data.title }
          : { status: "invalid" },
      );
    } catch {
      setResult({ status: "error" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl">
      <form
        onSubmit={check}
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
        {result?.status === "valid" && (
          <div className="border-2 border-ink bg-ink p-6 text-white">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#FF6A48]">
              <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4">
                <path
                  d="M4 10.5l4 4 8-9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="square"
                />
              </svg>
              Genuine code
            </p>
            <p className="heading mt-2 text-3xl">{result.title}</p>
          </div>
        )}
        {result?.status === "invalid" && (
          <div className="border-2 border-red bg-white p-6">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-brick">
              <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4">
                <path
                  d="M4 4l12 12M16 4L4 16"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="square"
                />
              </svg>
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

      <p className="mt-8 text-sm text-ink/70">
        This confirms a code is genuine and shows which voucher it is for. It
        cannot tell whether the code was already used, so tick each redeemed
        code off your log at the counter.
      </p>
    </div>
  );
}
