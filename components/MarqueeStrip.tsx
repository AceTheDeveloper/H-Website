import { vouchers } from "@/lib/data";

const items = [
  "Open 7am daily",
  "Bar opens 4pm",
  "Kitchen runs late",
  `${vouchers.length} vouchers live now`,
  "Book a table for tonight",
];

export default function MarqueeStrip() {
  const track = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-ink bg-red py-3 text-paper">
      <div className="marquee-track">
        {track.map((item, i) => (
          <span key={i} className="flex items-center whitespace-nowrap px-6 text-sm font-medium">
            {item}
            <span className="ml-6 opacity-60">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
