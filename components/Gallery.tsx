const photos = [
  { src: "https://placehold.co/700x900/242024/F3F4F5?text=Kitchen", alt: "The kitchen pass", tall: true },
  { src: "https://placehold.co/700x520/DDDDDD/242024?text=Dining+Room", alt: "The dining room" },
  { src: "https://placehold.co/700x520/E30220/F3F4F5?text=The+Bar", alt: "The bar at night" },
];

export default function Gallery() {
  return (
    <section className="page-shell pb-20">
      <div className="grid gap-4 md:grid-cols-2">
        <img
          src={photos[0].src}
          alt={photos[0].alt}
          className="h-full w-full object-cover md:row-span-2"
        />
        <img src={photos[1].src} alt={photos[1].alt} className="w-full object-cover" />
        <img src={photos[2].src} alt={photos[2].alt} className="w-full object-cover" />
      </div>
    </section>
  );
}
