import type { MenuItem } from "@/lib/data";

export default function MenuCard({
  item,
  label,
}: {
  item: MenuItem;
  /** Optional category label shown under the name (used on the home page). */
  label?: string;
}) {
  const prices = item.prices ?? [];
  // Unlabeled prices ("₱258 / ₱388") sit beside the name; labeled ones (solo /
  // sharing, cup / platter, weights) get their own row underneath.
  const inlinePrice =
    prices.length > 0 && prices.every((p) => !p.label)
      ? prices.map((p) => p.price).join(" / ")
      : null;
  const priceRow = inlinePrice ? [] : prices;

  return (
    <article className="group">
      <div className="relative aspect-[4/3] overflow-hidden border border-sand bg-white">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain p-5 transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          // No photo yet — a quiet branded tile keeps the grid even.
          <div className="flex h-full w-full items-center justify-center">
            <img
              src="/logo.png"
              alt=""
              aria-hidden="true"
              className="h-16 w-auto opacity-[0.12]"
            />
          </div>
        )}
        {item.tag && (
          <span className="absolute left-0 top-4 bg-ink px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white">
            {item.tag}
          </span>
        )}
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="text-xl font-semibold leading-snug">{item.name}</h3>
        {inlinePrice && (
          <span className="shrink-0 text-lg text-brown">{inlinePrice}</span>
        )}
      </div>

      {label && (
        <p className="mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-brown">
          {label}
        </p>
      )}

      {priceRow.length > 0 && (
        <dl className="mt-3 flex flex-wrap gap-x-8 gap-y-2 border-t border-sand pt-3">
          {priceRow.map((p) => (
            <div key={p.label ?? p.price} className="flex items-baseline gap-2.5">
              {p.label && (
                <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brown">
                  {p.label}
                </dt>
              )}
              <dd className="text-lg text-ink">{p.price}</dd>
            </div>
          ))}
        </dl>
      )}

      {item.description && (
        <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/65">
          {item.description}
        </p>
      )}
    </article>
  );
}
