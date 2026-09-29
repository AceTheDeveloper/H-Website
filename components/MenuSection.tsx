"use client";

import { useState } from "react";
import type { MenuCategory } from "@/lib/data";
import MenuCard, { MenuRow } from "./MenuCard";

/** Dishes shown before "Show all". Keeps each tab about one screen tall. */
const INITIAL_COUNT = 6;

/**
 * One menu category, shown inside a tab. Dishes with a photo get cards; the
 * rest are a ruled list underneath. Long categories show the first few dishes
 * and reveal the rest on click.
 */
export default function MenuSection({ category }: { category: MenuCategory }) {
  const [showAll, setShowAll] = useState(false);

  const withPhoto = category.items.filter((i) => i.image);
  const withoutPhoto = category.items.filter((i) => !i.image);
  const total = withPhoto.length + withoutPhoto.length;

  const cap = showAll ? total : INITIAL_COUNT;
  const shownPhoto = withPhoto.slice(0, cap);
  const shownPlain = withoutPhoto.slice(
    0,
    Math.max(0, cap - shownPhoto.length),
  );

  return (
    <section aria-labelledby={`${category.id}-title`}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b-2 border-ink pb-3">
        <h2
          id={`${category.id}-title`}
          className="heading text-3xl sm:text-4xl"
        >
          {category.label}
        </h2>
        {category.timeNote && (
          <p className="font-semibold text-brick">{category.timeNote}</p>
        )}
      </div>

      {category.tagline && (
        <p className="lede mt-3 text-ink/80">{category.tagline}</p>
      )}

      {shownPhoto.length > 0 && (
        <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
          {shownPhoto.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {shownPlain.length > 0 && (
        <ul
          className={`grid gap-x-10 sm:grid-cols-2 ${shownPhoto.length > 0 ? "mt-10" : "mt-4"}`}
        >
          {shownPlain.map((item) => (
            <MenuRow key={item.id} item={item} />
          ))}
        </ul>
      )}

      {total > INITIAL_COUNT && (
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          aria-expanded={showAll}
          className="btn btn-outline mt-10"
        >
          {showAll ? "Show fewer" : `Show all ${total} dishes`}
        </button>
      )}
    </section>
  );
}
