"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/data";
import { IconClose, IconMenu } from "./Icons";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-sand bg-cream/95 backdrop-blur transition-shadow duration-300 ${
        scrolled ? "shadow-[0_10px_30px_-18px_rgba(27,20,17,0.35)]" : ""
      }`}
    >
      <div className="page-shell flex h-20 items-center justify-between gap-6">
        <Link
          href="/"
          aria-label="H Breakfast to Bar — home"
          className="flex shrink-0 items-center gap-4"
        >
          <img
            src="/logo.png"
            alt=""
            width={442}
            height={534}
            className="h-10 w-auto"
          />
          <span className="hidden text-[0.7rem] font-semibold uppercase leading-[1.5] tracking-[0.32em] text-ink sm:block">
            Breakfast
            <br />
            to Bar
          </span>
        </Link>

        <nav
          className="hidden items-center gap-10 lg:flex"
          aria-label="Primary"
        >
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative py-2 text-[0.78rem] font-semibold uppercase tracking-[0.18em] transition-colors hover:text-red ${
                  active ? "text-red" : "text-ink"
                }`}
              >
                {item.label}
                <span
                  className={`absolute inset-x-0 -bottom-0.5 h-px bg-red transition-transform duration-200 ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          {/* <Link href="/location#reserve" className="btn btn-dark !px-6 !py-3">
            Reserve a table
          </Link> */}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 p-2 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-sand bg-cream lg:hidden"
        >
          <nav className="page-shell flex flex-col py-4" aria-label="Mobile">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`border-b border-sand py-4 text-sm font-semibold uppercase tracking-[0.18em] ${
                    active ? "text-red" : "text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            {/* <Link href="/location#reserve" className="btn btn-dark mt-5 w-full">
              Reserve a table
            </Link> */}
          </nav>
        </div>
      )}
    </header>
  );
}
