import Link from "next/link";
import { IconArrowRight } from "./Icons";

export default function AboutTeaser() {
  return (
    <section className="page-shell grid gap-10 py-20 md:grid-cols-2 md:items-center md:gap-16">
      <div className="order-2 md:order-1">
        <img
          src="https://placehold.co/640x520/DDDDDD/242024?text=H+Breakfast+to+Bar"
          alt="Inside the kitchen at H Breakfast to Bar"
          className="w-full object-cover"
        />
      </div>
      <div className="order-1 md:order-2">
        <h2 className="font-display text-3xl sm:text-4xl">
          Started as a breakfast counter. Grew into a full night out.
        </h2>
        <p className="mt-5 max-w-md text-ink/65">
          We opened with three tables and a short breakfast menu. Regulars
          kept asking if we&apos;d stay open past lunch — so we did, and the
          bar came with it.
        </p>
        <Link
          href="/about"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-red transition-colors hover:text-red-dark"
        >
          Read our story <IconArrowRight />
        </Link>
      </div>
    </section>
  );
}
