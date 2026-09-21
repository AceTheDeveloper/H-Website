import Link from "next/link";
import Image from "next/image"; // 1. Import Next.js Image
import heroImage from "@/assets/about.jpg";

export default function Hero() {
  return (
    <section className="bg-ink text-paper">
      <div className="page-shell grid gap-10 py-20 md:grid-cols-[1.4fr_1fr] md:py-28">
        <div>
          <h1 className="font-display text-[2.75rem] leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Breakfast at 7. Cocktails past midnight. Same table.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-paper/70">
            H Breakfast to Bar runs one kitchen through the whole day — eggs and
            coffee at sunrise, a full bar by evening, and a menu that never
            feels like an afterthought either way.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/menu" className="btn btn-primary">
              View the menu
            </Link>
            <Link href="/vouchers" className="btn btn-outline on-dark">
              See vouchers
            </Link>
          </div>
        </div>

        <div className="relative hidden md:block">
          <div className="absolute inset-0 border border-paper/15" />
          {/* 2. Use the Image component */}
          <Image
            src={heroImage}
            alt="Interior of H Breakfast to Bar"
            className="h-full w-full object-cover"
            placeholder="blur" // Optional: automatically blurs while loading
          />
        </div>
      </div>
    </section>
  );
}
