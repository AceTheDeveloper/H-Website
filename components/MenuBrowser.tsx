"use client";

import { useState } from "react";
import { menu } from "@/lib/data";
import MenuCard from "./MenuCard";

export default function MenuBrowser() {
  const [activeId, setActiveId] = useState(menu[0].id);
  const active = menu.find((category) => category.id === activeId) ?? menu[0];

  return (
    <div>
      {/* Category tabs — stick under the header and scroll sideways on phones. */}
      <div className="sticky top-20 z-40 border-b border-sand bg-cream/95 backdrop-blur">
        <div className="page-shell">
          <div
            role="tablist"
            aria-label="Menu categories"
            className="-mx-1 flex gap-1 overflow-x-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(to_right,black_93%,transparent)]"
          >
            {menu.map((category) => {
              const isActive = category.id === activeId;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveId(category.id)}
                  className={`relative shrink-0 px-4 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.18em] transition-colors hover:text-red ${
                    isActive ? "text-red" : "text-ink/70"
                  }`}
                >
                  {category.label}
                  <span
                    className={`absolute inset-x-4 bottom-0 h-0.5 bg-red transition-transform duration-200 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="page-shell py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-ink pb-5">
          <h2 className="display text-3xl sm:text-4xl">{active.label}</h2>
          {active.timeNote && (
            <p className="text-sm uppercase tracking-[0.18em] text-brown">
              {active.timeNote}
            </p>
          )}
        </div>

        <div
          key={active.id}
          role="tabpanel"
          className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
        >
          {active.items.map((item, i) => (
            <div
              key={item.id}
              className="rise"
              style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}
            >
              <MenuCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
