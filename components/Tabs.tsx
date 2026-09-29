"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

export type TabItem = { id: string; label: string; content: ReactNode };

/**
 * Click-through tabs: one panel on screen at a time, so a page stays short.
 *
 * - Every panel is rendered in the HTML (inactive ones are `hidden`), so the
 *   copy is still there for search engines and the first tab works without JS.
 * - Arrow keys, Home and End move between tabs.
 * - `syncHash` lets a link like /menu#pasta open that tab directly, and keeps
 *   the address bar in step as people click.
 */
export default function Tabs({
  tabs,
  label,
  syncHash = false,
  className = "",
}: {
  tabs: TabItem[];
  /** Accessible name for the tab list. */
  label: string;
  syncHash?: boolean;
  className?: string;
}) {
  const uid = useId();
  const [activeId, setActiveId] = useState(tabs[0].id);
  const buttons = useRef<Record<string, HTMLButtonElement | null>>({});
  const ids = tabs.map((t) => t.id).join("|");

  useEffect(() => {
    if (!syncHash) return;
    const read = () => {
      const hash = window.location.hash.slice(1);
      if (ids.split("|").includes(hash)) setActiveId(hash);
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, [syncHash, ids]);

  function select(id: string, focus = false) {
    setActiveId(id);
    if (syncHash) window.history.replaceState(null, "", `#${id}`);
    if (focus) buttons.current[id]?.focus();
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const i = tabs.findIndex((t) => t.id === activeId);
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    if (next < 0) return;
    e.preventDefault();
    select(tabs[next].id, true);
  }

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={label}
        onKeyDown={onKeyDown}
        className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] md:flex-wrap md:overflow-visible [&::-webkit-scrollbar]:hidden"
      >
        {tabs.map((t) => {
          const active = t.id === activeId;
          return (
            <button
              key={t.id}
              ref={(el) => {
                buttons.current[t.id] = el;
              }}
              type="button"
              role="tab"
              id={`${uid}-tab-${t.id}`}
              aria-selected={active}
              aria-controls={`${uid}-panel-${t.id}`}
              tabIndex={active ? 0 : -1}
              onClick={() => select(t.id)}
              className={`min-h-[2.75rem] shrink-0 whitespace-nowrap border-2 border-ink px-4 py-2 text-base font-semibold transition-colors ${
                active ? "bg-ink text-white" : "bg-transparent hover:bg-ink/10"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {tabs.map((t) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`${uid}-panel-${t.id}`}
          aria-labelledby={`${uid}-tab-${t.id}`}
          hidden={t.id !== activeId}
          className="mt-8"
        >
          {t.content}
        </div>
      ))}
    </div>
  );
}
