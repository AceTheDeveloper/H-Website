"use client";

import Link from "next/link";
import { useState } from "react";
import { nav, hours, contact } from "@/lib/data";
import { IconFacebook, IconInstagram, IconMail, IconPhone, IconPin } from "./Icons";

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
    <footer className="bg-ink text-paper">
      <div className="page-shell grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <p className="font-display text-2xl">
            H<span className="mx-1 italic font-normal text-mist">breakfast to</span>bar
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/70">
            Morning coffee, all-day plates and a late-running bar, all in one room.
          </p>
          <div className="mt-6 flex gap-4 text-paper/70">
            <a href="#" aria-label="Instagram" className="transition-colors hover:text-red">
              <IconInstagram />
            </a>
            <a href="#" aria-label="Facebook" className="transition-colors hover:text-red">
              <IconFacebook />
            </a>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-paper/90">Navigate</p>
          <ul className="mt-4 space-y-2.5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-paper/70 transition-colors hover:text-red">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium text-paper/90">Hours</p>
          <ul className="mt-4 space-y-2.5">
            {hours.map((h) => (
              <li key={h.day} className="text-sm text-paper/70">
                <span className="block text-paper/90">{h.day}</span>
                {h.time}
              </li>
            ))}
          </ul>
          <div className="mt-5 space-y-2 text-sm text-paper/70">
            <p className="flex items-center gap-2">
              <IconPin className="w-4 h-4 shrink-0" /> {contact.address}
            </p>
            <p className="flex items-center gap-2">
              <IconPhone className="w-4 h-4 shrink-0" /> {contact.phone}
            </p>
            <p className="flex items-center gap-2">
              <IconMail className="w-4 h-4 shrink-0" /> {contact.email}
            </p>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-paper/90">Get the offers first</p>
          <p className="mt-4 text-sm text-paper/70">
            Join the list for new menu drops and vouchers before anyone else.
          </p>
          {submitted ? (
            <p className="mt-4 text-sm text-red">You&apos;re on the list — welcome.</p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                aria-label="Email address"
                className="w-full min-w-0 border border-paper/25 bg-transparent px-3 py-2.5 text-sm text-paper placeholder:text-paper/40 focus:border-red"
              />
              <button type="submit" className="btn btn-primary shrink-0 !px-4 !py-2.5">
                Join
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="border-t border-paper/10 py-6">
        <div className="page-shell flex flex-col gap-2 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} H Breakfast to Bar. All rights reserved.</p>
          <p>Website content is placeholder copy for design review.</p>
        </div>
      </div>
    </footer>
  );
}
