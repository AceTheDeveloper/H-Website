"use client";

import { useEffect, useRef, useState } from "react";

type Entry = { id: string; label: string };

/**
 * Category index. Plain #anchor links, so it works without JavaScript; the
 * script only highlights the section you are reading. A sticky chip bar on
 * phones, a sticky side list on wide screens.
 */
export default function MenuNav({ categories }: { categories: Entry[] }) {
  const [activeId, setActiveId] = useState(categories[0].id);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const sections = categories
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [categories]);

  // Keep the active chip in view on phones.
  useEffect(() => {
    const list = listRef.current;
    const chip = list?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!list || !chip || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({
      left: chip.offsetLeft - list.clientWidth / 2 + chip.clientWidth / 2,
      behavior: "smooth",
    });
  }, [activeId]);

  return (
    <nav
      aria-label="Menu categories"
      className="sticky top-16 z-30 -mx-5 border-b-2 border-ink bg-plaster px-5 md:-mx-10 md:px-10 lg:top-24 lg:mx-0 lg:self-start lg:border-b-0 lg:bg-transparent lg:px-0"
    >
      <ul
        ref={listRef}
        className="flex gap-1 overflow-x-auto py-2 [scrollbar-width:none] lg:flex-col lg:gap-0 lg:overflow-visible lg:py-0 [&::-webkit-scrollbar]:hidden"
      >
        {categories.map((c) => {
          const active = c.id === activeId;
          return (
            <li key={c.id} className="shrink-0">
              <a
                href={`#${c.id}`}
                aria-current={active ? "true" : undefined}
                className={`block whitespace-nowrap px-3 py-2.5 text-base lg:border-l-4 lg:py-2 ${
                  active
                    ? "font-semibold text-brick underline decoration-2 underline-offset-[0.45em] lg:border-red lg:no-underline"
                    : "text-ink/80 hover:text-ink lg:border-transparent lg:hover:border-ink/30"
                }`}
              >
                {c.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
