import Image from "next/image";
import kitchen from "@/assets/kitchen.jpg";
import dining from "@/assets/dining.jpg";
import bar from "@/assets/bar.jpg";
import Reveal from "./Reveal";

export default function Gallery() {
  return (
    <section className="page-shell pb-20 md:pb-28">
      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        <Reveal className="relative aspect-square overflow-hidden md:row-span-2 md:aspect-auto md:min-h-[640px]">
          <Image
            src={dining}
            alt="The dining room"
            fill
            placeholder="blur"
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </Reveal>
        <Reveal delay={120} className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={kitchen}
            alt="The coffee bar and kitchen pass"
            fill
            placeholder="blur"
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </Reveal>
        <Reveal delay={240} className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={bar}
            alt="The bar at night"
            fill
            placeholder="blur"
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
}
