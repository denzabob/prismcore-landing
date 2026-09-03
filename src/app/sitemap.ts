import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://prismcore.ru/", changeFrequency: "monthly", priority: 1 },
    { url: "https://prismcore.ru/tools", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://prismcore.ru/tools/price-change", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://prismcore.ru/tools/okpd2", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://prismcore.ru/support", changeFrequency: "yearly", priority: 0.5 },
    { url: "https://prismcore.ru/policy", changeFrequency: "yearly", priority: 0.3 },
  ];
}
