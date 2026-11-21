import type { MetadataRoute } from "next";
import { demos } from "@/demos/registry";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE_URL}/demos`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...demos
      .filter((d) => d.status === "live")
      .map((d) => ({
        url: `${SITE_URL}/${d.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
  ];
}
