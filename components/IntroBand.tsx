import Link from "next/link";
import Image from "next/image";
import mural from "@/assets/about_not_teaser.jpg";

export default function IntroBand() {
  return (
    <section className="band bg-chalk">
      <div className="page-shell grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-8">
          <p className="heading text-3xl leading-[1.15] sm:text-4xl md:text-5xl">
            H Breakfast to Bar started as a breakfast counter with a short menu
            and a long weekend line. The regulars asked what happens after
            lunch, so the kitchen stayed open and the bar went in.
          </p>
          <Link href="/about" className="text-link mt-9 inline-block">
            Read our story
          </Link>
        </div>
        <div className="relative hidden aspect-[4/5] lg:col-span-3 lg:col-start-10 lg:block">
          <Image
            src={mural}
            alt="A painted mural of a Diversion Road street sign on a pole covered in stickers"
            fill
            placeholder="blur"
            sizes="25vw"
            className="border-2 border-ink object-cover"
          />
        </div>
      </div>
    </section>
  );
}
