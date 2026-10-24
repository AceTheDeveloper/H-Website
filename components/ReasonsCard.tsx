"use client";

import { useEffect, useState } from "react";
import { vouchers } from "@/lib/data";
import { reasons, TOTAL_STAMPS } from "@/lib/reasons";
import type { StampState } from "@/lib/reasons";

const TOKEN_KEY = "h-30-reasons-token";

function fmt(date: string) {
  return new Date(`${date}T00:00:00+08:00`).toLocaleDateString("en-PH", {
    day: "numeric",
    month: "short",
  });
}

export default function ReasonsCard() {
  const [state, setState] = useState<StampState | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [storageOk, setStorageOk] = useState(true);
  const [selected, setSelected] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const [skipContact, setSkipContact] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contactBusy, setContactBusy] = useState(false);
  const [contactError, setContactError] = useState("");

  useEffect(() => {
    let token: string | null = null;
    try {
      token = localStorage.getItem(TOKEN_KEY);
    } catch {
      setStorageOk(false);
      setLoading(false);
      return;
    }
    if (!token) {
      setLoading(false);
      return;
    }
    fetch(`/api/stamps?token=${encodeURIComponent(token)}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.state) {
          const s = d.state as StampState;
          setState(s);
          setSelected(
            s.stamps.length ? s.stamps[s.stamps.length - 1].no : null,
          );
        } else {
          localStorage.removeItem(TOKEN_KEY);
        }
      })
      .catch(() => setError("Couldn't load your card. Check your connection."))
      .finally(() => setLoading(false));
  }, []);

  async function stamp() {
    if (busy || !storageOk) return;
    setBusy(true);
    setError("");
    try {
      let token: string | null = null;
      try {
        token = localStorage.getItem(TOKEN_KEY);
      } catch {
        /* handled by storageOk */
      }
      const res = await fetch("/api/stamps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      if (!res.ok) throw new Error();
      const d = await res.json();
      try {
        localStorage.setItem(TOKEN_KEY, d.token);
      } catch {
        setStorageOk(false);
      }
      const s = d.state as StampState;
      setState(s);
      setSelected(
        d.newStampNo ??
          (s.stamps.length ? s.stamps[s.stamps.length - 1].no : null),
      );
    } catch {
      setError("Couldn't stamp right now. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function saveContact(e: React.FormEvent) {
    e.preventDefault();
    if (contactBusy) return;
    setContactBusy(true);
    setContactError("");
    try {
      const res = await fetch("/api/stamps/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: localStorage.getItem(TOKEN_KEY),
          email,
          phone,
        }),
      });
      if (res.status === 422) {
        setContactError("Please enter a valid email and mobile number.");
        return;
      }
      if (!res.ok) throw new Error();
      setState((s) => (s ? { ...s, hasContact: true } : s));
    } catch {
      setContactError("Couldn't save right now. Please try again.");
    } finally {
      setContactBusy(false);
    }
  }

  async function copy(code: string) {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  }

  if (loading) return <p className="text-ink/70">Loading your card…</p>;

  const stamps = state?.stamps ?? [];
  const byNo = new Map(stamps.map((s) => [s.no, s]));
  const complete = stamps.length >= TOTAL_STAMPS;
  const stampedToday = state?.stampedToday ?? false;
  const canStamp = storageOk && !busy && !complete && !stampedToday;
  const buttonLabel = busy
    ? "Stamping…"
    : complete
      ? "Card complete"
      : stampedToday
        ? "Come back tomorrow"
        : stamps.length === 0
          ? "Stamp day 1"
          : `Stamp day ${stamps.length + 1}`;

  const sel = selected ? byNo.get(selected) : undefined;
  const selVoucher = sel?.voucherId
    ? vouchers.find((v) => v.id === sel.voucherId)
    : undefined;
  const askContact =
    state !== null &&
    !state.hasContact &&
    !skipContact &&
    stamps.some((s) => s.voucherId);

  return (
    <div className="mx-auto max-w-4xl">
      {!storageOk && (
        <p className="mb-6 border-2 border-red bg-white p-4 text-ink/80">
          Your browser is blocking site storage, so we can&apos;t keep your
          card. Turn off private mode or allow site data, then reload.
        </p>
      )}

      <div className="border-2 border-ink bg-white p-6 md:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">
              Your card
            </p>
            <p className="heading mt-1 text-3xl">
              {stamps.length} / {TOTAL_STAMPS} stamps
            </p>
          </div>
          <button
            type="button"
            onClick={stamp}
            disabled={!canStamp}
            className="btn btn-primary disabled:opacity-50"
          >
            {buttonLabel}
          </button>
        </div>

        {error && (
          <p role="alert" className="mt-4 text-brick">
            {error}
          </p>
        )}

        <ol className="mt-6 grid grid-cols-5 gap-2 sm:grid-cols-6 md:grid-cols-10">
          {Array.from({ length: TOTAL_STAMPS }, (_, i) => {
            const no = i + 1;
            const s = byNo.get(no);
            return (
              <li key={no}>
                <button
                  type="button"
                  disabled={!s}
                  onClick={() => setSelected(no)}
                  aria-label={
                    s ? `Stamp ${no}, stamped` : `Stamp ${no}, locked`
                  }
                  className={`relative aspect-square w-full border-2 text-lg font-semibold ${
                    s
                      ? `border-ink bg-ink text-white ${selected === no ? "ring-2 ring-red ring-offset-2" : ""}`
                      : "border-ink/20 bg-chalk text-ink/40"
                  }`}
                >
                  {s ? "✓" : no}
                  {s?.voucherId && (
                    <span className="absolute right-1 top-0 text-xs text-[#FF6A48]">
                      ★
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ol>
        <p className="mt-3 text-sm text-ink/60">
          ★ = this stamp came with a promo.
        </p>

        {sel && (
          <div
            className="mt-6 border-2 border-ink bg-chalk p-6"
            aria-live="polite"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">
              Reason #{sel.no} · stamped {fmt(sel.date)}
            </p>
            <p className="heading mt-2 text-2xl">{reasons[sel.no - 1]}</p>

            {selVoucher && sel.code && (
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selVoucher.image}
                  alt={selVoucher.title}
                  className="w-full border-2 border-ink"
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brick">
                    {sel.redeemed ? "Already used" : "Your voucher code"}
                  </p>
                  <p className="mt-2 break-all font-mono text-2xl font-bold tracking-[0.06em]">
                    {sel.code}
                  </p>
                  <button
                    type="button"
                    onClick={() => copy(sel.code!)}
                    className="btn btn-outline mt-4"
                  >
                    {copied ? "Copied" : "Copy code"}
                  </button>
                  <p className="mt-3 text-sm text-ink/70">
                    Show this code to our staff. One use only.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {askContact && (
        <form
          onSubmit={saveContact}
          className="mt-6 border-2 border-ink bg-ink p-6 text-white"
        >
          <p className="heading text-2xl">Don&apos;t lose your promos</p>
          <p className="mt-2 text-white/75">
            Leave your email and mobile number so we can reach you about your
            vouchers.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              autoComplete="email"
              className="border-2 border-white bg-white px-4 py-3 text-ink"
            />
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Mobile number"
              autoComplete="tel"
              className="border-2 border-white bg-white px-4 py-3 text-ink"
            />
          </div>
          {contactError && (
            <p role="alert" className="mt-3 text-[#FF6A48]">
              {contactError}
            </p>
          )}
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={contactBusy}
              className="btn btn-primary"
            >
              {contactBusy ? "Saving…" : "Save"}
            </button>
            <button
              type="button"
              onClick={() => setSkipContact(true)}
              className="btn btn-outline"
            >
              Maybe later
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
