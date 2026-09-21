import type { MenuItem } from "@/lib/data";

export default function MenuCard({ item }: { item: MenuItem }) {
  return (
    <article className="group flex flex-col border border-mist bg-paper">
      <div className="relative aspect-[4/3] overflow-hidden bg-mist">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        {item.tag && (
          <span className="absolute left-3 top-3 bg-ink px-2.5 py-1 text-xs font-medium text-paper">
            {item.tag}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline">
          <h3 className="font-display text-lg leading-snug">{item.name}</h3>
          <span className="leader" />
          <span className="font-display text-lg text-red">{item.price}</span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-ink/65">{item.description}</p>
      </div>
    </article>
  );
}
