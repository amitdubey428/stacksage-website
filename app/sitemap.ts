import type { MetadataRoute } from "next";
export const dynamic = "force-static";
export const revalidate = false;

export default function sitemap(): MetadataRoute.Sitemap {
    const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://stacksageai.com";
    return [
        {
            url: `${base}/`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${base}/docs`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${base}/demo-report`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${base}/privacy`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.2,
        },
        {
            url: `${base}/privacy-access`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.2,
        },
        {
            url: `${base}/terms`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.2,
        },
        {
            url: `${base}/refund-policy`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.2,
        },
        {
            url: `${base}/alternatives`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${base}/alternatives/infracost`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${base}/alternatives/aws-trusted-advisor`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${base}/alternatives/cloudhealth`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${base}/alternatives/komiser`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${base}/docs/quick-start`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${base}/docs/licensing`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${base}/docs/configuration`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${base}/docs/detectors`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${base}/docs/iam-policy`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${base}/docs/troubleshooting`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: `${base}/docs/privacy`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
        },
    ];
}
