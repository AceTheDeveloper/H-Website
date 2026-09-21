import Link from "next/link";
import Image from "next/image";
import { IconArrowRight } from "./Icons";
import Reveal from "./Reveal";
import storefront from "@/assets/about.jpg";
import dining from "@/assets/abawt.jpg";

export default function AboutTeaser() {
  return (
    <section className="section page-shell grid items-center gap-16 md:grid-cols-12 md:gap-10">
      <Reveal className="relative md:col-span-6">
        <div className="relative aspect-[4/5] w-[84%] overflow-hidden">
          <Image
            src={storefront}
            alt="The H Breakfast to Bar building on Diversion Road"
            fill
            placeholder="blur"
            sizes="(min-width: 768px) 40vw, 80vw"
            className="object-cover"
          />
        </div>
        <div className="absolute -bottom-8 right-0 aspect-square w-[52%] overflow-hidden border-[10px] border-cream">
          <Image
            src={dining}
            alt="Guests at their table inside H Breakfast to Bar"
            fill
            placeholder="blur"
            sizes="(min-width: 768px) 25vw, 50vw"
            className="object-cover"
          />
        </div>
      </Reveal>

      <Reveal delay={150} className="md:col-span-5 md:col-start-8">
        <p className="eyebrow">Our story</p>
        <h2 className="display mt-5 text-3xl sm:text-4xl md:text-5xl">
          Started as a breakfast counter. Grew into a full night out.
        </h2>
        <p className="mt-6 max-w-md text-ink/70">
          We opened with a handful of tables and a short breakfast menu.
          Regulars kept asking if we&apos;d stay open past lunch — so we did,
          and the bar came with it.
        </p>
        <Link href="/about" className="link-arrow mt-9">
          Read our story <IconArrowRight />
        </Link>
      </Reveal>
    </section>
  );
}
