import type { Metadata } from "next";
import { site } from "./data";

/**
 * Per-page Open Graph block. A page's `openGraph` replaces the layout's rather
 * than merging with it, so each page repeats the site-wide fields and image.
 */
export function pageOpenGraph(path: string): NonNullable<Metadata["openGraph"]> {
  return {
    url: path,
    siteName: site.name,
    type: "website",
    locale: "en_PH",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "H Breakfast to Bar: restaurant and bar in Mandurriao, Iloilo City",
      },
    ],
  };
}
