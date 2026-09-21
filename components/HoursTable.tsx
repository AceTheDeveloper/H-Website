import { hours } from "@/lib/data";

export default function HoursTable() {
  return (
    <table className="w-full border-collapse text-sm">
      <tbody>
        {hours.map((h) => (
          <tr key={h.day} className="border-t border-mist first:border-t-0">
            <td className="py-3 pr-4 text-ink/90">{h.day}</td>
            <td className="py-3 text-right text-ink/60">{h.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
