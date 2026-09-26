import Image from "next/image";
import type { MenuItem } from "@/lib/data";

/** A dish with a photo. Dishes without one use MenuRow instead. */
export default function MenuCard({
  item,
  label,
}: {
  item: MenuItem;
  /** Optional category name shown under the dish (used on the home page). */
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
    <article>
      <div className="relative aspect-[4/3] overflow-hidden border-2 border-ink bg-white">
        {item.image && (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(min-width: 1024px) 26vw, (min-width: 640px) 45vw, 100vw"
            className="object-contain p-4"
          />
        )}
        {item.tag && (
          <span className="absolute left-0 top-3 bg-ink px-3 py-1 text-sm font-semibold text-white">
            {item.tag}
          </span>
        )}
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="heading text-2xl">{item.name}</h3>
        {inlinePrice && (
          <span className="shrink-0 text-lg font-semibold">{inlinePrice}</span>
        )}
      </div>

      {label && <p className="mt-1 text-[0.95rem] text-ink/75">{label}</p>}

      {priceRow.length > 0 && (
        <dl className="mt-2 flex flex-wrap gap-x-6 gap-y-1">
          {priceRow.map((p) => (
            <div key={p.label ?? p.price} className="flex items-baseline gap-2">
              {p.label && <dt className="text-[0.95rem] text-ink/75">{p.label}</dt>}
              <dd className="text-lg font-semibold">{p.price}</dd>
            </div>
          ))}
        </dl>
      )}

      {item.description && (
        <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/75">
          {item.description}
        </p>
      )}
    </article>
  );
}

/** A dish without a photo: a plain ruled line, so the grid never has empty tiles. */
export function MenuRow({ item }: { item: MenuItem }) {
  const prices = item.prices ?? [];
  return (
    <li className="flex items-baseline justify-between gap-4 border-b border-ink/20 py-3">
      <span className="flex flex-wrap items-baseline gap-x-3">
        <span className="heading text-xl">{item.name}</span>
        {item.tag && (
          <span className="bg-ink px-2 py-0.5 text-sm font-semibold text-white">
            {item.tag}
          </span>
        )}
      </span>
      {prices.length > 0 && (
        <span className="shrink-0 text-right font-semibold">
          {prices.map((p, i) => (
            <span key={p.label ?? p.price}>
              {i > 0 && <span className="px-1.5 text-ink/50">/</span>}
              {p.label && (
                <span className="mr-1.5 font-normal text-ink/75">{p.label}</span>
              )}
              {p.price}
            </span>
          ))}
        </span>
      )}
    </li>
  );
}
