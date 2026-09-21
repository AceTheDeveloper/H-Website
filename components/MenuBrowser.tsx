"use client";

import { useState } from "react";
import { menu } from "@/lib/data";
import MenuCard from "./MenuCard";

export default function MenuBrowser() {
  const [activeId, setActiveId] = useState(menu[0].id);
  const active = menu.find((category) => category.id === activeId) ?? menu[0];

  return (
    <div className="page-shell py-16">
      <div className="flex flex-wrap gap-2 border-b border-mist pb-6">
        {menu.map((category) => {
          const isActive = category.id === activeId;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveId(category.id)}
              className={`px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-ink text-paper"
                  : "bg-transparent text-ink/60 hover:text-ink"
              }`}
              aria-pressed={isActive}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex items-baseline justify-between">
        <h2 className="font-display text-2xl">{active.label}</h2>
        <span className="text-sm text-ink/50">{active.timeNote}</span>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {active.items.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
