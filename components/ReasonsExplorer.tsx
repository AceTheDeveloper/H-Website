"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { promoImage, promos } from "@/lib/promos";
import { moods, reasons, suggestMood } from "@/lib/reasons";
import type { MoodId } from "@/lib/reasons";
import { canReveal, isComplete, manilaDateKey } from "@/lib/revealRules";
import type { VisitorRecord } from "@/lib/revealRules";
import {
  canSave,
  getCountdownToReset,
  getIssuedPromos,
  getRecord,
  revealToday,
} from "@/lib/promoStore";
import type { IssuedPromo } from "@/lib/promoStore";

const STAFF_NOTE = "Show this to our staff before you order. One use only.";

const longDate = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  month: "short",
  day: "numeric",
  year: "numeric",
});

/** "2026-10-11" to "Oct 11, 2026". */
function formatDate(dateKey: string) {
  return longDate.format(new Date(`${dateKey}T00:00:00Z`));
}

function reasonNumber(id: number) {
  return `Reason ${String(id).padStart(2, "0")}`;
}

/** Ticks down to midnight in Manila, then tells the page the day has turned. */
function Countdown({ onReset }: { onReset: () => void }) {
  const [left, setLeft] = useState(() => getCountdownToReset());
  const onResetRef = useRef(onReset);
  onResetRef.current = onReset;

  useEffect(() => {
    const day = manilaDateKey(new Date());
    const timer = window.setInterval(() => {
      setLeft(getCountdownToReset());
      if (manilaDateKey(new Date()) !== day) onResetRef.current();
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const total = Math.max(0, Math.ceil(left / 1000));
  const two = (n: number) => String(n).padStart(2, "0");
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;

  return (
    <p className="mt-2 text-ink/80">
      Next reveal in{" "}
      <span
        role="timer"
        aria-label={`${h} hours ${m} minutes`}
        className="font-semibold tabular-nums text-ink"
      >
        {two(h)}:{two(m)}:{two(s)}
      </span>
    </p>
  );
}

function PromoDetails({ issued }: { issued: IssuedPromo }) {
  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
      <dt className="text-ink/60">Code</dt>
      <dd className="font-semibold tracking-[0.12em]">{issued.code}</dd>
      <dt className="text-ink/60">Issued</dt>
      <dd>{formatDate(issued.date)}</dd>
      <dt className="text-ink/60">{issued.expired ? "Expired" : "Valid until"}</dt>
      <dd>{formatDate(issued.expiresOn)}</dd>
    </dl>
  );
}

/**
 * The Promo page's "30 reasons to come to H": pick a mood and reveal one
 * reason a day. Some reveals come with a surprise promo, which then sits
 * under "My promos". The visitor record is kept on this device through
 * lib/promoStore, and the reveal itself is decided in lib/revealRules.
 */
export default function ReasonsExplorer() {
  const [record, setRecord] = useState<VisitorRecord | null>(null);
  const [saving, setSaving] = useState(true);
  const [today, setToday] = useState("");
  const [mood, setMood] = useState<MoodId | null>(null);
  const [suggested, setSuggested] = useState(false);
  const [fresh, setFresh] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [active, setActive] = useState<IssuedPromo | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const resultRef = useRef<HTMLHeadingElement>(null);

  // Storage and the clock only exist in the browser, so the first render is
  // the empty state and this fills it in.
  useEffect(() => {
    const stored = getRecord();
    const start = stored.mood ?? suggestMood();
    setRecord(stored);
    setSaving(canSave());
    setToday(manilaDateKey(new Date()));
    setMood(start);
    setSuggested(!stored.mood && start !== null);
  }, []);

  // After a reveal the button is gone, so hand focus to the result.
  useEffect(() => {
    if (fresh) resultRef.current?.focus();
  }, [fresh]);

  function reveal() {
    if (!mood) return;
    const made = revealToday(mood);
    setRecord(getRecord());
    setSaving(canSave());
    setToday(manilaDateKey(new Date()));
    setFresh(made !== null);
  }

  function view(issued: IssuedPromo) {
    setActive(issued);
    dialogRef.current?.showModal();
  }

  const ready = record !== null;
  const reveals = record?.reveals ?? [];
  const count = reveals.length;
  const complete = ready && isComplete(record);
  const open = ready && !complete && canReveal(record, today);
  // Shown while today's reveal is used up (or the clock was wound back).
  const latest = ready && !canReveal(record, today) ? reveals[count - 1] : null;
  const latestReason = reasons.find((r) => r.id === latest?.reasonId);
  const issued = ready ? getIssuedPromos() : [];
  const latestPromo = latest?.promoId
    ? issued.find((p) => p.date === latest.date && p.code === latest.code)
    : undefined;
  const moodLabel = moods.find((m) => m.id === mood)?.label;
  const titleOf = (id: string) => promos.find((p) => p.id === id);
  const activeInfo = active ? titleOf(active.promoId) : undefined;

  return (
    <div>
      <div className="border-2 border-ink bg-plaster p-5">
        <p className="heading text-2xl sm:text-3xl">
          {count} of {reasons.length} discovered
        </p>
        <div
          role="progressbar"
          aria-label="Reasons discovered"
          aria-valuemin={0}
          aria-valuemax={reasons.length}
          aria-valuenow={count}
          aria-valuetext={`${count} of ${reasons.length} discovered`}
          className="mt-4 h-3 border-2 border-ink bg-chalk"
        >
          <div
            className="h-full bg-red transition-[width] duration-500"
            style={{ width: `${(count / reasons.length) * 100}%` }}
          />
        </div>
        {ready && !saving && (
          <p role="status" className="mt-4 text-ink/80">
            Your browser is blocking storage, so we can&apos;t save your
            progress on this device.
          </p>
        )}
      </div>

      {open && (
        <div className="mt-10">
          <h2 className="heading text-3xl sm:text-4xl">
            What are you in the mood for?
          </h2>
          <p className="mt-3 text-ink/80">
            One reason a day. Pick a mood and see what today brings.
          </p>
          <div
            role="group"
            aria-label="Pick a mood"
            className="mt-5 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap"
          >
            {moods.map((m) => {
              const on = m.id === mood;
              return (
                <button
                  key={m.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => {
                    setMood(m.id);
                    setSuggested(false);
                  }}
                  className={`min-h-[2.75rem] border-2 border-ink px-4 py-2 text-base font-semibold transition-colors ${
                    on ? "bg-ink text-white" : "bg-transparent hover:bg-ink/10"
                  }`}
                >
                  {m.label}
                </button>
              );
            })}
          </div>
          {suggested && moodLabel && (
            <p className="mt-4 text-ink/80">
              We guessed {moodLabel} from the time of day. Change it whenever
              you like.
            </p>
          )}
          <button
            type="button"
            onClick={reveal}
            disabled={!mood}
            className="btn btn-primary mt-7 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Reveal today&apos;s reason
          </button>
          {!mood && <p className="mt-3 text-ink/80">Pick a mood first.</p>}
        </div>
      )}

      {/* Always in the page, so screen readers hear the reveal arrive. */}
      <div aria-live="polite">
        {latest && latestReason && (
          <div className="mt-10">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brick">
              Today&apos;s reason · {reasonNumber(latestReason.id)}
            </p>
            <h2
              ref={resultRef}
              tabIndex={-1}
              className="heading mt-3 text-4xl !outline-none sm:text-5xl"
            >
              {latestReason.title}
            </h2>
            <p className="lede mt-4 max-w-xl text-ink/85">{latestReason.line}</p>

            {latestPromo && (
              <div
                className={`mt-8 border-2 border-ink bg-plaster ${
                  fresh ? "reveal-pop" : ""
                }`}
              >
                <p className="heading border-b-2 border-ink px-5 py-3 text-2xl">
                  Surprise. This one comes with a promo.
                </p>
                <button
                  type="button"
                  onClick={() => view(latestPromo)}
                  aria-label={`${titleOf(latestPromo.promoId)?.title}. View full size`}
                  className="block w-full"
                >
                  <Image
                    src={promoImage(titleOf(latestPromo.promoId)!)}
                    alt=""
                    width={1654}
                    height={709}
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="h-auto w-full"
                  />
                </button>
                <div className="border-t-2 border-ink p-5">
                  <PromoDetails issued={latestPromo} />
                  <p className="mt-4 font-semibold">{STAFF_NOTE}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {complete && (
        <div className="mt-10 border-2 border-ink p-5">
          <h2 className="heading text-3xl sm:text-4xl">
            You&apos;ve found all 30
          </h2>
          <p className="lede mt-3 text-ink/85">
            Every reason, discovered. The only thing left is to come in and
            pick a favorite.
          </p>
        </div>
      )}

      {latest && !complete && (
        <div className="mt-8 border-2 border-ink p-5">
          <h2 className="heading text-2xl sm:text-3xl">
            Come back tomorrow for another
          </h2>
          <Countdown onReset={() => setToday(manilaDateKey(new Date()))} />
        </div>
      )}

      <section aria-labelledby="my-promos" className="mt-12">
        <h2 id="my-promos" className="heading text-3xl sm:text-4xl">
          My promos
        </h2>
        {issued.length === 0 ? (
          <p className="mt-3 text-ink/80">
            Nothing here yet. Promos you&apos;re given will be kept here, on
            this device.
          </p>
        ) : (
          <ul className="mt-6 divide-y-2 divide-ink border-y-2 border-ink">
            {issued.map((p) => (
              <li
                key={`${p.date}-${p.code}`}
                className={`grid grid-cols-1 gap-4 py-5 sm:grid-cols-[14rem_1fr] sm:gap-6 ${
                  p.expired ? "text-ink/60" : ""
                }`}
              >
                <button
                  type="button"
                  onClick={() => view(p)}
                  aria-label={`${titleOf(p.promoId)?.title}. View full size`}
                  className={`block border-2 border-ink ${p.expired ? "opacity-50" : ""}`}
                >
                  <Image
                    src={promoImage(titleOf(p.promoId)!)}
                    alt=""
                    width={1654}
                    height={709}
                    sizes="(min-width: 640px) 14rem, 100vw"
                    className="h-auto w-full"
                  />
                </button>
                <div>
                  <p className="heading text-2xl">
                    {titleOf(p.promoId)?.title}
                  </p>
                  <div className="mt-2">
                    <PromoDetails issued={p} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="mt-12">
        <button
          type="button"
          aria-expanded={showAll}
          aria-controls="all-reasons"
          onClick={() => setShowAll((v) => !v)}
          className="btn btn-outline"
        >
          {showAll ? "Hide the list" : `See all ${reasons.length}`}
        </button>
        <ul
          id="all-reasons"
          className={
            showAll
              ? "mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
              : "hidden"
          }
        >
          {reasons.map((reason) => {
            const found = reveals.some((v) => v.reasonId === reason.id);
            return (
              <li
                key={reason.id}
                className={`border-2 p-5 ${
                  found ? "border-ink bg-plaster" : "border-ink/30"
                }`}
              >
                <p
                  className={`text-sm font-semibold uppercase tracking-[0.14em] ${
                    found ? "text-brick" : "text-ink/60"
                  }`}
                >
                  {reasonNumber(reason.id)}
                </p>
                {found ? (
                  <>
                    <p className="heading mt-3 text-2xl">{reason.title}</p>
                    <p className="mt-2 text-ink/80">{reason.line}</p>
                  </>
                ) : (
                  <p className="heading mt-3 text-2xl text-ink/60">
                    Not revealed yet
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setActive(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
        aria-label={activeInfo?.title ?? "Promo"}
        className="w-[min(96vw,1100px)] max-w-none border-2 border-ink bg-chalk p-0 backdrop:bg-ink/80"
      >
        {active && activeInfo && (
          <div>
            <Image
              src={promoImage(activeInfo)}
              alt={`H Breakfast to Bar: ${activeInfo.title}`}
              width={1654}
              height={709}
              sizes="96vw"
              className="h-auto w-full"
            />
            <form
              method="dialog"
              className="flex flex-wrap items-end justify-between gap-4 p-4"
            >
              <div>
                <PromoDetails issued={active} />
                <p className="mt-3 font-semibold">
                  {active.expired ? "This promo has expired." : STAFF_NOTE}
                </p>
              </div>
              <button className="btn btn-ink !min-h-[2.5rem]" autoFocus>
                Close
              </button>
            </form>
          </div>
        )}
      </dialog>
    </div>
  );
}
