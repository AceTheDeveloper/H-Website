import type { MetadataRoute } from "next";
import { site } from "@/lib/data";

// Bump a route's date here when its content actually changes.
const routes: { path: string; lastModified: string }[] = [
  { path: "", lastModified: "2026-09-26" },
  { path: "/menu", lastModified: "2026-09-26" },
  { path: "/vouchers", lastModified: "2026-09-26" },
  { path: "/location", lastModified: "2026-09-26" },
  { path: "/about", lastModified: "2026-09-26" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, lastModified }) => ({
    url: `${site.url}${path}`,
    lastModified,
  }));
}
