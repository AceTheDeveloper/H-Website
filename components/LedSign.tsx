"use client";

import { useEffect, useState } from "react";
import { defaultMessages, getOpenStatus } from "@/lib/status";

/**
 * The dot-matrix signboard from the counter, as a live status strip.
 * It reads the hours in lib/data.ts and says what is happening right now in
 * Manila time. Before JavaScript runs it shows the standing hours instead.
 */
export default function LedSign({ className = "" }: { className?: string }) {
  const [messages, setMessages] = useState(defaultMessages);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const update = () => setMessages(getOpenStatus().messages);
    update();
    const id = window.setInterval(update, 60_000);
    // Respect "reduce motion": start the ticker stopped.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPaused(true);
    }
    return () => window.clearInterval(id);
  }, []);

  const line = messages.join("   •   ");

  return (
    <div
      className={`led-sign on-dark flex items-stretch border-y-2 border-ink ${className}`}
    >
      <p className="sr-only" role="status">
        {messages.join(". ")}
      </p>

      <div aria-hidden="true" className="led-boot min-w-0 flex-1 overflow-hidden">
        <div
          className="ticker-track py-4 text-xl leading-none sm:text-2xl"
          data-paused={paused}
        >
          {/* Two copies, so the loop has no gap. */}
          {[0, 1].map((copy) => (
            <span key={copy} className="whitespace-pre pr-16">
              {line}
              {"   •   "}
            </span>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={paused ? "Play scrolling status" : "Pause scrolling status"}
        className="relative z-10 grid w-14 shrink-0 place-items-center border-l border-white/15 bg-[#0b0807] text-white/80 hover:text-white"
      >
        {paused ? (
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor" />
          </svg>
        )}
      </button>
    </div>
  );
}
