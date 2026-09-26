import { contact, hours, site, social } from "@/lib/data";

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const hhmm = (minutes: number) => {
  const m = minutes % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
};

/** Restaurant structured data: what Google reads for the local knowledge panel. */
export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "BarOrPub"],
    "@id": `${site.url}/#restaurant`,
    name: site.name,
    url: site.url,
    image: `${site.url}/opengraph-image.png`,
    logo: `${site.url}/logo.png`,
    telephone: contact.phone,
    description:
      "All-day restaurant and bar serving breakfast, plates to share, pizza, pasta and cocktails in Mandurriao, Iloilo City.",
    priceRange: "₱₱",
    servesCuisine: ["Breakfast", "Filipino", "Asian", "Pizza", "Pasta"],
    hasMenu: `${site.url}/menu`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Diversion Road, Mandurriao",
      addressLocality: "Iloilo City",
      addressRegion: "Iloilo",
      addressCountry: "PH",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    openingHoursSpecification: hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days.map((d) => dayNames[d]),
      opens: hhmm(h.open),
      closes: hhmm(h.close),
    })),
    sameAs: Object.values(social).filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
