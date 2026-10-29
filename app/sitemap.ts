import type { MetadataRoute } from "next";
import { SITE_URL } from "./components/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/asesoria", "/newsletters", "/sobre-mi"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    priority: path === "" ? 1 : 0.8,
  }));
}
