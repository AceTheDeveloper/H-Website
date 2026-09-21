import Image from "next/image";
import kitchen from "@/assets/kitchen.jpg";
import dining from "@/assets/dining.jpg";
import bar from "@/assets/bar.jpg";

const photos = [
  {
    src: kitchen,
    alt: "The kitchen pass",
    tall: true,
  },
  {
    src: dining,
    alt: "The dining room",
  },
  {
    src: bar,
    alt: "The bar at night",
  },
];

export default function Gallery() {
  return (
    <section className="page-shell pb-20">
      <div className="grid gap-4 md:grid-cols-2">
        <Image
          src={photos[1].src}
          alt={photos[1].alt}
          placeholder="blur"
          className="h-full w-full object-cover md:row-span-2"
        />
        <Image
          src={photos[0].src}
          alt={photos[0].alt}
          placeholder="blur"
          className="w-full object-cover"
        />
        <Image
          src={photos[2].src}
          alt={photos[2].alt}
          placeholder="blur"
          className="w-full object-cover"
        />
      </div>
    </section>
  );
}
