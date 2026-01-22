import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import EasterEggs from "@/components/EasterEggs";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "StackSage — AWS Audit in GitHub Actions",
    description:
        "Run an AWS waste & hygiene audit in your GitHub Actions runner. No SaaS ingestion of AWS credentials. Outputs: HTML + JSON/CSV artifacts.",
    keywords: [
        "AWS cost audit",
        "AWS cost optimization",
        "FinOps",
        "GitHub Actions",
        "cloud cost",
        "AWS waste",
    ],
    alternates: {
        canonical: "/",
    },
    icons: {
        icon: [
            { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
            { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
            { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
        ],
        shortcut: "/favicon-32x32.png",
        apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
    openGraph: {
        title: "StackSage — AWS Audit in GitHub Actions",
        description:
            "Run an AWS waste & hygiene audit in your GitHub Actions runner. No SaaS ingestion of AWS credentials. Outputs: HTML + JSON/CSV artifacts.",
        url: "/",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "StackSage",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "StackSage — AWS Audit in GitHub Actions",
        description:
            "Run an AWS waste & hygiene audit in your GitHub Actions runner. No SaaS ingestion of AWS credentials. Outputs: HTML + JSON/CSV artifacts.",
        images: ["/og-image.png"],
    },
    metadataBase: (() => {
        const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://stacksageai.com";
        try {
            return new URL(base);
        } catch {
            return new URL("https://stacksageai.com");
        }
    })(),
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const siteUrl = (() => {
        const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://stacksageai.com";
        try {
            return new URL(base).toString().replace(/\/$/, "");
        } catch {
            return "https://stacksageai.com";
        }
    })();

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebSite",
                url: `${siteUrl}/`,
                name: "StackSage",
                description:
                    "Run an AWS waste & hygiene audit in your GitHub Actions runner. No SaaS ingestion of AWS credentials. Outputs: HTML + JSON/CSV artifacts.",
            },
            {
                "@type": "Organization",
                name: "StackSage",
                url: `${siteUrl}/`,
                logo: {
                    "@type": "ImageObject",
                    url: `${siteUrl}/android-chrome-512x512.png`,
                },
            },
            {
                "@type": "SoftwareApplication",
                name: "StackSage",
                applicationCategory: "DeveloperApplication",
                operatingSystem: "Linux",
                url: `${siteUrl}/`,
                description:
                    "AWS cost audits that run in your GitHub Actions runner from a private GHCR image. Outputs: HTML + JSON/CSV artifacts.",
            },
            {
                "@type": "FAQPage",
                mainEntity: [
                    {
                        "@type": "Question",
                        name: "Where does StackSage run?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "Inside your GitHub Actions runner (in your repo).",
                        },
                    },
                    {
                        "@type": "Question",
                        name: "Can I run the Trial without contacting you?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "Yes. Trial is self-serve: create a read-only IAM role, add GitHub secrets, copy the workflow, and run it.",
                        },
                    },
                    {
                        "@type": "Question",
                        name: "Do you ingest AWS credentials?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "No. AWS access is via a customer-controlled read-only IAM role used by your workflow.",
                        },
                    },
                    {
                        "@type": "Question",
                        name: "How is Trial delivered?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "As a public Docker image pulled from GHCR and run by your workflow (no license required).",
                        },
                    },
                    {
                        "@type": "Question",
                        name: "What do I get as output?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "An HTML report plus machine-readable findings (JSON/CSV) as workflow artifacts.",
                        },
                    },
                    {
                        "@type": "Question",
                        name: "Does Trial include savings ($) estimates?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "Trial includes a limited cost/waste preview but does not compute exact savings. The paid workflow unlocks deeper coverage and quantification.",
                        },
                    },
                ],
            },
        ],
    };

    return (
        <html lang="en">
            <head>
                <Script
                    id="structured-data"
                    type="application/ld+json"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                {/* Google Analytics (GA4) */}
                <Script
                    strategy="afterInteractive"
                    src="https://www.googletagmanager.com/gtag/js?id=G-SF9V5FHLEX"
                />
                <Script
                    id="ga4"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'G-SF9V5FHLEX');
                        `,
                    }}
                />
            </head>
            <body className={`${inter.variable} antialiased bg-black text-zinc-100`}>
                <header role="banner">
                    <Navigation />
                </header>
                <main role="main">{children}</main>
                <Footer />
                <EasterEggs />
                <Analytics />
            </body>
        </html>
    );
}
