"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { contact, nav } from "@/lib/data";
import { IconClose, IconMenu, IconPhone } from "./Icons";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-plaster">
      <div className="page-shell flex h-16 items-center justify-between gap-3 sm:gap-6">
        <Link
          href="/"
          aria-label="H Breakfast to Bar, home"
          className="flex shrink-0 items-center gap-3"
        >
          <Image
            src="/logo.png"
            alt=""
            width={442}
            height={534}
            priority
            className="h-9 w-auto"
          />
          <span className="poster text-[1.35rem] leading-[0.9]">
            Breakfast
            <br />
            to Bar
          </span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`py-2 text-base font-semibold underline-offset-[0.5em] decoration-2 decoration-red hover:underline ${
                  active ? "underline" : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={contact.phoneHref}
            aria-label={`Reserve a table: call ${contact.phone}`}
            className="btn btn-primary !min-h-[2.5rem] !px-3 !py-2 sm:!px-4"
          >
            <IconPhone className="hidden h-4 w-4 sm:block" />
            <span className="sm:hidden">Reserve</span>
            <span className="hidden sm:inline">Reserve a table</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t-2 border-ink bg-plaster lg:hidden">
          <nav className="page-shell flex flex-col py-2" aria-label="Mobile">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`heading border-b border-ink/15 py-4 text-3xl ${
                    active ? "text-brick" : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
