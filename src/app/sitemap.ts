import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://prismcore.ru/", changeFrequency: "monthly", priority: 1 },
    { url: "https://prismcore.ru/support", changeFrequency: "yearly", priority: 0.5 },
    { url: "https://prismcore.ru/policy", changeFrequency: "yearly", priority: 0.3 },
  ];
}
