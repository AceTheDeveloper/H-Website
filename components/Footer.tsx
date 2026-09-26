import Image from "next/image";
import Link from "next/link";
import { contact, hours, nav, social } from "@/lib/data";
import { IconFacebook, IconInstagram, IconPhone, IconPin } from "./Icons";

export default function Footer() {
  return (
    <footer className="on-dark bg-[#0f0b09] text-white">
      <div className="page-shell grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.3fr] lg:gap-16">
        <div>
          <Link
            href="/"
            aria-label="H Breakfast to Bar, home"
            className="flex items-center gap-3"
          >
            <Image src="/logo.png" alt="" width={442} height={534} className="h-12 w-auto" />
            <span className="poster text-3xl leading-[0.9]">
              Breakfast
              <br />
              to Bar
            </span>
          </Link>
          <p className="mt-6 max-w-xs text-white/75">
            Morning coffee, all-day plates and a late-running bar, all in one room.
          </p>
          {(social.instagram || social.facebook) && (
            <div className="mt-6 flex gap-2 text-white/80">
              {social.instagram && (
                <a
                  href={social.instagram}
                  aria-label="H Breakfast to Bar on Instagram"
                  className="grid h-11 w-11 place-items-center hover:text-white"
                >
                  <IconInstagram />
                </a>
              )}
              {social.facebook && (
                <a
                  href={social.facebook}
                  aria-label="H Breakfast to Bar on Facebook"
                  className="grid h-11 w-11 place-items-center hover:text-white"
                >
                  <IconFacebook />
                </a>
              )}
            </div>
          )}
        </div>

        <nav aria-label="Footer">
          <h2 className="heading text-2xl">Explore</h2>
          <ul className="mt-5 space-y-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-block py-1.5 text-white/80 hover:text-white hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="heading text-2xl">Visit</h2>
          <ul className="mt-5 space-y-3">
            {hours.map((h) => (
              <li key={h.day} className="text-white/75">
                <span className="block font-semibold text-white">{h.day}</span>
                {h.time}
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-3 text-white/75">
            <p className="flex items-start gap-3">
              <IconPin className="mt-1 h-4 w-4 shrink-0 text-[#ff6a48]" />
              {contact.address}
            </p>
            <p className="flex items-center gap-3">
              <IconPhone className="h-4 w-4 shrink-0 text-[#ff6a48]" />
              <a href={contact.phoneHref} className="hover:text-white hover:underline">
                {contact.phone}
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15 py-6">
        <div className="page-shell flex flex-col gap-2 text-sm text-white/65 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} H Breakfast to Bar. All rights reserved.</p>
          <p>Open daily from 6 AM</p>
        </div>
      </div>
    </footer>
  );
}
