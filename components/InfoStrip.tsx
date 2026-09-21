import { contact, hours } from "@/lib/data";

export default function InfoStrip() {
  const items = [
    { label: "Hours", value: `${hours[0].day}, ${hours[0].time}` },
    { label: "Find us", value: contact.address },
    { label: "Call", value: contact.phone, href: contact.phoneHref },
  ];

  return (
    <section className="bg-ink text-white">
      <div className="page-shell grid divide-y divide-white/15 md:grid-cols-3 md:divide-x md:divide-y-0">
        {items.map((item) => (
          <div key={item.label} className="py-7 md:px-8 md:first:pl-0 md:last:pr-0">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-red">
              {item.label}
            </p>
            {item.href ? (
              <a href={item.href} className="mt-2 block text-lg font-light hover:text-red">
                {item.value}
              </a>
            ) : (
              <p className="mt-2 text-lg font-light">{item.value}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
