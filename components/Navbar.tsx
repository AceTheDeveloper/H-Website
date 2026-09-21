"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/data";
import { IconClose, IconMenu } from "./Icons";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-ink text-paper">
      <div className="page-shell flex h-20 items-center justify-between">
        <Link href="/" className="font-display text-2xl leading-none tracking-tight">
          H<span className="mx-1 italic font-normal text-mist">breakfast to</span>bar
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors hover:text-red ${
                  active ? "text-red" : "text-paper/85"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link href="/location#reserve" className="btn btn-primary">
            Reserve a table
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-paper/15 md:hidden">
          <nav className="page-shell flex flex-col gap-1 py-4">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-sm px-1 py-2.5 text-base ${
                    active ? "text-red" : "text-paper/90"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link href="/location#reserve" className="btn btn-primary mt-3 w-full">
              Reserve a table
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
