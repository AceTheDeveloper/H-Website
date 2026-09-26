import type { MenuCategory } from "@/lib/data";
import MenuCard, { MenuRow } from "./MenuCard";

/**
 * One menu category. Dishes with a photo get cards; the rest are a ruled list
 * underneath, so no dish is left with an empty picture box.
 */
export default function MenuSection({ category }: { category: MenuCategory }) {
  const withPhoto = category.items.filter((i) => i.image);
  const withoutPhoto = category.items.filter((i) => !i.image);

  return (
    <section id={category.id} aria-labelledby={`${category.id}-title`}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b-2 border-ink pb-3">
        <h2 id={`${category.id}-title`} className="heading text-4xl sm:text-5xl">
          {category.label}
        </h2>
        {category.timeNote && (
          <p className="font-semibold text-brick">{category.timeNote}</p>
        )}
      </div>

      {withPhoto.length > 0 && (
        <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
          {withPhoto.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {withoutPhoto.length > 0 && (
        <ul
          className={`grid gap-x-10 sm:grid-cols-2 ${withPhoto.length > 0 ? "mt-10" : "mt-4"}`}
        >
          {withoutPhoto.map((item) => (
            <MenuRow key={item.id} item={item} />
          ))}
        </ul>
      )}
    </section>
  );
}
