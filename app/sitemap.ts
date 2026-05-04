import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://hornamanchiropracticcenter.com";
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/book`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/new-patient`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/existing-patient`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/insurance`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/hipaa-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/healthcare-disclaimer`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/accessibility`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
