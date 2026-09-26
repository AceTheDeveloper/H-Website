import type { MetadataRoute } from "next";
import { site } from "@/lib/data";

const routes = ["", "/menu", "/vouchers", "/location", "/about"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified,
  }));
}
