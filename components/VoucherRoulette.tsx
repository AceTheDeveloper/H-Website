"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import type { Voucher } from "@/lib/data";

/**
 * The wheel itself: one SVG, no packages. It has one slice per item in
 * `items`, so the wheel resizes itself when vouchers are added or removed.
 * It does not decide the prize. The parent calls `spinTo(index)` with the
 * slice the server picked, and the promise resolves when the wheel stops.
 *
 * Colours come from tailwind.config.ts. Neighbouring slices never share a
 * colour, including where the last slice meets the first.
 */

export type RouletteHandle = {
  spinTo: (index: number) => Promise<void>;
};

const SIZE = 440;
const C = SIZE / 2;
const R = 172; // slice radius
const HUB = 32;
const BULBS = 24;
const SPIN_MS = 6200;

type Fill = { bg: string; fg: string };

// red, ink, sand, brown, chalk, brick, espresso (tailwind.config.ts)
const PALETTE: Fill[] = [
  { bg: "#E21E02", fg: "#FFFFFF" },
  { bg: "#17110E", fg: "#FFFFFF" },
  { bg: "#E2D3BE", fg: "#17110E" },
  { bg: "#6E4B3C", fg: "#FFFFFF" },
  { bg: "#FBF8F3", fg: "#17110E" },
  { bg: "#B32A14", fg: "#FFFFFF" },
  { bg: "#2B1D17", fg: "#FFFFFF" },
];

function pickFills(count: number): Fill[] {
  const out: number[] = [];
  for (let i = 0; i < count; i++) {
    let idx = i % PALETTE.length;
    while (
      (i > 0 && idx === out[i - 1]) ||
      (i === count - 1 && count > 2 && idx === out[0])
    ) {
      idx = (idx + 1) % PALETTE.length;
    }
    out.push(idx);
  }
  return out.map((i) => PALETTE[i]);
}

/** "A Gift for You — Christmas Voucher ₱500" -> "Christmas ₱500" */
export function shortLabel(title: string): string {
  const afterDash = title.split("—").pop() ?? title;
  const label = afterDash
    .replace(/\bVoucher\b/i, "")
    .replace(/\s+/g, " ")
    .trim();
  return label || title;
}

function polar(angleDeg: number, radius: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180; // 0deg = 12 o'clock, clockwise
  return { x: C + radius * Math.cos(rad), y: C + radius * Math.sin(rad) };
}

function slicePath(start: number, end: number) {
  const a = polar(start, R);
  const b = polar(end, R);
  const large = end - start > 180 ? 1 : 0;
  return `M ${C} ${C} L ${a.x} ${a.y} A ${R} ${R} 0 ${large} 1 ${b.x} ${b.y} Z`;
}

function jitter(): number {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return buf[0] / 4294967296;
}

const STYLE = `
.hroul-bulb { fill: #FF6A48; }
.hroul-spinning .hroul-bulb-a { animation: hroul-blink 0.5s steps(1, end) infinite; }
.hroul-spinning .hroul-bulb-b { animation: hroul-blink 0.5s steps(1, end) infinite 0.25s; }
@keyframes hroul-blink { 0% { opacity: 1; } 50% { opacity: 0.2; } }
@media (prefers-reduced-motion: reduce) {
  .hroul-spinning .hroul-bulb-a, .hroul-spinning .hroul-bulb-b { animation: none; }
}
`;

const VoucherRoulette = forwardRef<
  RouletteHandle,
  {
    items: Voucher[];
    /** Index of the winning slice once the wheel has stopped; other slices dim. */
    highlight?: number | null;
  }
>(function VoucherRoulette({ items, highlight = null }, ref) {
  const count = items.length;
  const seg = 360 / Math.max(count, 1);
  const fills = pickFills(count);

  const wheelRef = useRef<SVGGElement>(null);
  const rotationRef = useRef(0);
  const busyRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useImperativeHandle(ref, () => ({
    spinTo(index: number) {
      if (busyRef.current || index < 0 || index >= count)
        return Promise.resolve();
      busyRef.current = true;

      // Stop somewhere inside the slice, never right on an edge.
      const centre = (index + 0.5) * seg + (jitter() - 0.5) * seg * 0.6;
      const current = rotationRef.current;
      const needed = (((-centre - current) % 360) + 360) % 360;
      const turns = reduceMotion ? 1 : 6 + Math.floor(jitter() * 3);
      const target = current + turns * 360 + needed;
      rotationRef.current = target;

      const duration = reduceMotion ? 700 : SPIN_MS;
      const wheel = wheelRef.current;
      if (wheel) {
        wheel.style.transition = `transform ${duration}ms cubic-bezier(0.14, 0.62, 0.1, 1)`;
        wheel.style.transform = `rotate(${target}deg)`;
      }
      setSpinning(true);

      return new Promise<void>((resolve) => {
        timerRef.current = setTimeout(() => {
          busyRef.current = false;
          setSpinning(false);
          resolve();
        }, duration + 120);
      });
    },
  }));

  if (count === 0) return null;

  // Label sizing adapts to the number of slices.
  const labelRadius = R - 14;
  const arcWidth = 2 * (R * 0.62) * Math.sin((seg * Math.PI) / 360);
  const baseFont = Math.max(9, Math.min(16, arcWidth * 0.42));
  const available = labelRadius - HUB - 12;
  const CHAR_W = 0.56;

  function fitLabel(label: string): { text: string; size: number } {
    const size = Math.max(
      9,
      Math.min(baseFont, available / (label.length * CHAR_W)),
    );
    const maxChars = Math.floor(available / (size * CHAR_W));
    const text =
      label.length > maxChars
        ? `${label.slice(0, maxChars - 1).trimEnd()}…`
        : label;
    return { text, size };
  }

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      role="img"
      aria-label={`Voucher wheel with ${count} prizes: ${items.map((v) => shortLabel(v.title)).join(", ")}`}
      className={`block h-auto w-full ${spinning ? "hroul-spinning" : ""}`}
    >
      <style>{STYLE}</style>
      <defs>
        <radialGradient id="hroul-sheen" cx="50%" cy="50%" r="50%">
          <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.28" />
        </radialGradient>
      </defs>

      {/* Frame + LED bulbs */}
      <circle
        cx={C}
        cy={C}
        r={210}
        fill="#2B1D17"
        stroke="#6E4B3C"
        strokeWidth={2}
      />
      <circle cx={C} cy={C} r={198} fill="#17110E" />
      {Array.from({ length: BULBS }, (_, i) => {
        const p = polar(i * (360 / BULBS), 186);
        return (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={4.5}
            className={`hroul-bulb ${i % 2 === 0 ? "hroul-bulb-a" : "hroul-bulb-b"}`}
          />
        );
      })}

      {/* Turning part */}
      <g
        ref={wheelRef}
        style={{ transformOrigin: `${C}px ${C}px`, transformBox: "view-box" }}
      >
        {count === 1 ? (
          <circle cx={C} cy={C} r={R} fill={fills[0].bg} />
        ) : (
          items.map((v, i) => (
            <path
              key={v.id}
              d={slicePath(i * seg, (i + 1) * seg)}
              fill={fills[i].bg}
              stroke="#17110E"
              strokeWidth={2}
              strokeLinejoin="round"
              style={{
                opacity: highlight === null || highlight === i ? 1 : 0.35,
                transition: "opacity 500ms ease",
              }}
            />
          ))
        )}
        {items.map((v, i) => {
          const { text, size } = fitLabel(shortLabel(v.title));
          return (
            <text
              key={v.id}
              x={C + labelRadius}
              y={C}
              transform={`rotate(${(i + 0.5) * seg - 90} ${C} ${C})`}
              textAnchor="end"
              dominantBaseline="central"
              fill={fills[i].fg}
              fontSize={size}
              fontWeight={700}
              style={{
                fontFamily:
                  "var(--font-display), Impact, Arial Narrow, sans-serif",
                opacity: highlight === null || highlight === i ? 1 : 0.35,
                transition: "opacity 500ms ease",
              }}
            >
              {text}
            </text>
          );
        })}
      </g>

      {/* Fixed on top: inner sheen, ring, hub, pointer */}
      <circle
        cx={C}
        cy={C}
        r={R}
        fill="url(#hroul-sheen)"
        pointerEvents="none"
      />
      <circle
        cx={C}
        cy={C}
        r={R}
        fill="none"
        stroke="#FBF8F3"
        strokeWidth={3}
      />
      <circle
        cx={C}
        cy={C}
        r={HUB}
        fill="#17110E"
        stroke="#FBF8F3"
        strokeWidth={3}
      />
      <circle cx={C} cy={C} r={HUB - 9} fill="#E21E02" />
      <path
        d="M 220 66 L 201 20 Q 220 4 239 20 Z"
        fill="#E21E02"
        stroke="#FBF8F3"
        strokeWidth={3}
        strokeLinejoin="round"
      />
      <circle cx={C} cy={26} r={4} fill="#FBF8F3" />
    </svg>
  );
});

export default VoucherRoulette;
