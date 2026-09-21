import { hours } from "@/lib/data";

export default function HoursTable() {
  return (
    <dl className="divide-y divide-sand border-y border-sand">
      {hours.map((h) => (
        <div key={h.day} className="flex items-baseline justify-between gap-6 py-4">
          <dt className="text-ink">{h.day}</dt>
          <dd className="text-right text-brown">{h.time}</dd>
        </div>
      ))}
    </dl>
  );
}
