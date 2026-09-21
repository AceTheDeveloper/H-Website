import Link from "next/link";
import { menu } from "@/lib/data";
import MenuCard from "./MenuCard";
import { IconArrowRight } from "./Icons";
import Reveal from "./Reveal";

const featuredIds = ["b8", "f1", "a2", "m2"];
const featured = menu.flatMap((category) =>
  category.items
    .filter((item) => featuredIds.includes(item.id))
    .map((item) => ({ item, label: category.label })),
);

export default function MenuPreview() {
  return (
    <section className="border-y border-sand bg-white">
      <div className="section page-shell">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">From the kitchen</p>
            <h2 className="display mt-5 max-w-xl text-3xl sm:text-4xl md:text-5xl">
              One menu, however you arrive.
            </h2>
          </div>
          <Link href="/menu" className="link-arrow">
            View full menu <IconArrowRight />
          </Link>
        </Reveal>

        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map(({ item, label }, i) => (
            <Reveal key={item.id} delay={i * 90}>
              <MenuCard item={item} label={label} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
