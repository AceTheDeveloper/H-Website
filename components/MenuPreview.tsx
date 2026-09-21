import Link from "next/link";
import { menu } from "@/lib/data";
import MenuCard from "./MenuCard";
import { IconArrowRight } from "./Icons";

const featuredIds = ["b1", "s2", "m1", "p4"];
const featured = menu
  .flatMap((category) => category.items)
  .filter((item) => featuredIds.includes(item.id));

export default function MenuPreview() {
  return (
    <section className="page-shell py-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl">
            One menu, however you arrive
          </h2>
          <p className="mt-3 max-w-md text-ink/65">
            A taste of what&apos;s served across the day — from the first
            coffee to the last cocktail.
          </p>
        </div>
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-sm font-medium text-red transition-colors hover:text-red-dark"
        >
          View full menu <IconArrowRight />
        </Link>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
