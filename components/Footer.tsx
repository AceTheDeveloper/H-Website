"use client";

import Link from "next/link";
import { useState } from "react";
import { nav, hours, contact } from "@/lib/data";
import { IconFacebook, IconInstagram, IconPhone, IconPin } from "./Icons";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Placeholder only — wire this up to your mailing list provider.
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  }

  return (
    <footer className="bg-ink text-white">
      <div className="page-shell grid gap-14 py-20 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.4fr]">
        <div>
          <Link href="/" aria-label="H Breakfast to Bar — home" className="flex items-center gap-4">
            <img src="/logo.png" alt="" width={442} height={534} className="h-14 w-auto" />
            <span className="text-[0.7rem] font-semibold uppercase leading-[1.5] tracking-[0.32em]">
              Breakfast
              <br />
              to Bar
            </span>
          </Link>
          <p className="mt-6 max-w-xs text-[0.95rem] leading-relaxed text-white/65">
            Morning coffee, all-day plates and a late-running bar — all in one room.
          </p>
          <div className="mt-6 flex gap-4 text-white/65">
            <a href="#" aria-label="Instagram" className="transition-colors hover:text-red">
              <IconInstagram />
            </a>
            <a href="#" aria-label="Facebook" className="transition-colors hover:text-red">
              <IconFacebook />
            </a>
          </div>
        </div>

        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-red">
            Explore
          </p>
          <ul className="mt-6 space-y-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[0.95rem] text-white/75 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-red">
            Visit
          </p>
          <ul className="mt-6 space-y-4">
            {hours.map((h) => (
              <li key={h.day} className="text-[0.95rem] text-white/65">
                <span className="block text-white/90">{h.day}</span>
                {h.time}
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-3 text-[0.95rem] text-white/65">
            <p className="flex items-start gap-3">
              <IconPin className="mt-1 h-4 w-4 shrink-0 text-red" /> {contact.address}
            </p>
            <p className="flex items-center gap-3">
              <IconPhone className="h-4 w-4 shrink-0 text-red" />
              <a href={contact.phoneHref} className="hover:text-white">
                {contact.phone}
              </a>
            </p>
          </div>
        </div>

        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-red">
            Stay in the loop
          </p>
          <p className="mt-6 text-[0.95rem] text-white/65">
            New dishes and vouchers, before anyone else.
          </p>
          {submitted ? (
            <p className="mt-5 text-[0.95rem] text-white">You&apos;re on the list — welcome.</p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-5 flex">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                aria-label="Email address"
                className="w-full min-w-0 border border-white/25 bg-transparent px-4 py-3 text-[0.95rem] text-white placeholder:text-white/40 focus:border-red focus:outline-none"
              />
              <button type="submit" className="btn btn-primary shrink-0 !px-5">
                Join
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="page-shell flex flex-col gap-2 text-xs tracking-[0.08em] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} H Breakfast to Bar. All rights reserved.</p>
          <p>Diversion Road, Mandurriao, Iloilo City</p>
        </div>
      </div>
    </footer>
  );
}
