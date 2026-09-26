"use client";

import { useEffect, useState } from "react";
import { hours } from "@/lib/data";
import { getOpenStatus } from "@/lib/status";

/** Opening hours. Today's row is marked once the page knows the day in Manila. */
export default function HoursTable({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const [today, setToday] = useState<number | null>(null);

  useEffect(() => {
    setToday(getOpenStatus().todayIndex);
  }, []);

  return (
    <dl className={`divide-y ${
        tone === "dark"
          ? "divide-white/25 border-y-2 border-white"
          : "divide-ink/25 border-y-2 border-ink"
      } ${className}`}>
      {hours.map((h, i) => (
        <div key={h.day} className="flex items-baseline justify-between gap-6 py-4">
          <dt className="font-semibold">
            {h.day}
            {today === i && (
              <span className="ml-3 bg-red px-2 py-0.5 text-sm font-semibold text-white">
                Today
              </span>
            )}
          </dt>
          <dd className="text-right">{h.time}</dd>
        </div>
      ))}
    </dl>
  );
}
